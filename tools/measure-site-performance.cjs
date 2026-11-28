#!/usr/bin/env node
'use strict';

// Browser-based synthetic baseline. Measures navigation in one context twice:
// first visit after clearing the browser cache, then a reload using the warm cache.
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { normalizeLongTasks, summarizeLongTasks } = require('./performance-long-tasks.cjs');

const targetUrl = new URL(process.env.SITE_URL || 'https://mahashemi.github.io/vocab-expander/');
targetUrl.searchParams.set('ci-run', process.env.GITHUB_RUN_ID || String(Date.now()));
const target = targetUrl.toString();
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
        for (const entry of list.getEntries()) samples.longTasks.push({
          startTime: entry.startTime,
          duration: entry.duration,
          attribution: (entry.attribution || []).map(item => ({
            name: item.name,
            containerType: item.containerType,
            containerName: item.containerName,
          })),
        });
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

  async function capture(label, navigate, url = target, readySelector = '#globalSearchInput', routeTerm = null) {
    requestCount = 0;
    pageErrors = [];
    const startedAt = Date.now();
    const response = navigate
      ? await page.goto(url, { waitUntil: 'load', timeout: 120000 })
      : await page.reload({ waitUntil: 'load', timeout: 120000 });
    await page.waitForSelector(readySelector, { state: 'visible', timeout: 120000 });
    if (routeTerm) {
      await page.waitForFunction((term) => performance.getEntriesByName('vocab-term' + String(term).padStart(2, '0') + '-route-ready').length > 0, routeTerm, { timeout: 30000 });
      if (routeTerm !== 3) {
        try {
          // The route's post-paint enrichment is opportunistic. Explicitly await
          // the same public loader here so lab measurements are deterministic
          // even when a headless tab suppresses its scheduled callback.
          await page.evaluate(async (term) => {
            if (typeof window.ensureTermSemantics !== 'function') {
              throw new Error('Term semantic loader is unavailable for term ' + term);
            }
            await window.ensureTermSemantics(term);
          }, routeTerm);
          await page.waitForFunction((term) => performance.getEntriesByName('vocab-term' + String(term).padStart(2, '0') + '-semantics-ready').length > 0, routeTerm, { timeout: 30000 });
        } catch (error) {
          const diagnostic = await page.evaluate((term) => ({
            ensureTermSemantics: typeof window.ensureTermSemantics,
            readyFlag: window['TERM0' + term + '_SEMANTICS_READY'],
            routeMarks: performance.getEntriesByName('vocab-term' + String(term).padStart(2, '0') + '-route-ready').map(mark => mark.startTime),
            semanticsMarks: performance.getEntriesByName('vocab-term' + String(term).padStart(2, '0') + '-semantics-ready').map(mark => mark.startTime),
            activeTitle: document.getElementById('activeTermTitle')?.textContent || null,
            activeTab: document.querySelector('#termTabs .on')?.dataset.t || null,
            termLoader: [...document.scripts].find(script => script.src.includes('term-loader.js'))?.src || null,
            termPortal: [...document.scripts].find(script => script.src.includes('term-portal.js'))?.src || null
          }), routeTerm);
          throw new Error('Term ' + routeTerm + ' semantic enrichment did not finish: ' + JSON.stringify(diagnostic) + '; ' + error.message);
        }
      }
    }
    await delay(routeTerm && routeTerm !== 3 ? 900 : 1800);

    const browserMetrics = await page.evaluate((routeTerm) => {
      const samples = window.__sitePerfSamples || { lcp: [], cls: [], longTasks: [] };
      const navigation = performance.getEntriesByType('navigation')[0];
      const resources = performance.getEntriesByType('resource');
      const paints = performance.getEntriesByType('paint');
      const describeResource = entry => ({
        name: entry.name.startsWith(location.origin) ? entry.name.slice(location.origin.length) : entry.name,
        initiatorType: entry.initiatorType,
        startTime: Math.round(entry.startTime),
        duration: Math.round(entry.duration),
        transferBytes: entry.transferSize || 0,
        encodedBytes: entry.encodedBodySize || 0,
        decodedBytes: entry.decodedBodySize || 0,
      });
      const sum = entries => entries.reduce((total, entry) => total + (entry.transferSize || 0), 0);
      return {
        fcpMs: paints.find(entry => entry.name === 'first-contentful-paint')?.startTime ?? null,
        lcpMs: samples.lcp.length ? Math.max(...samples.lcp) : null,
        cls: samples.cls.reduce((total, value) => total + value, 0),
        longTasks: samples.longTasks,
        domContentLoadedMs: navigation?.domContentLoadedEventEnd ?? null,
        loadEventMs: navigation?.loadEventEnd ?? null,
        responseStartMs: navigation?.responseStart ?? null,
        resourceCount: resources.length,
        largestResources: resources.slice().sort((a, b) => (b.transferSize || 0) - (a.transferSize || 0)).slice(0, 25).map(describeResource),
        slowestResources: resources.slice().sort((a, b) => b.duration - a.duration).slice(0, 25).map(describeResource),
        transferBytes: sum(resources),
        scriptTransferBytes: sum(resources.filter(entry => entry.initiatorType === 'script' || /\\.js(?:[?#]|$)/i.test(entry.name))),
        cssTransferBytes: sum(resources.filter(entry => entry.initiatorType === 'css' || /\\.css(?:[?#]|$)/i.test(entry.name))),
        termRouteReadyMs: routeTerm ? performance.getEntriesByName('vocab-term' + String(routeTerm).padStart(2, '0') + '-route-ready')[0]?.startTime ?? null : null,
        termSemanticsReadyMs: routeTerm && routeTerm !== 3 ? performance.getEntriesByName('vocab-term' + String(routeTerm).padStart(2, '0') + '-semantics-ready').at(-1)?.startTime ?? null : null,
        term03RouteReadyMs: performance.getEntriesByName('vocab-term03-route-ready')[0]?.startTime ?? null,
        term03LastRenderMs: performance.getEntriesByName('vocab-term03-route-ready').at(-1)?.startTime ?? null,
        term03SemanticsReadyMs: performance.getEntriesByName('vocab-term03-semantics-ready').at(-1)?.startTime ?? null,
      };
    }, routeTerm);
    // PerformanceObserver may be unsupported or may not emit entries in a sample.
    // Normalize in Node so every report path (including Markdown) receives an array.
    browserMetrics.longTasks = normalizeLongTasks(browserMetrics.longTasks);
    const longTaskSummary = summarizeLongTasks(browserMetrics.longTasks);
    browserMetrics.longTaskMs = longTaskSummary.totalDurationMs;
    browserMetrics.longTaskCount = longTaskSummary.count;
    if (routeTerm && browserMetrics.termRouteReadyMs == null) {
      throw new Error('Term ' + routeTerm + ' route-ready marker was not recorded for ' + label);
    }

    return {
      label,
      scenario: routeTerm ? 'Term 0' + routeTerm + ' direct chapter route' : 'Portal',
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
    // Measure each term's direct chapter route independently. This reveals
    // whether the remaining Term 01/02 core and semantic bundles need finer
    // chapter-level loading, without changing the existing Term 03 budget gate.
    const termRoutes = {};
    for (const term of [1, 2, 3]) {
      await cdp.send('Network.clearBrowserCache');
      const routeName = term === 3 ? 'fa' : 'flashcards';
      const routeUrl = target + '#/term/' + term + '/' + routeName + '/chapter/1';
      const readySelector = term === 3 ? '.term-welcome' : '#v';
      const coldRoute = await capture(name + ' Term 0' + term + ' deep-route cold cache', true, routeUrl, readySelector, term);
      const warmRoute = await capture(name + ' Term 0' + term + ' deep-route warm refresh', false, routeUrl, readySelector, term);
      termRoutes[term] = { cold: coldRoute, warm: warmRoute };
    }
    return {
      viewport: name,
      conditions: config,
      cold,
      warm,
      term01: termRoutes[1],
      term02: termRoutes[2],
      deepCold: termRoutes[3].cold,
      deepWarm: termRoutes[3].warm,
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
      'Resource timing identifies the largest and slowest individual files; long-task entries include browser attribution where supported.',
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
    '| Viewport | Scenario | Cache | FCP ms | LCP ms | Route ready ms | Last route render ms | Semantics ready ms | CLS | Long-task ms | Requests | Transfer bytes | JS bytes | CSS bytes | Load ms |',
    '|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|',
  ];
  for (const viewport of results) {
    for (const sample of [viewport.cold, viewport.warm, viewport.term01.cold, viewport.term01.warm, viewport.term02.cold, viewport.term02.warm, viewport.deepCold, viewport.deepWarm]) {
      lines.push('| ' + viewport.viewport + ' | ' + sample.scenario + ' | ' +
        (sample.label.toLowerCase().includes('cold') ? 'cold' : 'warm') +
        ' | ' + fmt(sample.fcpMs) + ' | ' + fmt(sample.lcpMs) + ' | ' +
        fmt(sample.termRouteReadyMs ?? sample.term03RouteReadyMs) + ' | ' + fmt(sample.term03LastRenderMs) + ' | ' + fmt(sample.termSemanticsReadyMs ?? sample.term03SemanticsReadyMs) + ' | ' +
        (sample.cls == null ? 'n/a' : sample.cls.toFixed(4)) + ' | ' + fmt(sample.longTaskMs) +
        ' | ' + sample.requestCount + ' | ' + fmt(sample.transferBytes) + ' | ' +
        fmt(sample.scriptTransferBytes) + ' | ' + fmt(sample.cssTransferBytes) + ' | ' +
        fmt(sample.loadEventMs) + ' |');
    }
  }
  for (const viewport of results) {
    for (const sample of [viewport.term01.cold, viewport.term01.warm, viewport.term02.cold, viewport.term02.warm, viewport.deepCold, viewport.deepWarm]) {
      const label = viewport.viewport + ' · ' + (sample.label.toLowerCase().includes('cold') ? 'cold' : 'warm');
      lines.push('', '## Largest resources · ' + label, '', '| Resource | Type | Transfer bytes | Encoded bytes | Duration ms | Start ms |', '|---|---|---:|---:|---:|---:|');
      for (const resource of sample.largestResources) lines.push('| `' + resource.name + '` | ' + resource.initiatorType + ' | ' + fmt(resource.transferBytes) + ' | ' + fmt(resource.encodedBytes) + ' | ' + fmt(resource.duration) + ' | ' + fmt(resource.startTime) + ' |');
      lines.push('', '## Slowest resources · ' + label, '', '| Resource | Type | Duration ms | Transfer bytes |', '|---|---|---:|---:|');
      for (const resource of sample.slowestResources) lines.push('| `' + resource.name + '` | ' + resource.initiatorType + ' | ' + fmt(resource.duration) + ' | ' + fmt(resource.transferBytes) + ' |');
      lines.push('', '## Long tasks · ' + label, '', '| Start ms | Duration ms | Attribution |', '|---:|---:|---|');
      for (const task of sample.longTasks) lines.push('| ' + fmt(task.startTime) + ' | ' + fmt(task.duration) + ' | ' + (task.attribution.map(item => item.containerName || item.name || item.containerType).filter(Boolean).join(', ') || 'Not exposed by browser') + ' |');
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
