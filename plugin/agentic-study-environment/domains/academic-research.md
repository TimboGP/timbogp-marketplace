# Domain overlay: academic research

This overlay applies to any sub-project that declares `Domain: academic-research` (or the synonyms `Domain: research` / `Domain: scholarship`) in its `AGENTS.md` (or, for older projects, `CLAUDE.md`). It refines the generic core defined by the agentic-study-environment plugin (see [`../reference/conventions.md`](../reference/conventions.md) and the lifecycle skills under `../skills/`) — it does not replace it. Everything not redefined here continues to follow the generic core.

Paths in this overlay (`work/`, `source-materials/papers/`, …) are relative to the sub-project root, which is `.studyenv/<name>/`.

The scope of an academic-research sub-project typically spans the full research lifecycle:

- **reading and critical appraisal** — close-reading scholarly papers, reconstructing their argument, evaluating methods and evidence, spotting limitations and threats to validity
- **literature synthesis** — searching, organizing, and synthesizing a body of work; mapping a debate; locating the gap a contribution would fill
- **research questions and framing** — turning a topic into a tractable question, hypotheses, and a clearly scoped contribution
- **study design and methodology** — experimental, observational, theoretical, qualitative, and computational designs; sampling, measurement, preregistration, reproducibility, and research ethics
- **scientific writing** — drafting and structuring manuscripts (abstract, IMRaD), figures and tables, argumentation, and scholarly register
- **peer review** — writing review reports on others' work, and responding to reviewers (rebuttals) on your own
- **publication strategy** — selecting the right venue (journal vs. conference, scope fit, audience, standards, open access), and the submission process
- **research communication and connections** — positioning a contribution for its audience, presenting and defending it, and navigating scholarly and citation networks toward the right collaborators, sources, and venues
- **citation and referencing conventions** — APA, IEEE, Chicago, Vancouver, MLA, and the discipline's house style; reference managers and BibTeX/RIS

## Scholarly integrity

This is a **learning harness**. Its purpose is to teach the user to *read, design, write, review, and publish* scholarly research — not to manufacture a finished paper for them, not to guarantee a result, and not to predict whether a real venue will accept their work. Review feedback is pedagogical commentary on the user's work, not a substitute for the actual peer review of the target venue.

Two rules are load-bearing in this domain and are stricter versions of the generic external-source convention (see [`../reference/conventions.md`](../reference/conventions.md) *External-source labeling*):

1. **Never fabricate scholarly authority.** Do not invent citations, paper titles, author lists, DOIs, venue names, page numbers, quoted passages, datasets, statistics, or results. If the agent does not have the exact reference, it says so and labels the content `[ext] training knowledge — <area>` rather than manufacturing a plausible-looking citation. A fabricated reference or invented result is the worst failure mode in this domain — worse than an honest "I don't have the citation."
2. **Surface provenance and the established-vs-speculative line.** When the agent states a finding, a method, or a "the literature says…" claim that does not come from the user's `source-materials/`, it says so inline — *"this is well-established in the field, not from your sources"*, *"this is my recollection from training and you should verify it"*, or *"this is my inference, not something I can cite."* Novelty claims ("no one has done X") are flagged as needing a real literature check before they go in a paper.

This domain also carries a **research-ethics** stance baked into how the agent teaches: the harness teaches sound, honest methodology and will not help fabricate or falsify data, p-hack, HARK (hypothesize after results are known), salami-slice, plagiarize, ghostwrite for misrepresentation, or game citation/impact metrics. When a request drifts toward any of these, the agent answers the *learning* question — why the practice is a problem and what the integrity-preserving alternative is — rather than executing the shortcut.

## Session types

Beyond the generic `theory` and `practice` types, this overlay supplies a flavor of the core `role-play` type defined in [`../reference/conventions.md`](../reference/conventions.md) (*Session types vs. flavors*):

- `defense` (a `role-play` flavor) — the agent plays a **skeptical examiner** (a thesis committee, a reviewer panel, a conference Q&A audience, or a grant panel); the user **presents and defends** their research under adversarial questioning. This is a live, in-character dialogue that ends in an out-of-character debrief — the same skeleton as the speech-therapy `simulation` flavor, differing only in the examiner role and that the user defends their own work.

Curriculum entries (in `ai-agent-materials/curriculum.md`) may use `defense` as a session-type value alongside `theory` and `practice`. At session start, the agent considers all three when proposing a route.

This overlay adds no `onboarding` flavor of its own; it inherits the generic `onboarding` protocol unchanged — useful for orienting onto an inherited body of papers or a research codebase in `source-materials/`, where "a recent change" is a recent revision or finding to reconstruct.

`practice` in this domain comes in several flavors, all of them ordinary `practice` sessions; the agent picks one and states which:

- **Analysis (critical reading)** — the user appraises an existing paper: reconstruct its contribution and argument, evaluate the methods and statistics, and surface limitations and threats to validity.
- **Synthesis (literature review)** — the user works *across* several papers: build a literature matrix, map the debate, and locate the gap.
- **Design (proposal)** — the user *produces* a research question and a study design / protocol / proposal section from a topic.
- **Drafting (manuscript)** — the user *produces* a manuscript section (abstract, intro, methods, results, discussion) or a response-to-reviewers letter, against the target venue's structure.
- **Review (peer review)** — the user *produces* a peer-review report on a paper, using a real review frame (summary, strengths, weaknesses, detailed comments, recommendation).
- **Venue fit (publication strategy)** — given a manuscript's contribution, the user analyzes candidate venues for scope, audience, and standards, and produces a ranked submission plan.

Theory sessions lean on the matching vocabulary: philosophy of science and research paradigms; validity, reliability, and bias; the logic of statistical inference; the anatomy of each paper section and the IMRaD contract; citation styles; the publication lifecycle and peer-review process; and bibliometrics.

## Practice session shape

1. The agent proposes a concrete exercise grounded in the current theory topic and picks the flavor (analysis, synthesis, design, drafting, review, or venue-fit) — and states which.
2. The agent prepares the scaffolding (see *Scaffolding form* below):
   - For the **analysis/synthesis/review** flavors, a paper (or realistic excerpt), or a set of papers, plus the analytical task and the frame to fill (an appraisal grid, a literature matrix, a review-report template).
   - For the **design/drafting** flavors, a topic or brief (or a set of results) plus a **skeleton of the target artifact** — its prescribed sections, with boilerplate stubbed and the substantive parts left blank for the user.
3. The user completes the work in the scaffolding file.
4. The agent reviews (see *Review focus*) and pushes deeper — a sharper contribution statement, a tighter argument, a confound the user missed, a method that doesn't support the claim, a citation that doesn't say what it's cited for, a better-fit venue.

When using a real paper, prefer one already in `source-materials/`; if the agent supplies an external exemplar or a piece of background, it is labeled `[ext]` per the conventions and the integrity rules above.

## Defense session protocol

This is the **academic-research flavor of the generic role-play protocol** ([`../reference/conventions.md`](../reference/conventions.md) → *Role-play session protocol (generic)*): the agent's role is a **skeptical examiner**, the work under scrutiny is the **user's own research**, and the debrief rubric is the scholarly one in Phase 3 below. The generic three-phase shape and the break-character convention hold; this section gives the examiner-specific detail. It is the same skeleton as the speech-therapy `simulation` flavor — the differences are that the agent plays an *examiner*, not a patient, and the user defends *their own* work.

A defense session runs in three phases. The agent is **in character** for phases 1–2 and **out of character** for phase 3.

### Phase 0 — Set up (out of character)

1. The agent identifies what is being defended: a manuscript, a proposal, a thesis chapter, or a set of results — drawn from `source-materials/` or from prior `work/` artifacts. If several candidates exist and the user has not specified, the agent asks which.
2. The agent confirms the **panel format** and stakes: viva/thesis committee, journal reviewer panel, conference Q&A, or grant panel; how adversarial; which angles to press (novelty, methods, stats, related work, ethics, significance). It then announces it is entering character.

### Phase 1 — Presentation (in character)

1. The user presents the work (a short statement of the contribution, or a walk-through). The agent, in the examiner role, lets the user lay out the claim before pressing.

### Phase 2 — Questioning (in character)

1. The agent asks pointed, escalating questions the way a real panel would: *what exactly is novel here? why this design and not that one? what's your confound? does your evidence actually support that claim? how does this differ from [prior work]? what would change your conclusion?*
2. The agent stays in role and does **not** hand over the answer or hint at the "right" response — if the user's defense is weak, the panel presses harder, exactly as a real one would. Realistic panel behavior: follow-up chains, requests to justify a choice, a skeptical reviewer and a friendlier one, time pressure.
3. The agent does not break character to coach. Gaps in the defense are debrief material.

### Phase 3 — Debrief (out of character)

1. On the user's signal (`debrief`, `end defense`, or `stop session`), the agent steps out of character.
2. The agent provides a structured debrief: which questions were handled well vs. fumbled; whether the contribution was stated crisply and defended; soundness of the methodological and statistical answers; how related-work and novelty challenges were met; and what a real committee or reviewer would still flag.
3. The agent writes session artifacts to `work/defenses/<topic-id>/` (see *`/work/` layout* below).
4. PROGRESS.md updates follow the generic `stop-session` flow.

### Breaking character mid-session

Per the canonical break-character convention (`../reference/conventions.md` → *Role-play session protocol (generic)*): the user breaks character with a `[square-bracket]` meta-comment (e.g. `[pause — would a reviewer actually ask that?]`); the agent answers out of character and resumes the defense on the user's cue, and never breaks character unprompted — a weak defense is debrief material, not a cue to coach.

## Scaffolding form

Scaffolding for academic-research exercises is a **markdown file under `/work/`** whose shape follows the artifact for the flavor:

- **Analysis** — the source paper (or a cited excerpt) plus a **critical-appraisal grid**: *contribution / claim → method & design → evidence & stats → validity (internal · external · construct) → limitations & threats → relevance to my work*.
- **Synthesis** — a **literature matrix**, one row per paper: *paper → research question → method/sample → key findings → limitations → relation to the others / to my gap*, followed by a short synthesis section.
- **Design** — a **research-question canvas**: *topic → gap → question(s) → hypotheses → design & methods → measures → threats to validity → feasibility & ethics*, left blank for the user with a one-line instruction each.
- **Drafting** — the manuscript's required **section skeleton** for the venue (e.g. IMRaD: *Abstract / Introduction / Related work / Methods / Results / Discussion / Conclusion / References*), with headings and any boilerplate pre-filled and the substantive prose left blank with a one-line instruction. Response-to-reviewers letters use a *reviewer comment → response → change made* three-column layout.
- **Review** — a **peer-review report template** following the venue's review form: *summary of contribution / strengths / weaknesses / detailed comments (major · minor) / questions for the authors / recommendation*.
- **Venue fit** — a **venue comparison table**: *venue → scope fit → audience → typical methods/standards → acceptance bar → open-access & cost → timeline → decision*, plus a short ranked submission plan.

No code stubs. Quoted passages, citations, defined technical terms, and verbatim excerpts are kept verbatim in their source language regardless of the sub-project's `Language:` setting (see *Language interaction*).

## Review focus

Review covers substance and craft, in roughly this order:

- **Argumentation and contribution** — is the central claim clear and is the gap it fills real? Does the evidence presented actually support the contribution, and is the novelty scoped honestly (not over-claimed)?
- **Methodological rigor** — internal, external, and construct validity; confounds and alternative explanations; appropriate statistics, sample size, and power; reproducibility; whether threats to validity are acknowledged. Match the standard to the discipline declared in *Tools & Materials*.
- **Evidence and citation integrity** — is every non-obvious claim backed by a citation, and does each citation actually support the proposition it's attached to? Is the citation form correct for the declared style? This ties directly to the no-fabrication rule above.
- **Scholarly writing and structure** — IMRaD discipline; an abstract that mirrors the paper; signposting and flow; appropriate hedging and precision; figures and tables that stand alone; scholarly register suited to the field.
- **Positioning and publication fit** — is the framing pitched at the right altitude for the target venue and audience? Does the related-work section place the contribution correctly among its neighbors?

For the analysis, synthesis, and review flavors, review also checks the *appraisal itself* — did the user identify the paper's actual contribution, evaluate it against the right standard, distinguish fatal flaws from minor ones, and give actionable, collegial feedback rather than a restatement of the abstract.

## `/work/` layout

```
work/
  notes.md                ← cross-cutting study notes (methods, definitions, citation rules)
  reads/                  ← analysis-flavor critical appraisals, one file per paper
    <paper-id>.md
  lit-reviews/            ← synthesis-flavor matrices and maps, one file (or folder) per review question
    <review-id>.md
  proposals/              ← design-flavor research questions and study designs
    <proposal-id>.md
  manuscripts/            ← drafting-flavor, one folder per manuscript
    <manuscript-id>/
      brief.md            ← the topic / results / drafting instructions
      draft.md            ← the user's draft
      review.md           ← the agent's review notes
  reviews/                ← peer-review reports the user writes on others' papers
    <paper-id>.md
  venues/                 ← publication-strategy analyses
    <manuscript-id>.md
  defenses/               ← defense-session transcripts + debriefs
    <topic-id>/
      transcripts/        ← one file per defense session (dated)
      debriefs/           ← one debrief file per defense session (dated)
```

Per-manuscript folders under `manuscripts/` keep a paper's brief, draft, and review together, the way a paper's working files are organized. Per-topic folders under `defenses/` mirror the speech-therapy case layout: dated transcripts and debriefs. The flat flavors (`reads/`, `lit-reviews/`, `proposals/`, `reviews/`, `venues/`) stay one-file-per-item so a sub-project is easy to grep.

## Source materials

The standard `source-materials/` folder holds the canonical content: papers and preprints, the user's own datasets and results, draft manuscripts, the target venue's author guidelines and review forms, citation/style manuals, and reference-manager exports (BibTeX/RIS). These are treated as authoritative for the sub-project; anything the agent adds from outside is `[ext]`-labeled per the integrity rules.

A corpus of papers for the synthesis flavor can live under `source-materials/papers/`:

```
source-materials/
  papers/
    <paper-id>.pdf
```

Optionally, design, drafting, and defense exercises can be seeded from reusable **briefs** under `source-materials/briefs/`:

```
source-materials/
  briefs/
    <brief-id>.md
```

A brief is the academic-research analogue of a worked prompt: a research idea to develop, a set of results to write up, or a piece of work to defend, plus any constraints (target venue, discipline norms, methodological commitments). When present, the agent draws on these instead of inventing a scenario each time.

## Tools & Materials field

For academic-research sub-projects, the `Tools & Materials` section in the sub-project `AGENTS.md` should declare at minimum:

- **field / discipline (and subfield)** — sets the norms, the expected rigor, and which methods and reporting standards apply.
- **target venue(s)** — journal vs. conference, named venues where known, and their author guidelines and review criteria.
- **citation style** and **reference manager** — APA, IEEE, Chicago, Vancouver, etc.; Zotero/Mendeley/BibTeX.
- **methodology paradigm** — quantitative, qualitative, mixed, theoretical, or computational; any relevant reporting standards (e.g. CONSORT, PRISMA, STROBE).
- **research-integrity expectations** — preregistration, ethics/IRB approval, open-science and data-availability practices the sub-project follows.
- **authoritative references** — the key papers, style and reporting guidelines, and venue instructions the agent should treat as canonical for this sub-project.

## Language interaction

Conversational output follows the sub-project's `Language:` setting as usual. But scholarly publishing has its own language facts that this domain respects:

- **Quoted passages, citations, defined technical terms, and verbatim excerpts** stay in the source's original language and exact form, regardless of the `Language:` setting — never translate a cited quotation or a term of art in place of its original.
- **Manuscript drafts** are produced in the language the target venue requires, which is frequently English even when the sub-project chats in another language. If a sub-project converses in one language but drafts for a venue that operates in another, the agent drafts in the venue's language and discusses/reviews in the conversational language, flagging the split on first use.
- **Defense dialogue** runs in the language the panel format implies (usually the venue's or the institution's language); out-of-character setup and debrief use the conversational `Language:`.
