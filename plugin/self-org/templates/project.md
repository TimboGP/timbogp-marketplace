---
type: project
status: active
description: {{ONE_SENTENCE_SUMMARY}}
due: {{HORIZON_DATE}}
dateCreated: {{NOW}}
---

# {{PROJECT}}

## Description

{{THE_USERS_DESCRIPTION_VERBATIM}}

## Outcome & constraints

- **Done looks like:** {{OUTCOME}}
- **Why now:** {{WHY}}
- **Horizon:** {{HORIZON_DATE}}
- **Constraints:** {{TIME_BUDGET_PEOPLE_MONEY_DEPENDENCIES}}

## Goals and tasks

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Goals
    filters:
      and:
        - 'type == "goal"'
    order:
      - file.name
      - status
      - current
      - target
      - unit
      - due
  - type: table
    name: Tasks
    filters:
      and:
        - file.hasTag("task")
    groupBy:
      property: status
      direction: ASC
    order:
      - file.name
      - priority
      - scheduled
      - due
      - timeEstimate
```
