# Commands

The `/lean-*` slash commands are **Claude Code conveniences** — thin entry points that drive the plugin's skills. On **Codex** there is no command concept; invoke the underlying skill directly (e.g. `/lean-coach:lean-canvas`) or by natural language. The real capability always lives in the skill, so both agents are at parity.

| Command | Drives skill | Argument | What it does |
|---|---|---|---|
| **`/lean-coach`** | [`lean-coach`](lean-coach.md) | `[topic]` | Orient: stage, riskiest untested assumption, smallest next step; onboards the `.lean/` workspace and routes. |
| **`/lean-canvas`** | [`lean-canvas`](lean-canvas.md) | `[idea\|segment\|path]` | Build or refine the 9-block Lean Canvas; writes `.lean/canvas.md`. |
| **`/lean-interview`** | [`customer-interview`](customer-interview.md) | `[problem\|solution\|mvp]` | Role-play a customer interview, then debrief; writes `.lean/interviews/`. |
| **`/lean-role`** | [`lean-roles`](lean-roles.md) | `[persona]` | Switch the agent into a persona (business-partner / devils-advocate / mentor / customer / investor) and run the role-play protocol. |
| **`/lean-help`** | [`help`](help.md) | `[topic]` | Explain the plugin, or a specific skill/command/agent/role. |

Commands reference bundled files via `${CLAUDE_PLUGIN_ROOT}` so they resolve regardless of where the plugin is installed. They are intentionally thin: they orchestrate skills, they don't re-implement them.
