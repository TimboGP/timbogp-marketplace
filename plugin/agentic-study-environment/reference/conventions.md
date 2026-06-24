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

Used in the `.studyenv/PROGRESS.md` Projects table and mirrored in each sub-project's `PROGRESS.md` Status line.

- `created` — only project scaffolding exists
- `ready` — source materials exist
- `in progress` — at least one session has been started
- `blocked` — work explicitly halted; the reason **must** be logged alongside the status
- `stopped` — work stopped but not finished
- `finished` — all work done and the project explicitly submitted as finished

Mirror the per-sub-project Status into the `.studyenv/PROGRESS.md` Projects table on every session-end (`stop-session` handles this).

## Harness root: `.studyenv/`

Everything the harness generates lives under a single `.studyenv/` directory at the host project root. This keeps the host project clean and makes the whole harness footprint portable — `.studyenv/` is one folder you can gitignore, delete, zip, or sync. The harness owns `.studyenv/` and **never reads or writes the host project's own files** outside it.

`.studyenv/` is the harness's working root. It holds:

- `.studyenv/PROGRESS.md` — the cross-project tracker (created by `bootstrap` on first use).
- `.studyenv/AGENTS.md` — **optional** global config (a default `Language:` and any cross-project conventions). Not auto-created.
- `.studyenv/CLAUDE.md` — **optional** compatibility pointer to `.studyenv/AGENTS.md`.
- `.studyenv/<sub-project>/` — one directory per learning sub-project (see below).

### Tracking scope

A sub-project declares how its progress is tracked with an optional `Tracking:` field in its own `AGENTS.md`:

- `Tracking: global` (the **default** — also assumed when the field is **absent**) — the sub-project is registered in the cross-project `.studyenv/PROGRESS.md` tracker and its status is mirrored there on every session-end. This is the umbrella mode: many sub-projects indexed in one place.
- `Tracking: local-only` — the sub-project keeps **only its own** `.studyenv/<name>/PROGRESS.md`. It is **not** registered in `.studyenv/PROGRESS.md`, and `stop-session` does not mirror into or warn about a missing cross-project tracker. Use it for a lone learning project (often one you've dropped the harness into) where a global index across sub-projects isn't wanted.

Behavioral contract:

- `bootstrap` reads the requested scope. Under `local-only` it **skips** creating and registering `.studyenv/PROGRESS.md` entirely and writes `Tracking: local-only` into the sub-project's `AGENTS.md`. Under `global` (or unset) it behaves as before.
- `stop-session` reads the sub-project's `Tracking:` field first. Under `local-only` it updates only the sub-project's own `PROGRESS.md` and skips the cross-project mirror. Under `global` it mirrors as usual; if the tracker is genuinely missing it tells the user rather than recreating it (`bootstrap` owns tracker creation).

The field is omitted-when-default (like `Domain:` and `Language:`): absent means `global`, so every existing sub-project is unaffected.

## Sub-project layout

Each sub-project lives at `.studyenv/<sub-project>/`:

```
.studyenv/<sub-project>/
  source-materials/      ← user-provided source content (PDFs, books, papers, links, notes)
  ai-agent-materials/    ← agent-generated summaries, extracted concepts, copied excerpts, curriculum
  work/                  ← where the agent and the user collaborate.
                           shape depends on the sub-project's domain — see the active overlay
                           (e.g. ../domains/coding.md for code-shaped layouts). With no overlay,
                           the default is a flat folder of exercise/notes markdown files.
  AGENTS.md              ← canonical sub-project-specific agent instructions; declares Domain,
                           Language, learning goals, and Tools & Materials
  CLAUDE.md              ← compatibility pointer to AGENTS.md
  PROGRESS.md            ← sub-project Status, Topics, and Journal
```

`bootstrap` creates `.studyenv/<name>/`, `.studyenv/<name>/source-materials/`, `.studyenv/<name>/AGENTS.md`, `.studyenv/<name>/CLAUDE.md`, and `.studyenv/<name>/PROGRESS.md` (creating `.studyenv/` itself if it does not yet exist). It does **not** create `ai-agent-materials/` or `work/` — those appear when their work begins (`set-curriculum` populates `ai-agent-materials/`; sessions populate `work/`).

Templates for the per-sub-project `AGENTS.md`, `CLAUDE.md`, and `PROGRESS.md` live at [`../templates/sub-project-agents.md`](../templates/sub-project-agents.md), [`../templates/sub-project-claude.md`](../templates/sub-project-claude.md), and [`../templates/sub-project-progress.md`](../templates/sub-project-progress.md).

## Host-project independence

Because the entire harness footprint is contained in `.studyenv/`, the harness is indifferent to whatever else the host project is. It may be a codebase, a notes folder, an empty directory, or a workspace purpose-built to accumulate learning sub-projects — the skills behave identically in all cases. They read and write only inside `.studyenv/` and **never read, require, modify, or create** the host project's own root `AGENTS.md`, `CLAUDE.md`, or `PROGRESS.md`. A host can keep its own `PROGRESS.md` (a changelog, a roadmap) and never collide with the harness tracker at `.studyenv/PROGRESS.md`.

Global learning conventions (a default `Language:`, preferred notation, default rigor) that should apply across every sub-project go in an **optional** `.studyenv/AGENTS.md` (with `.studyenv/CLAUDE.md` as a compatibility pointer). It is read if present and is never auto-created — a sub-project's own `AGENTS.md` overrides it.

## `.studyenv/PROGRESS.md` structure

```markdown
# PROGRESS.md — studyenv

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

The cross-project tracker is always `.studyenv/PROGRESS.md`. It is created by `bootstrap` on first use and updated by `stop-session`. Since `.studyenv/` is harness-owned, there is no ambiguity about which file is the tracker and no collision to resolve.

## Curriculum format

Curricula live at `.studyenv/<sub-project>/ai-agent-materials/curriculum.md`. The format:

- A short **overview** paragraph — what this sub-project teaches and the intended end state.
- A **topics** section: an ordered list of topic entries, each with
  - a stable **id** (e.g. `T1`, `T2.a`) so `PROGRESS.md` can cross-reference without restating the topic description, and so reordering doesn't break references
  - a one-line **description**
  - **prerequisites** — other topic ids; `none` if root
  - suggested **session type** — one of the four core types `theory`, `practice`, `role-play`, `onboarding` (or `both` as shorthand for theory + practice). Overlays do not add new *types*; they supply domain-specific **flavors** of these, and a curriculum may name a flavor where one exists — `simulation` (a `role-play` flavor under `Domain: speech-therapy`), `defense` (`role-play`, `Domain: academic-research`), `review` (`role-play`, `Domain: coding`). `onboarding` is a core type any overlay may flavor. See *Session types vs. flavors* below.
  - **sources** — entries are either in-source (file + anchor back to `source-materials/`) or external (prefixed `[ext]` with a concrete citation). See *External-source labeling* below for the format.
  - **exercise hooks** — short outlines of proposed practice/theory exercises. The actual exercise artifacts live in `work/` and are created at session time per the active overlay; do not duplicate exercise content into the curriculum.

The curriculum is **reference-only**. It does not constrain `start-session` routing; the agent may consult it when proposing a route, but is free to deviate.

### Session types vs. flavors

The harness distinguishes a small fixed set of session **types** from open-ended overlay **flavors**. The rule:

- A **type** changes the session *protocol* — the loop the agent and user run. There are exactly four, and they are the only values a curriculum's `session type` field holds:
  - `theory` — concept discussion, definitions, intuitions, proofs on request.
  - `practice` — the agent scaffolds an exercise, the user produces, the agent reviews and pushes deeper.
  - `role-play` — an in-character session: setup out of character, role-play in character, debrief out of character. Generic protocol below.
  - `onboarding` — a guided walkthrough of an existing artifact: survey → part-by-part walkthrough with comprehension checks → reproduce a recent change. Generic protocol below.
- A **flavor** keeps the type's protocol but swaps the *scaffolding form*, the *review focus*, and sometimes the `/work/` sub-layout. Flavors are overlay-local and are **not** new types.

Worked classification:

| Overlay artifact | Type | Notes |
|---|---|---|
| legal `analysis` / `drafting` | `practice` flavors | same practice loop; different scaffolding + review |
| research `analysis` / `synthesis` / `design` / `drafting` / `review` / `venue-fit` | `practice` flavors | six flavors of one type |
| speech-therapy `simulation` | `role-play` flavor | agent = patient; user = therapist |
| academic-research `defense` | `role-play` flavor | agent = examiner; user defends own work |
| coding `review` / `interview` | `role-play` flavors | agent = reviewer / interviewer |
| coding `onboarding` (a codebase) | `onboarding` (type) | onboarding is a *type*, not a practice flavor — its loop differs |

Overlay authors: reach for a **flavor** (a new scaffolding/review shape under an existing type) before inventing anything. A genuinely new *type* would require a new protocol the four above don't cover — a high bar.

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
- The **harness `.studyenv/AGENTS.md`** (optional) — applies as the default across every sub-project. Skills read `.studyenv/CLAUDE.md` as a fallback. Sub-project value overrides this.

The override is scoped to **conversational output only** — chat replies, theory explanations, review feedback, questions to the user. The following stay in **English by default** regardless of the setting:

- code identifiers, file names, directory names
- scaffolding stub files and their instructional comments (per the active domain overlay)
- structural markdown tokens that other files depend on — status legends, field names (`Domain:`, `Language:`, `Status:`), table headers
- the plugin's trigger phrasings and skill names
- verbatim excerpts from source materials — kept in the source's original language regardless of the setting

If the user writes a single message in a different language, do **not** auto-switch — the declared setting wins. To change the language for the session or persistently, the user should say so explicitly; persistent change means updating the `Language:` field.

## Source-material handling

Source materials live in `.studyenv/<sub-project>/source-materials/`. They are user-provided and treated as canonical for that sub-project. If trained knowledge enriches a source's content, the agent **explicitly states** that the addition is outside the source.

When analyzing a source, build intermediate fixed representations in `.studyenv/<sub-project>/ai-agent-materials/`:

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

## Onboarding session protocol (generic)

`onboarding` is a core session type for **getting up to speed on an existing artifact you didn't author** — a codebase, a corpus of documents, a body of papers. The artifact *is* the source material; the goal is a working mental model and the confidence to make changes, not learning a topic from first principles. Each overlay flavors this skeleton by filling the four parameters in **bold**; the canonical worked flavor is `coding` (see `../domains/coding.md`).

The session runs in phases:

- **Phase 0 — Set up.** Identify the **target artifact** (the corpus): it is treated as a source material — either it lives under `source-materials/` (a clone/copy of a repo, a folder of documents) or the user explicitly points the agent at a path to read. The agent reads the target **read-only** and never modifies it; this is the one case it may read outside `.studyenv/`, and only the designated target. The agent then builds a terse **map** at `work/onboarding/map.md` (structure, how the pieces connect, key concepts, how to build/run where applicable) and proposes an ordering to walk through.
- **Phase 1 — Part-by-part walkthrough.** The agent teaches **one part at a time**, never a wall of explanation. For each part it (1) **explains** the part's responsibility and how it fits the whole, (2) **sends the user to read the real artifact** — naming concrete files/sections rather than pasting them — and (3) **asks comprehension/prediction questions**, checks the answers, corrects misconceptions, and pushes deeper. Progress per part is tracked in `work/onboarding/map.md` so successive sessions resume where the last left off.
- **Phase 2 — Reproduce a recent change.** To convert reading into doing, the agent picks **a few small recent changes** from the artifact's history (**what "a recent change" means** is the overlay's parameter — a commit/PR for code, a recent amendment/revision for a document corpus), presents them as an interactive choice, sets up the chosen one under `work/onboarding/reimplement/<change-id>/` with the intent and acceptance criteria but **without** the original, and has the user reproduce it. The agent then reviews and compares against what the artifact actually did.
- **Phase 3 — Wrap up.** Onboarding is **not** in-character, so there is no role-play debrief; it closes through the standard `stop-session` flow. The Journal records which parts were walked and at what comprehension, which change was reproduced and how it compared, and the next part to onboard onto.

Overlay parameters: **what the corpus is**, **what "send the user to read" points at**, **what "a recent change" means**, and the **`work/onboarding/` artifact layout**. An overlay that wants onboarding states it flavors this protocol; one that doesn't, inherits it as-is over a flat corpus.

## Role-play session protocol (generic)

`role-play` is a core session type for **in-character rehearsal**: the agent plays a role, the user plays a counterpart, and the value is in the live interaction plus the out-of-character debrief afterward. Overlays flavor it by fixing three parameters in **bold**; shipped flavors are `simulation` (speech-therapy), `defense` (academic-research), and `review` / `interview` (coding).

The session runs in three phases — the agent is **out of character** for phase 0 and phase 3, and **in character** for phases 1–2:

- **Phase 0 — Set up (out of character).** Identify what is being role-played and confirm parameters with the user: **the agent's role** (patient / examiner / reviewer / interviewer / …), **whose work is under scrutiny** (the user's own clinical handling, their research, their code change), and the format/stakes. Then announce entering character.
- **Phases 1–2 — In character.** The agent stays in role and responds as that role plausibly would. It does **not** hand over answers, coach, or break character to flag mistakes — a weak performance is met with realistic pressure, not rescue.
- **Phase 3 — Debrief (out of character).** On the user's signal, the agent steps out of character and gives a structured debrief against **the overlay's debrief rubric**, then writes artifacts to the overlay's `/work/` location and runs the standard `stop-session` updates.

**Breaking character mid-session (canonical convention).** The user can break character at any time with an explicit out-of-band signal — by convention, **square brackets** around a meta-comment, e.g. `[pause — what would this role actually do here?]` or `[break character: clarify Y]`. The agent answers out of character, then resumes on the user's cue. The agent must **never** break character *unprompted*, even when the user errs — mistakes are debrief material. Overlays reference this convention; they do not restate it.

Overlay parameters: **the agent's role**, **whose work is scrutinized**, and **the debrief rubric** (plus the `/work/` artifact location).

## Skills

The four **lifecycle skills** carry the user through bootstrap → set-curriculum → session → session-end. The one **auxiliary skill** (`adjust-level`) operates off-cycle on an existing curriculum.

| Skill | Purpose | Updates PROGRESS.md? |
| --- | --- | --- |
| `bootstrap` | Mint a new sub-project | Yes — adds Projects row + Journal entry |
| `set-curriculum` | Build or update a sub-project's `curriculum.md` from source materials, source-faithful | No (curriculum is reference, not progress) |
| `start-session` | Begin a bracketed learning session | No (the session itself does the work) |
| `stop-session` | End the session: record progress and summarize | Yes — Topics, Status, Journal in both sub-project and `.studyenv/PROGRESS.md` |
| `adjust-level` | Shift an existing curriculum simpler or harder; allowed to pull in external material with strict labeling | No (same reasoning as `set-curriculum`) |

Domain overlays at [`../domains/<domain>.md`](../domains/) refine `start-session` and (for the `role-play` and `onboarding` types — whose generic protocols are defined above) `stop-session`. They are additive — they supply domain-specific flavors of the core types and refine the generic core defined here; they do not replace it.
