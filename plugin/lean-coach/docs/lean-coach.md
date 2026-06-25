# Lean Coach — `lean-coach`

> The navigator: where am I, what's riskiest, what's the smallest next step.

## What it does
The default guide role and the plugin's front door. It loads the `.lean/` workspace (or onboards a new venture), determines the current **stage** from evidence rather than optimism, identifies the single riskiest **untested** assumption, and proposes the smallest next experiment to attack it — then routes to the right skill or role. It keeps `.lean/PROGRESS.md` current and pushes back on vanity progress (building before validating, signups that don't retain).

## When it triggers
- "coach me through my startup" / "help me develop my business idea"
- "where am I in the lean process?" / "what should I work on next?"
- "is this the right thing to be testing?"
- "I have an idea, where do I start?"

## How to use it
- **Just ask:** "I want to build X — coach me through it." / "What's my next step?"
- **Via command:** `/lean-coach [topic]`.
- **Typical flow:** load the venture → answer *where am I / what's riskiest / what's smallest next* → propose one move → route to the matching skill → update PROGRESS.md.

## What you get
A clear read on your stage (with the evidence for it), the riskiest untested assumption, and one concrete next move — plus a maintained `.lean/PROGRESS.md`. For a new venture, an onboarded workspace and a first move (almost always: get Plan A onto a canvas).

## Reference files
- `../reference/methodology.md` — the Running Lean spine and stage definitions.
- `../reference/roles.md` — the role catalog.
- `../reference/workspace.md` — the `.lean/` layout.
- `assets/progress-template.md` — the `.lean/PROGRESS.md` template.

## Works well with
Routes to **lean-canvas**, **prioritize-risks**, **customer-interview**, **run-experiment**, **measure-fit**, **investor-pitch**, and **lean-roles** depending on what's riskiest next.
