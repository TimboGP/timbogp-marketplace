# Setup

One-time setup for the **self-org** plugin: choose the planning folder, tell your agent where it is, and let the agent write there. Five minutes; everything is optional except step 1 — without it the plugin simply asks where to save.

## 1. Choose the planning folder

Any folder works. The intended home is a folder named `Planning/` inside your Obsidian vault, e.g.

```
~/Library/Mobile Documents/iCloud~md~obsidian/Documents/<vault>/Planning
```

You don't have to create the subfolders or the dashboard — the first skill run creates `Planning.base` and each subfolder as it's needed.

## 2. Tell the agent where it is

The plugin looks, in order, for: a path you name in the request → the `SELF_ORG_HOME` environment variable → the current folder (if it contains `Planning.base`) → `./planning` → otherwise it asks once. Pick one of these:

**Start the agent inside the folder** (no configuration):

```sh
cd "<vault>/Planning" && claude      # Claude Code
codex -C "<vault>/Planning"          # Codex
```

The first run asks once; choose the current folder. From then on `Planning.base` marks it.

**Set `SELF_ORG_HOME`** (works from any project). The variable must be visible to the *agent's* shell, which is usually non-interactive — so for zsh put it in `~/.zshenv`, not `~/.zshrc`:

```sh
# ~/.zshenv
export SELF_ORG_HOME="$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/<vault>/Planning"
```

Or set it in the agent's own settings — use an **absolute path** there; neither expands `~` or `$HOME`:

- **Claude Code** — `~/.claude/settings.json`:

  ```json
  { "env": { "SELF_ORG_HOME": "/Users/<you>/Library/Mobile Documents/iCloud~md~obsidian/Documents/<vault>/Planning" } }
  ```

- **Codex** — `~/.codex/config.toml`:

  ```toml
  [shell_environment_policy.set]
  SELF_ORG_HOME = "/Users/<you>/Library/Mobile Documents/iCloud~md~obsidian/Documents/<vault>/Planning"
  ```

Check it from a new session: ask the agent to run `printenv SELF_ORG_HOME`.

## 3. Let the agent write there

If the planning folder is outside the folder you started the agent in, the agent needs permission to write to it:

- **Claude Code** — per session: `/add-dir "<path>"`, or start with `claude --add-dir "<path>"`. Permanently: add the absolute path to `permissions.additionalDirectories` in `~/.claude/settings.json`. Without this, Claude Code asks for approval on each write.
- **Codex** — per session: `codex --add-dir "<path>"`. Permanently: in `~/.codex/config.toml`,

  ```toml
  [sandbox_workspace_write]
  writable_roots = ["/Users/<you>/Library/Mobile Documents/iCloud~md~obsidian/Documents/<vault>/Planning"]
  ```

  In the `workspace-write` sandbox, writes outside the working folder and `writable_roots` are blocked or need approval.

Starting the agent inside the planning folder (step 2) avoids this entirely.

## 4. iCloud Drive

If the vault is in iCloud Drive and *Optimize Mac Storage* is on, macOS may replace notes with `.icloud` placeholders the agent can't read. In Finder, right-click the planning folder → **Keep Downloaded**. The skills report any placeholders they find.

## 5. Obsidian

- **Bases** must be enabled (Settings → Core plugins → Bases); Obsidian **1.10 or newer** for the grouped views. Open `Planning.base` for the Today, Eisenhower, Goals, and Reviews views; each project note embeds its own goals-and-tasks view.
- **Property types** (recommended): in a task note, set `urgent` and `important` to *Checkbox*; `due`, `scheduled`, `completedDate`, and `date` to *Date*; `timeEstimate` and the day-note numbers to *Number*. Obsidian then shows proper editors, and Bases compares dates reliably. The *Properties view* core plugin is optional.
- Day notes are named `YYYY-MM-DD ALPEN.md`, so they never collide with your regular daily notes.

## 6. Preferences (optional)

Create `<planning folder>/AGENTS.md` with any of:

```markdown
Language: de
Workday: 08:30–17:00, 45 min break
Workdays: Mon–Fri
Planned share: 60%
Estimate factor: 1.0
Urgent within: 3 workdays
```

The `alpen` review suggests `Estimate factor` and `Planned share` changes once it has a few days of data; it only edits this file when you say yes.

## 7. Adopting TaskNotes later (optional)

Task notes already use [TaskNotes](https://github.com/callumalpass/tasknotes)' default fields, so installing it needs no migration. In TaskNotes' settings:

1. Set the default tasks folder to `<planning folder>/Tasks`.
2. Keep tag-based task identification with the tag `task`.
3. Add a status `dropped` and mark it as completed.
4. Register `goal`, `urgent`, `important`, and `delegatedTo` as user fields.

The plugin keeps working the same way; TaskNotes adds its own task views, calendar, and time tracking on top. Schema details: [`reference/schema.md`](../reference/schema.md).
