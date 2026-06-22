// web-vitals-snippet.js — Core Web Vitals instrumentation (copy-paste template)
//
// This is a TEMPLATE to drop into a web app's client entry point — it is NOT a
// CI script and is not meant to run under Node.
//
// Setup:
//   1. Install the library:   npm i web-vitals
//   2. Import this file (or paste its contents) at your app ENTRY point so it
//      runs once on every page load, e.g.:
//        - React/Vite/Next: src/main.tsx, src/index.tsx, or app/layout client boundary
//        - Vue:             src/main.ts
//        - Plain HTML:      a module <script> loaded on every page
//   3. Point ANALYTICS_ENDPOINT at your collector (or wire sendToAnalytics into
//      your existing analytics library instead).
//
// Field data is the source of truth for Core Web Vitals; aggregate at the
// 75th percentile per metric.

import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

// Where to POST metric beacons. Replace with your own endpoint.
const ANALYTICS_ENDPOINT = '/analytics/web-vitals';

// "Good" thresholds for quick local rating (lower is better, except none here).
//   LCP  <= 2500 ms   (Largest Contentful Paint)
//   INP  <=  200 ms   (Interaction to Next Paint)
//   CLS  <=  0.1      (Cumulative Layout Shift, unitless)
//   FCP  <= 1800 ms   (First Contentful Paint)
//   TTFB <=  800 ms   (Time to First Byte)
const GOOD_THRESHOLDS = {
  LCP: 2500,
  INP: 200,
  CLS: 0.1,
  FCP: 1800,
  TTFB: 800,
};

function rate(name, value) {
  // web-vitals already provides metric.rating; this is a simple local fallback.
  const good = GOOD_THRESHOLDS[name];
  if (good == null) return 'unknown';
  return value <= good ? 'good' : 'needs-improvement-or-poor';
}

function sendToAnalytics(metric) {
  const body = JSON.stringify({
    name: metric.name, // LCP | INP | CLS | FCP | TTFB
    value: metric.value, // ms (or unitless for CLS)
    rating: metric.rating || rate(metric.name, metric.value), // good | needs-improvement | poor
    delta: metric.delta,
    id: metric.id, // unique per page load, for de-duping
    navigationType: metric.navigationType,
    page: location.pathname,
  });

  // Log for local visibility.
  // eslint-disable-next-line no-console
  console.log(`[web-vitals] ${metric.name}: ${metric.value} (${metric.rating || rate(metric.name, metric.value)})`);

  // Prefer sendBeacon (survives page unload); fall back to fetch with keepalive.
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    const ok = navigator.sendBeacon(ANALYTICS_ENDPOINT, blob);
    if (ok) return;
  }
  fetch(ANALYTICS_ENDPOINT, {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
  }).catch(() => {
    /* swallow — never let metrics reporting break the page */
  });
}

// Register all five collectors. Each fires when its metric is finalized.
onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);
