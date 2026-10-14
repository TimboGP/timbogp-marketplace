# self-org

A self-organization coach for Claude Code and Codex. It chains three classic methods into one interactive loop:

```
project description ─▶ SMART goals ─▶ Eisenhower triage ─▶ ALPEN day plan ─▶ evening review
```

1. **SMART goals** — turn an overarching project description into 2–4 goals that are Specific, Measurable, Achievable, Relevant, and Time-bound, checked letter by letter, with first next actions.
2. **Eisenhower matrix** — triage open tasks by urgent × important into *do*, *schedule*, *delegate*, or *drop*, confirmed in one batch.
3. **ALPEN** — plan a single day realistically: list tasks and appointments, estimate them, keep ~40 % buffer, cut by quadrant until it fits; in the evening, review and carry unfinished work forward.

Everything is saved as **plain Markdown notes in one visible planning folder** — designed for an Obsidian vault: one note per task with **TaskNotes-compatible** frontmatter, and a `Planning.base` dashboard (Obsidian core Bases) with Today, Eisenhower, Goals, and Reviews views. No Obsidian community plugin is required; installing TaskNotes later needs no migration.

> Credits: SMART — George T. Doran (1981); the urgent/important distinction — attributed to Dwight D. Eisenhower (1954), the matrix popularised by Stephen R. Covey; ALPEN — Lothar J. Seiwert. Details and what the plugin adapts: [`reference/methods.md`](reference/methods.md).

## Install

For **Claude Code**, install from the [`timbogp`](https://github.com/TimboGP/timbogp-marketplace) marketplace:

```sh
/plugin marketplace add TimboGP/timbogp-marketplace
/plugin install self-org@timbogp
```

For **Codex**, install from a clone of the repo via the Codex catalog at [`.agents/plugins/marketplace.json`](../../.agents/plugins/marketplace.json):

```sh
codex plugin marketplace add .
```

**Per-agent surface.** The plugin's **skills** are the shared, cross-agent surface — each skill is its own slash command on both agents (`/self-org:smart-goals`, `/self-org:eisenhower`, `/self-org:alpen`, `/self-org:help`) and triggers from natural language. There are no separate commands or agents, so nothing is Claude-Code-only.

**Then set up the planning folder** — where notes go and how to let the agent write there: [`docs/setup.md`](docs/setup.md). Per-skill usage guides live in [`docs/`](docs/README.md).

## Quick start

Just ask in natural language — skills trigger automatically:

- "Here's my project: … — turn it into SMART goals."
- "Prioritise my open tasks."
- "Plan my day. I have a stand-up at 10:00 (15 min) and a review at 14:00 (1 h)."
- "Review my day."
- "Review my goals."

Or invoke a skill explicitly: `/self-org:smart-goals`, `/self-org:eisenhower`, `/self-org:alpen`, and `/self-org:help [topic]` for help.

## Skills

- **`smart-goals`** — project description → project note → 2–4 candidate goals → sharpen each (statement, metric baseline → target, due date) → per-letter SMART check → goal notes → optional next-action tasks. Review mode updates progress. Writes `Projects/`, `Goals/`, `Tasks/`.
- **`eisenhower`** — proposes urgent/important for open, untriaged tasks with a reason each, confirms in one batch, and records do (priority high) / schedule (a date) / delegate (a person, or an alternative) / drop (`status: dropped`, never deleted). Edits `Tasks/`.
- **`alpen`** — plan mode runs A-L-P-E and writes `Days/YYYY-MM-DD ALPEN.md`; review mode (N) marks done / partial / not done, carries tasks forward, and records estimate accuracy and buffer use, suggesting calibration over time.
- **`help`** — explains the plugin, or a specific skill, method, or setup topic (`/self-org:help`).

## The planning folder

```
<root>/
  Planning.base               ← Obsidian Bases dashboard
  Projects/<Name>.md          Goals/<Name>.md          Tasks/<Title>.md
  Days/YYYY-MM-DD ALPEN.md    AGENTS.md (optional preferences)
```

The root is found via a path you name, the `SELF_ORG_HOME` environment variable, or the current folder — otherwise the plugin asks once. It's a visible folder (not a dot-folder) so Obsidian shows it. The plugin reads and writes only inside it, creates folders lazily, edits notes in place rather than rewriting them, and never deletes anything. Full rules: [`reference/workspace.md`](reference/workspace.md); frontmatter of every note type and the dashboard: [`reference/schema.md`](reference/schema.md).

## Conventions

- Skill bodies are imperative and concise; method detail lives in each skill's `references/`, shared rules in [`reference/`](reference/).
- **Draft, then ask.** Interviews propose wording, numbers, and dates for you to pick or correct, in batches — never a long string of open questions. They use the agent's structured-question tool when available and numbered lists otherwise.
- **Task notes are the source of truth**; day notes hold snapshots and review numbers.
- English by default for structural tokens (frontmatter keys and values, section headings, file names); conversational language follows you or `Language:` in the planning folder's `AGENTS.md`.

## Not yet (planned)

- A Kanban-style Eisenhower board (Obsidian Bases Kanban, 1.14.4+).
- A weekly review and Q2 time-blocking across the week.

## Credits & trademarks

This plugin is an **independent, unofficial** tool that applies publicly described methods, with attribution: SMART goals (George T. Doran, *Management Review*, 1981), the urgent/important distinction and the time-management matrix (attributed to Dwight D. Eisenhower; popularised by Stephen R. Covey in *The 7 Habits of Highly Effective People* and *First Things First*), and the ALPEN method (Lothar J. Seiwert). See [`reference/methods.md`](reference/methods.md).

"The 7 Habits of Highly Effective People" is a trademark of FranklinCovey Co. Obsidian is a trademark of its respective owner. TaskNotes is an independent open-source Obsidian plugin. Names are used **nominatively**; this plugin is **not affiliated with, authorized, sponsored, or endorsed by** any of them. The plugin's own code and text are MIT-licensed. See [`NOTICE`](NOTICE).
