---
name: bootstrap
description: Scaffold a new learning sub-project under the agentic-study-environment harness — create the directory, generate per-project AGENTS.md, CLAUDE.md, and PROGRESS.md from templates, and register the new project in the root PROGRESS.md. Use this skill whenever the user wants to start studying a new topic, paper, book, language, or domain with the tutor harness — phrases like "bootstrap a new project to learn X", "start a new sub-project for Y", "set up a learning project on Z", or "create a sub-project to study W" should all trigger this skill. Do not use for general project scaffolding outside the agentic-study-environment harness.
---

# Bootstrap a learning sub-project

This skill mints a new sub-project under the agentic-study-environment harness. A sub-project is a self-contained folder where a learner works through a single topic with the agent as tutor, scaffolded by the harness's conventions.

## When to use

The user wants to start studying something new. They might say "bootstrap a project to learn TASEP", "create a sub-project for Spanish vocabulary", "set up a learning project for the seam carving paper", or similar. The signal is: a topic they want to learn, an intent to study it under the harness.

This skill does NOT run a teaching session — that's `start-session`. It only sets up the scaffolding.

## What you need from the user

**Required (ask if missing — do not invent):**

- a **sub-project name** (becomes the directory name, e.g. `seam-carver`, `spanish-b2`, `tasep`)
- a **one-line learning goal** that captures what the user wants to learn

**Optional (use if supplied; do not prompt for them — they can be filled later via the sub-project's `AGENTS.md`):**

- a **Domain** — controls which overlay applies during sessions. Known values: `coding`, `speech-therapy` (synonym: `logopedics`), `study` (the neutral default), or any user-supplied custom value. If unset, the sub-project falls back to the neutral default.
- a **Language** — BCP 47 tag (e.g. `de`, `es`, `fr`) overriding the conversational language for chat replies inside this sub-project. Default is English unless the host project's root `AGENTS.md` or `CLAUDE.md` sets otherwise. Structural tokens (status legends, field names, trigger words) stay in English regardless — see `../../reference/conventions.md` for the exact rules.
- **Tools & Materials** — anything the user already knows they'll work with (a language + version for coding, a textbook, a notation convention, …).
- A note that **source materials are already in place** — controls the starting status of the sub-project.

## Refuse to overwrite

If `<sub-project-name>/` already exists at the current working directory, **stop and ask the user**. Never overwrite an existing sub-project. If the user wants to wipe and start over, they can delete the directory themselves and re-invoke. A sub-project may carry weeks of work in its `PROGRESS.md` and `work/` — silent overwrite would be destructive.

## What to create

Working from the current directory as the harness root:

1. **`<name>/`** — the sub-project directory.
2. **`<name>/source-materials/`** — empty placeholder for the user to drop PDFs, notes, links, prepared code projects.
3. **`<name>/AGENTS.md`** — render from `../../templates/sub-project-agents.md` (relative to this SKILL.md). Substitute `<name>`, the learning goal(s), and any supplied `Domain:` / `Language:` / Tools & Materials. If `Domain:` was not supplied, **omit the line entirely** (do not leave a blank or a placeholder string). Same for `Language:`. If Tools & Materials were not supplied, keep the placeholder text `TBD when setting curriculum`.
4. **`<name>/CLAUDE.md`** — render from `../../templates/sub-project-claude.md`. It is a compatibility pointer to `<name>/AGENTS.md`.
5. **`<name>/PROGRESS.md`** — render from `../../templates/sub-project-progress.md`. Status opens at `created`, or at `ready` if the user mentioned source materials are already in place.

**Do NOT create** `<name>/ai-agent-materials/` or `<name>/work/`. The `set-curriculum` skill creates `ai-agent-materials/`; sessions create `work/` on demand per the active domain overlay.

## Update the cross-project tracker (root PROGRESS.md)

After creating the sub-project, register it in the host project's cross-project tracker. The tracker lives at `PROGRESS.md` in the current working directory. How you proceed depends on what is already at that path — **inspect the file's shape, never the host mode** (this keeps behavior identical in drop-in and umbrella mode).

A valid harness tracker has all of:

- a top heading `# PROGRESS.md - root`,
- a `## Projects` section containing a `| Project | Status | Notes |` table,
- a `## Journal` section.

(Full structure: `../../reference/conventions.md` → *Root PROGRESS.md structure*.)

The Projects row uses the matching status (`created` or `ready`) and a one-line note (typically the learning goal, abbreviated); the Journal gets an entry under today's date describing the bootstrap.

### Case A — no `PROGRESS.md` at the root

First bootstrap in this host (typical of drop-in mode's first use). Create `PROGRESS.md` from the canonical structure above, then add this sub-project's row and Journal entry.

### Case B — a `PROGRESS.md` exists and matches the harness shape

Typical of umbrella mode or any nth bootstrap. Append the row and dated Journal entry **without touching prior rows or entries**; no prompt needed. If it is clearly the harness tracker but missing one section (e.g. has `## Projects` but no `## Journal`), add the missing section in place, then append — this is a repair, not a foreign file.

### Case C — a `PROGRESS.md` exists but does NOT match the harness shape

This is the drop-in collision: the host already keeps a `PROGRESS.md` for an unrelated purpose (a changelog, roadmap, release notes). **Do not modify it** — appending a Projects table would corrupt the user's file.

1. **Report the finding.** Tell the user plainly that a `PROGRESS.md` already exists at the host root but does not look like the harness's cross-project tracker, and name which expected parts are missing (the `# PROGRESS.md - root` heading / the `## Projects` table / the `## Journal` section). Show a one-line sense of what the file actually contains so they can confirm it is theirs.
2. **Prompt for how to go forward.** Present these options and let the user choose — do not pick for them, and do not write to any tracker until they decide:
   - **(recommended) Separate tracker** — use `LEARNING-PROGRESS.md` at the host root as the harness tracker instead, leaving the existing `PROGRESS.md` untouched. This is the canonical fallback name, so `stop-session` and future bootstraps discover it automatically (they resolve the tracker by shape: harness-shaped `PROGRESS.md` first, then `LEARNING-PROGRESS.md`).
   - **Augment the existing file** — append the harness `## Projects`, `## Grand Topics Covered`, and `## Journal` sections to the bottom of the current `PROGRESS.md`, leaving its existing content intact above. The tracker then stays at `PROGRESS.md`. Choose only if the user is fine merging the tracker into their file.
   - **Relocate** — the user renames or moves their existing `PROGRESS.md`; re-running then lands in Case A.
3. **Act on the choice**, creating or appending in the chosen file using the canonical structure.

Whatever the outcome, the sub-project directory (`<name>/`) is already created and self-contained — its own `PROGRESS.md` is the source of truth; the root tracker is only an index.

## Confirm and prompt for materials

After scaffolding is in place:

- Tell the user concisely what was created (paths, opening status).
- **Prompt the user to drop source materials into `<name>/source-materials/`** — PDFs, papers, links, prepared code projects, exercise sheets, anything.
- If the user supplies materials in the same turn (or confirms they've already added some), flip the sub-project's `PROGRESS.md` Status line and the root `PROGRESS.md` Projects row from `created` to `ready`.

## Why these rules

- The harness is structural — every sub-project follows the same layout so the agent can navigate any of them without re-learning the conventions. The templates enforce that.
- Domain and Language stay **optional and omitted-when-unset** rather than written as placeholders, because the agent uses presence/absence of those fields at session time to decide whether to load an overlay or switch conversational language. A placeholder string would falsely trigger.
- `ai-agent-materials/` and `work/` are deliberately not created here. Bootstrap should be cheap and reversible; the heavier folders appear when their work actually begins.

## Related skills

- After bootstrap, the user typically runs `set-curriculum` once source materials are in place, then `start-session` to actually study.
- `stop-session` updates the per-project and root `PROGRESS.md`.
