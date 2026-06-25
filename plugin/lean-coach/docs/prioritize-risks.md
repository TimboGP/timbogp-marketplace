# Prioritize Risks — `prioritize-risks`

> Turn a canvas full of assumptions into a ranked list and a clear "test this first."

## What it does
Extracts the load-bearing assumptions from the Lean Canvas, classifies each as **product / customer / market** risk, and ranks them by risk (loss-if-wrong × how unproven) so you tackle the scariest *untested* one first. When comparing canvas variants, it ranks the models using Maurya's weighting order (customer pain → ease of reach → price/margin → market size → technical feasibility). Writes `.lean/risks.md` and mirrors the top risks into PROGRESS.md.

## When it triggers
- "what's the riskiest part of my plan?" / "where should I start?"
- "prioritize my assumptions" / "how do I de-risk this?"
- "which of these business models should I pursue?" / "rank my lean canvases"

## How to use it
- **Just ask:** "What's the riskiest assumption in my plan, and how do I test it?"
- **Typical flow:** load the canvas → list assumptions as falsifiable claims → classify product/customer/market → rank → name the cheapest experiment for the top one → write `.lean/risks.md` → hand off to the testing skill.

## What you get
`.lean/risks.md` — assumptions classified and ranked riskiest-first, each with a one-line rationale and a status (`open` / `testing` / `retired`), and a clear "test this first" with the smallest experiment. A recommended starting model when variants were compared.

## Reference files
- `references/risk-scoring.md` — risk vs. uncertainty, the three risk types, within-model ranking, the between-model weighting order, and calibrating with advisors (the advisor paradox).
- `assets/risks-template.md` — the `.lean/risks.md` format.

## Works well with
- **lean-canvas** — produces the assumptions ranked here.
- **customer-interview** / **run-experiment** — test the top-ranked risk.
- **lean-roles** — Devil's advocate to pressure-test the ranking; Mentor for a second opinion.
