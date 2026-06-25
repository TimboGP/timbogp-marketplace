# The Running Lean methodology

Shared reference for the `lean-coach` plugin. This is the canonical map of the process the plugin guides. Skills load it when they need to know where an activity sits in the larger arc, what a stage's exit looks like, or what the canonical definitions are.

**Source & credit.** The methodology is **Ash Maurya's _Running Lean_** (O'Reilly, 2nd ed.), which builds on Eric Ries's _The Lean Startup_, Steve Blank's Customer Development, and Alex Osterwalder's Business Model Canvas. The Lean Canvas is Maurya's adaptation of the Business Model Canvas. This plugin is an original coach that applies the framework; it is not a copy of the book. See [leanfoundry.com](https://www.leanfoundry.com/books/running-lean) for the source. When the coach states a benchmark or rule as coming from the method, it is paraphrasing Maurya — say so rather than presenting it as the plugin's own invention.

## The one-sentence shape

> A startup is a series of untested assumptions. Your job is to find a plan that works **before you run out of resources** — by documenting your riskiest assumptions and systematically testing them with real people, fastest-and-riskiest first.

## The three meta-principles

Everything reduces to three steps:

1. **Document your Plan A.** Get the business model out of your head and onto one page — the **Lean Canvas** — so it can be shared and tested. Most Plan A's are wrong; the point is to make the assumptions explicit, not to be right.
2. **Identify the riskiest parts of your plan.** Building a successful product is risk mitigation. Rank assumptions by risk and tackle the riskiest first. For most products the riskiest part is *not* the solution — it's whether anyone has the problem.
3. **Systematically test your plan.** Run a series of experiments around the Build-Measure-Learn loop to validate or refute each risky assumption, iterating from Plan A toward a plan that works.

> "Your product is NOT _the product_." The solution box is one-ninth of the canvas. The **business model** is the product you are building. Customers don't care about your solution; they care about their problems.

## The Lean Canvas (9 blocks)

One-page business model. Filled and re-filled as you learn. Detail on each block lives in `skills/lean-canvas/references/canvas-blocks.md`; the names and one-liners:

| Block | Captures |
|---|---|
| **Problem** | Top 1–3 problems; plus **Existing Alternatives** (how customers solve them today) |
| **Customer Segments** | Target customers; plus the **Early Adopters** within them |
| **Unique Value Proposition** | A single, clear, compelling message stating why you're different and worth attention; plus a **High-Level Concept** (X-for-Y analogy) |
| **Solution** | The smallest set of features that addresses the top problems |
| **Channels** | Path(s) to customers |
| **Revenue Streams** | How you make money (model, price, lifetime value) |
| **Cost Structure** | Costs to operate (customer acquisition, hosting, people, …) |
| **Key Metrics** | The few numbers that tell you how the business is doing |
| **Unfair Advantage** | Something that can't easily be copied or bought |

Canvas geometry worth remembering: the left half (Problem, Solution, Key Metrics, Cost, part of Revenue) is **product**; the right half (Customer Segments, Channels, UVP, Revenue) is **market**. Risk concentrates on the market/right side far more often than founders expect.

## The three stages of a startup

```
Problem/Solution Fit  →  Product/Market Fit  →  Scale
   (a problem               (built something        (accelerate
    worth solving?)          people want?)            growth)
```

| Stage | Key question | Focus | Experiments |
|---|---|---|---|
| **1. Problem/Solution Fit** | Do I have a problem worth solving? | Validated learning | Pivots |
| **2. Product/Market Fit** | Have I built something people want? | Validated learning | Pivots |
| **3. Scale** | How do I accelerate growth? | Growth | Optimizations |

**A problem worth solving** must clear three bars: customers *want* it (must-have), they'll *pay* for it / someone will (viable), and you *can build* it (feasible).

**Pivot before product/market fit, optimize after.** Before PM fit, the focus is learning and bold *pivots* (finding a plan that works); after, it's growth and *optimizations* (accelerating a plan that works). You learn most when the outcome is genuinely uncertain (~50/50), so before PM fit, pick **bold** experiments over incremental tweaks. The ideal time to raise a big round is *after* PM fit, when your goals and an investor's (growth) align.

## The iteration meta-pattern (4 stages within Problem/Solution → Product/Market fit)

```
Understand Problem → Define Solution → Validate Qualitatively → Verify Quantitatively
└──────── Problem/Solution Fit ───────┘└──────────── Product/Market Fit ───────────┘
```

| Stage | Core activity | Primary plugin skill |
|---|---|---|
| **Understand Problem** | Problem interviews — is this a must-have problem, for whom, vs. what alternatives? | `customer-interview` (problem) |
| **Define Solution** | Solution interviews — demo the smallest solution, test price, get to Release 1.0 (MVP) | `customer-interview` (solution) |
| **Validate Qualitatively** | MVP interviews + validate the customer lifecycle, micro-scale | `customer-interview` (mvp), `measure-fit` |
| **Verify Quantitatively** | Don't be a feature pusher; measure product/market fit, macro-scale | `run-experiment`, `measure-fit` |

## The Build-Measure-Learn loop

```
        IDEAS
       ↗      ↘
   LEARN       BUILD
     ↑           ↓
    DATA ← MEASURE ← PRODUCT
```

A single trip around the loop is an **experiment**: from a hypothesis (idea) you build the smallest artifact (mock-up, landing page, concierge service, code), put it in front of customers, measure their response, and derive learning that validates or refutes the hypothesis and drives the next action. An **iteration** strings experiments together toward a goal like PM fit.

Three things to maximize at once — **speed, learning, and focus**:
- Speed + focus, no learning → "chasing your tail."
- Learning + focus, no speed → run out of resources / get outpaced.
- Speed + learning, no focus → premature optimization.

Two rules that keep experiments honest:
- **Focus on a single key metric** at a time.
- **Do the smallest thing possible to learn.** You rarely need code to test a hypothesis — mock-ups, landing pages, a concierge ("Wizard of Oz") MVP often suffice. A **falsifiable hypothesis** has the form **`[specific repeatable action] will [expected measurable outcome]`** — a statement that can be clearly proven wrong.

## How the plugin's skills map to the methodology

| Methodology step | Skill(s) |
|---|---|
| Document Plan A | `lean-canvas` |
| Identify riskiest parts | `prioritize-risks` |
| Understand the problem | `customer-interview` (problem) |
| Define the solution / get to MVP | `customer-interview` (solution) |
| Validate qualitatively | `customer-interview` (mvp), `measure-fit` |
| Verify quantitatively | `run-experiment`, `measure-fit` |
| Navigate / decide what's next | `lean-coach` |
| Rehearse the conversations | `customer-interview`, `investor-pitch`, `lean-roles` |

The coach's job across all of it: keep the founder honest about which stage they're in, insist the riskiest assumption gets tested next, and prefer the smallest experiment that produces real learning.
