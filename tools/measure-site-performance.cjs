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
  await page.addInitScript(() => {
    const samples = { lcp: [], cls: [], longTasks: [] };
    const supported = PerformanceObserver.supportedEntryTypes || [];
    if (supported.includes('largest-contentful-paint')) {
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) samples.lcp.push(entry.startTime);
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    }
    if (supported.includes('layout-shift')) {
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) if (!entry.hadRecentInput) samples.cls.push(entry.value);
      }).observe({ type: 'layout-shift', buffered: true });
    }
    if (supported.includes('longtask')) {
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) samples.longTasks.push(entry.duration);
      }).observe({ type: 'longtask', buffered: true });
    }
    window.__sitePerfSamples = samples;
  });
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

  async function capture(label, navigate, url = target, readySelector = '#globalSearchInput') {
    requestCount = 0;
    pageErrors = [];
    const startedAt = Date.now();
    const response = navigate
      ? await page.goto(url, { waitUntil: 'load', timeout: 120000 })
      : await page.reload({ waitUntil: 'load', timeout: 120000 });
    await page.waitForSelector(readySelector, { state: 'visible', timeout: 120000 });
    await delay(1800);

    const browserMetrics = await page.evaluate(() => {
      const samples = window.__sitePerfSamples || { lcp: [], cls: [], longTasks: [] };
      const navigation = performance.getEntriesByType('navigation')[0];
      const resources = performance.getEntriesByType('resource');
      const paints = performance.getEntriesByType('paint');
      const sum = entries => entries.reduce((total, entry) => total + (entry.transferSize || 0), 0);
      return {
        fcpMs: paints.find(entry => entry.name === 'first-contentful-paint')?.startTime ?? null,
        lcpMs: samples.lcp.length ? Math.max(...samples.lcp) : null,
        cls: samples.cls.reduce((total, value) => total + value, 0),
        longTaskMs: samples.longTasks.reduce((total, value) => total + value, 0),
        longTaskCount: samples.longTasks.length,
        domContentLoadedMs: navigation?.domContentLoadedEventEnd ?? null,
        loadEventMs: navigation?.loadEventEnd ?? null,
        responseStartMs: navigation?.responseStart ?? null,
        resourceCount: resources.length,
        transferBytes: sum(resources),
        scriptTransferBytes: sum(resources.filter(entry => entry.initiatorType === 'script' || /\\.js(?:[?#]|$)/i.test(entry.name))),
        cssTransferBytes: sum(resources.filter(entry => entry.initiatorType === 'css' || /\\.css(?:[?#]|$)/i.test(entry.name))),
      };
    });;

    return {
      label,
      scenario: readySelector === '#globalSearchInput' ? 'Portal' : 'Term 03 direct chapter route',
      elapsedWallMs: Date.now() - startedAt,
      mainDocumentStatus: response?.status() ?? null,
      requestCount,
      pageErrors,
      ...browserMetrics,
    };
  }

  try {
    const cold = await capture(name + ' portal cold cache', true);
    const warm = await capture(name + ' portal warm cache', false);
    // Measure the expensive real-world path separately: a direct Term 03 URL
    // with an empty HTTP cache, followed by a refresh with a warm cache.
    await cdp.send('Network.clearBrowserCache');
    const deepUrl = target + '#/term/3/fa/chapter/1';
    const deepCold = await capture(name + ' Term 03 deep-route cold cache', true, deepUrl, '.term-welcome');
    const deepWarm = await capture(name + ' Term 03 deep-route warm refresh', false, deepUrl, '.term-welcome');
    return {
      viewport: name,
      conditions: config,
      cold,
      warm,
      deepCold,
      deepWarm,
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
    '| Viewport | Scenario | Cache | FCP ms | LCP ms | CLS | Long-task ms | Requests | Transfer bytes | JS bytes | CSS bytes | Load ms |',
    '|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|',
  ];
  for (const viewport of results) {
    for (const sample of [viewport.cold, viewport.warm, viewport.deepCold, viewport.deepWarm]) {
      lines.push('| ' + viewport.viewport + ' | ' + sample.scenario + ' | ' +
        (sample.label.toLowerCase().includes('cold') ? 'cold' : 'warm') +
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
  const errors = results.flatMap(viewport => [viewport.cold, viewport.warm, viewport.deepCold, viewport.deepWarm]).flatMap(sample => sample.pageErrors);
  if (errors.length) {
    console.error('Browser page errors were observed:', errors);
    process.exitCode = 1;
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
