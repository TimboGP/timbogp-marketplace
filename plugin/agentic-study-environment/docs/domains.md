# Domain Overlays

> A domain overlay shapes *how* a study session runs — the scaffolding it produces, the review it applies, the `/work/` layout it uses, and any special session types.

## What an overlay is

The five lifecycle skills are domain-agnostic: they scaffold, plan, study, and record the same way regardless of subject. What changes between studying a physics paper and a clinical case load is the *teaching shape* — and that lives in a **domain overlay**, a single markdown file under [`../domains/`](../domains/).

When `start-session` runs, it reads the sub-project's `Domain:` and loads the matching overlay, which tells it:

- **Practice shape** — e.g. coding practice writes stub files with TODOs; speech-therapy practice runs a role-played simulation.
- **Review focus** — what "good" looks like in this domain (idiomacy, legal precision, research rigor, …).
- **`/work/` layout** — where session artifacts go.
- **Session-type flavors** — domain-specific flavors of the core `role-play` and `onboarding` types (see below).

## Selecting an overlay

A sub-project declares its domain in its own `AGENTS.md` (written by `bootstrap`):

```
Domain: coding
```

You set this when bootstrapping — *"bootstrap a project called `seam-carver` to study the seam-carving paper, `Domain: coding`"*. A sub-project with **no** `Domain:` falls back to a **neutral default**: `theory` + `practice` over markdown notes under `/work/`. You trade some scaffolding polish for working in any subject without a custom overlay.

## Session types vs. flavors

There are **four core session types**, and they are the only values a curriculum's `session type` field holds. A *type* changes the session loop; an overlay never adds a new type — it supplies a domain-specific **flavor** that keeps the loop but swaps the scaffolding and review focus. The full rule (with a classification table) lives in [`../reference/conventions.md`](../reference/conventions.md) → *Session types vs. flavors*.

| Type | Available in | What it is |
|---|---|---|
| `theory` | all | Explanation, walkthrough, and review of concepts. |
| `practice` | all | Hands-on work — shape depends on the overlay (legal `analysis`/`drafting`, research's six flavors, … are all `practice`). |
| `role-play` | any overlay that flavors it | In-character session: setup → in character → out-of-character debrief. Shipped flavors below. |
| `onboarding` | any overlay that flavors it (coding ships one) | Guided walkthrough of an existing artifact: survey → part-by-part walkthrough with comprehension checks → reproduce a recent change. |

Shipped `role-play` flavors:

| Flavor | Overlay | What it is |
|---|---|---|
| `simulation` | speech-therapy | The agent role-plays a patient; you conduct the session, then debrief out of character. |
| `defense` | academic-research | The agent role-plays a committee / reviewer panel; you defend your work, then debrief. |
| `review` / `interview` | coding | The agent role-plays a senior reviewer (you defend your change/design) or an interviewer (you solve a posed problem), then debrief. |

## Overlays that ship

| Overlay | `Domain:` (synonyms) | Shape |
|---|---|---|
| [coding](../domains/coding.md) | `coding` | Stub-file scaffolding, idiomacy review, language-appropriate `/work/` layouts, the codebase flavor of `onboarding`, and `review` / `interview` flavors of `role-play`. |
| [speech-therapy](../domains/speech-therapy.md) | `speech-therapy` (`logopedics`) | Therapist–patient `simulation` (a `role-play` flavor) on top of theory and practice, with structured debriefs. |
| [legal-documents](../domains/legal-documents.md) | `legal-documents` (`official-documents`, `public-documents`) | Prescribed-form drafting scaffolds, analysis frames (case briefs, redlines), legal-precision / citation review. No `role-play` flavor. |
| [academic-research](../domains/academic-research.md) | `academic-research` (`research`, `scholarship`) | Critical-reading and literature-synthesis frames, manuscript/proposal drafting, peer-review and venue-fit exercises, a `defense` (`role-play`) flavor, rigor / contribution / citation-integrity review. |

`coding` and `speech-therapy` have real-world use behind them; `legal-documents` and `academic-research` ship alongside them.

## Writing your own

Overlays are the highest-leverage contribution to the harness — math, language acquisition, music theory, history, design, the sciences, and more are all wide open. There's a step-by-step walkthrough for first-time authors at [`../domains/ADDING_AN_OVERLAY.md`](../domains/ADDING_AN_OVERLAY.md).
