# Adjust curriculum level — `agentic-study-environment:adjust-level`

> Rewrite a sub-project's curriculum simpler or more advanced than its source naturally supports, labeling every external addition.

## What it does
Rewrites a sub-project's `curriculum.md` at a different difficulty level than the source materials directly support — either **simpler** (build an on-ramp up to a dense source) or **more advanced** (extend an introductory source with rigor and adjacent material). To bridge the gap it is allowed to draw on external materials and training knowledge, but **every externally-sourced piece is explicitly labeled** so you always see the provenance of what you're being asked to study. It is not a session and does not update `PROGRESS.md`.

## When it triggers
Skills activate automatically based on your request. This one triggers on phrases like:
- "this paper is too hard, can we build up to it?"
- "simplify the curriculum" / "make it easier"
- "go more advanced" / "I want a more rigorous version"
- "this is too basic, push deeper" / "I need an intro version of this"

## How to use it
- **Just ask:**
  - "This paper is too dense — can we build up to it from the basics?"
  - "The textbook is the floor; make a more advanced version that climbs higher."
  - "Give me an intro-level version of the tasep curriculum."
- **Where it sits in the lifecycle:** off-cycle. The main flow is `bootstrap → set-curriculum → start-session ⇄ stop-session`; `adjust-level` is an as-needed tune-up of an existing curriculum produced by `set-curriculum`.
- **Typical flow:**
  1. You name the **sub-project** and the **direction** (simpler / more advanced); the agent asks one short question if direction is ambiguous. Optionally give a **target level** or **specific gaps/extensions**.
  2. It reads the baseline `curriculum.md` (redirecting you to `set-curriculum` if none exists), the source extractions, the `source-materials/`, and the conventions' labeling rules.
  3. **Simplifying:** lists what the source assumes, invents bridging prereqs, decomposes dense topics, and orders so the source becomes the final stretch. **Deepening:** consolidates the source as foundation, then adds advanced topics, rigor, and adjacent material.
  4. It preserves existing topic ids for unchanged concepts, inserts new topics at intermediate ids (`T2.5`), and marks removed-but-referenced topics `[deprecated]`.
  5. It backs up the old curriculum, writes the new one with a header note describing the shift, and summarizes what changed.

## Reads / writes
**Reads:**
- `.studyenv/<name>/AGENTS.md` (falls back to `CLAUDE.md`)
- `.studyenv/<name>/ai-agent-materials/curriculum.md` — the baseline being adjusted
- `.studyenv/<name>/ai-agent-materials/` extractions and `.studyenv/<name>/source-materials/` — ground truth for what's in-source
- `reference/conventions.md` — curriculum format and the (non-optional) **External-source labeling** rules

**Writes:**
- `.studyenv/<name>/ai-agent-materials/curriculum-prev.md` — backup of the prior curriculum (overwrites any earlier backup)
- `.studyenv/<name>/ai-agent-materials/curriculum.md` — the rewritten curriculum, with a header note stating direction, target level, and what kind of external material was brought in

**Does NOT modify:** `PROGRESS.md` or any sub-project file other than the curriculum and its backup.

## Notes & tips
- **Labeling is the heart of the skill.** In-source entries name a file + anchor (`paper.pdf §3.2`); external entries are prefixed `[ext]` with a concrete citation. **Training knowledge counts as external** — `[ext] training knowledge — <area>` — and citations are never invented; when in doubt, the agent over-labels.
- **One-line revert.** If the level call doesn't land, restore with `cp curriculum-prev.md curriculum.md`.
- **Topic ids are preserved** so your existing `PROGRESS.md` references don't become dead links.
- **Hand-offs:** if you only want the curriculum to better match your source (no level shift), use `set-curriculum`. During `start-session`, the agent surfaces the `[ext]` labels inline so you always know where an explanation comes from.
