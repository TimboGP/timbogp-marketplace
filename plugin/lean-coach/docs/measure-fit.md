# Measure Product/Market Fit — `measure-fit`

> Define a metric for "have I built something people want?", then steer toward it honestly.

## What it does
Sets up the value metrics and reads them without flattery. It maps the customer lifecycle to **AARRR** (Acquisition, Activation, Retention, Revenue, Referral), favors **weekly cohorts** over funnel snapshots, validates the lifecycle micro-scale (~80% of hand-qualified early adopters through the full cycle) before scaling, and applies the fit benchmarks — the **Sean Ellis test** (≥40% "very disappointed") and the **40% month-over-month retention** proxy. It treats **retention** as the macro that matters (revenue is the first form of validation; retention is the ultimate). As you approach fit, it helps pick the **engine of growth** (sticky / viral / paid; LTV > 3×CAC). Writes to `.lean/metrics/`.

## When it triggers
- "how do I measure product/market fit?" / "am I at product/market fit?"
- "set up my metrics / conversion funnel / cohorts" / "track retention"
- "run the Sean Ellis test" / "which engine of growth?" / "what should my key metric be?"

## How to use it
- **Just ask:** "Am I at product/market fit? Here are my numbers."
- **Typical flow:** load stage + canvas Key Metrics → define value metrics & the single key metric → set up funnel/cohorts → validate the lifecycle → judge fit against the benchmarks with the actual numbers → pick an engine of growth → write `.lean/metrics/`.

## What you get
`.lean/metrics/<date>-<label>.md` — defined value metrics, a funnel/cohort read, an honest fit verdict (Sean Ellis %, retention %), and a recommended engine of growth + next experiment. Stage in PROGRESS.md advances to Scale when the evidence supports it.

## Reference files
- `references/product-market-fit.md` — AARRR, funnels vs. cohorts, retention-as-macro, the Sean Ellis test, the 40% retention proxy, the weekly fit routine, and the three engines of growth.

## Works well with
- **run-experiment** — the experiments that move the chosen metric.
- **customer-interview** (mvp) — the qualitative half of validation.
- **investor-pitch** — consumes these numbers; raising is best *after* fit.
