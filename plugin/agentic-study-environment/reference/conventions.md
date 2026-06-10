# Agentic-study-environment conventions

Shared reference for the agentic-study-environment plugin's lifecycle skills (`bootstrap`, `set-curriculum`, `start-session`, `stop-session`, `adjust-level`). Skills load this file when they need a legend, layout, or format that's reused across the plugin.

## Status legends

### Topic status

Used in every sub-project's `PROGRESS.md` Topics table. Record the **highest stage ever reached** — never downgrade.

- `introduced` — covered in a theory session
- `exercised` — practiced via a practice session
- `reviewed` — exercise output / proofs / artifacts reviewed and pushed deeper

A topic is rarely linear: it can sit at `introduced` for a while, advance to `exercised`, and eventually reach `reviewed`.

### Sub-project status

Used in the host project's root `PROGRESS.md` Projects table and mirrored in each sub-project's `PROGRESS.md` Status line.

- `created` — only project scaffolding exists
- `ready` — source materials exist
- `in progress` — at least one session has been started
- `blocked` — work explicitly halted; the reason **must** be logged alongside the status
- `stopped` — work stopped but not finished
- `finished` — all work done and the project explicitly submitted as finished

Mirror the per-sub-project Status into the root `PROGRESS.md` Projects table on every session-end (`stop-session` handles this).

## Sub-project layout

```
/<sub-project root>
  /source-materials/     ← user-provided source content (PDFs, books, papers, links, notes)
  /ai-agent-materials/   ← agent-generated summaries, extracted concepts, copied excerpts, curriculum
  /work/                 ← where the agent and the user collaborate.
                           shape depends on the sub-project's domain — see the active overlay
                           (e.g. ../domains/coding.md for code-shaped layouts). With no overlay,
                           the default is a flat folder of exercise/notes markdown files.
  AGENTS.md              ← canonical sub-project-specific agent instructions; declares Domain,
                           Language, learning goals, and Tools & Materials
  CLAUDE.md              ← compatibility pointer to AGENTS.md
  PROGRESS.md            ← sub-project Status, Topics, and Journal
```

`bootstrap` creates `<sub-project>/`, `<sub-project>/source-materials/`, `<sub-project>/AGENTS.md`, `<sub-project>/CLAUDE.md`, and `<sub-project>/PROGRESS.md`. It does **not** create `ai-agent-materials/` or `work/` — those appear when their work begins (`set-curriculum` populates `ai-agent-materials/`; sessions populate `work/`).

Templates for the per-sub-project `AGENTS.md`, `CLAUDE.md`, and `PROGRESS.md` live at [`../templates/sub-project-agents.md`](../templates/sub-project-agents.md), [`../templates/sub-project-claude.md`](../templates/sub-project-claude.md), and [`../templates/sub-project-progress.md`](../templates/sub-project-progress.md).

## Host-project modes

A host project that uses the agentic-study-environment plugin runs in one of two modes. **The same skills work in both** — they read what exists, create what's needed, and never modify a root `AGENTS.md` or `CLAUDE.md` they didn't create. The mode is a property of how the user is using the plugin, not of the plugin's behavior. Skills should not gate behavior on detecting a mode; they handle missing/present root files uniformly.

### Drop-in mode

The plugin is installed in a host project that already has its own purpose — a codebase, a notes folder, a personal workspace. One or a few learning sub-projects live alongside the existing files.

- The host's existing root `AGENTS.md` or `CLAUDE.md` (if any) is **not modified** by the plugin and may contain instructions unrelated to learning (e.g. coding conventions, repo-specific agent guidance).
- A root `PROGRESS.md` is created by `bootstrap` on first use; it stays a lightweight index of whatever sub-projects this host happens to accumulate.
- The user's mental model: "I'm working in my main project, and I also have a learning sub-project for X over there."

### Umbrella mode

The host project is purpose-built to accumulate multiple learning sub-projects — someone clones the agentic-study-environment repo as a template, or sets up a dedicated `~/learning/` directory, or carves out a learning-only repo.

- The root `AGENTS.md` typically declares a global `Language:` and any cross-project conventions (e.g. preferred notation, default rigor level). `CLAUDE.md` may point to it for Claude Code compatibility. Sub-projects inherit these unless they override.
- The root `PROGRESS.md` is the substantive cross-project tracker — many Projects rows over time, a real Journal of bootstraps and session-end summaries.
- The user's mental model: "This is my learning workspace, and it contains all my sub-projects."

### What this means for the skills

- `bootstrap` resolves the cross-project tracker by **file shape, not host mode**: if no root `PROGRESS.md` exists it creates one; if a harness-shaped one exists it appends rows; if a `PROGRESS.md` exists but is foreign (a drop-in host's own changelog/roadmap under that name), it does **not** modify it — it reports the collision and prompts the user (separate `LEARNING-PROGRESS.md` tracker, augment-in-place, or relocate). See the `bootstrap` skill, Case C.
- `start-session` reads the root `AGENTS.md` for global `Language:` and context **if present**, falls back to root `CLAUDE.md` for older hosts, and skips it cleanly otherwise.
- `stop-session` mirrors per-sub-project status into the cross-project tracker, resolved by shape: a harness-shaped `PROGRESS.md`, else `LEARNING-PROGRESS.md`.
- `set-curriculum` is mode-agnostic — it works purely within a single sub-project.

## Host-project layout

What sits at the root of a host project in either mode:

- `AGENTS.md` — **optional**. May declare a global `Language:` default and any other host-project conventions. The plugin's skills read it for context if present but do **not** require, modify, or create it.
- `CLAUDE.md` — **optional**. Compatibility file for Claude Code. In new umbrella hosts it should point to `AGENTS.md`; older hosts may still keep the actual declarations here, and skills fall back to it.
- `PROGRESS.md` — the cross-project tracker, created by `bootstrap` on first use if not already present; `stop-session` mirrors per-sub-project status updates here. If a `PROGRESS.md` already occupies the host root but is **not** a harness tracker (a drop-in host keeping its own changelog/roadmap under that name), `bootstrap` leaves it untouched and offers a separate tracker at the canonical fallback name `LEARNING-PROGRESS.md`. Skills resolve the tracker by shape: a harness-shaped `PROGRESS.md` first, then `LEARNING-PROGRESS.md`.

### Root PROGRESS.md structure

```markdown
# PROGRESS.md - root

## Projects

Sub-project status legend (see plugin conventions):
`created` · `ready` · `in progress` · `blocked` (reason logged) · `stopped` · `finished`

| Project | Status | Notes |
| --- | --- | --- |
| _(none yet)_ |  |  |

## Grand Topics Covered

Topic status legend (see plugin conventions):
`introduced` · `exercised` · `reviewed`

_(none yet)_

## Journal
```

The Journal is dated; new entries go under a `### YYYY-MM-DD` heading. Multiple events on the same date go under the same heading as bullets.

**Tracker resolution.** The cross-project tracker is `PROGRESS.md` at the host root. The three sections above (`## Projects` with its table, `## Grand Topics Covered`, `## Journal`) are what identifies a file as a harness tracker. If the host root already holds a `PROGRESS.md` that is *not* a harness tracker, the canonical fallback is `LEARNING-PROGRESS.md` at the host root. Skills locate the tracker by shape, in order: a harness-shaped `PROGRESS.md`, then `LEARNING-PROGRESS.md`. `bootstrap` never overwrites a foreign `PROGRESS.md` — it reports the collision and lets the user choose (see the `bootstrap` skill, Case C).

## Curriculum format

Curricula live at `<sub-project>/ai-agent-materials/curriculum.md`. The format:

- A short **overview** paragraph — what this sub-project teaches and the intended end state.
- A **topics** section: an ordered list of topic entries, each with
  - a stable **id** (e.g. `T1`, `T2.a`) so `PROGRESS.md` can cross-reference without restating the topic description, and so reordering doesn't break references
  - a one-line **description**
  - **prerequisites** — other topic ids; `none` if root
  - suggested **session type** — `theory`, `practice`, or `both`. Domain overlays may add types (`simulation` for `Domain: speech-therapy`).
  - **sources** — entries are either in-source (file + anchor back to `source-materials/`) or external (prefixed `[ext]` with a concrete citation). See *External-source labeling* below for the format.
  - **exercise hooks** — short outlines of proposed practice/theory exercises. The actual exercise artifacts live in `work/` and are created at session time per the active overlay; do not duplicate exercise content into the curriculum.

The curriculum is **reference-only**. It does not constrain `start-session` routing; the agent may consult it when proposing a route, but is free to deviate.

## External-source labeling

When the curriculum or any agent-generated artifact draws on material that did **not** come from the user's `source-materials/`, the entry is **explicitly labeled** so the user always knows the provenance of what they're being asked to study. This convention is most heavily exercised by `adjust-level` (which is explicitly allowed to bring in external material to shift the curriculum up or down), but it applies wherever the agent fills a gap the user's source doesn't cover.

### Format

Each source reference in `curriculum.md` is either **in-source** or **external**:

- **In-source** entries have no prefix and name a file in `source-materials/` plus an anchor:
  - `paper.pdf §3.2`
  - `lecture-notes.md ch. 4 — definition of stationarity`
  - `patient-maria.md — speech pattern section`

- **External** entries are prefixed `[ext]` and **name the source concretely**:
  - `[ext] Krapivsky, Redner & Ben-Naim, *A Kinetic View of Statistical Physics*, ch. 7` — a specific textbook
  - `[ext] Wikipedia: Markov chain (https://en.wikipedia.org/wiki/Markov_chain)` — a web page
  - `[ext] arXiv:cond-mat/0312366 (Derrida, 2003) — large-deviation principle for TASEP` — a paper
  - `[ext] training knowledge — general background in measure theory` — agent's trained knowledge with no specific cited source

A topic may mix both: e.g. an in-source reference for the core material plus an `[ext]` reference for a bridging concept the source assumed.

### Two rules that are not negotiable

1. **Training knowledge counts as external.** When the agent uses its own pattern-recognition to add a topic the source doesn't cover, that topic gets a `[ext] training knowledge — <area>` label. Untagged drift of trained material into a "source-faithful" curriculum is the failure mode this convention exists to prevent.
2. **Never invent citations.** If the agent genuinely doesn't remember the source of a piece of background knowledge, label it as `[ext] training knowledge — <area>` with an honest description of the domain area. A fabricated citation is strictly worse than an honest "training knowledge — combinatorics background" — the user can verify the latter; the former poisons trust.

### When to label conservatively

When provenance is ambiguous, default to labeling external. Over-labeling is recoverable in a moment ("oh that's actually in §3.2 of the paper"); under-labeling silently misleads the user about what's in their material.

### During sessions

`start-session` reads the labels and surfaces external-source citations during teaching — when the agent is about to explain something drawn from outside the user's source materials, it says so inline, so the user always knows where the current explanation comes from.

## Language defaults and overrides

The default conversational language is **English**. The user can override it by declaring `Language: <BCP 47 tag>` in either:

- A **sub-project `AGENTS.md`** — applies only to that sub-project. This is the usual place. Older sub-projects may still use `CLAUDE.md`; skills read it as a fallback.
- The **host project's root `AGENTS.md`** — applies as the default across any sub-projects bootstrapped in that project. Older hosts may still use root `CLAUDE.md`; skills read it as a fallback. Sub-project value overrides root.

The override is scoped to **conversational output only** — chat replies, theory explanations, review feedback, questions to the user. The following stay in **English by default** regardless of the setting:

- code identifiers, file names, directory names
- scaffolding stub files and their instructional comments (per the active domain overlay)
- structural markdown tokens that other files depend on — status legends, field names (`Domain:`, `Language:`, `Status:`), table headers
- the plugin's trigger phrasings and skill names
- verbatim excerpts from source materials — kept in the source's original language regardless of the setting

If the user writes a single message in a different language, do **not** auto-switch — the declared setting wins. To change the language for the session or persistently, the user should say so explicitly; persistent change means updating the `Language:` field.

## Source-material handling

Source materials live in `<sub-project>/source-materials/`. They are user-provided and treated as canonical for that sub-project. If trained knowledge enriches a source's content, the agent **explicitly states** that the addition is outside the source.

When analyzing a source, build intermediate fixed representations in `<sub-project>/ai-agent-materials/`:

- **Terse concept maps** — with references back to the source (page numbers for PDFs, section/heading anchors or URLs for other formats — sources are not always PDFs).
- **Copied verbatim excerpts** — sections, examples, definitions for explicit use during sessions. Kept in the source's original language.
- **The curriculum** at `ai-agent-materials/curriculum.md` — see format above.

Exercises themselves live under `work/`; do **not** duplicate exercise content in `ai-agent-materials/`. Reference exercise files from the curriculum's exercise hooks instead.

## Teaching style

Across all session types:

- **Theory-first** with explicit examples. Definitions and intuitions before proofs; proofs on request.
- **Concise** conversations. Short questions and short replies beat walls of text.
- **Scaffolding for practice exercises** takes the form appropriate to the domain — the active overlay specifies it. Without an overlay, the default is a `work/<exercise-name>.md` file with the prompt, success criteria, and any reference excerpts inline.
- **Review covers both correctness and craft** (style, idiomacy, clarity) appropriate to the domain — call out better alternatives, not just mistakes.

## Skills

The four **lifecycle skills** carry the user through bootstrap → set-curriculum → session → session-end. The one **auxiliary skill** (`adjust-level`) operates off-cycle on an existing curriculum.

| Skill | Purpose | Updates PROGRESS.md? |
| --- | --- | --- |
| `bootstrap` | Mint a new sub-project | Yes — adds Projects row + Journal entry |
| `set-curriculum` | Build or update a sub-project's `curriculum.md` from source materials, source-faithful | No (curriculum is reference, not progress) |
| `start-session` | Begin a bracketed learning session | No (the session itself does the work) |
| `stop-session` | End the session: record progress and summarize | Yes — Topics, Status, Journal in both sub-project and root PROGRESS.md |
| `adjust-level` | Shift an existing curriculum simpler or harder; allowed to pull in external material with strict labeling | No (same reasoning as `set-curriculum`) |

Domain overlays at [`../domains/<domain>.md`](../domains/) refine `start-session` and (for speech-therapy `simulation`) `stop-session`. They are additive — they refine the generic core defined here, they do not replace it.
