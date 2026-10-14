# The three methods — summary and credits

Shared reference for the `self-org` plugin. This is the **single place** where the methods are credited; skills and docs link here instead of restating sources. Per-method detail (rubrics, heuristics, step procedures) lives in each skill's `references/`.

Rule for everyone editing this plugin: **credit the originators, never invent citations** (no made-up editions, page numbers, or quotes). Where a detail is folklore or a later convention, say so.

## How they chain

```
project description ──smart-goals──▶ goals + next actions ──eisenhower──▶ triaged tasks ──alpen──▶ today's plan ──alpen review──▶ carry-over
```

SMART decides *what* to achieve, Eisenhower decides *which work matters now*, ALPEN decides *what fits into today* and closes the loop each evening. Each skill also works on its own.

## SMART goals

A checklist for writing goals that can actually be tracked: **S**pecific, **M**easurable, **A**chievable, **R**elevant, **T**ime-bound.

- **Origin:** George T. Doran, "There's a S.M.A.R.T. way to write management's goals and objectives", *Management Review* 70(11), November 1981, pp. 35–36.
- **What the plugin adapts:** Doran's original letters were **S**pecific, **M**easurable, **A**ssignable, **R**ealistic, **T**ime-related. The plugin uses the now-common reading (Achievable, Relevant) and keeps Doran's *Assignable* as a question inside **A** ("who owns this?"). Doran himself noted that not every objective has to meet all five criteria; the plugin therefore lets the user knowingly accept a failed criterion, with a note, instead of blocking.

## Eisenhower matrix

Sort work by two independent questions — *is it urgent?* *is it important?* — into four quadrants with different actions.

- **Origin of the idea:** Dwight D. Eisenhower, in a 1954 address in Evanston, Illinois, quoted an unnamed former college president on the difference between urgent and important problems. There's no evidence he drew a matrix; "Eisenhower matrix" is a later name.
- **The 2×2 as a time-management tool** was popularised by Stephen R. Covey in *The 7 Habits of Highly Effective People* (1989, Habit 3, "Put First Things First") and *First Things First* (1994, with A. Roger Merrill and Rebecca R. Merrill), as Quadrants I–IV. Covey's emphasis — that Quadrant II (important, not urgent) is where long-term progress happens — is why the plugin points users at Q2 after every triage.
- **What the plugin adapts:** the action labels **Do / Schedule / Delegate / Drop** are a later popular convention, not Covey's wording. Because many users have nobody to delegate to, Q3 offers "do quickly", "schedule" or "drop" as alternatives.

## ALPEN method

A five-step routine for planning a single day, from the German acronym:

| Step | German | Meaning |
|---|---|---|
| **A** | Aufgaben, Termine, Aktivitäten notieren | write down tasks, appointments, and planned activities |
| **L** | Länge schätzen | estimate how long each takes |
| **P** | Pufferzeiten reservieren | reserve buffer time — plan only about 60 % of the day |
| **E** | Entscheidungen treffen | decide: prioritise, cut, delegate |
| **N** | Nachkontrolle | review in the evening; carry unfinished work forward |

- **Origin:** Lothar J. Seiwert, German time-management author; the method appears in his books (for example *Das 1x1 des Zeitmanagement*, GABAL Verlag, published in many editions).
- **The 60:40 rule:** plan roughly 60 % of the available time and keep roughly 40 % free — commonly described as about 20 % for the unexpected and about 20 % for spontaneous and social activities. The 60 % is a default, overridable via `Planned share:` in `<root>/AGENTS.md`.
- **What the plugin adapts:** appointments count inside the 60 %; step **E** uses the Eisenhower quadrants as the cut order; step **N** writes estimate-accuracy numbers so later plans can be calibrated.

## Trademarks and affiliation

"The 7 Habits of Highly Effective People" is a trademark of FranklinCovey Co. Obsidian is a trademark of its respective owner. TaskNotes is an independent open-source Obsidian plugin. All names are used nominatively; this plugin is not affiliated with, sponsored, or endorsed by any of them. See [`../NOTICE`](../NOTICE).
