# Domain overlay: coding

This overlay applies to any sub-project that declares `Domain: coding` in its `AGENTS.md` (or, for older projects, `CLAUDE.md`). It refines the generic core defined by the agentic-study-environment plugin (see [`../reference/conventions.md`](../reference/conventions.md) and the lifecycle skills under `../skills/`) — it does not replace it. Everything not redefined here continues to follow the generic core.

Paths in this overlay (`work/`, …) are relative to the sub-project root, which is `.studyenv/<name>/`.

## Session types

In addition to the generic `theory` and `practice` session types, this overlay introduces a third:

- `onboarding` — the agent walks the user through an **existing codebase** part by part to build familiarity: it explains one subsystem at a time, sends the user to read the actual code, checks comprehension with questions, and then has the user **reimplement a small recent change** picked from the project's history. Use it when joining a codebase someone else wrote, rather than learning a topic from scratch.

Curriculum entries (in `ai-agent-materials/curriculum.md`) may use `onboarding` as a session-type value alongside `theory` and `practice`. At session start, the agent considers all three when proposing a route.

Theory and practice sessions keep their generic coding shape (below). Onboarding sessions follow the protocol further down.

## Practice session shape

For coding sub-projects, a practice session is **"implement it, test it, break it"**:

1. The agent proposes a concrete exercise grounded in the current theory topic.
2. The agent prepares the scaffolding (see *Scaffolding form* below).
3. The user implements.
4. The agent reviews (see *Review focus* below) and pushes deeper — alternative implementations, edge cases, performance characteristics, idiomatic restructuring.

Theory sessions for coding domains lean on the matching vocabulary: complexity, correctness, formal definitions, invariants.

## Onboarding session protocol

Onboarding familiarizes the user with a codebase they did **not** write — a new job's repository, an open-source project, a teammate's service. Here the codebase *is* the source material; the goal is a working mental model and the confidence to make changes, not learning a topic from first principles.

The session runs in three phases.

### Phase 0 — Set up

1. **Identify the target codebase.** It is treated as a source material for the sub-project: either it lives under `source-materials/` (a clone, worktree, or copy — e.g. `source-materials/<repo>/`), or the user explicitly points the agent at a path/repository to read for onboarding. The agent reads the onboarding target **read-only** and never modifies it; the user's reimplementation work happens under `work/` (below). This is the one case where the agent may read code outside `.studyenv/`, and only the explicitly designated target.
2. **Survey before teaching.** The agent builds a terse map of the codebase in `work/onboarding/map.md`: entry points, top-level structure, how to build / run / test, the main subsystems and how they connect, and the key domain concepts. It also skims recent history (`git log`, recently merged PRs) to find candidate changes for Phase 2.
3. **Agree the path.** The agent proposes an ordering of subsystems to walk through (dependencies first) and confirms scope with the user before teaching.

### Phase 1 — Concept walkthrough (part by part)

The agent teaches the codebase **one part at a time** — never a wall of explanation. For each part:

1. **Explain** the subsystem: its responsibility, its main types/functions, how it fits the whole, and the patterns and conventions it follows.
2. **Send the user to the code.** Name concrete files and symbols and ask the user to open and read them — *"read `src/router.ts` and the `dispatch()` it exports"* — rather than pasting the code for them. Reading the real code is the point.
3. **Ask questions to answer.** Pose a few comprehension / prediction questions the user must answer — *"where does a request first get authenticated?"*, *"what breaks if you remove this guard?"* — then check the answers, correct misconceptions, and push deeper before moving on.

Track which parts have been covered (and the user's comprehension on each) in `work/onboarding/map.md` so successive sessions resume where the last left off.

### Phase 2 — Reimplement a recent change

To convert reading into doing, the agent picks **a few smaller recent changes** from the project's history — a self-contained commit or PR small enough to redo in one sitting (a bug fix, a small feature, a one-function refactor), ideally touching a subsystem already walked through.

1. The agent presents the candidates as an **interactive choice** — a short list, one line each — and lets the user pick one (or ask for different candidates).
2. The agent sets up the exercise under `work/onboarding/reimplement/<change-id>/`: it states the change's intent and acceptance criteria, and stubs out or reverts the change in a scratch copy of the affected files **without** showing the original diff. The original solution is kept aside for review.
3. The user reimplements the change.
4. The agent reviews per *Review focus*, then compares the user's version against what the project actually shipped — where they diverged, which approach is more idiomatic for this codebase, and why the real change was made the way it was.

### Phase 3 — Wrap up

Onboarding is not an in-character session, so there is no role-play debrief. On the user's stop signal the agent records the session per the generic `stop-session` flow: which subsystems were walked and at what comprehension, which change was reimplemented and how it compared, and a suggested next part to onboard onto.

## Scaffolding form

Scaffolding for coding exercises takes the form of **stub files with comments as instructions** — both inline (`// ...`, `# ...`) and multi-line (`/* ... */`, `""" ... """`) comments are fine; pick whichever fits the language and the size of the instruction. Stub files live under `work/` in the location dictated by the tech stack's conventional project layout.

For `onboarding` sessions the scaffolding is twofold: the **walkthrough map** (`work/onboarding/map.md`) the agent builds and annotates as it teaches, and — for the Phase 2 exercise — a **scratch copy of the affected files with the target change stubbed out or reverted** under `work/onboarding/reimplement/<change-id>/`, plus a written statement of the change's intent and acceptance criteria. The original implementation is withheld until review.

## Review focus

Code review covers **both correctness and style/idiomacy** for the chosen language and tool stack — call out idiomatic alternatives, not just bugs. Examples worth surfacing:

- standard-library functions or patterns that replace hand-rolled equivalents
- naming, formatting, and structural conventions of the language community
- memory/ownership/lifetime patterns idiomatic to the language
- testing idioms (table-driven, property-based, fixtures, etc.)

For `onboarding` reimplementations, review also weighs the user's solution against **how this codebase actually solved it**: does the user's version follow the project's conventions and the surrounding patterns, and where it diverges, which is better and why? Phase 1 comprehension answers are reviewed the same way — correct, and consistent with how the code really behaves.

## `/work/` layout

Layout follows the conventional project structure for the sub-project's tech stack. Examples:

- **C** — CMake-style: `src/`, `include/`, `tests/`, top-level `CMakeLists.txt`. Small assert-based test executables registered with CTest are fine; no external test framework required unless declared.
- **Python** — `pyproject.toml` at the top, `src/<pkg>/`, `tests/`, optional `notebooks/`.
- **Other languages** — match the language's prevailing layout.

`notes.md` and `proofs.md` typically live at the top of `/work/`.

For `onboarding` sessions, artifacts live under `work/onboarding/`:

```
work/
  onboarding/
    map.md                 ← part-by-part codebase map + per-part comprehension notes
    reimplement/
      <change-id>/         ← one folder per reimplementation exercise
        brief.md           ← the change's intent + acceptance criteria
        <scratch files>    ← affected files with the change stubbed/reverted, for the user to redo
        review.md          ← the agent's review + comparison against the real change
```

## Tools & Materials field

For coding sub-projects, the `Tools & Materials` section in the sub-project `AGENTS.md` should declare at minimum:

- **language** and version (e.g. *Python ≥ 3.12*, *C23 with C17 fallback*)
- **build system** (e.g. CMake, Cargo, pyproject + uv/poetry)
- **test framework** (or "roll-your-own assert-based" if none)
- any other load-bearing tools — formatter/linter, notebook runtime, data libraries, etc.

Existing sub-projects may use the older `Tech Stack` heading — the overlay treats `Tech Stack` and `Tools & Materials` as equivalent until those sub-projects are renamed on a future touch.
