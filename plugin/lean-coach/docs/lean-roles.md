# Lean Roles — `lean-roles`

> The front door for switching the agent into a persona — business partner, devil's advocate, or mentor.

## What it does
The plugin's defining move: "one coach, many hats." This skill puts the agent into a specific **role** and runs the shared role-play protocol (announce entering character → stay in role → debrief on `debrief`; break with `[square brackets]`). It fronts three personas directly — **Business partner** (collaborative co-founder), **Devil's advocate** (relentless skeptic / pre-mortem), and **Mentor** (direct, prioritizing advisor) — and routes the other two to their dedicated skills (**Customer** → `customer-interview`, **Investor** → `investor-pitch`). If you only ask "what roles can you play?", it lists the cast.

## When it triggers
- "be my devil's advocate" / "poke holes in my canvas" / "try to kill my idea"
- "switch to business-partner mode" / "let's brainstorm this together"
- "review my model as a mentor" / "give me brutal feedback on my plan"
- "what roles can you play?"

## How to use it
- **Just ask:** "Be my devil's advocate and attack my riskiest assumption."
- **Via command:** `/lean-role [business-partner|devils-advocate|mentor|customer|investor]`.
- **Typical flow:** identify the role → load `.lean/` so the persona engages this venture → run the role-play protocol → capture anything load-bearing into `risks.md` / `PROGRESS.md` → hand back to the coach.

## What you get
A focused in-character session (co-creation, teardown, or review) followed by an out-of-character debrief. New or weakened assumptions are mirrored into `.lean/risks.md`; a mentor review can be saved alongside the canvas.

## Reference files
- `../reference/roles.md` — the full role catalog (voice, what each probes, the hard line it won't cross) and the shared role-play protocol.

## Works well with
- **customer-interview**, **investor-pitch** — the two role-play personas with dedicated scripted skills.
- **lean-mentor** agent — a one-shot version of the Mentor review (Claude Code).
- **prioritize-risks**, **lean-canvas** — common destinations after a scene.
