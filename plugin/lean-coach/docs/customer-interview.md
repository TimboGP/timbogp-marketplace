# Customer Interview — `customer-interview`

> Role-play a realistic customer so you can practice the interview, then get coached on it.

## What it does
The core "get out of the building" practice. It role-plays a believable target customer across three flavors — **Problem**, **Solution**, and **MVP** interviews — holding the book's script for each, staying in character through the conversation (realistic friction, no rescue, politeness bias and false enthusiasm included), then breaking character to debrief on your **interview technique** (leading vs. open questions, listen/talk ratio, must-have signal, existing alternatives, customer words) and what you **learned**. It can also just prep scripts and questions (no role-play). Writes artifacts to `.lean/interviews/`.

## When it triggers
- "play a customer so I can practice" / "interview me as a target customer"
- "let's do a problem interview" / "role-play a solution interview" / "run an MVP interview"
- "help me prep customer interviews" / "I need to talk to customers, coach me"

## How to use it
- **Just ask:** "Play a busy parent so I can practice a problem interview."
- **Via command:** `/lean-interview [problem|solution|mvp]`.
- **Break character** any time with a `[square-bracket]` aside; say `debrief` to end the scene and get the assessment.
- **Typical flow:** Phase 0 set the scene + build the persona from your canvas → Phases 1–2 in character → Phase 3 debrief against the rubric → write the result to `.lean/interviews/<flavor>/`.

## What you get
A realistic rehearsal plus a written debrief at `.lean/interviews/<flavor>/<date>-<label>.md`: the persona, key quotes, learning against your hypotheses, and a technique critique with the 1–2 highest-leverage fixes. Exit-criteria tracking per flavor.

## Reference files
- `references/interview-scripts.md` — the Problem, Solution, and MVP scripts (deconstructed, with timings), the universal do's & don'ts, and what to do with results.
- `assets/interview-debrief-template.md` — the artifact format.

## Works well with
- **prioritize-risks** — decides what these interviews should test.
- **lean-canvas** — interview learning is folded back into the canvas.
- **measure-fit** / **run-experiment** — the quantitative validation that follows.
