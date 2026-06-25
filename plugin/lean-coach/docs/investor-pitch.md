# Investor Pitch — `investor-pitch`

> Rehearse the fundraising conversation against a skeptical investor, then get coached on it.

## What it does
Role-plays a skeptical-but-fair angel or seed VC who has seen hundreds of pitches and cares about **traction, market, why-now, team, and growth** — not your feature list. It lets you pitch, then grills you on the weak points (drawn from your real `.lean/risks.md` and `.lean/metrics/`), staying in character; then it breaks character to debrief on whether you led with traction, knew your numbers (CAC, LTV, retention, growth), defended the riskiest assumption, and made a specific ask. It can also prep the pitch or critique a deck (no role-play). Writes to `.lean/pitch/`. It will also tell you honestly when the real next step is more validation rather than a raise (the ideal time to raise is *after* product/market fit).

## When it triggers
- "play an investor" / "be a skeptical VC and grill me"
- "let's practice my pitch" / "pitch practice"
- "what would an investor ask?" / "is my traction story convincing?"

## How to use it
- **Just ask:** "Be a seed investor and grill me on my pitch."
- **Via command:** `/lean-role investor` (routes here).
- **Break character** with `[square brackets]`; say `debrief` to end and get the assessment.
- **Typical flow:** Phase 0 set the scene (investor type, format) → Phases 1–2 pitch + Q&A in character → Phase 3 debrief against the rubric → write to `.lean/pitch/`.

## What you get
A realistic pitch rehearsal plus a written debrief at `.lean/pitch/<date>-<label>.md`: the toughest questions, how you answered, and the highest-leverage fixes. Weak assumptions surfaced get mirrored into `.lean/risks.md`.

## Reference files
- `references/pitch-traction.md` — the traction-first pitch structure, when to raise, the numbers investors probe, and common attacks with strong vs. weak answers.

## Works well with
- **measure-fit** — produces the traction numbers a pitch needs (and the honest gate on whether to raise).
- **prioritize-risks** — the riskiest assumption the investor will hunt for.
- **lean-roles** — Devil's advocate for a non-fundraising stress-test.
