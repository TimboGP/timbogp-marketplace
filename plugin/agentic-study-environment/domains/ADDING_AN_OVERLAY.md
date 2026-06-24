# How to add a domain overlay

A walkthrough for contributing a new `domains/<name>.md` overlay. We'll design one for `Domain: math` as a concrete example — the same shape applies to any domain.

If you only need to know *what* an overlay specifies, look at [`coding.md`](coding.md) and [`speech-therapy.md`](speech-therapy.md) — both are working examples. This doc covers *how* to write one.

## What a domain overlay is, in one paragraph

A domain overlay refines the generic agentic-study-environment harness for a specific kind of learning. The generic core (defined by the lifecycle skills under [`../skills/`](../skills/) plus [`../reference/conventions.md`](../reference/conventions.md)) covers sub-project structure, session bracketing, progress tracking, and language handling — none of that changes per domain. What *does* change per domain is the **shape of practice**: what scaffolding looks like, what review focuses on, and how the `/work/` folder is organized. An overlay specifies exactly those domain-specific bits; everything else falls through to the core.

Overlays are loaded at runtime by `start-session` (and, for some types, `stop-session`) based on the sub-project's `Domain:` declaration. If a sub-project's `AGENTS.md` says `Domain: math`, the agent loads `domains/math.md`. Older projects that still declare `Domain:` in `CLAUDE.md` continue to work as a fallback.

## Step 1: pick a domain that needs an overlay

A domain needs its own overlay if the *shape* of practice and review is recognizably different from what the existing overlays cover. Signals you need one:

- The practice artifact isn't a code stub or a markdown worksheet — it's a proof, a transcript, a sketch, a recording.
- Review attends to something the existing overlays don't name — say, performance, style, technique, clinical judgment.
- `/work/` needs a non-flat layout (per-case folders, per-piece folders, per-exam folders).
- The domain calls for an in-character `role-play` flavor, or an `onboarding` flavor over a non-code corpus.

For our worked example, **math**: practice is "work the proof" or "compute this integral and explain the steps", not "implement and test". Review attends to rigor and elegance, not idiomacy. `/work/` benefits from grouping by chapter or topic. No new session type needed — `theory` + `practice` cover it.

## Step 2: write the overlay file

Create `domains/<name>.md` (kebab-case, lowercase). The file is just markdown — no front-matter, no special syntax. At minimum, specify these sections. Skip a section if the generic core's default is correct.

### Header

State which `Domain:` values activate this overlay (if there are synonyms) and make explicit that the overlay **refines** the generic core, doesn't replace it.

```markdown
# Domain overlay: math

This overlay applies to any sub-project that declares `Domain: math` in its
`AGENTS.md`. It refines the generic core defined by the agentic-study-environment
plugin (see `../reference/conventions.md` and the lifecycle skills
under `../skills/`) — it does not replace it.
```

### Session types

There are four **core types** (`theory`, `practice`, `role-play`, `onboarding`) defined in [`../reference/conventions.md`](../reference/conventions.md) (*Session types vs. flavors*). Overlays do **not** invent new types — they supply domain-specific **flavors** of these. The two heavyweight types, `role-play` and `onboarding`, have generic protocols in the conventions that your overlay *flavors* by filling a few parameters rather than re-describing the loop:

- **`role-play`** — fix the agent's role, whose work is scrutinized, and the debrief rubric (e.g. `simulation` = patient, `defense` = examiner, coding `review` = reviewer). Do **not** restate the break-character convention; reference the canonical one.
- **`onboarding`** — fix what the corpus is, what "send the user to read" points at, and what "a recent change" means. If your domain has nothing special to add, you inherit it as-is.

For math, no flavor is needed:

```markdown
## Session types

Uses the generic `theory` and `practice` types. No `role-play` flavor; inherits
generic `onboarding` unchanged.
```

For comparison, `speech-therapy.md` flavors `role-play` as `simulation` — that's the model to copy if you need an in-character flavor.

### Practice session shape

Describe what a practice session looks like in this domain — what artifact the user produces, what role the agent plays. Be concrete.

```markdown
## Practice session shape

A math practice session is **work it on paper (or in markdown), explain
your steps, get pushed**:

1. The agent proposes a concrete problem grounded in the current topic
   (compute, prove, derive, construct).
2. The agent prepares a scaffolding file (see below) with the problem
   statement and any givens, and leaves space for the user's work.
3. The user works it. Pen on paper is fine; what gets recorded back in
   the work file is the steps and the answer, transcribed.
4. The agent reviews — checks correctness, but also pushes on the *style*
   of the proof: was there a cleaner argument, a stronger lemma, a more
   general formulation?
```

### Scaffolding form

State what file format the practice artifact takes and where it lives.

```markdown
## Scaffolding form

Scaffolding for math exercises is a **markdown file under `/work/`** with
sections: *Problem*, *Givens*, *Work* (left blank for the user), *Answer*,
*Notes*. LaTeX-style math is fine; rendering happens client-side via the
markdown viewer.
```

### Review focus

State what the agent attends to when reviewing user output. This is what makes the agent feel domain-specific.

```markdown
## Review focus

Math review covers **correctness, rigor, and elegance**, in roughly that
order:

- **Correctness** — does the argument hold? Are the steps sound? Are
  edge cases addressed?
- **Rigor** — are quantifiers explicit, hypotheses used, edge cases
  handled? Are silent assumptions called out?
- **Elegance** — is there a shorter path, a stronger lemma, a cleaner
  formulation? "Correct but bashy" is fine for a first pass; push for
  better on the second.
```

### `/work/` layout

Describe how files are organized under `.studyenv/<sub-project>/work/` for this domain.

```markdown
## `/work/` layout

```
work/
  notes.md                ← cross-cutting study notes
  proofs.md               ← cross-cutting proofs library
  <topic-id>/             ← per-topic folder (matches curriculum.md topic ids)
    exercise-1.md
    exercise-2.md
    ...
```

Per-topic folders make it easy to grep "what did I do on T3?" without
scanning everything.
```

### Tools & Materials field

State what the sub-project's `AGENTS.md` Tools & Materials section should typically declare for this domain.

```markdown
## Tools & Materials field

For math sub-projects, declare at minimum:

- the **notation** in use (e.g. Halmos's set theory notation; Bourbaki;
  whatever the textbook uses)
- any **proof-assistant tooling** if applicable (Lean 4, Coq, Isabelle)
- **reference texts** that should be treated as authoritative for the
  topic at hand
```

## Step 3: cross-check against the lifecycle skills

The four skills under [`../skills/`](../skills/) don't need editing — they consult overlays generically. But make sure your overlay's vocabulary doesn't clash with theirs:

- The overlay should not redefine **status legends** (those live in `../reference/conventions.md` and are domain-agnostic).
- The overlay should not redefine **session bracketing** — `start-session`/`stop-session` handle that.
- The overlay should not invent a new session **type** or restate a generic protocol (the `role-play` three-phase shape, the break-character convention, the `onboarding` skeleton). Flavor an existing type and reference the canonical protocol instead.
- If your overlay flavors `role-play` (like `simulation`/`defense`/`review`), state that `start-session` should consider the flavor when proposing a route, and that `stop-session` runs the generic debrief against your flavor's rubric before its standard updates.

## Step 4: declare the overlay's domain value in the bootstrap docs

The `Domain:` value users put in their sub-project's `AGENTS.md` should match your overlay's filename (without `.md`). For our example, users would write `Domain: math`, and the agent loads `domains/math.md`.

No other registration step — there's no central registry. The overlay file's mere presence in `domains/` is what makes it discoverable.

## Step 5: open a PR

Follow the conventions in [the repo's CONTRIBUTING.md](https://github.com/TimboGP/timbogp-marketplace/blob/main/CONTRIBUTING.md):

- One overlay per PR.
- Mirror the shape of `coding.md` or `speech-therapy.md`.
- If your overlay flavors `role-play` or `onboarding`, explain in the PR why the flavor is needed and confirm it references the canonical protocol rather than restating it.
- Include a 5–10-line snippet showing what a `start-session` proposal would look like under this overlay — same shape as the transcripts in the [root README](../../README.md).

## Things to avoid

- **Don't replicate generic core in the overlay.** If you find yourself describing how `start-session` should bracket, or what topic statuses exist, stop — those live in the core. The overlay is purely the domain-specific delta.
- **Don't make `/work/` layouts that are hard to grep.** Per-topic or per-case folders are great; deeply nested category trees are not.
- **Don't bake in source materials.** The overlay describes *shape*, not content. No "for organic chemistry, use Clayden's book" — that's a sub-project Tools & Materials decision.
- **Don't add per-overlay options.** Resist the urge to write `## Configuration` with flags. Variants belong in separate overlays if they matter.
