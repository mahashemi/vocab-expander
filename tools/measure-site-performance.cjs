#!/usr/bin/env node
'use strict';

// Browser-based synthetic baseline. Measures navigation in one context twice:
// first visit after clearing the browser cache, then a reload using the warm cache.
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const target = process.env.SITE_URL || 'https://mahashemi.github.io/vocab-expander/';
const outDir = path.resolve(__dirname, '..', 'reports');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function measureViewport(name, config) {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const context = await browser.newContext({
    viewport: config.viewport,
    deviceScaleFactor: config.deviceScaleFactor,
    isMobile: config.isMobile,
    hasTouch: config.isMobile,
    serviceWorkers: 'block',
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: config.latencyMs,
    downloadThroughput: config.downloadBytesPerSecond,
    uploadThroughput: config.uploadBytesPerSecond,
    connectionType: config.connectionType,
  });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: config.cpuRate });
  await cdp.send('Network.clearBrowserCache');

  let requestCount = 0;
  let pageErrors = [];
  page.on('request', () => { requestCount += 1; });
  page.on('pageerror', error => { pageErrors.push(String(error)); });

  async function capture(label, navigate) {
    requestCount = 0;
    pageErrors = [];
    const startedAt = Date.now();
    const response = navigate
      ? await page.goto(target, { waitUntil: 'load', timeout: 120000 })
      : await page.reload({ waitUntil: 'load', timeout: 120000 });
    await page.waitForSelector('#globalSearchInput', { state: 'visible', timeout: 60000 });
    await delay(1800);

    const browserMetrics = await page.evaluate(async () => {
      const lcpValues = [];
      const clsValues = [];
      const longTasks = [];
      const observers = [];
      const observe = (type, callback) => {
        if (!PerformanceObserver.supportedEntryTypes.includes(type)) return;
        const observer = new PerformanceObserver(list => callback(list.getEntries()));
        observer.observe({ type, buffered: true });
        observers.push(observer);
      };
      observe('largest-contentful-paint', entries => {
        for (const entry of entries) lcpValues.push(entry.startTime);
      });
      observe('layout-shift', entries => {
        for (const entry of entries) if (!entry.hadRecentInput) clsValues.push(entry.value);
      });
      observe('longtask', entries => {
        for (const entry of entries) longTasks.push(entry.duration);
      });
      await new Promise(resolve => setTimeout(resolve, 100));
      const navigation = performance.getEntriesByType('navigation')[0];
      const resources = performance.getEntriesByType('resource');
      const paints = performance.getEntriesByType('paint');
      const sum = entries => entries.reduce((total, entry) => total + (entry.transferSize || 0), 0);
      const result = {
        fcpMs: paints.find(entry => entry.name === 'first-contentful-paint')?.startTime ?? null,
        lcpMs: lcpValues.length ? Math.max(...lcpValues) : null,
        cls: clsValues.reduce((total, value) => total + value, 0),
        longTaskMs: longTasks.reduce((total, value) => total + value, 0),
        longTaskCount: longTasks.length,
        domContentLoadedMs: navigation?.domContentLoadedEventEnd ?? null,
        loadEventMs: navigation?.loadEventEnd ?? null,
        responseStartMs: navigation?.responseStart ?? null,
        resourceCount: resources.length,
        transferBytes: sum(resources),
        scriptTransferBytes: sum(resources.filter(entry => entry.initiatorType === 'script' || /\.js(?:[?#]|$)/i.test(entry.name))),
        cssTransferBytes: sum(resources.filter(entry => entry.initiatorType === 'css' || /\\.css(?:[?#]|$)/i.test(entry.name))),
      };
      for (const observer of observers) observer.disconnect();
      return result;
    });

    return {
      label,
      elapsedWallMs: Date.now() - startedAt,
      mainDocumentStatus: response?.status() ?? null,
      requestCount,
      pageErrors,
      ...browserMetrics,
    };
  }

  try {
    const cold = await capture(name + ' cold cache', true);
    const warm = await capture(name + ' warm cache', false);
    return {
      viewport: name,
      conditions: config,
      cold,
      warm,
    };
  } finally {
    await cdp.detach();
    await context.close();
    await browser.close();
  }
}

(async () => {
  const results = [];
  results.push(await measureViewport('mobile', {
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    latencyMs: 150,
    downloadBytesPerSecond: 200 * 1024,
    uploadBytesPerSecond: 75 * 1024,
    connectionType: 'cellular3g',
    cpuRate: 4,
  }));
  results.push(await measureViewport('desktop', {
    viewport: { width: 1365, height: 900 },
    deviceScaleFactor: 1,
    isMobile: false,
    latencyMs: 40,
    downloadBytesPerSecond: 10 * 1024 * 1024 / 8,
    uploadBytesPerSecond: 2 * 1024 * 1024 / 8,
    connectionType: 'wifi',
    cpuRate: 1,
  }));

  const report = {
    generatedAt: new Date().toISOString(),
    url: target,
    testType: 'synthetic Chromium navigation; two sequential navigations in the same browser context per viewport',
    notes: [
      'Cold run follows Network.clearBrowserCache; warm run reloads in the same browser context.',
      'Transfer sizes come from Resource Timing and may omit cross-origin resources without Timing-Allow-Origin.',
      'INP is not measured by this synthetic navigation test; long-task duration is reported as a diagnostic, not as INP.',
      'LCP and CLS are lab observations during the post-load observation window, not field/Core Web Vitals data.',
    ],
    results,
  };

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'site-performance-baseline.json'), JSON.stringify(report, null, 2) + '\n');
  const fmt = value => value == null ? 'n/a' : Math.round(value).toLocaleString('en-US');
  const lines = [
    '# Website performance baseline',
    '',
    'Generated: ' + report.generatedAt,
    '',
    'URL: ' + target,
    '',
    '> Synthetic Chromium lab data. Not field/Core Web Vitals data. INP is not measured.',
    '',
    '| Viewport | Cache | FCP ms | LCP ms | CLS | Long-task ms | Requests | Transfer bytes | JS bytes | CSS bytes | Load ms |',
    '|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|',
  ];
  for (const viewport of results) {
    for (const sample of [viewport.cold, viewport.warm]) {
      lines.push('| ' + viewport.viewport + ' | ' + (sample.label.includes('cold') ? 'cold' : 'warm') +
        ' | ' + fmt(sample.fcpMs) + ' | ' + fmt(sample.lcpMs) + ' | ' +
        (sample.cls == null ? 'n/a' : sample.cls.toFixed(4)) + ' | ' + fmt(sample.longTaskMs) +
        ' | ' + sample.requestCount + ' | ' + fmt(sample.transferBytes) + ' | ' +
        fmt(sample.scriptTransferBytes) + ' | ' + fmt(sample.cssTransferBytes) + ' | ' +
        fmt(sample.loadEventMs) + ' |');
    }
  }
  lines.push('', '## Notes', '', ...report.notes.map(note => '- ' + note), '');
  fs.writeFileSync(path.join(outDir, 'site-performance-baseline.md'), lines.join('\n'));

  console.log(lines.join('\n'));
  const errors = results.flatMap(viewport => [viewport.cold, viewport.warm]).flatMap(sample => sample.pageErrors);
  if (errors.length) {
    console.error('Browser page errors were observed:', errors);
    process.exitCode = 1;
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
