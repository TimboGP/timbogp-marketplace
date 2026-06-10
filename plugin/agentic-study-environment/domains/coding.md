# Domain overlay: coding

This overlay applies to any sub-project that declares `Domain: coding` in its `AGENTS.md` (or, for older projects, `CLAUDE.md`). It refines the generic core defined by the agentic-study-environment plugin (see [`../reference/conventions.md`](../reference/conventions.md) and the lifecycle skills under `../skills/`) — it does not replace it. Everything not redefined here continues to follow the generic core.

## Practice session shape

For coding sub-projects, a practice session is **"implement it, test it, break it"**:

1. The agent proposes a concrete exercise grounded in the current theory topic.
2. The agent prepares the scaffolding (see *Scaffolding form* below).
3. The user implements.
4. The agent reviews (see *Review focus* below) and pushes deeper — alternative implementations, edge cases, performance characteristics, idiomatic restructuring.

Theory sessions for coding domains lean on the matching vocabulary: complexity, correctness, formal definitions, invariants.

## Scaffolding form

Scaffolding for coding exercises takes the form of **stub files with comments as instructions** — both inline (`// ...`, `# ...`) and multi-line (`/* ... */`, `""" ... """`) comments are fine; pick whichever fits the language and the size of the instruction. Stub files live under `work/` in the location dictated by the tech stack's conventional project layout.

## Review focus

Code review covers **both correctness and style/idiomacy** for the chosen language and tool stack — call out idiomatic alternatives, not just bugs. Examples worth surfacing:

- standard-library functions or patterns that replace hand-rolled equivalents
- naming, formatting, and structural conventions of the language community
- memory/ownership/lifetime patterns idiomatic to the language
- testing idioms (table-driven, property-based, fixtures, etc.)

## `/work/` layout

Layout follows the conventional project structure for the sub-project's tech stack. Examples:

- **C** — CMake-style: `src/`, `include/`, `tests/`, top-level `CMakeLists.txt`. Small assert-based test executables registered with CTest are fine; no external test framework required unless declared.
- **Python** — `pyproject.toml` at the top, `src/<pkg>/`, `tests/`, optional `notebooks/`.
- **Other languages** — match the language's prevailing layout.

`notes.md` and `proofs.md` typically live at the top of `/work/`.

## Tools & Materials field

For coding sub-projects, the `Tools & Materials` section in the sub-project `AGENTS.md` should declare at minimum:

- **language** and version (e.g. *Python ≥ 3.12*, *C23 with C17 fallback*)
- **build system** (e.g. CMake, Cargo, pyproject + uv/poetry)
- **test framework** (or "roll-your-own assert-based" if none)
- any other load-bearing tools — formatter/linter, notebook runtime, data libraries, etc.

Existing sub-projects may use the older `Tech Stack` heading — the overlay treats `Tech Stack` and `Tools & Materials` as equivalent until those sub-projects are renamed on a future touch.
