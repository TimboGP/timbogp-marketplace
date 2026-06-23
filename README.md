# TimboGP's Claude Code Plugins

The **`timbogp`** marketplace — a small, curated catalog of Claude Code plugins.

A marketplace in Claude Code is a *catalog* you add once; you then install individual plugins from it. This repo is that catalog. It currently hosts two plugins, which don't have to relate to each other — the marketplace is just the distribution channel.

| Plugin | What it does | Install |
| --- | --- | --- |
| [**agentic-study-environment**](plugin/agentic-study-environment/README.md) | Turns a coding agent into a **structured tutor** over your own source materials — bracketed sessions, per-project curriculum + progress, swappable domain overlays. | `/plugin install agentic-study-environment@timbogp` |
| [**ux-design**](plugin/ux-design/README.md) | **Guide, measure, and implement UX best practices** — scored usability + accessibility audits, UX metrics, and stack-adaptive scaffolding (tokens, accessible components, interaction feedback, copy). | `/plugin install ux-design@timbogp` |

## Install

Add the marketplace once (the repo *is* the catalog), then install whichever plugins you want:

```
/plugin marketplace add TimboGP/timbogp-marketplace
/plugin install agentic-study-environment@timbogp
/plugin install ux-design@timbogp
```

The marketplace is named **`timbogp`** and the repo is `timbogp-marketplace`. Already added the marketplace before? Refresh it to pick up newly added plugins:

```
/plugin marketplace update timbogp
```

## The plugins

### agentic-study-environment

A learning harness: you bring a topic and the source material (a paper, a book, a syllabus, a clinical case load), and the harness turns a code-capable agent into a tutor that brackets the work into focused **sessions**, keeps a per-project **curriculum** and **progress log**, and adapts its teaching shape per domain via swappable **overlays** (coding, speech-therapy, legal-documents, academic-research, …).

It's a harness, not a course — there's no curated content; you provide the materials. Also ships for **Codex** (catalog at [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json)).

→ Full details: [plugin README](plugin/agentic-study-environment/README.md) · per-skill guides: [docs/](plugin/agentic-study-environment/docs/README.md)

### ux-design

A UX/UI toolkit that works in three modes — **guide** (explain the right pattern), **measure** (scored usability + WCAG 2.2 AA audits, Core Web Vitals, SUS), and **implement** (detect your stack and scaffold design tokens, accessible WAI-ARIA components, interaction-feedback states, and UX copy). Ships nine skills, four commands (`/ux-audit`, `/ux-bootstrap`, `/ux-onboarding`, `/ux-review`), a `ux-reviewer` agent, and zero-dependency CLI tools covered by tests. Also ships for **Codex** (catalog at [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json)) — its skills are the cross-agent surface; the slash commands and `ux-reviewer` agent are Claude-Code conveniences over them.

→ Full details: [plugin README](plugin/ux-design/README.md) · per-skill guides: [docs/](plugin/ux-design/docs/README.md)

## Repo layout

```
/
  .claude-plugin/marketplace.json   ← the "timbogp" marketplace catalog (lists both plugins)
  .agents/plugins/marketplace.json  ← Codex marketplace catalog
  AGENTS.md / CLAUDE.md             ← repo-level agent instructions
  CONTRIBUTING.md · CHANGELOG.md · LICENSE
  package.json                      ← dev tooling (tests for ux-design's bundled scripts)
  test/                             ← node:test suite for the bundled CLI scripts
  .github/workflows/                ← CI (runs the tests + design-token contrast gate)
  plugin/
    agentic-study-environment/      ← study-harness plugin  (see its README)
    ux-design/                      ← UX plugin             (see its README)
```

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md). For the study harness, new domain overlays (math, language, music, history, design, the sciences, …) are especially encouraged; there's a walkthrough at [`domains/ADDING_AN_OVERLAY.md`](plugin/agentic-study-environment/domains/ADDING_AN_OVERLAY.md).

## License

[MIT](LICENSE) for both plugins. Source materials you drop into your own study sub-projects are yours; the license applies to the plugins themselves.
