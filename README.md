# agentic-study-environment

**A coding-agent learning harness — structured tutor sessions over your own source materials, in any domain.**

You bring a topic and the source material (a paper, a book, a syllabus, a clinical case load, anything). The harness turns a code-capable agent into a tutor that brackets the work into focused **sessions**, keeps a per-project **curriculum** and **progress log**, and adapts its teaching shape per the domain you're studying via swappable **overlays**.

It's a harness, not a course. There's no curated content here — you provide the materials, and the agent works them with you.

## What it looks like

Two short transcripts. The fluff is trimmed; everything bracketed `[…]` is paraphrasing what the agent does silently between turns.

### Coding sub-project — practice session on TASEP

```
> let's work on tasep

[reads PROGRESS.md, tasep/AGENTS.md, tasep/ai-agent-materials/curriculum.md,
 loads domains/coding.md (Domain: coding)]

Last session you exercised T0 (env + smoke tests) and got T1 (TASEP model)
and T2 (master equation) introduced. T3 (mean-field closure) is the next
unlocked topic.

Proposal: practice session on T3 — implement a mean-field density-profile
solver and compare against your existing notebook results. ~45 min.
Override?

> sounds good

I'll write a stub at tasep/work/src/tasep/mean_field.py with the signature,
the boundary-condition cases, and inline TODOs for each block. Tests get
a corresponding stub at tests/test_mean_field.py.

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

[reads PROGRESS.md, aphasia-cases/AGENTS.md (Domain: speech-therapy),
 source-materials/patients/maria-58.md, loads domains/speech-therapy.md]

Three profiles available: maria-58 (Broca's aphasia, post-stroke,
week 4), tomas-67 (anomic, mild), liam-7 (developmental language delay).
Curriculum says you're due an initial-anamnesis simulation. Maria is the
most complex of the three. Start there, or warm up on the milder cases?

> let's do maria

Loading profile: Broca's aphasia, stroke 4 weeks ago, former teacher,
lives with her daughter, full receptive comprehension, frustrated by
the gap between what she wants to say and what comes out. Knows she
had a stroke; doesn't know the prognosis specifics. Speech: agrammatic,
2–3 word utterances, intact intonation, articulation slow.

Entering character. You're meeting her for the first time.

---

[in character]
hello... I... Maria... yes.

> Hello Maria, I'm so glad you could come in today. How are you feeling?

(pause) ...tired. um. (gestures toward her head) ...words. no.

> Can you tell me a little about what brought you here?

(frowns) ...hospital. before. (long pause) speak... not. daughter — she
say... come.
```

The session ends with `stop session`; the agent steps out of character (for simulations), updates the sub-project's `PROGRESS.md` and the root one, and summarizes what moved.

## How it works

The harness ships as a plugin at [`plugin/agentic-study-environment/`](plugin/agentic-study-environment/). The same skill bodies are packaged for Claude Code and Codex. The plugin exposes five lifecycle skills:

| Skill | Trigger | What it does |
| --- | --- | --- |
| `agentic-study-environment:bootstrap` | "bootstrap a project for X" | Mint a new sub-project (`<name>/AGENTS.md`, `<name>/CLAUDE.md`, `<name>/PROGRESS.md`, `<name>/source-materials/`); register in root `PROGRESS.md` |
| `agentic-study-environment:set-curriculum` | "set curriculum for X" | Build or update `<name>/ai-agent-materials/curriculum.md` from source materials |
| `agentic-study-environment:start-session` | "start session", "let's work on X" | Begin a bracketed learning session (theory / practice / domain-specific types); load the active domain overlay |
| `agentic-study-environment:stop-session` | "stop session", "wrap up" | Update sub-project + root `PROGRESS.md`, summarize what was covered |
| `agentic-study-environment:adjust-level` | "simplify the curriculum", "make it harder", "build up to this paper" | Rewrite the curriculum at a different level — simpler or harder — pulling in external material with strict labels |

Each sub-project lives in its own `<name>/` directory and declares `Domain:` (and optionally `Language:`) in its own `AGENTS.md`. `CLAUDE.md` is kept as a compatibility pointer. The matching overlay at [`plugin/agentic-study-environment/domains/<domain>.md`](plugin/agentic-study-environment/domains/) specifies the practice/review shape, scaffolding form, and `/work/` layout for that domain. Two overlays ship in the box:

- [`coding.md`](plugin/agentic-study-environment/domains/coding.md) — stub-file scaffolding, idiomacy review, language-appropriate `/work/` layouts.
- [`speech-therapy.md`](plugin/agentic-study-environment/domains/speech-therapy.md) — therapist–patient simulation sessions on top of theory and practice.

Sub-projects without a declared `Domain:` fall back to a neutral default (theory + practice over markdown notes under `/work/`).

## Install

### Claude Code marketplace

Inside Claude Code, run:

```
/plugin marketplace add TimboGP/agentic-study-environment
/plugin install agentic-study-environment@timbogp
```

The marketplace name is `timbogp`; the plugin is `agentic-study-environment`. Once installed, the lifecycle skills are reachable from any conversation in the project where you ran the install.

### Codex marketplace

Codex uses a separate marketplace catalog format. For this repo, the Codex catalog lives at [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json) and points at the same plugin source tree:

```
codex plugin marketplace add ./agentic-study-environment
```

If you are already inside this repo, add the current directory instead:

```
codex plugin marketplace add .
```

Then open the Codex plugin directory with `/plugins`, choose the `TimboGP` marketplace, and install `agentic-study-environment`.

### From a local clone (development / fork)

If you've cloned the repo and want to use the Claude plugin from the working copy:

```
claude --plugin-dir /path/to/this/repo/plugin/agentic-study-environment/
```

## Two ways to set up a host project

Independent of how you install, the plugin behaves identically whether you point it at an existing project or a brand-new one — the difference is just how much structure you keep at the host root. The plugin's [`reference/conventions.md`](plugin/agentic-study-environment/reference/conventions.md) walks through both as *Host-project modes*.

### Drop-in mode

Install the plugin into a project that already has its own purpose (a codebase, a notes folder, an empty directory). Bootstrap creates a `PROGRESS.md` at the project root on first use; the project's existing `AGENTS.md` or `CLAUDE.md` (if any) is left alone. Best for when you want **one or a few learning sub-projects alongside an existing project with its own purpose**.

### Umbrella mode

Use a host project that's *purpose-built* to accumulate learning sub-projects — e.g. clone this repo as a template, or set up a fresh `~/learning/` directory:

```
git clone https://github.com/TimboGP/agentic-study-environment.git
cd agentic-study-environment
```

Sub-projects accumulate as siblings of `plugin/`, `AGENTS.md`, `CLAUDE.md`, and `PROGRESS.md`. The root `PROGRESS.md` becomes a substantive cross-project tracker; the root `AGENTS.md` is a natural place to set a global `Language:` or other conventions inherited by every sub-project. Best for when you want **a dedicated learning workspace** that grows over time.

## Getting started

After install:

1. **Bootstrap a sub-project.** Say something like *"bootstrap a project called `tasep` to learn the totally asymmetric simple exclusion process"*. You can include `Domain:` (e.g. `coding`, `speech-therapy`), `Language:` (BCP 47 tag for chat replies in this sub-project), and Tools & Materials. The skill refuses to overwrite an existing sub-project.
2. **Drop source materials** (PDFs, papers, notes, links, prepared code projects, …) into `<name>/source-materials/`.
3. **Set the curriculum** with *"set curriculum for `tasep`"* — the agent builds the teaching plan at `<name>/ai-agent-materials/curriculum.md`.
4. **Start a session** with *"start session"* — the agent proposes a topic and session type (theory / practice / simulation). Override as you like.
5. **Stop the session** with *"stop session"* — the agent records progress in `PROGRESS.md` and summarizes.

Progress lives in two places: each sub-project's `PROGRESS.md` and the host project's root `PROGRESS.md` (Projects table + Journal).

## Repo layout

```
/
  .claude-plugin/marketplace.json  ← marketplace catalog (this repo is its own marketplace, "timbogp")
  .agents/plugins/marketplace.json ← Codex marketplace catalog
  AGENTS.md                        ← canonical repo-level agent instructions
  CLAUDE.md                        ← compatibility pointer to AGENTS.md
  PROGRESS.md                      ← cross-project status + journal
  README.md                        ← this file
  CONTRIBUTING.md                  ← how to contribute (new overlays, framework refinements)
  CHANGELOG.md                     ← version history
  LICENSE                          ← MIT
  plugin/agentic-study-environment/     ← the plugin
    .claude-plugin/plugin.json
    .codex-plugin/plugin.json
    README.md
    skills/                        ← bootstrap, set-curriculum, start-session, stop-session, adjust-level
    domains/                       ← coding.md, speech-therapy.md (+ ADDING_AN_OVERLAY.md walkthrough)
    templates/                     ← per-sub-project AGENTS.md, CLAUDE.md, and PROGRESS.md templates
    reference/conventions.md       ← status legends, layout, language rules, curriculum format
  <sub-project>/                   ← created by `bootstrap`
    AGENTS.md
    CLAUDE.md
    PROGRESS.md
    source-materials/
    ai-agent-materials/
    work/
```

## Conventions (quick reference)

- Default conversational language is **English**. Override per-sub-project (or globally at the root) with `Language: <BCP 47 tag>`. Structural tokens (status legends, field names, skill names) stay English regardless.
- Topic status: `introduced` · `exercised` · `reviewed`.
- Sub-project status: `created` · `ready` · `in progress` · `blocked` · `stopped` · `finished`.

Full conventions live at [`plugin/agentic-study-environment/reference/conventions.md`](plugin/agentic-study-environment/reference/conventions.md).

## FAQ

**How is this different from just chatting with Claude about a topic?**
The harness adds three things on top of a free-form chat: (a) **bracketed sessions** with explicit start/stop and a recorded summary, (b) a per-project **curriculum** and **progress log** the agent reads at the start of every session — so you don't restart from zero each time, and (c) **domain-specific shape** — practice in a coding sub-project produces stub files; practice in a speech-therapy sub-project produces a simulation transcript. None of that emerges from raw chat reliably.

**Do I need an API key, internet access, or anything beyond Claude Code?**
No. The plugin is pure markdown and skill definitions. If Claude Code works, the harness works. No external services, no model API beyond what Claude Code itself uses.

**Can I share my sub-projects with others?**
Yes. A sub-project is just a directory of markdown and files (`<name>/AGENTS.md`, `<name>/CLAUDE.md`, `<name>/PROGRESS.md`, `<name>/source-materials/`, `<name>/ai-agent-materials/`, `<name>/work/`). Commit it to a private repo, send it as a zip, or sync it with whatever you'd sync a project folder with. Source materials are user-provided and stay local unless you choose to share them.

**Which domains has it actually been used for?**
The two overlays in the box (`coding`, `speech-therapy`) are the ones with real-world use behind them. The generic neutral default works for any domain without a custom overlay — you trade some scaffolding polish for portability. New overlays are explicitly welcomed; see [`plugin/agentic-study-environment/domains/ADDING_AN_OVERLAY.md`](plugin/agentic-study-environment/domains/ADDING_AN_OVERLAY.md).

**Why "sub-project" instead of "course" or "lesson"?**
Because the unit is whatever *you* want. A single paper, a textbook, a clinical case load, a language you'll study for years. The harness doesn't presume a duration or a difficulty level — it just brackets your work and tracks what you've covered.

**The agent forgot what we did last session. What happened?**
Either `stop-session` wasn't called (so nothing was recorded), or `start-session` didn't get a chance to read `PROGRESS.md` (rare; check your sub-project's PROGRESS.md to see if last session's journal entry exists). The skills are designed to read both root and sub-project `PROGRESS.md` at session start — if those files are intact, recall works.

## Known limitations

Honest snapshot — what doesn't work yet, or works only with friction:

- **No automatic session resumption across Claude Code restarts.** If you start a session, close Claude Code mid-stream, and come back later, the next conversation is fresh — the recorded state is what's in `PROGRESS.md`, not the in-flight session context. Wrap up with `stop-session` before you walk away if you want the journal entry.
- **Single-machine state.** Sub-project state lives on disk. Working across machines means syncing the directory (git, Dropbox, etc.) yourself; the harness doesn't help with that.
- **No cross-sub-project topic linking.** If you're studying real analysis in one sub-project and Lean 4 in another, the harness won't notice the overlap. Each sub-project's curriculum and progress are independent.
- **Source extraction is on the agent.** When you drop a PDF, the agent reads it during `set-curriculum`. Image-heavy or OCR-fragile PDFs may extract poorly; for those, supplement with notes or a transcript.
- **Smoke-test coverage is light.** The four skills are written but not yet covered by `evals/` regression tests. Expect occasional rough edges as new use cases surface; please open issues.

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md). New domain overlays (math, language, music, history, design, sciences, …) and refinements to the meta-framework are especially encouraged. There's a step-by-step walkthrough at [`plugin/agentic-study-environment/domains/ADDING_AN_OVERLAY.md`](plugin/agentic-study-environment/domains/ADDING_AN_OVERLAY.md) for first-time overlay authors.

## License

[MIT](LICENSE). Fork it, adapt it, write overlays for your domain, ship it inside other people's projects — all fine. Source materials you drop into your own sub-projects are yours; the MIT license applies to the harness itself.
