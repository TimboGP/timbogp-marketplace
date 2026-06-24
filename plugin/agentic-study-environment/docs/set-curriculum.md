# Set or update a curriculum — `agentic-study-environment:set-curriculum`

> Turn a sub-project's source materials into an ordered, source-faithful teaching plan.

## What it does
Builds or refreshes the teaching plan for a learning sub-project by reading its source materials and writing `ai-agent-materials/curriculum.md`. The curriculum is a **reference document** the agent consults when proposing what to study next — it makes the route through the material explicit and reviewable without forcing the order. It is source-faithful by default: every topic should trace back to your own materials. It does not start a session and does not update `PROGRESS.md`.

## When it triggers
Skills activate automatically based on your request. This one triggers on phrases like:
- "set curriculum for X"
- "update the curriculum"
- "plan the teaching path"
- "build a curriculum from these materials"

## How to use it
- **Just ask:**
  - "Set curriculum for tasep."
  - "Update the curriculum for spanish-b2 — I added two more papers."
  - "Plan how we should work through these source materials."
- **Where it sits in the lifecycle:** the second step — `bootstrap → set-curriculum → start-session ⇄ stop-session`. It runs after `bootstrap` (once materials are dropped in) and feeds `start-session`, which consults the curriculum when proposing a route.
- **Typical flow:**
  1. You name the **sub-project** to act on. If you don't, the agent asks — it never guesses or defaults to "all sub-projects".
  2. It loads context: the sub-project's `AGENTS.md` (Domain, Language, goals, Tools), the harness conventions, any existing `curriculum.md` and extractions, and the canonical `source-materials/`.
  3. It writes (or updates) `curriculum.md` with an overview plus ordered topic entries — each with a stable id (`T1`, `T2.a`), description, prerequisites, suggested session type (one of the four core types `theory`/`practice`/`role-play`/`onboarding`, or `both`; a curriculum may name an overlay flavor such as `simulation`/`defense`/`review`), source references, and exercise hooks.
  4. If a curriculum already exists, it **updates** rather than overwrites — folding in new materials and your corrections, re-checking ordering.

## Reads / writes
**Reads:**
- `.studyenv/<name>/AGENTS.md` (falls back to `CLAUDE.md` for older projects)
- `reference/conventions.md` — curriculum format and status legends
- `.studyenv/<name>/ai-agent-materials/` — existing `curriculum.md`, concept maps, excerpts
- `.studyenv/<name>/source-materials/` — the canonical source content

**Writes:**
- `.studyenv/<name>/ai-agent-materials/curriculum.md` (creating `ai-agent-materials/` if absent)
- Intermediate extractions alongside it — terse **concept maps** (with anchors back to source) and **verbatim excerpts** (kept in the source's original language)

**Does NOT touch:** `PROGRESS.md` (per-project or cross-project) — the curriculum is a plan, not progress. It does not populate `work/` (that's session time).

## Notes & tips
- **Source-faithful by default.** Where the source assumes an uncovered prerequisite, the agent either names it as a gap to fill at session time or adds a short bridging topic labeled `[ext]`. It will not silently weave training knowledge into a curriculum meant to track your source.
- **Want a different level?** If you want the plan genuinely simpler or more advanced than the source supports, use `adjust-level` instead — it's built for that and labels every external addition.
- **Stable topic ids** let `PROGRESS.md` cross-reference (`T1: exercised`) without restating descriptions, and survive reordering.
- **Reference-only.** The curriculum guides but does not constrain `start-session` routing — the agent may deviate.
