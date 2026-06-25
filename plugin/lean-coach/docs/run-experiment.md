# Run an Experiment — `run-experiment`

> One trip around the Build-Measure-Learn loop: a falsifiable hypothesis and the smallest test.

## What it does
Turns a risky assumption into a **falsifiable hypothesis** — `[specific repeatable action] will [expected measurable outcome + threshold]` — picks a **single key metric** and a pre-committed success line, then designs the **smallest build** that produces real learning (landing page, mock-up, concierge/Wizard-of-Oz MVP, smoke test, pricing test). It records the measurement and the resulting learning/decision (proceed / pivot / iterate / kill) to `.lean/experiments/`. Bias toward bold experiments before product/market fit, micro-optimization only after.

## When it triggers
- "design an experiment to test X" / "what's the smallest test for this?"
- "how do I validate this assumption?" / "turn this into a falsifiable hypothesis"
- "set up a landing-page / concierge / smoke test" / "log my experiment results"

## How to use it
- **Just ask:** "Design the smallest experiment to test whether parents will pay $49/yr."
- **Typical flow:** load `risks.md` → write the falsifiable hypothesis → pick the key metric + threshold → choose the smallest build → run/record → write `.lean/experiments/<id>.md` → name the next experiment.

## What you get
`.lean/experiments/<id>.md` — a falsifiable hypothesis, one key metric + threshold, the build, the measurement, and the learning/decision, plus the next action. Retired/moved risks are mirrored into `.lean/risks.md`.

## Reference files
- `references/build-measure-learn.md` — the loop; speed/learning/focus; the smallest-build menu; the falsifiable-hypothesis formula with examples; the Problem/Solution team note.
- `assets/experiment-template.md` — the experiment file format.

## Works well with
- **prioritize-risks** — supplies the assumption to test.
- **customer-interview** — the qualitative experiment type (its own skill).
- **measure-fit** — when experiments accumulate into product/market-fit signal.
