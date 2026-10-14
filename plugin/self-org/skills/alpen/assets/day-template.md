---
type: day
date: {{DATE}}
workdayMinutes: {{WORKDAY_MINUTES}}
capacityMinutes: {{CAPACITY_MINUTES}}
plannedMinutes: {{PLANNED_MINUTES}}
plannedCount: {{PLANNED_TASK_COUNT}}
---

# {{DATE}} ({{WEEKDAY}}) — ALPEN

## Appointments

| Time | Duration | What |
|---|---|---|
| {{HH:MM}} | {{MIN}} min | {{TITLE}} |

## Plan

| # | Task | Quadrant | Estimate | Block |
|---|---|---|---|---|
| 1 | [[{{TASK}}]] | {{Q1 Do}} | {{MIN}} min | {{optional start time}} |

## Buffer

- Working window: {{WORKDAY_MINUTES}} min · capacity at {{PLANNED_SHARE}} %: {{CAPACITY_MINUTES}} min
- Planned: {{PLANNED_MINUTES}} min (appointments {{APPOINTMENT_MINUTES}} + tasks {{TASK_MINUTES}}) · buffer left: {{BUFFER_MINUTES}} min
- Moved to other days: {{[[task]] → YYYY-MM-DD, … or "none"}}
{{- Overbooked: … (only if the user knowingly accepted it)}}

## Review

_Filled in by the evening review._

## Lessons

_One line from the evening review._
