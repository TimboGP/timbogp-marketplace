# lean-coach

A Lean business-development coach for Claude Code and Codex, built on **Ash Maurya's _Running Lean_**.

**One coach, many hats.** It guides a venture through the Lean process *and* steps into the roles you test it against — customer, investor, devil's advocate, business partner, mentor — so you can rehearse the hard conversations, then breaks character to debrief.

It works across the methodology's spine:

1. **Document your Plan A** — get the model onto a one-page Lean Canvas.
2. **Identify the riskiest parts** — rank your assumptions; tackle the scariest first.
3. **Systematically test your plan** — run the smallest experiments (interviews, landing pages, concierge MVPs) around the Build-Measure-Learn loop, iterating toward a plan that works and, eventually, product/market fit.

All venture state persists in a gitignored **`.lean/` workspace** so the coach picks up where you left off instead of restarting each session.

> Credit: the methodology is Ash Maurya's _Running Lean_ (O'Reilly, 2nd ed.), building on Eric Ries, Steve Blank, and Alex Osterwalder. The Lean Canvas is Maurya's adaptation of the Business Model Canvas. This plugin is an original coach that applies the framework — see [leanfoundry.com](https://www.leanfoundry.com/books/running-lean).

## Install

For **Claude Code**, install from the [`timbogp`](https://github.com/TimboGP/timbogp-marketplace) marketplace:

```sh
/plugin marketplace add TimboGP/timbogp-marketplace
/plugin install lean-coach@timbogp
```

For **Codex**, install from a clone of the repo via the Codex catalog at [`.agents/plugins/marketplace.json`](../../.agents/plugins/marketplace.json):

```sh
codex plugin marketplace add .
```

**Per-agent surface.** The plugin's **skills** are the shared, cross-agent surface — on Codex they appear as slash commands (`/lean-coach:lean-canvas`, `/lean-coach:customer-interview`, …) and trigger from natural language on both agents. The Claude Code `/lean-*` commands and the `lean-mentor` agent are Claude-Code conveniences that orchestrate those same skills; Codex has no command/agent concept, so there you invoke the skills directly.

Per-skill usage guides live in [`docs/`](docs/README.md).

## Quick start

```sh
/lean-coach                 # orient: where am I, what's riskiest, what's next
/lean-canvas "my idea"      # document Plan A on a Lean Canvas
/lean-interview problem     # role-play a problem interview, then debrief
/lean-role devils-advocate  # have your riskiest assumption attacked
/lean-help                  # explain the plugin (or: /lean-help measure-fit)
```

Or just ask in natural language — skills trigger automatically:
- "help me develop my startup idea"
- "build a lean canvas for a meal-planning app for busy parents"
- "what's the riskiest part of my plan?"
- "play a customer so I can practice a problem interview"
- "be a skeptical investor and grill me on my pitch"
- "review my whole business model as a mentor"
- "am I at product/market fit?"

## The cast of roles

- **Guide roles** (the agent stays itself): **Coach** (navigator), **Strategist** (canvas + risk), **Analyst** (experiments + metrics).
- **Role-play roles** (the agent becomes a character, then debriefs): **Customer**, **Investor**, **Devil's advocate**, **Business partner**, **Mentor**.

The role catalog and the shared role-play protocol (in-character rehearsal → break character with `[square brackets]` → out-of-character debrief) live in [`reference/roles.md`](reference/roles.md).

## Skills

- **`lean-coach`** — the navigator: where am I (stage), what's the riskiest untested assumption, what's the smallest next experiment; onboards the `.lean/` workspace and routes.
- **`lean-canvas`** — build/refine the 9-block Lean Canvas; writes `.lean/canvas.md`.
- **`prioritize-risks`** — classify (product/customer/market) and rank the riskiest assumptions; pick where to start; writes `.lean/risks.md`.
- **`customer-interview`** — role-play Problem / Solution / MVP interviews with the book's scripts, then debrief on technique and learning; writes `.lean/interviews/`.
- **`investor-pitch`** — role-play a skeptical investor; stress-test the traction story and pitch, then debrief; writes `.lean/pitch/`.
- **`run-experiment`** — turn an assumption into a falsifiable hypothesis and the smallest build (Build-Measure-Learn); writes `.lean/experiments/`.
- **`measure-fit`** — funnels, weekly cohorts, the Sean Ellis test, retention-as-macro, engines of growth; an honest product/market-fit verdict; writes `.lean/metrics/`.
- **`lean-roles`** — the front door to switch persona (business partner / devil's advocate / mentor) and run the role-play protocol.
- **`help`** — explains the plugin: the full overview, or a specific skill/command/agent/role if you name one. Backs `/lean-help`.

## The `.lean/` workspace

Everything the plugin generates for a venture lives under a single gitignored `.lean/` directory at the project root — `PROGRESS.md` (stage + journal), `canvas.md`, `risks.md`, `experiments/`, `interviews/`, `pitch/`, `metrics/`. The plugin owns `.lean/` and never reads or modifies the host project's own files. Full layout and formats: [`reference/workspace.md`](reference/workspace.md).

## Conventions

- Skill bodies are imperative and concise; deep methodology detail lives in each skill's `references/` and in the shared [`reference/`](reference/methodology.md).
- Every canvas block and plan is treated as an **untested assumption** until validated — the plugin's bias is toward the smallest experiment that produces real learning, and against vanity progress.
- Role-play roles never break character to coach — mistakes are debrief material; the user breaks character with `[square brackets]`.
- English by default for structural tokens (stage names, block names, field names, skill/role names); conversational language is overridable via `Language:` in an optional `.lean/AGENTS.md`.

## Credits & trademarks

This plugin is an **independent, unofficial** educational tool. It implements and teaches the **Running Lean** methodology created by **Ash Maurya** (_Running Lean_, O'Reilly), which builds on Eric Ries's _The Lean Startup_, Steve Blank's Customer Development, and Alex Osterwalder's Business Model Canvas. All credit for the methodology belongs to its authors — please [read the book](https://www.leanfoundry.com/books/running-lean) and support the source.

- **"Lean Canvas"** is a trademark of Ash Maurya / LEANSTACK.
- **"The Lean Startup" / "Lean Startup"** is a trademark of Eric Ries.
- **"Business Model Canvas"** is a trademark of Strategyzer AG; the canvas is licensed CC BY-SA 3.0.

These names are used here **nominatively** — only to refer to the frameworks themselves. This plugin is **not affiliated with, authorized, sponsored, or endorsed by** Ash Maurya, LEANSTACK, Eric Ries, Strategyzer, or O'Reilly. All trademarks are the property of their respective owners.

The plugin's own code and text are MIT-licensed. It does **not** reproduce the book's text — it provides original guidance over a publicly described methodology, with attribution. See [`NOTICE`](NOTICE).
