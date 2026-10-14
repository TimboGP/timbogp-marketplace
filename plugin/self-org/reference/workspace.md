# The planning workspace

Shared reference for the `self-org` plugin. Every skill reads this file (and [`schema.md`](schema.md)) before touching any note. Everything the plugin generates lives under a single **planning root** folder; this file fixes how that root is found, what goes in it, and the rules for writing there.

## Why a visible folder (not `.self-org/`)

The sibling plugins keep their state in a dot-folder (`.studyenv/`, `.lean/`). This plugin's notes are meant to be *used* day to day in a Markdown knowledge base — Obsidian in particular, which hides dot-folders. So the root is an ordinary, visible folder (by convention named `Planning/`), usually inside the user's Obsidian vault. The same ownership rule still applies: **the plugin reads and writes only inside the planning root.** The only thing it looks at outside the root is file *names* in the surrounding vault, to keep link targets unambiguous (see *Links*).

## Finding the planning root

Resolve it at the start of every skill, in this order, and use the first match:

1. **A path the user named** in the request ("plan my day in ~/notes/Planning").
2. **`SELF_ORG_HOME`** — run `printenv SELF_ORG_HOME`. If set and the folder exists, use it. If set but missing, say so and ask whether to create it.
3. **The current folder**, if it contains `Planning.base` (the user started the agent inside the root).
4. **`./planning`** under the current folder, if it exists.
5. **Ask once**: offer the current folder (first, if it's empty or named `Planning`), `./planning` here, or a path the user types. After creating it, tell the user how to make it permanent: set `SELF_ORG_HOME` in a file their agent's shell actually reads (for zsh, `~/.zshenv` — agent shells are not interactive and skip `~/.zshrc`), or in the agent's own settings (see the plugin's `docs/setup.md`).

The path often contains spaces (iCloud paths do). Always quote it in shell commands and pass absolute paths to file tools.

**Find the vault.** Walk up from the root to the nearest folder containing `.obsidian/`; that is the vault root. Remember the root's vault-relative path (e.g. `Planning`) — `Planning.base` and links need it. No vault found is fine: the notes are plain Markdown; only the Bases dashboard is Obsidian-specific.

**Writes outside the working folder.** If the agent refuses or asks for approval on every write because the root is outside the current working folder, say so once and point to `docs/setup.md` (Claude Code: `/add-dir` or `permissions.additionalDirectories`; Codex: `--add-dir` or `writable_roots`). Don't work around it.

## Layout

```
<root>/
  Planning.base               ← Obsidian Bases dashboard (Today, Eisenhower, Goals, Reviews)
  Projects/<Name>.md          ← one note per project: description, horizon, embedded goal/task views
  Goals/<Name>.md             ← one note per SMART goal
  Tasks/<Title>.md            ← one note per task, TaskNotes-compatible frontmatter
  Days/YYYY-MM-DD ALPEN.md    ← one note per planned day: plan + evening review
  AGENTS.md                   ← OPTIONAL user preferences; read if present, never auto-created
```

**Created lazily.** Create a folder only when its first note is written. Create `Planning.base` from `../templates/planning.base` the first time any skill writes into the root (fill in the vault-relative root; if there's no vault, use the root's folder name). Never pre-create empty trees.

**Day notes are named `YYYY-MM-DD ALPEN.md`**, not `YYYY-MM-DD.md`, so they never collide with a vault's ordinary daily notes.

## Optional `<root>/AGENTS.md`

Read it if present; never create it unprompted (offer to, when the user states a lasting preference). Recognised fields, one per line:

```markdown
Language: de
Workday: 08:30–17:00, 45 min break
Workdays: Mon–Fri
Planned share: 60%
Estimate factor: 1.0
Urgent within: 3 workdays
```

Missing fields fall back to: English, ask for the workday, Mon–Fri, 60 %, 1.0, 3 workdays.

## Rules for writing

- **Never delete.** No note is ever removed by this plugin. Dropping a task sets `status: dropped`; abandoning a goal sets `status: dropped` with a Log line.
- **Edit, don't rewrite.** The user also edits these notes (in Obsidian, in an editor). Change frontmatter fields and append to sections with targeted edits; never regenerate a whole existing note. Set `dateModified` on every task you change.
- **Absolute dates only.** Get today with `date +%F` (and the weekday with `date +%A`). Convert "tomorrow", "Friday", "end of month" to `YYYY-MM-DD` before writing. Timestamps (`dateCreated`, `dateModified`) use `date +%Y-%m-%dT%H:%M:%S%z`.
- **Read many tasks cheaply.** To collect tasks, grep the frontmatter of `Tasks/*.md` in one call (e.g. for `status:`, `urgent:`, `scheduled:`) instead of opening every file; open only the ones you will change or need detail from.
- **iCloud placeholders.** If you see `*.icloud` files in the root, the real notes are not downloaded. Report them and suggest "Keep Downloaded" on the folder; don't treat them as missing notes.
- **Show what you wrote.** End every skill with the list of notes created or changed (relative to the root).

## File names and links

- **Names:** use the human title as the file name, stripped of characters Obsidian forbids in links (`[ ] # ^ | \ / : * ? " < >`). Keep it short; put detail in the body.
- **Unique across the vault.** Before creating a note, check that no other file in the whole vault has the same base name (a quick `find <vault> -name "<Name>.md"`). If one exists, either choose a more specific name or write path-qualified links (`[[Planning/Goals/Ship v1|Ship v1]]`).
- **Links are wiki-links** (`[[Name]]`) inside frontmatter values that hold links, quoted: `project: "[[Website relaunch]]"`, `projects: ["[[Website relaunch]]"]`. That's the form both Obsidian Bases and TaskNotes resolve.

## Asking the user

All three method skills are interviews. Ask the same way everywhere:

- **Use the agent's structured-question tool if it has one** (in Claude Code that's `AskUserQuestion`; Codex sessions may offer `request_user_input`). Otherwise print a short numbered list and wait for a reply like `1,3` or `2: schedule 2026-10-20`.
- **At most 3 questions per call, at most 3 options each**, plus free text. Put your recommended option first and give the one-line reason in its description.
- **Batch, don't drip.** When there are many items (tasks to triage, estimates to confirm), show one table with your proposals and ask once: *Accept all / Adjust some / One by one*. Only drill into the rows the user wants to change.
- **Draft, then ask.** Never ask an open question you could have drafted an answer to — propose wording, numbers, dates, and let the user pick or correct.

## Language

Default conversational language is English; `Language:` in `<root>/AGENTS.md` overrides it, and so does the user simply writing in another language. **Structural tokens stay in English regardless:** frontmatter keys and values (`status: open`, `priority: high`), note types, section headings defined by the templates, file and folder names, and skill names. Free text the user writes (goal statements, task titles, lessons) stays in the language they used.
