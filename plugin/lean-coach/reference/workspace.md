# The `.lean/` workspace

Shared reference for the `lean-coach` plugin. Skills load this file when they need the workspace layout or a file format. Everything the plugin generates for a venture lives under a single `.lean/` directory at the host project root, mirroring how `agentic-study-environment` uses `.studyenv/`.

## Why a workspace

A Lean venture is a moving target: the canvas changes as you learn, risks get retired, interviews accumulate, experiments resolve. Holding all of that in chat alone means it evaporates between sessions. The `.lean/` workspace is the venture's memory — it is what lets the coach pick up where you left off and answer "where am I and what's next?" instead of restarting from zero each time.

## The rules

- **The plugin owns `.lean/` and nothing else.** It reads and writes only inside `.lean/`. It never reads, requires, modifies, or creates the host project's own files (its `README.md`, `AGENTS.md`, source code, etc.). The host can be a codebase, a notes folder, or an empty directory — the plugin behaves identically.
- **One folder to keep or discard.** `.lean/` is a single portable footprint you can gitignore, delete, zip, or sync. This repo gitignores it.
- **Created lazily.** `lean-coach` creates `.lean/` and `.lean/PROGRESS.md` on first use. Other files appear when their work begins (the canvas when you first build it, `interviews/` when you run the first interview, and so on). Don't pre-create empty trees.
- **Multiple ventures.** Most host projects track one venture at the `.lean/` root. To track more than one, nest them as `.lean/<venture>/` with the same layout inside each; `PROGRESS.md` at the `.lean/` root then indexes them. Single-venture is the default and assumed when files sit directly under `.lean/`.

## Layout

```
.lean/
  PROGRESS.md          ← venture state: current stage, current focus, dated journal
  canvas.md            ← the Lean Canvas (9 blocks), versioned over time
  risks.md             ← prioritized riskiest-assumptions list
  experiments/
    <id>.md            ← one file per experiment (hypothesis → Build-Measure-Learn → learning)
  interviews/
    problem/           ← Problem-interview scripts, notes, and debriefs (dated)
    solution/          ← Solution-interview artifacts (dated)
    mvp/               ← MVP-interview artifacts (dated)
  pitch/               ← pitch artifacts + investor-session debriefs (dated)
  metrics/             ← product/market-fit measurement (funnels, cohorts, Sean Ellis results)
  AGENTS.md            ← OPTIONAL global prefs (Language, default persona); read if present, never auto-created
```

## File formats

Skills own the detail of the files they write; this section fixes only the shared shape.

### `PROGRESS.md`

The venture's state file. `lean-coach` creates and maintains it. Structure:

```markdown
# PROGRESS.md — <venture name>

## Venture
- **Stage:** <Problem/Solution Fit | Product/Market Fit | Scale>   ← see reference/methodology.md
- **Current focus:** <one line — the riskiest thing being tested right now>
- **Customer segment / early adopter:** <who>

## Riskiest assumptions
Short pointer to `risks.md`; list the top 1–3 open risks here for quick scanning.

## Journal
### YYYY-MM-DD
- <what was done: a session, an interview batch, an experiment result, a canvas revision>
```

The Journal is dated; new entries go under a `### YYYY-MM-DD` heading, multiple events on a date as bullets under the same heading. **Convert relative dates to absolute** before writing.

### Versioning artifacts

`canvas.md` and `risks.md` evolve. Don't silently overwrite history — keep a short dated changelog at the bottom of each file (a `## Revisions` section: `- YYYY-MM-DD — what changed and why`), so the learning that moved the model is visible. The interview/experiment/pitch/metrics files are append-only by date and never rewritten.

## Language

The default conversational language is **English**. A `Language: <BCP 47 tag>` field in an optional `.lean/AGENTS.md` overrides it for conversational output only. Structural tokens stay in English regardless: field names (`Stage:`, `Current focus:`), status values, table headers, file and directory names, skill and persona names, and the canvas block names (`Problem`, `Solution`, `Unique Value Proposition`, …). Verbatim customer quotes are kept in the language the customer used.
