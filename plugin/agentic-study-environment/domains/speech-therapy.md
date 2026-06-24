# Domain overlay: speech therapy (logopedics)

This overlay applies to any sub-project that declares `Domain: speech-therapy` (or the synonym `Domain: logopedics`) in its `AGENTS.md` (or, for older projects, `CLAUDE.md`). It refines the generic core defined by the agentic-study-environment plugin (see [`../reference/conventions.md`](../reference/conventions.md) and the lifecycle skills under `../skills/`) — it does not replace it. Everything not redefined here continues to follow the generic core.

Paths in this overlay (`work/`, `source-materials/patients/`, …) are relative to the sub-project root, which is `.studyenv/<name>/`.

The scope of a speech-therapy sub-project typically spans:

- ENT medicine and anatomy
- speech, voice, swallowing, and language pathology
- developmental and acquired communication disorders
- pedagogy and intervention methodology
- clinical communication: anamnesis technique, treatment planning, documentation
- adjacent fields the curriculum brings in (neurology, audiology, phonetics, psycholinguistics)

## Session types

Beyond the generic `theory` and `practice` types, this overlay supplies a flavor of the core `role-play` type defined in [`../reference/conventions.md`](../reference/conventions.md) (*Session types vs. flavors*):

- `simulation` (a `role-play` flavor) — the agent plays a **simulated patient** drawn from a profile in `source-materials/`; the user plays the **therapist**.

Curriculum entries (in `ai-agent-materials/curriculum.md`) may use `simulation` as a session-type value alongside `theory` and `practice`. At session start, the agent considers all three when proposing a route.

Theory and practice sessions keep their generic shape (concept discussion, exercises, written tasks). Simulation sessions follow the protocol below — the speech-therapy flavor of the generic role-play protocol.

This overlay adds no `onboarding` flavor of its own; it inherits the generic `onboarding` protocol unchanged (e.g. orienting onto a body of clinical guidelines or a case archive in `source-materials/`) if a curriculum calls for it.

## Simulation session protocol

This is the **speech-therapy flavor of the generic role-play protocol** ([`../reference/conventions.md`](../reference/conventions.md) → *Role-play session protocol (generic)*): the agent's role is a **patient**, the work under scrutiny is the **user's clinical handling** of the encounter, and the debrief rubric is the clinical one in Phase 3 below. The generic three-phase shape and the break-character convention hold; this section gives the patient-specific detail.

A simulation session runs in three phases. The agent is **in character** for phases 1–2 and **out of character** for phase 3.

### Phase 0 — Set up (out of character)

1. The agent identifies the active patient profile. Profiles live under `source-materials/patients/<patient-id>.md`. If multiple profiles exist and the user has not specified one, the agent asks which patient.
2. The agent loads the profile in full: presenting concern, primary and comorbid conditions, demographics, history, social/family context, personality and communication style, **what the patient knows and doesn't know about their own condition**, the speech/voice/language profile to render in dialogue, and process notes (prior sessions in this simulation arc).
3. The agent briefly confirms simulation parameters with the user: which patient, type of session (initial anamnesis, follow-up, therapy block N), any constraints. Then it announces it is entering character.

### Phase 1 — Anamnesis (in character)

1. The agent enters the patient role and stays there. Replies are first-person as the patient, in the register and style the profile specifies.
2. The user (therapist) drives the conversation. The agent reveals information **only in response to questions the user asks**, and only at the level of self-awareness the profile specifies — patients with limited insight should not volunteer clean diagnostic descriptions, and patients who don't know about a comorbidity must not mention it unprompted.
3. Conditions that affect speech itself (articulation disorders, fluency disorders, voice disorders, aphasia, dysarthria, language delay, etc.) shape the **form** of replies, not just the content. The agent renders the speech pattern in writing using the notation conventions declared in the sub-project (e.g. orthographic stutter markup, pause markers, IPA for substitutions, paraphasias). If no convention is set, the agent picks a reasonable one and notes it inline on first use.
4. Personality and affect drive **how** the patient responds: a withdrawn patient gives short answers; an anxious patient digresses; a non-compliant patient deflects; a child patient asks back, gets distracted, looks to the parent.
5. The agent does not break character to point out missed questions or hand over clues. If the user does not ask, the patient does not tell.

### Phase 2 — Therapy interaction (in character)

1. The user proposes and conducts therapy activities (exercises, prompts, structured tasks). The agent participates as the patient with realistic performance: makes the kinds of mistakes the profile implies, shows fatigue, frustration, motivation, or rapport per personality, responds to therapeutic technique the way a real patient with this profile plausibly would.
2. The agent tracks within-session state implicitly: the patient remembers what was just said, gets tired across long stretches, responds to (or fails to respond to) rapport.
3. If the user does something clinically inappropriate or potentially harmful, the patient may react in character (confusion, discomfort, refusal). The agent does **not** break character to lecture — that's for phase 3.

### Phase 3 — Debrief (out of character)

1. On the user's signal (`end simulation`, `debrief`, or `stop session`), the agent steps out of character.
2. The agent provides a structured debrief: which conditions were uncovered vs. missed during anamnesis; clinical reasoning visible in the user's choices; communication and rapport-building; appropriateness of techniques used; what a supervisor would flag; what the profile would have revealed under different questioning.
3. The agent writes session artifacts to `/work/cases/<patient-id>/` (see *`/work/` layout* below).
4. PROGRESS.md updates follow the generic `stop session` flow.

### Breaking character mid-session

Per the canonical break-character convention (`../reference/conventions.md` → *Role-play session protocol (generic)*): the user breaks character with a `[square-bracket]` meta-comment (e.g. `[pause — what would this patient actually do here?]`); the agent answers out of character and resumes on the user's cue, and never breaks character unprompted — clinical mistakes are debrief material.

## Scaffolding form

Scaffolding in this domain takes two forms, depending on session type:

- **Theory and practice sessions** — markdown files under `/work/` with the prompt, study questions, and (for practice) any structured exercise (label this diagram, classify these phonemes, match symptom → likely condition, draft a treatment plan for case X). No code stubs.
- **Simulation sessions** — the scaffolding is the patient profile itself, in `source-materials/patients/`. The output is a transcript and a debrief, both written to `/work/cases/<patient-id>/`.

## Review focus

Review covers correctness and clinical craft:

- **Anamnesis technique** — differential coverage, pacing, open vs. closed questions, rapport-building
- **Clinical reasoning** — did the working hypothesis update as evidence came in? were alternative conditions considered?
- **Treatment choices** — appropriateness for the suspected condition, evidence base, ordering, dosage of intervention
- **Communication** — language register suited to the patient, handling of patient affect, informed-consent moments
- **Documentation** — quality of session notes, what's recorded vs. left inferable

For theory sessions, review is concept- and source-grounded: did the user reach the definitions the source material uses? are there standard misconceptions worth flagging?

## `/work/` layout

```
work/
  notes.md           ← cross-cutting study notes
  theory/            ← optional: theory-session artifacts grouped by topic
  exercises/         ← practice-session worksheets and answers
  cases/
    <patient-id>/
      transcripts/   ← one file per simulation session (dated)
      debriefs/      ← one debrief file per simulation session (dated)
      treatment-plan.md   ← evolving treatment plan, edited across sessions
      notes.md       ← clinical notes the user keeps on this patient
```

The cases tree mirrors how a real caseload is organized: per-patient folders, dated artifacts.

## Source materials

The standard `source-materials/` folder is used as usual for textbooks, papers, and lecture notes. In addition, this domain expects **patient profiles** under `source-materials/patients/`:

```
source-materials/
  patients/
    <patient-id>.md
```

Each patient profile should include:

- **demographics** — age, sex, occupation, language(s) spoken, education
- **presenting concern** — what brought the patient (or referrer) in
- **primary condition(s)** — diagnosis or working diagnosis, severity, time course
- **comorbid / secondary conditions** — including ones the patient may not know about
- **history** — medical, developmental, family, prior therapy
- **personality and affect** — communication style, motivation, typical defenses
- **insight** — what the patient knows, suspects, or denies about their own condition
- **speech/voice/language profile** — concrete features to render in dialogue (e.g. consistent /r/ → /l/ substitution, dysfluency at word onsets, anomic gaps in noun retrieval, breathy voice quality)
- **process notes** — prior sessions in this simulation arc, evolving treatment plan, outstanding goals

When the user adds or updates a profile, the agent reads it on next session-start and treats it as canonical.

## Tools & Materials field

For speech-therapy sub-projects, the `Tools & Materials` section in the sub-project `AGENTS.md` typically declares:

- the **clinical framework(s)** in use (ICD-10/11, ICF, country-specific guidelines)
- the **classification / assessment tools** the curriculum applies (aphasia batteries, articulation tests, voice quality scales, fluency measures)
- **notation conventions** for speech features in transcripts (IPA, stutter markup, pause notation, paraphasia annotation)
- any **reference materials** the agent should treat as authoritative for clinical questions

## Language interaction

Simulation dialogue uses the patient's language as specified in the profile, which should generally match the sub-project's `Language:` setting. If a profile declares a different language (e.g. a bilingual patient or a case study in a language other than the sub-project's default), the agent uses the profile's language for in-character dialogue and the sub-project's language for out-of-character setup and debrief.
