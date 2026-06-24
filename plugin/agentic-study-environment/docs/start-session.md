# Start a learning session — `agentic-study-environment:start-session`

> Open a bracketed study session inside a sub-project: pick a topic, choose a session type, and get tutored through it per the sub-project's domain overlay.

## What it does

This skill begins the harness's unit of work: a session with a start, a single focus (one topic, one session type), and an end. It loads the sub-project's context up front, proposes a route (which topic, which session type, why now), and — once you accept — conducts the session theory-first with explicit examples and pushes deeper after your first pass. Progress is not recorded here; that happens at session end via `stop-session`.

## When it triggers

Skills activate automatically based on your request. This one triggers on phrases like:
- "start session"
- "let's work on TASEP"
- "begin a practice session on derivatives"
- "ok let's study Y" / "I want to do an exercise on Z"
- a `role-play` session — role-play a clinical case (`simulation`), rehearse a research defense (`defense`), defend a code change (coding `review`) — or get walked through an existing codebase/corpus (`onboarding`)

If you haven't bootstrapped a sub-project yet, you'll be redirected to the `bootstrap` skill first.

## How to use it

- **Just ask:**
  - "Let's start a theory session on stationary distributions."
  - "I want to practice the proof from chapter 4."
  - "Run a simulation case for the speech-therapy project."
- **Where it sits in the lifecycle:** `bootstrap → set-curriculum → start-session ⇄ stop-session` — this is the open half of the recurring study loop.
- **Typical flow:**
  1. Load context — global config + `.studyenv/PROGRESS.md`, the sub-project's `AGENTS.md`/`PROGRESS.md`, its `ai-agent-materials/` (especially `curriculum.md`), and the active domain overlay if `Domain:` is set.
  2. Decide a session type: one of the four core types `theory`, `practice`, `role-play` (overlay flavors: `simulation` / `defense` / `review`), or `onboarding`.
  3. Propose a route — topic (citing a curriculum topic id), session type, and a one-sentence "why now". You can override.
  4. Conduct the session per type, preparing scaffolding the way the overlay specifies and surfacing any `[ext]` external-source material inline.
  5. End with `stop-session`.

## Reads / writes

Reads `.studyenv/AGENTS.md` (or `.studyenv/CLAUDE.md`) and `.studyenv/PROGRESS.md`; the sub-project's `.studyenv/<name>/AGENTS.md` (or `CLAUDE.md`), `.studyenv/<name>/PROGRESS.md`, and `.studyenv/<name>/ai-agent-materials/` (especially `curriculum.md`); the active overlay at `domains/<domain>.md`; and any unanalyzed `.studyenv/<name>/source-materials/`. Writes intermediate representations into `ai-agent-materials/` when analyzing new sources, and session scaffolding/artifacts into `.studyenv/<name>/work/` (default: a flat `work/<exercise-name>.md`; code-, case-, or research-shaped layouts come from the overlay). It does **not** touch `PROGRESS.md` — recording is `stop-session`'s job.

## Notes & tips

- **Session types:** four core types — `theory` (concepts, definitions, intuitions, proofs on request), `practice` (work a scaffolded exercise grounded in the current topic), `role-play` (in-character: setup → in character → debrief; overlay flavors `simulation` for `speech-therapy`, `defense` for `academic-research`, `review`/`interview` for `coding`), and `onboarding` (a part-by-part walkthrough of an existing artifact ending in a reproduce-a-recent-change exercise; `coding` ships the canonical codebase flavor). Overlays flavor these types; they don't add new ones. A theory session may include grounding practice and vice versa, but each session has one primary type.
- **The overlay shapes the session:** it refines (never replaces) the generic core, setting the scaffolding form, review focus, and `work/` layout. With no `Domain:` (or `Domain: study`), neutral defaults apply.
- **Start ⇄ stop pairing:** this skill opens the bracket but saves nothing. If you skip `stop-session`, no topic status, journal entry, or summary is recorded — the session vanishes.
- **Topic status legend touched here:** topics advance through `introduced` → `exercised` → `reviewed` (recorded at stop-time, never downgraded).
