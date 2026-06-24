---
name: help
description: Explain the agentic-study-environment plugin — what it does, the lifecycle skills it ships, the domain overlays, the session types, and the key conventions — or a specific one of those if the user names it. Use this skill whenever the user asks for help with the study harness itself rather than asking to study something: phrases like "help with agentic-study-environment", "what can the study harness do", "how does this plugin work", "list the study skills", "how do I use set-curriculum", "what domains are there", "explain session types", or the /study-help command. With no topic, give the full overview; with a named skill, overlay, session type, or convention, explain just that. Do NOT use this to bootstrap, set a curriculum, or run a session — those are the lifecycle skills.
---

# agentic-study-environment help

Explain the **agentic-study-environment** harness to the user. This skill is the plugin's built-in guide — it answers "what is this and what can it do?" and "how do I use X?" so the user doesn't have to read the docs tree first.

This skill never creates or modifies any `.studyenv/` files — it only explains. If the user actually wants to study, hand off to the lifecycle skill they need (`bootstrap`, `set-curriculum`, `start-session`, `stop-session`, `adjust-level`).

## How to respond

Look at what the user asked for (the `$ARGUMENTS` from `/study-help`, or the topic named in natural language):

- **No topic** → give the **full overview** below, then point to the docs and the getting-started path.
- **A specific topic** (a skill, a domain overlay, a session type, or a convention like "tracking", "language", "status", "curriculum") → explain **just that one**: what it is, when it applies, and where it's defined. Read the matching `docs/<skill>.md`, `domains/<name>.md`, or `reference/conventions.md` section and fold in the specifics. If ambiguous, list the close matches and ask.

Keep it skimmable: one-line answer first, then detail. Summarize and link rather than dumping file contents.

## Full overview (use when no topic is named)

**agentic-study-environment** is a coding-agent **learning harness**: you bring a topic and source material (a paper, a book, a syllabus, a clinical case load, anything), and the agent becomes a tutor that brackets the work into focused **sessions**, keeps a per-project **curriculum** and **progress log**, and adapts its teaching shape to the **domain** you're studying via swappable **overlays**. It's a harness, not a course — there's no built-in content.

Everything it generates lives under a single `.studyenv/` directory at the project root, organized as one or more **sub-projects** (one topic each). The host project's own files are never touched.

### Lifecycle skills (the cross-agent surface)

| Skill | Trigger | What it does |
|---|---|---|
| `bootstrap` | "bootstrap a project for X" | Mint a new sub-project (`.studyenv/<name>/` with `AGENTS.md`, `CLAUDE.md`, `PROGRESS.md`, `source-materials/`); register it in `.studyenv/PROGRESS.md`. |
| `set-curriculum` | "set curriculum for X" | Build or update `.studyenv/<name>/ai-agent-materials/curriculum.md` from the source materials, source-faithfully. |
| `start-session` | "start session", "let's work on X" | Begin a bracketed session (theory / practice / role-play / onboarding, with the active overlay's flavor); load the domain overlay. |
| `stop-session` | "stop session", "wrap up" | Record progress to the sub-project + `.studyenv/PROGRESS.md`, and summarize what was covered. |
| `adjust-level` | "simplify this", "make it harder", "build up to this paper" | Rewrite the curriculum at a different level, pulling in external material with strict source labels. |
| `help` | "help with the harness" | This guide. |

Skills trigger from natural language — you rarely name them. On Codex they're exposed as slash commands (`/agentic-study-environment:bootstrap`, `/agentic-study-environment:help`, …); on Claude Code the `/study-help` command is a thin convenience over this skill.

### The lifecycle loop

```
bootstrap → set-curriculum → start-session ⇄ stop-session
                                  ▲
                             adjust-level   (re-level whenever the difficulty doesn't fit)
```

### Session types

Four **core types** (a type changes the session loop): `theory`, `practice`, `role-play`, `onboarding`. Each domain overlay adds **flavors** (same loop, different scaffolding + review focus) — e.g. speech-therapy `simulation` and academic-research `defense` are role-play flavors; coding adds `review` / `interview` flavors. The full type-vs-flavor rule lives in `reference/conventions.md`.

### Domain overlays

The teaching *shape* (scaffolding form, review focus, `/work/` layout, special flavors) comes from the sub-project's `Domain:`:

- `coding` — stub-file scaffolding, idiomacy review, language-appropriate `/work/` layouts, the codebase flavor of `onboarding`, and `review` / `interview` role-play flavors.
- `speech-therapy` — therapist–patient `simulation` (a role-play flavor) over theory and practice.
- `legal-documents` — prescribed-form drafting scaffolds, analysis frames (case briefs, redlines), legal-precision/citation review.
- `academic-research` — the research lifecycle: critical-reading and literature-synthesis frames, manuscript/proposal scaffolds, peer-review and venue-fit exercises, and a `defense` role-play flavor.

A sub-project with no `Domain:` falls back to a neutral default (theory + practice over markdown notes under `/work/`). New overlays are the highest-leverage contribution — see `domains/ADDING_AN_OVERLAY.md`.

### Key conventions (quick reference)

- **Language** — default English; override per-sub-project (or globally via `.studyenv/AGENTS.md`) with `Language: <BCP 47 tag>`. Structural tokens (status legends, field names, skill names) stay English.
- **Topic status** — `introduced` · `exercised` · `reviewed` (record the highest reached).
- **Sub-project status** — `created` · `ready` · `in progress` · `blocked` · `stopped` · `finished`.
- **Tracking scope** — `Tracking: global` (default) registers a sub-project in the cross-project `.studyenv/PROGRESS.md`; `Tracking: local-only` keeps just the sub-project's own `PROGRESS.md`.

Full conventions: `reference/conventions.md`.

### Getting started

1. **Bootstrap** — "bootstrap a project called `tasep` to learn the totally asymmetric simple exclusion process" (optionally with `Domain:`, `Language:`, `Tracking:`, Tools & Materials).
2. **Drop source materials** into `.studyenv/<name>/source-materials/`.
3. **Set the curriculum** — "set curriculum for `tasep`".
4. **Start a session** — "start session" proposes a topic + type; override as you like.
5. **Stop the session** — "stop session" records progress and summarizes.

### Where to go next

- Per-skill guides: `docs/README.md` and the per-skill pages in `docs/`.
- Domain overlays overview: `docs/domains.md`.
- Plugin overview, transcripts, install, FAQ, limitations: `README.md`.

## Resolving a named topic

Map the user's word before explaining:

- **"bootstrap", "new project", "set up a topic"** → `bootstrap` (`docs/bootstrap.md`).
- **"curriculum", "plan", "syllabus"** → `set-curriculum` (`docs/set-curriculum.md`).
- **"start", "session", "study", "let's work on"** → `start-session` (`docs/start-session.md`).
- **"stop", "wrap up", "record progress"** → `stop-session` (`docs/stop-session.md`).
- **"level", "too hard", "too easy", "simplify", "harder"** → `adjust-level` (`docs/adjust-level.md`).
- **"domain", "overlay", "coding / speech-therapy / legal / research"** → `docs/domains.md` and the matching `domains/<name>.md`.
- **"session type", "theory / practice / role-play / onboarding", "flavor"** → `reference/conventions.md` (*Session types vs. flavors*).
- **"tracking", "global vs local"**, **"language"**, **"status"**, **"curriculum format"**, **"layout"** → the matching section of `reference/conventions.md`.

Then open the matching file and explain from it.
