# Begin an onboarding session — `agentic-study-environment:onboard-session`

> Get up to speed on an existing artifact you didn't author — a codebase, a document corpus, a body of papers — via a guided survey → walkthrough → reproduce-a-recent-change session.

## What it does

This skill runs the harness's `onboarding` session type: the fourth core type, alongside `theory`, `practice`, and `role-play`, but with its own dedicated entry point rather than being one more type proposed inside `start-session`. It loads the sub-project's context up front, surveys the target artifact, walks it one part at a time with comprehension checks, then has you reproduce a small recent change from its history and reviews your version against what actually shipped. Progress is not recorded here; that happens at session end via `stop-session`.

## When it triggers

Skills activate automatically based on your request. This one triggers on phrases like:
- "onboard me on this codebase"
- "walk me through this repo"
- "help me get up to speed on X"
- "I just joined this project" / "drop me into this codebase"
- "get familiar with this corpus"

If you haven't bootstrapped a sub-project yet, you'll be redirected to the `bootstrap` skill first. If you actually want `theory`, `practice`, or `role-play`, you'll be redirected to `start-session` instead.

## How to use it

- **Just ask:**
  - "Onboard me on the payments service."
  - "Walk me through this repo, I just joined."
  - "Help me get up to speed on this legal corpus."
- **Where it sits in the lifecycle:** `bootstrap → set-curriculum → onboard-session ⇄ stop-session` — a sibling of `start-session` in the open half of the recurring study loop.
- **Typical flow:**
  1. Load context — global config + `.studyenv/PROGRESS.md`, the sub-project's `AGENTS.md`/`PROGRESS.md`, its `ai-agent-materials/` (especially `curriculum.md`), any existing `work/onboarding/map.md`, and the active domain overlay if `Domain:` is set.
  2. **Phase 0 — Set up.** Identify the target artifact (read-only), build a terse map at `work/onboarding/map.md`, propose an ordering to walk through.
  3. **Phase 1 — Part-by-part walkthrough.** One subsystem/section at a time: explain it, send you to read the real artifact, ask comprehension/prediction questions, correct and push deeper.
  4. **Phase 2 — Reproduce a recent change.** Pick from a short list of small recent changes, set up the chosen one with intent + acceptance criteria but without the original, review your reproduction against what actually happened.
  5. End with `stop-session`.

## Reads / writes

Reads `.studyenv/AGENTS.md` (or `.studyenv/CLAUDE.md`) and `.studyenv/PROGRESS.md`; the sub-project's `.studyenv/<name>/AGENTS.md` (or `CLAUDE.md`), `.studyenv/<name>/PROGRESS.md`, and `.studyenv/<name>/ai-agent-materials/`; the active overlay at `domains/<domain>.md`. This is the **one case** the harness reads outside `.studyenv/` — the designated onboarding target (a codebase, corpus, or papers), and strictly read-only. Writes go to `.studyenv/<name>/work/onboarding/`: `map.md` (the part-by-part survey, updated across sessions) and `reimplement/<change-id>/` (the reproduction exercise). It does **not** touch `PROGRESS.md` — recording is `stop-session`'s job.

## Notes & tips

- **Why a separate skill:** onboarding's shape — read-only access to an external artifact, a fixed three-phase protocol, its own artifact tree — differs enough from `theory`/`practice`/`role-play` that it gets a direct entry point instead of being buried as a type choice inside `start-session`. It still closes through the same `stop-session` flow.
- **The overlay shapes the walkthrough:** it fixes what the corpus is, what "read the real thing" points at, what counts as "a recent change", and the `work/onboarding/` layout. `coding` (`domains/coding.md`) ships the canonical codebase flavor — commits/PRs as recent changes, source files and symbols to read. `academic-research`, `legal-documents`, and `speech-therapy` inherit the generic protocol unchanged for papers, legal corpora, and clinical material. With no `Domain:` set, the generic protocol applies over a flat corpus.
- **Resumable across sessions:** `work/onboarding/map.md` tracks which parts have been walked and at what comprehension, so a later onboarding session picks up where the last one left off instead of re-surveying.
- **Onboard ⇄ stop pairing:** like `start-session`, this skill opens the bracket but saves nothing. If you skip `stop-session`, no walkthrough progress or reproduction outcome is recorded.

See `reference/conventions.md` → *Onboarding session protocol (generic)* for the full canonical protocol, and `domains/coding.md` → *Onboarding session protocol* for the worked codebase flavor.
