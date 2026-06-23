# UX metrics glossary

Concise, accurate reference for the metrics this skill works with. Thresholds follow Google's published guidance (web.dev / web-vitals) and the Sauro–Lewis SUS research.

## Core Web Vitals (field, 75th percentile)

| Metric | Measures | Good | Needs improvement | Poor |
|--------|----------|------|-------------------|------|
| **LCP** — Largest Contentful Paint | Loading: render time of the largest visible content element | ≤ 2.5 s | 2.5–4.0 s | > 4.0 s |
| **INP** — Interaction to Next Paint | Responsiveness: overall latency of user interactions across the visit | ≤ 200 ms | 200–500 ms | > 500 ms |
| **CLS** — Cumulative Layout Shift | Visual stability: sum of unexpected layout shift scores (unitless) | ≤ 0.1 | 0.1–0.25 | > 0.25 |

- Aggregate Core Web Vitals at the **75th percentile** of page loads, per metric, split by mobile and desktop.
- INP became a Core Web Vital in March 2024, replacing FID (First Input Delay).

## Supporting / lab metrics

| Metric | Measures | Good | Notes |
|--------|----------|------|-------|
| **FCP** — First Contentful Paint | Time to first text/image painted | ≤ 1.8 s (≤ 3.0 s needs-improvement) | Field + lab |
| **TTFB** — Time to First Byte | Server responsiveness; time to first byte of the document | ≤ 0.8 s (≤ 1.8 s needs-improvement) | Diagnostic; upstream of LCP |
| **TBT** — Total Blocking Time | Sum of main-thread blocking between FCP and TTI | ≤ 200 ms (lab) | **Lab proxy for INP**; lab cannot measure INP |
| **Speed Index** | How quickly content visually populates | ≤ 3.4 s (lab) | Lighthouse perf input |

## Lighthouse

A lab audit tool with five category scores (0–100):
- **Performance** — weighted blend of FCP, LCP, TBT, CLS, and Speed Index, on a single synthetic device/network.
- **Accessibility** — automatable checks (axe-core engine); covers only ~30–40% of WCAG. A perfect score is **not** a passed audit.
- **Best Practices**, **SEO**, **PWA** — heuristic checks.
- Use Lighthouse for debugging and regression alarms, not as the user-experienced number — that comes from field/RUM data.

## HEART framework (Google)

Choose UX dimensions, then a Goal → Signal → Metric chain for each:
- **Happiness** — attitudinal satisfaction (e.g. SUS, CSAT, NPS).
- **Engagement** — depth/frequency of interaction (e.g. sessions/user, actions/session).
- **Adoption** — new users taking up a feature/product (e.g. new accounts using feature X).
- **Retention** — users returning over time (e.g. % active at day 7/30).
- **Task success** — efficiency/effectiveness/error (task completion rate, time on task, error rate).

## Common UX metrics

| Metric | One-line definition | How to measure |
|--------|---------------------|----------------|
| **Task success rate** | % of attempts that reach the goal | success events ÷ attempt events |
| **Time on task** | Duration to complete a task | timestamp(goal event) − timestamp(start event); report median |
| **Error rate** | Frequency of user/system errors per attempt | error events ÷ attempts (or errors ÷ task) |
| **Conversion / funnel** | Step-to-step progression and drop-off through a flow | ordered event funnel; per-step retention |
| **Retention** | Users returning after first use | cohort: % active at day N (e.g. D1/D7/D30) |
| **SUS** — System Usability Scale | 10-item validated perceived-usability score, 0–100 | questionnaire; see `scripts/sus-score.mjs`; ~68 = average |
| **NPS** — Net Promoter Score | Loyalty: "how likely to recommend?" 0–10 | % promoters (9–10) − % detractors (0–6); range −100..+100 |
| **CES** — Customer Effort Score | Perceived effort to complete a task | survey (e.g. 1–7 agreement that it was easy); higher = less effort |
| **CSAT** | Satisfaction with a specific interaction | % of respondents rating satisfied/very satisfied |

> Prefer rates, percentiles, and per-user measures over raw totals (pageviews, total signups), which are vanity metrics that move without reflecting real value.
