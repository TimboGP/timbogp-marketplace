# Invoking the skills

The plugin ships **no separate slash commands or agents**. Each skill is its own slash command, identical on **Claude Code** and **Codex**, and every skill also triggers from natural language.

| Skill | Invocation | Example phrases |
|---|---|---|
| [`smart-goals`](smart-goals.md) | `/self-org:smart-goals` | "turn this project description into SMART goals", "review my goals" |
| [`eisenhower`](eisenhower.md) | `/self-org:eisenhower` | "prioritise my tasks", "what can I drop or delegate?" |
| [`alpen`](alpen.md) | `/self-org:alpen` | "plan my day", "plan tomorrow", "review my day" |
| [`help`](help.md) | `/self-org:help [topic]` | "what can self-org do?", "how does ALPEN work?" |

Why no commands: Claude Code namespaces plugin commands (`/self-org:<file>`), so a `self-org-help` command would only have duplicated `/self-org:help`, and Codex has no command concept. Keeping the whole surface in skills means both agents get exactly the same thing.
