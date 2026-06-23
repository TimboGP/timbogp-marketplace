# Bootstrap a learning sub-project — `agentic-study-environment:bootstrap`

> Scaffold a new learning sub-project under the harness and register it in the cross-project tracker.

## What it does
Mints a new self-contained sub-project under the agentic-study-environment harness — a folder where you work through one topic with the agent as tutor. It creates the sub-project directory, a `source-materials/` placeholder, and renders per-project `AGENTS.md`, `CLAUDE.md`, and `PROGRESS.md` from templates. It then registers the new project in the `.studyenv/PROGRESS.md` cross-project tracker. It only sets up scaffolding — it does not run a teaching session.

## When it triggers
Skills activate automatically based on your request. This one triggers on phrases like:
- "bootstrap a new project to learn X"
- "start a new sub-project for Y"
- "set up a learning project on Z"
- "create a sub-project to study W"

## How to use it
- **Just ask:**
  - "Bootstrap a project to learn TASEP."
  - "Create a sub-project for Spanish vocabulary, goal: reach B2 conversational."
  - "Set up a learning project for the seam carving paper."
- **Where it sits in the lifecycle:** this is the first step — `bootstrap → set-curriculum → start-session ⇄ stop-session`. After scaffolding, you typically run `set-curriculum` once source materials are in place.
- **Typical flow:**
  1. You supply a **sub-project name** (becomes the directory name) and a **one-line learning goal**. The agent asks if either is missing — it won't invent them.
  2. Optionally supply **Domain**, **Language**, or **Tools & Materials** (used if given, never prompted for; can be filled later via `AGENTS.md`).
  3. If `.studyenv/<name>/` already exists, the agent stops and asks — it never overwrites.
  4. It creates the directory tree and renders the three template files; Status opens at `created` (or `ready` if you mention materials are already in place).
  5. It registers the project in `.studyenv/PROGRESS.md` (creating that tracker on first bootstrap), then prompts you to drop source materials into `source-materials/`.

## Reads / writes
**Creates:**
- `.studyenv/` (if it doesn't yet exist)
- `.studyenv/<name>/` — the sub-project directory
- `.studyenv/<name>/source-materials/` — empty placeholder for your PDFs, papers, links, code
- `.studyenv/<name>/AGENTS.md` — from `templates/sub-project-agents.md`
- `.studyenv/<name>/CLAUDE.md` — from `templates/sub-project-claude.md` (compatibility pointer)
- `.studyenv/<name>/PROGRESS.md` — from `templates/sub-project-progress.md`

**Writes/updates:**
- `.studyenv/PROGRESS.md` — adds the Projects row and a dated Journal entry (creates the file on first use; otherwise appends without touching prior rows).

**Does NOT create:** `ai-agent-materials/` (that's `set-curriculum`) or `work/` (created at session time).

## Notes & tips
- **Refuses to overwrite.** If the sub-project directory already exists, it stops — a sub-project may carry weeks of work in its `PROGRESS.md` and `work/`. Delete the directory yourself if you want a clean start.
- **Domain and Language are omitted when unset**, not written as placeholders. The agent keys off their presence at session time to decide whether to load a domain overlay or switch conversational language, so a stray placeholder would falsely trigger.
- **Self-contained footprint.** Everything lives under `.studyenv/`; the harness never touches the host project's own root files.
- **Hand-off:** after dropping materials, run `set-curriculum` to plan the route, then `start-session` to study.
