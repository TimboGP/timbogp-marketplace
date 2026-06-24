# agentic-study-environment

**A coding-agent learning harness — structured tutor sessions over your own source materials, in any domain.**

You bring a topic and the source material (a paper, a book, a syllabus, a clinical case load, anything). The harness turns a code-capable agent into a tutor that brackets the work into focused **sessions**, keeps a per-project **curriculum** and **progress log**, and adapts its teaching shape per the domain you're studying via swappable **overlays**.

It's a harness, not a course. There's no curated content here — you provide the materials, and the agent works them with you.

> Part of the [`timbogp`](../../README.md) marketplace. Install with `/plugin install agentic-study-environment@timbogp`.

## What it looks like

Two short transcripts. The fluff is trimmed; everything bracketed `[…]` is paraphrasing what the agent does silently between turns.

### Coding sub-project — practice session on TASEP

```
> let's work on tasep

[reads .studyenv/PROGRESS.md, .studyenv/tasep/AGENTS.md,
 .studyenv/tasep/ai-agent-materials/curriculum.md,
 loads domains/coding.md (Domain: coding)]

Last session you exercised T0 (env + smoke tests) and got T1 (TASEP model)
and T2 (master equation) introduced. T3 (mean-field closure) is the next
unlocked topic.

Proposal: practice session on T3 — implement a mean-field density-profile
solver and compare against your existing notebook results. ~45 min.
Override?

> sounds good

I'll write a stub at .studyenv/tasep/work/src/tasep/mean_field.py with the
signature, the boundary-condition cases, and inline TODOs for each block.
Tests get a corresponding stub at tests/test_mean_field.py.

[writes the two stub files]

Three things to think about as you implement:
1. The α < ½ (low-density) and α > ½ (high-density) cases collapse
   differently in the bulk — your loop should branch cleanly there.
2. The closure assumes ⟨n_i n_{i+1}⟩ ≈ ⟨n_i⟩⟨n_{i+1}⟩; flag where in code
   you're committing to that.
3. Watch numpy broadcasting on the boundary terms — easy off-by-one.

Ping when you have a first pass.
```

### Speech-therapy sub-project — anamnesis simulation

```
> start session on aphasia-cases

[reads .studyenv/PROGRESS.md, .studyenv/aphasia-cases/AGENTS.md (Domain: speech-therapy),
 .studyenv/aphasia-cases/source-materials/patients/maria-58.md, loads domains/speech-therapy.md]

Three profiles available: maria-58 (Broca's aphasia, post-stroke,
week 4), tomas-67 (anomic, mild), liam-7 (developmental language delay).
Curriculum says you're due an initial-anamnesis simulation. Maria is the
most complex of the three. Start there, or warm up on the milder cases?

> let's do maria

Loading profile: Broca's aphasia, stroke 4 weeks ago, former teacher,
lives with her daughter, full receptive comprehension, frustrated by
the gap between what she wants to say and what comes out.

Entering character. You're meeting her for the first time.

---

[in character]
hello... I... Maria... yes.

> Hello Maria, I'm so glad you could come in today. How are you feeling?

(pause) ...tired. um. (gestures toward her head) ...words. no.
```

The session ends with `stop session`; the agent steps out of character (for simulations), updates the sub-project's `PROGRESS.md` and `.studyenv/PROGRESS.md`, and summarizes what moved.

## What you get

Five lifecycle skills:

| Skill | Trigger | What it does |
| --- | --- | --- |
| `agentic-study-environment:bootstrap` | "bootstrap a project for X" | Mint a new sub-project (`.studyenv/<name>/AGENTS.md`, `CLAUDE.md`, `PROGRESS.md`, `source-materials/`); register it in `.studyenv/PROGRESS.md` |
| `agentic-study-environment:set-curriculum` | "set curriculum for X" | Build or update `.studyenv/<name>/ai-agent-materials/curriculum.md` from source materials |
| `agentic-study-environment:start-session` | "start session", "let's work on X" | Begin a bracketed learning session (one of four core types: theory / practice / role-play / onboarding, with domain-specific flavors); load the active domain overlay |
| `agentic-study-environment:stop-session` | "stop session", "wrap up" | Update the sub-project + `.studyenv/PROGRESS.md`, summarize what was covered |
| `agentic-study-environment:adjust-level` | "simplify the curriculum", "make it harder", "build up to this paper" | Rewrite the curriculum at a different level — simpler or harder — pulling in external material with strict labels |

Plus the swappable **domain overlays** that shape how a session runs:

- [`domains/coding.md`](domains/coding.md) — stub-file scaffolding, idiomacy review, language-appropriate `/work/` layouts, the codebase flavor of `onboarding`, and `review` / `interview` flavors of `role-play`.
- [`domains/speech-therapy.md`](domains/speech-therapy.md) — therapist–patient `simulation` (a `role-play` flavor) on top of theory and practice.
- [`domains/legal-documents.md`](domains/legal-documents.md) — official public and legal documents: prescribed-form drafting scaffolds, analysis frames (case briefs, redlines), legal-precision / citation review.
- [`domains/academic-research.md`](domains/academic-research.md) — the research lifecycle: critical-reading and literature-synthesis frames, manuscript/proposal drafting scaffolds, peer-review and venue-fit exercises, a `defense` (`role-play`) flavor for mock vivas and reviewer Q&A.

Sub-projects without a declared `Domain:` fall back to a neutral default (theory + practice over markdown notes under `/work/`). Each sub-project declares `Domain:` (and optionally `Language:`) in its own `AGENTS.md`; the matching overlay specifies the practice/review shape, scaffolding form, and `/work/` layout.

## Install

### Claude Code marketplace

```
/plugin marketplace add TimboGP/timbogp-marketplace
/plugin install agentic-study-environment@timbogp
```

The marketplace name is `timbogp`; the plugin is `agentic-study-environment`. Once installed, the lifecycle skills are reachable from any conversation in the project where you ran the install.

### Codex marketplace

Codex uses a separate catalog format. The Codex catalog lives at the repo's `.agents/plugins/marketplace.json` and points at the same plugin source tree. From a clone of the repo:

```
codex plugin marketplace add .
```

Then open `/plugins` in Codex, choose the `TimboGP` marketplace, and install `agentic-study-environment`.

### From a local clone (development / fork)

```
claude --plugin-dir /path/to/this/repo/plugin/agentic-study-environment/
```

## The `.studyenv/` harness root

Independent of how you install, the plugin keeps its entire footprint in a single `.studyenv/` directory at the host project root. Everything it generates — the cross-project `PROGRESS.md`, each sub-project folder, all source materials, curricula, and work files — lives there. The host project's own files are never read or modified.

This makes the harness portable and unobtrusive:

- **Drop it into any project** — a codebase, a notes folder, an empty directory. `.studyenv/` sits alongside whatever else is there without colliding with it.
- **Remove or relocate it in one move** — gitignore `.studyenv/`, delete it, zip it, or sync it as a single folder.
- **Set global conventions** — a default `Language:`, preferred notation — in an optional `.studyenv/AGENTS.md` that every sub-project inherits unless it overrides.

For a dedicated learning workspace, just run the plugin in a fresh directory (e.g. `~/learning/`). See [`reference/conventions.md`](reference/conventions.md) for the full layout.

## Getting started

1. **Bootstrap a sub-project** — *"bootstrap a project called `tasep` to learn the totally asymmetric simple exclusion process"*. You can include `Domain:` (e.g. `coding`, `speech-therapy`), `Language:` (BCP 47 tag), and Tools & Materials. The skill refuses to overwrite an existing sub-project.
2. **Drop source materials** (PDFs, papers, notes, links, prepared code) into `.studyenv/<name>/source-materials/`.
3. **Set the curriculum** — *"set curriculum for `tasep`"* writes the plan to `.studyenv/<name>/ai-agent-materials/curriculum.md`.
4. **Start a session** — *"start session"* proposes a topic and session type (theory / practice / role-play / onboarding, with the active overlay's flavor). Override as you like.
5. **Stop the session** — *"stop session"* records progress and summarizes.

Progress lives in two places: each sub-project's `PROGRESS.md` and the harness `.studyenv/PROGRESS.md` (Projects table + Journal).

## Documentation

Per-skill usage guides live in [`docs/`](docs/README.md):

- [bootstrap](docs/bootstrap.md) · [set-curriculum](docs/set-curriculum.md) · [start-session](docs/start-session.md) · [stop-session](docs/stop-session.md) · [adjust-level](docs/adjust-level.md)
- [Domain overlays](docs/domains.md) — what overlays are and how to pick one.

## Conventions (quick reference)

- Default conversational language is **English**. Override per-sub-project (or globally via `.studyenv/AGENTS.md`) with `Language: <BCP 47 tag>`. Structural tokens (status legends, field names, skill names) stay English regardless.
- **Topic status:** `introduced` · `exercised` · `reviewed` (record the highest stage reached).
- **Sub-project status:** `created` · `ready` · `in progress` · `blocked` · `stopped` · `finished`.
- **Tracking scope:** `Tracking: global` (default) registers a sub-project in the cross-project `.studyenv/PROGRESS.md`; `Tracking: local-only` keeps just the sub-project's own `PROGRESS.md` — for dropping the harness onto one standalone project with no global index.

Full conventions live at [`reference/conventions.md`](reference/conventions.md).

## Layout

```
plugin/agentic-study-environment/
  .claude-plugin/plugin.json   ← plugin manifest (name, description, version)
  .codex-plugin/plugin.json    ← Codex plugin manifest
  README.md                    ← this file
  docs/                        ← per-skill usage guides + domain overview
  skills/                      ← bootstrap, set-curriculum, start-session, stop-session, adjust-level
  domains/                     ← coding, speech-therapy, legal-documents, academic-research (+ ADDING_AN_OVERLAY.md)
  templates/                   ← per-sub-project AGENTS.md, CLAUDE.md, PROGRESS.md templates
  reference/conventions.md     ← status legends, layout, language rules, curriculum format
```

Skills read shared resources via relative paths from their `SKILL.md` (e.g. a skill at `skills/bootstrap/SKILL.md` references `../../templates/sub-project-agents.md`).

## FAQ

**How is this different from just chatting with the agent about a topic?**
The harness adds three things on top of free-form chat: (a) **bracketed sessions** with explicit start/stop and a recorded summary, (b) a per-project **curriculum** and **progress log** the agent reads at the start of every session — so you don't restart from zero, and (c) **domain-specific shape** — practice in a coding sub-project produces stub files, while a speech-therapy `role-play` session produces a patient-simulation transcript.

**Do I need an API key, internet access, or anything beyond Claude Code?**
No. The plugin is pure markdown and skill definitions. If Claude Code (or Codex) works, the harness works.

**Can I share my sub-projects?**
Yes. A sub-project is just a directory of markdown and files under `.studyenv/<name>/`. Commit it, zip it, or sync it. Source materials are user-provided and stay local unless you choose to share them.

**Which domains has it actually been used for?**
`coding` and `speech-therapy` have real-world use behind them; `legal-documents` and `academic-research` ship alongside them. The neutral default works for any domain without a custom overlay — you trade some scaffolding polish for portability.

**Why "sub-project" instead of "course" or "lesson"?**
Because the unit is whatever *you* want — a single paper, a textbook, a clinical case load, a language you'll study for years. The harness doesn't presume a duration or difficulty; it brackets your work and tracks what you've covered.

**The agent forgot what we did last session — what happened?**
Either `stop-session` wasn't called (so nothing was recorded), or `start-session` didn't read `PROGRESS.md`. The skills read both `.studyenv/PROGRESS.md` and the sub-project `PROGRESS.md` at session start — if those files are intact, recall works.

## Known limitations

- **No automatic session resumption across restarts.** Recorded state is what's in `PROGRESS.md`, not in-flight session context. Wrap up with `stop-session` before you walk away.
- **Single-machine state.** Sub-project state lives on disk under `.studyenv/`; syncing across machines (git, Dropbox) is on you.
- **No cross-sub-project topic linking.** Each sub-project's curriculum and progress are independent.
- **Source extraction is on the agent.** Image-heavy or OCR-fragile PDFs may extract poorly during `set-curriculum`; supplement with notes for those.

## Contributing

See [CONTRIBUTING.md](https://github.com/TimboGP/timbogp-marketplace/blob/main/CONTRIBUTING.md). New domain overlays — math, language acquisition, music theory, history, design, the sciences — are the highest-leverage contribution. There's a step-by-step walkthrough at [`domains/ADDING_AN_OVERLAY.md`](domains/ADDING_AN_OVERLAY.md).

## License

[MIT](https://github.com/TimboGP/timbogp-marketplace/blob/main/LICENSE). Fork it, adapt it, write overlays for your domain. Source materials you drop into your own sub-projects are yours; the MIT license applies to the harness itself.
