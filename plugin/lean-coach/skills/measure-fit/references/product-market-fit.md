# Measuring product/market fit

Detail reference for the `measure-fit` skill. Grounded in *Running Lean* (Ch. 10 "Get Ready to Measure", Ch. 12 "Validate Customer Lifecycle", Ch. 14 "Measure Product/Market Fit").

## What product/market fit is

> "Product/Market fit means being in a good market with a product that can satisfy that market." — Marc Andreessen

You can feel it: customers buy as fast as you can serve them, usage and word of mouth grow, money piles up. Before it: usage is "blah," deals don't close, reviews are lukewarm. The job of this skill is to make that feeling **measurable** so you can steer toward it.

## The customer lifecycle — AARRR ("pirate metrics," Dave McClure)

| Step | Goal | Definition |
|---|---|---|
| **Acquisition** | Interest | User shows interest (e.g. views the pricing page) |
| **Activation** | First happy experience | User signs up and completes the key activity |
| **Retention** | Comes back | User returns and keeps using the product |
| **Revenue** | Gets paid | User converts to a paying customer |
| **Referral** | Tells others | User refers others (can be deferred early) |

**Validate the lifecycle micro-scale first** (Ch. 12): with hand-qualified early adopters, aim to get ~**80% through the full cycle** before scaling. Because you've manually qualified them, this bar is *higher* than post-launch norms. Drill into subfunnels to find the leakiest bucket (often the landing or pricing page), fix it, and reach out to users who dropped — catch and report unexpected errors so you can still learn from users who'd otherwise just leave. Use gentle email reminders / lifecycle marketing to bring trial users back. Tech support is customer development *and* marketing — talk to users directly (and to "lost sales" — you learn as much from them).

## Funnels vs. cohorts

A single **funnel snapshot** (e.g. "Conversion funnel for June") hides *what changed* and is distorted by traffic spikes. A **weekly cohort report** groups users by join week and tracks each group's lifecycle over time. Cohorts:
- handle traffic fluctuations correctly (events tie back to the users who generated them),
- visibly highlight whether a change in a given week moved the metric,
- can segment by any property (plan type, OS, source).

Build the conversion dashboard functionally (what events, grouped how); the specific tool (Google Analytics, Mixpanel, etc.) is secondary. Early on, a manual spreadsheet is fine.

## The "right" macro: retention

> "While revenue is the first form of validation, retention is the ultimate form of validation."

Achieving fit ≈ delivering on your UVP, which reduces to **building something people want**. The most indicative measure depends on the product:
- **Recurring-use products** (SaaS, social, subscriptions): success shows up as **retention** — repeat usage. This is the "right macro."
- **One-time-value products** (wedding photos, a book, a one-off service): the *experience* (activation) carries more weight, and revenue follows good activation.

Revenue alone can be a false positive (people pay for things they don't use). Retention can't be faked the same way — you keep using only what you want.

## The benchmarks

### Sean Ellis test
Survey a sample of users:

> "How would you feel if you could no longer use [product]?"
> 1. Very disappointed   2. Somewhat disappointed   3. Not disappointed (not that useful)   4. N/A — no longer use it

**≥ 40% "very disappointed"** indicates early traction and a good shot at sustainable, scalable growth ("must-have"). Significantly below 40% tends to struggle. Tune the wording for your market (e.g. B2B). Best run when you're *close* to fit and have a large enough, segmented sample (surveys verify; they don't teach — so this is a late-stage confirmation, not a steering tool).

### 40% retention proxy
> "You have early traction when you are retaining 40% of your activated users, month after month."

Steer with this retention number day-to-day; confirm with the Sean Ellis survey as you approach 40%.

### Early-traction exit criteria
You're at early traction when you can **retain ~40% of users** and **pass the Sean Ellis test**.

## The weekly fit routine

1. Review the conversion dashboard weekly (set a fixed time); find the leakiest bucket.
2. Prioritize the goals/features backlog.
3. Formulate **bold** hypotheses (avoid micro-optimization pre-fit), build the smallest test.
4. Add/kill features based on impact across the feature lifecycle (don't be a feature pusher: validate that a feature's problem is worth solving → mock-up → demo → code → partial rollout/validate qualitatively → full rollout/verify quantitatively against cohorts).
5. Monitor value metrics (retention cohorts) — you want steady upward movement.
6. As retention approaches 40%, run the Sean Ellis test.

## Engines of growth (Eric Ries) — pick one as you approach fit

| Engine | Driver | Keep | Example |
|---|---|---|---|
| **Sticky** | High retention / low churn | Acquisition rate > churn rate | SaaS, telecom |
| **Viral** | High referral | Viral coefficient > 1 (each user brings ≥1) | social networks |
| **Paid** | High margins | LTV > CAC; rule of thumb **LTV > 3 × CAC** (David Skok) | ad/sales-driven |

Most products show some of all three; focus on the **single** engine with the most potential given your channels. Start by validating value metrics, understand how customers behave, then pick one engine, declare the key metric + improvement target, and align experiments to it. **Don't scale before demonstrating early traction** — that's waste. (Scaling itself is Stage 3, beyond fit.)
