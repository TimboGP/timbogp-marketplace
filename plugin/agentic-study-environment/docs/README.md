# agentic-study-environment — Skill Documentation

How to use each skill in the **agentic-study-environment** plugin. Skills activate automatically based on what you ask for — you rarely need to name them. This directory documents what each one does, the phrases that trigger it, and the files it reads and writes.

> New here? Start with the [plugin overview](../README.md). Install with `/plugin install agentic-study-environment@timbogp`.

## The lifecycle

The skills form a loop around a learning **sub-project**:

```
bootstrap → set-curriculum → start-session ⇄ stop-session
                                  ▲
                             adjust-level   (re-level the curriculum whenever it doesn't fit)
```

1. **bootstrap** mints the sub-project.
2. **set-curriculum** turns your source materials into an ordered teaching plan.
3. **start-session** / **stop-session** are the repeating unit of work — bracketed study with recorded progress.
4. **adjust-level** re-levels the curriculum (simpler or harder) whenever the difficulty doesn't match where you are.

## Skills

| Skill | Use it to… |
|---|---|
| [bootstrap](bootstrap.md) | Scaffold a new learning sub-project and register it in the tracker |
| [set-curriculum](set-curriculum.md) | Build or refresh the teaching plan from source materials |
| [start-session](start-session.md) | Begin a bracketed study session (theory / practice / role-play / onboarding) |
| [stop-session](stop-session.md) | Record progress, update the journals, and summarize |
| [adjust-level](adjust-level.md) | Re-level the curriculum up or down, labeling any external material |

## Domains

The teaching *shape* of a session (scaffolding form, review focus, `/work/` layout, special session types) comes from the sub-project's **domain overlay**. See [domains.md](domains.md) for what overlays are, the ones that ship, and how a sub-project selects one.

## See also

- [Plugin README](../README.md) — overview, transcripts, install, FAQ, limitations.
- [`reference/conventions.md`](../reference/conventions.md) — status legends, sub-project layout, language rules, curriculum format.
