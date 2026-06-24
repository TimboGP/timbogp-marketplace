# Domain overlay: official public and legal documents

This overlay applies to any sub-project that declares `Domain: legal-documents` (or the synonyms `Domain: official-documents` / `Domain: public-documents`) in its `AGENTS.md` (or, for older projects, `CLAUDE.md`). It refines the generic core defined by the agentic-study-environment plugin (see [`../reference/conventions.md`](../reference/conventions.md) and the lifecycle skills under `../skills/`) — it does not replace it. Everything not redefined here continues to follow the generic core.

Paths in this overlay (`work/`, `source-materials/briefs/`, …) are relative to the sub-project root, which is `.studyenv/<name>/`.

The scope of a legal-documents sub-project typically spans:

- legislation and statutory interpretation (statutes, regulations, codes, ordinances)
- case law and judicial decisions (reading and briefing judgments)
- contracts and private legal instruments (drafting, redlining, clause analysis)
- court and procedural documents (pleadings, motions, briefs, filings)
- administrative and public-authority documents (decisions, permits, notices, official correspondence, gazette entries)
- public records and official forms (applications, declarations, certifications, affidavits)
- legal citation and referencing conventions (Bluebook, OSCOLA, ALWD, jurisdiction-specific styles)
- plain-language and legal-design practice — making official documents readable without losing legal effect

## Study, not legal advice

This is a **learning harness**. Its purpose is to teach the user to *read, interpret, draft, and critique* legal and official documents — not to provide legal advice for a real matter, and not to act as a lawyer. Review feedback is pedagogical commentary on the user's work, not an opinion the user should rely on in an actual dispute or filing.

Two rules are load-bearing in this domain and are stricter versions of the generic external-source convention (see [`../reference/conventions.md`](../reference/conventions.md) *External-source labeling*):

1. **Never fabricate authority.** Do not invent statute numbers, section references, case citations, regulation titles, or quoted statutory text. If the agent does not have the exact citation, it says so and labels the content `[ext] training knowledge — <area>` rather than manufacturing a plausible-looking reference. A fabricated legal citation is the worst failure mode in this domain.
2. **Surface provenance and jurisdiction-fit out loud.** When the agent explains a rule, a required clause, or a document form that does not come from the user's `source-materials/`, it says so inline — *"this is the general common-law approach, not from your statute"* — and flags when something is jurisdiction-specific and may not hold in the sub-project's declared jurisdiction.

When a question crosses from "help me learn this document" into "tell me what I should legally do," the agent answers the learning question and notes, briefly, that a real matter warrants a qualified professional in the relevant jurisdiction.

## Session types

Uses the generic `theory` and `practice` types, and adds **no `role-play` flavor of its own**. Practice in this domain comes in two flavors, both of which are ordinary `practice` sessions:

- **Analysis** — the user works *with* an existing document: brief a case, extract the operative rule from a statute, map a contract's parties/obligations/conditions, redline a clause, or rewrite legalese into plain language.
- **Drafting** — the user *produces* a document from a brief or fact pattern: a contract clause, a motion section, a formal administrative letter, a completed official form, a statutory-style provision.

It inherits the generic `onboarding` type unchanged (see [`../reference/conventions.md`](../reference/conventions.md) → *Onboarding session protocol (generic)*) — useful for orienting onto an inherited **legal corpus** (a statute set, a contract suite, a matter file): walk it part by part, then reproduce a recent change (e.g. redraft a recent amendment or clause revision). Analysis and drafting are `practice` flavors, per *Session types vs. flavors* in the conventions.

Theory sessions lean on the matching vocabulary: sources of law, hierarchy of norms, statutory-interpretation canons, elements of a cause of action, the anatomy of each document type, and the conventions of legal citation.

## Practice session shape

1. The agent proposes a concrete exercise grounded in the current theory topic and picks the flavor (analysis or drafting) — and states which.
2. The agent prepares the scaffolding (see *Scaffolding form* below):
   - For **analysis**, a document (or realistic excerpt) plus the analytical task and the frame to use (e.g. IRAC for a case brief, an issues/obligations grid for a contract).
   - For **drafting**, a fact pattern or client brief plus a **skeleton of the target document** — its prescribed structural sections, with the boilerplate stubbed and the operative parts left blank for the user.
3. The user completes the work in the scaffolding file.
4. The agent reviews (see *Review focus*) and pushes deeper — a sharper interpretation, a cleaner clause, an ambiguity the user missed, a required element omitted, a citation in the wrong form.

When using a real document excerpt, prefer one already in `source-materials/`; if the agent supplies an external exemplar, it is labeled `[ext]` per the conventions.

## Scaffolding form

Scaffolding for legal-documents exercises is a **markdown file under `/work/`** whose shape follows the prescribed form for the document type:

- **Drafting** scaffolds reproduce the document's required skeleton — e.g. a contract's *Title / Parties / Recitals / Definitions / Operative clauses / Boilerplate / Signature block*; a court motion's *Caption / Introduction / Statement of facts / Argument / Prayer for relief / Signature*; an administrative decision's *Legal basis / Findings / Ruling / Appeal instructions*. Boilerplate and headings are pre-filled; the operative sections are left blank with a one-line instruction each. The exact skeleton is dictated by the document type and the jurisdiction declared in *Tools & Materials*.
- **Analysis** scaffolds carry the source document (or a cited excerpt) plus a structured frame to fill: *Issue / Rule / Application / Conclusion* for a case brief; a *party → obligations → conditions → remedies* grid for a contract; a *provision → operative rule → ambiguities → cross-references* table for a statute; a two-column *original | plain-language* layout for a rewrite.

No code stubs. Defined terms, citations, and quoted statutory text are kept verbatim in their source language regardless of the sub-project's `Language:` setting (see *Language interaction*).

## Review focus

Review covers substance and form, in roughly this order:

- **Substantive accuracy** — does the interpretation match the authority? Does the draft achieve the intended legal effect? Are the required elements of this document type all present?
- **Formal compliance** — does the document follow the prescribed structure for its type and jurisdiction (caption, recitals, mandatory clauses, execution/signature requirements, filing formalities)?
- **Precision and ambiguity** — the core drafting skill: is the language unambiguous? Are defined terms used consistently and only as defined? Are there loopholes, gaps, dangling references, or unintended readings? Could a hostile reader exploit it?
- **Citation and authority** — are citations correct in *form* (the declared style) and do they actually support the proposition? Tie directly to the no-fabrication rule above.
- **Clarity / plain language** — where precision allows, is it readable? Flag needless legalese, but respect the genuine precision-vs-readability tradeoff: do not "simplify" a term of art into something that changes its legal meaning.

For analysis exercises, review also checks the reasoning frame itself — was the issue correctly identified, the right rule selected, the application made to *these* facts rather than restated in the abstract.

## `/work/` layout

```
work/
  notes.md                ← cross-cutting study notes (doctrine, definitions, citation rules)
  analyses/               ← analysis-flavor exercises (case briefs, statute breakdowns, redlines, plain-language rewrites)
    <exercise-id>.md
  drafts/                 ← drafting-flavor exercises, one folder per instrument
    <instrument-id>/
      brief.md            ← the fact pattern / client brief / drafting instructions
      draft.md            ← the user's draft
      review.md           ← the agent's review notes
```

Per-instrument folders under `drafts/` keep a document's brief, draft, and review together, mirroring how a matter file is organized. Analyses stay flat — they are usually single-file.

## Source materials

The standard `source-materials/` folder holds the canonical content: statutes, regulations, reported cases, contract templates and exemplars, court rules, official forms, gazette notices, and citation/style manuals. These are treated as authoritative for the sub-project; anything the agent adds from outside is `[ext]`-labeled.

Optionally, drafting exercises can be seeded from reusable **briefs** (fact patterns / client instructions) kept under `source-materials/briefs/`:

```
source-materials/
  briefs/
    <brief-id>.md
```

A brief is the legal-documents analogue of a worked prompt: the scenario, the parties, the goal of the document to be produced, and any constraints (jurisdiction, governing law, must-have clauses). When present, the agent draws on these for drafting scaffolds instead of inventing a scenario each time.

## Tools & Materials field

For legal-documents sub-projects, the `Tools & Materials` section in the sub-project `AGENTS.md` should declare at minimum:

- **jurisdiction(s)** and **legal system** — e.g. *England & Wales (common law)*, *Germany (civil law)*, *EU law*, *U.S. federal + a named state*; "mixed" where applicable. Document form and applicable law depend on this.
- **citation style** — Bluebook, OSCOLA, ALWD, or the jurisdiction's official/gazette convention.
- **document types in scope** — which of statutes, case law, contracts, pleadings, administrative decisions, and forms this sub-project actually works with.
- **authoritative references** — the codes, court rules, style manuals, or template repositories the agent should treat as canonical for this sub-project.
- **register / language** — the formal legal register and language of the jurisdiction, noting that legal terminology often diverges from everyday usage (see *Language interaction*).

## Language interaction

Conversational output follows the sub-project's `Language:` setting as usual. But this domain has unusually strict carve-outs because legal meaning is bound to exact wording:

- **Quoted statutory text, citations, defined terms, and verbatim excerpts** stay in the source's original language and exact form, regardless of the `Language:` setting — never translate a term of art in place of its original.
- **Document drafts** are produced in the language and register of the declared jurisdiction, which may differ from the conversational `Language:`. If a sub-project chats in one language but drafts instruments for a jurisdiction that operates in another, the agent drafts in the jurisdiction's language and discusses/reviews in the conversational language, flagging the split on first use.
