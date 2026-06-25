# Build-Measure-Learn & experiment design

Detail reference for the `run-experiment` skill. Grounded in *Running Lean* (Ch. 5, "Get Ready to Experiment") and Eric Ries's Build-Measure-Learn loop.

## The loop

```
IDEAS → BUILD → PRODUCT → MEASURE → DATA → LEARN → (next IDEAS)
```

One trip = one **experiment**: from a hypothesis, build the smallest artifact, put it in front of customers, measure their response, derive learning that validates/refutes the hypothesis and drives the next action. Stringing experiments toward a goal (e.g. product/market fit) is an **iteration**.

## Maximize three things at once

You need **speed**, **learning**, and **focus** simultaneously. Lose one:

- **Speed + focus, no learning** → "chasing your tail": lots of motion, going in circles.
- **Learning + focus, no speed** → run out of resources, or get outpaced by a competitor.
- **Speed + learning, no focus** → premature optimization (scaling servers with no customers; tuning a landing page with no working product).

## Two discipline rules

### One key metric per experiment
> "A startup can focus on only one metric. So you have to decide what that is and ignore everything else." — Noah Kagan (quoted in the book)

Pick the single number this experiment moves; ignore the rest *for this experiment*.

### Do the smallest thing possible to learn
> "The best is often the enemy of the good." — Voltaire (quoted in the book)

Once you truly understand what's riskiest, you can usually test it with something far smaller than the product. The smallest-build menu:

| Artifact | Tests | Example from the book / canon |
|---|---|---|
| **Teaser / landing page** | Problem resonance, UVP, channel | Dropbox's demo-video landing page drew tens of thousands of signups before the product existed |
| **Mock-up / sketch / HTML** | Solution fit, usability | Solution interviews use mock-ups, not built software |
| **Concierge / Wizard of Oz MVP** | Whole value prop, manually | Food on the Table manually built meal plans for one customer before automating ("Concierge MVP") |
| **Smoke / fake-door test** | Demand for a feature | A button/page for a thing that doesn't exist yet; measure clicks |
| **Pre-sale / pricing test** | Willingness to pay | State a price, ask for the order |
| **Physical small-scale** | A concept cheaply | Food trailers test a restaurant concept before bricks and mortar |

The principle: proxies — mock-ups, prototypes, sketches, videos, landing pages — fit the bill before you write code. Challenge yourself to find the *smallest* test.

## Falsifiable hypotheses

> A falsifiable hypothesis is a statement that can be clearly proven wrong.

Most business-model statements aren't yet testable. Convert each assumption into the form:

**`[specific repeatable action] will [expected measurable outcome]`**

Weak vs. strong (channel example):
- Weak: "AdWords is a viable channel for us." (not testable)
- Strong: "Spending $100 on AdWords will produce at least 50 landing-page visits and 10 email signups." (clearly falsifiable)

More examples (the book frames problem-interview learning as falsifiable hypotheses too):
- "Problem interviews will reveal difficulty sharing media as a must-have problem."
- "Channels will drive 100 signups per week."
- "The MVP will convert 10% of activated trials to paid."

Pre-commit the metric **and the threshold** before running, so an ambiguous result can't be rationalized into a "yes." When you engage customers you usually learn more than you set out to test — capture that extra knowledge loosely as **insights** and reflect it onto the canvas at the end of the iteration, separate from the pass/fail on the hypothesis.

## Team note (from the book)

Experiments are run by a small **Problem/Solution team** (ideal size 2–3), cross-functional across development, design, and marketing. "Outside-the-building" activities (interviewing, usability tests) and "inside-the-building" activities (building, deploying) overlap; *learning about customers is the one thing you never outsource.*
