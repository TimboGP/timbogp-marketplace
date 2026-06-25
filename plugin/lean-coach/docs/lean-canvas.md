# Lean Canvas — `lean-canvas`

> Capture the business model on one page so it can be shared and tested.

## What it does
Builds or refines the nine-block **Lean Canvas** (Ash Maurya's adaptation of the Business Model Canvas): Customer Segments, Problem, Unique Value Proposition, Solution, Channels, Revenue Streams, Cost Structure, Key Metrics, Unfair Advantage. It fills the blocks in the recommended order (segment first, unfair advantage last), interrogates the assumption behind each block rather than just filling it, keeps the solution box small ("the model is the product"), and writes a versioned `.lean/canvas.md`. It can brainstorm model variants as separate canvases.

## When it triggers
- "help me make a lean canvas" / "document my business model"
- "fill in the canvas for my idea" / "update my lean canvas"
- "what's my UVP / unfair advantage / revenue model?"

## How to use it
- **Just ask:** "Build a lean canvas for a meal-planning app for busy parents."
- **Via command:** `/lean-canvas [idea|segment|path]`.
- **Typical flow:** load any existing canvas → fill blocks in order, one assumption at a time → write `.lean/canvas.md` with a dated revision → flag the riskiest-looking assumption and offer `prioritize-risks`.

## What you get
`.lean/canvas.md` — all nine blocks filled (or honestly blank), terse, with a dated `## Revisions` note. Multiple variants saved as separate canvases when segments/models genuinely differ.

## Reference files
- `references/canvas-blocks.md` — per-block guidance: what each block captures, what "good" looks like, and the trap to avoid; plus the filling order.
- `assets/canvas-template.md` — the canvas file format.

## Works well with
- **prioritize-risks** — ranks the assumptions this skill surfaces.
- **lean-roles** — Business partner to co-create variants; Devil's advocate to attack the canvas.
- **customer-interview** — interview learning gets folded back into the canvas.
