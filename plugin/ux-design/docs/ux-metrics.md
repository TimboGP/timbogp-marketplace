# UX Metrics — `ux-metrics`

> The quantitative measurement layer for UX — choose meaningful metrics, instrument them, and read the results honestly.

## What it does
This skill is the quantitative layer for UX, covering performance (Core Web Vitals), automated quality scores (Lighthouse/axe), analytics event taxonomy, and self-reported usability (SUS). It helps you pick the right metrics for a goal, instrument them against whatever libraries your project already uses, and interpret the numbers without being misled by lab proxies or vanity metrics. It detects the project stack first and adapts to any analytics or perf library already present.

## When it triggers
Skills activate automatically based on your request. This one triggers on phrases like:
- "measure UX"
- "Core Web Vitals" / "set up web vitals"
- "track LCP/INP/CLS"
- "Lighthouse score"
- "design analytics events"
- "SUS score" / "usability metrics"
- "how do I quantify UX"

## How to use it
- **Just ask:** "Set up Core Web Vitals tracking for this site," "Design an analytics event taxonomy for our checkout flow," or "Compute a SUS score from these 10 responses."
- **Via command:** No dedicated command — trigger by asking. (`/ux-bootstrap` includes ux-metrics in the baseline.)
- **Typical flow:**
  1. Detect the project's stack and any existing analytics/perf libraries.
  2. Pick metrics tied to goals using the HEART framework (Happiness, Engagement, Adoption, Retention, Task success) with a Goal → Signal → Metric chain; avoid vanity metrics.
  3. Instrument Core Web Vitals with the `web-vitals-snippet.js` template; report field (RUM, 75th percentile) and lab data separately.
  4. Design a consistent Object-Action event schema (`<object>_<action>`, past tense, snake_case) with structured properties and no PII.
  5. Use Lighthouse/axe scores as trend indicators and regression alarms, not certificates.
  6. Run SUS for self-reported usability and interpret against the ~68 benchmark.

## What you get
Instrumentation plus interpreted scores: working Core Web Vitals beacons, a consistent analytics event taxonomy, and computed/graded usability and performance numbers — each tied to a goal and read in context (field vs lab, percentiles vs raw counts).

## Bundled tools
- `node plugin/ux-design/skills/ux-metrics/scripts/sus-score.mjs 4 2 5 1 5 1 4 2 5 1` — computes a System Usability Scale score (0–100, not a percentage) with grade/adjective interpretation (≥80.3 = A, ~68 = C average, <51 = F).
- `plugin/ux-design/skills/ux-metrics/scripts/web-vitals-snippet.js` — a copy-paste browser snippet (not run from the CLI) that reports Core Web Vitals to console and an endpoint via the `web-vitals` v4 library. Requires `npm i web-vitals`.

## Reference files
- `references/metrics-glossary.md` — thresholds and one-line definitions for Core Web Vitals, lab metrics, Lighthouse, the HEART framework, and common UX metrics.

### Core Web Vitals thresholds (as written)
| Metric | Good | Needs improvement | Poor |
|--------|------|-------------------|------|
| LCP (Largest Contentful Paint) | ≤ 2.5s | 2.5s–4.0s | > 4.0s |
| INP (Interaction to Next Paint) | ≤ 200ms | 200ms–500ms | > 500ms |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | 0.1–0.25 | > 0.25 |

INP replaced FID as a Core Web Vital in March 2024 — use INP. Aggregate field data at the 75th percentile; lab runs cannot measure INP and report TBT as a proxy.

## Works well with
- Complements the qualitative `accessibility-audit` and ux-audit work — note that a Lighthouse Accessibility score is axe-based and not a passed accessibility audit; run `accessibility-audit` for real conformance.
- Included in the `/ux-bootstrap` baseline so projects start with measurement in place.
