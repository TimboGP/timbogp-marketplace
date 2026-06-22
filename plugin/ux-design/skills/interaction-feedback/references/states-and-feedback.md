# States and feedback (reference)

How to choose and time feedback for async actions and data-backed views, and how to make that feedback accessible.

## Decision table

| Situation | Recommended pattern | Accessibility mechanism | Timing |
|---|---|---|---|
| Loading content with a known layout (cards, table, profile) | Skeleton placeholders | `aria-busy="true"` on the container; optional `role="status"` "Loading…" | Show immediately; keep until data arrives |
| Short, indeterminate wait, layout unknown | Spinner | `role="status"` + visually-hidden "Loading…" | Delay ~200–300ms before showing to avoid flash |
| In-place action (save, submit, like) | Button busy state (disabled look, label "Saving…") | `aria-busy="true"` on the button; keep accessible name | Apply on click; keep button size stable |
| Action succeeded, low importance | Inline confirmation or transient toast | `role="status"` / `aria-live="polite"` | Toast auto-dismiss ~4–6s |
| Action succeeded, affects current view | In-context change (row updates, checkmark) | Natural DOM update; optional polite status | Immediate |
| Field-level validation failure | Inline message at the field | `aria-invalid="true"` + `aria-describedby`; container `role="alert"` if shown after submit | Validate on blur and on submit |
| Form submit failed (multiple errors) | Error summary at top + inline messages | Summary in `role="alert"`; move focus to summary or first invalid field | On submit |
| Action/request failed (global) | Inline error region with retry | `role="alert"` / `aria-live="assertive"` | Show until dismissed or resolved; do not auto-dismiss |
| No data yet | Empty state: explanation + primary CTA | Normal content; heading + action | Immediate |
| Filtered to nothing | Empty state with "Clear filters" | Normal content | Immediate |
| Likely-to-succeed mutation | Optimistic update | Polite status on apply; `role="alert"` on rollback | Update immediately; reconcile on response |

## The four states in depth

**Empty.** Two distinct kinds: *first-use* (the user has created nothing yet — teach the value and give one clear primary action) and *filtered/cleared* (data exists but the current query matches nothing — offer to reset filters or broaden the search). Never render a bare "No results" with no path forward. Avoid showing the empty state during the initial load — show loading first, then resolve to empty or content.

**Loading.** The goal is to reduce *perceived* wait and *prevent layout shift*. Reserve the final layout's space so content doesn't jump in. Prefer skeletons when you know the shape; use spinners only for unknown/short waits. Avoid stacking multiple spinners; a single regional indicator reads better. For background refreshes of already-visible data, keep the stale data visible and show a subtle inline indicator rather than wiping the screen.

**Error.** Errors must be *visible, located, and recoverable*. Locate the message next to its cause; for whole-page failures, a regional banner with a Retry is fine. Write plain-language, specific messages ("We couldn't reach the server" beats "Error 500"), say what to do next, and preserve user input. Provide a recovery action — retry, edit, undo, or a support path. Distinguish *expected* errors (validation, conflicts) from *unexpected* ones (network, server) — expected errors guide; unexpected errors reassure and offer retry.

**Success / ideal.** Confirm without nagging. Prefer the smallest sufficient confirmation: an in-context change (the toggle is now on, the item appears in the list) often needs no extra message. Use a toast for confirmations that have no natural in-context home. Don't block the next action with a modal "Success!" unless the success genuinely requires acknowledgement.

## Toast accessibility

- **Live region type:** routine confirmations → `aria-live="polite"` (or `role="status"`, which is implicitly polite). Errors / urgent → `aria-live="assertive"` (or `role="alert"`, implicitly assertive).
- **Region must pre-exist:** create the live region(s) in the DOM at load and inject text into them. A region added to the DOM at the same time as its content may not be announced.
- **Two regions:** keep a polite region for status and a separate assertive region for alerts so an error never waits behind a queue of polite messages.
- **Don't move focus to a toast** for routine messages (it would interrupt the user). For *blocking* errors, prefer an inline alert with focus management over a transient toast.
- **Critical actions never live only in a toast.** "Undo" in a toast is a nice-to-have, not the only way to recover — toasts vanish and are hard to reach by keyboard.
- **Timing:** auto-dismiss neutral toasts (~4–6s; give long messages more time). Pause the timer on hover and on focus so users can read/interact. Never auto-dismiss errors that require action.

## Inline validation timing

- **Validate on blur** (when the user leaves a field) and **on submit** — not on every keystroke. Validating while typing flags errors before the user is done and feels hostile.
- **Re-validate on input only after a field has already errored**, so the user sees the error clear as they fix it.
- **Always validate on submit**, move focus to the first invalid field (or an error summary), and announce via `role="alert"`.
- **Show success sparingly.** A green check on every valid field is visual noise; reserve positive confirmation for fields with real uncertainty (e.g. password strength, username availability).
- Associate messages with fields: `aria-invalid="true"` + `aria-describedby="<msg id>"`.

## Skeleton vs spinner

- **Skeleton** when: layout is known, content takes a moment, and you want to preserve structure (lists, cards, dashboards). Match the skeleton to the real layout's dimensions.
- **Spinner** when: the wait is short, the area is small, or the layout is unknown (a button action, a brief fetch). One indeterminate indicator.
- **Progress bar** when: progress is measurable (uploads, multi-step). Show percentage/steps.
- Either way: delay ~200–300ms to avoid flashing on fast responses, and reserve space to prevent layout shift.

## Optimistic UI rollback UX

- Apply the change to the UI immediately and fire the request.
- Track enough prior state to **roll back exactly** if the request fails.
- On failure: revert the UI, then show a clear, **recoverable** message ("Couldn't save — your change was reverted. Retry?"). Don't silently revert (the user will think it worked).
- Announce the rollback via `role="alert"` so it isn't missed.
- Use optimistic UI only when success is highly likely and rollback is cheap and unambiguous. For risky/irreversible actions, wait for confirmation.

## Reduced-motion handling

- Wrap non-essential animation in `@media (prefers-reduced-motion: no-preference)`, or disable/shorten it under `@media (prefers-reduced-motion: reduce)`.
- Motion must never be *required* to understand a state change — provide a non-animated cue too (text, icon, position).
- Avoid large parallax, auto-playing motion, and big slide/zoom transitions for users who opt out; prefer simple fades or instant changes.

## Anti-patterns

- **Silent failures** — an action does nothing visible on error. Always surface failures.
- **Infinite spinners** — a spinner with no timeout and no error fallback. Always handle the failure path.
- **Color-only signals** — red/green with no icon or text; invisible to color-blind users.
- **Toast-only errors** — putting a critical error or its only recovery action in a transient toast.
- **Validating while typing** — flagging errors on every keystroke before the user finishes.
- **Layout shift on load** — content jumping as it arrives because no space was reserved.
- **Empty "No data"** — a dead empty state with no explanation or action.
- **Success modals that block** — interrupting flow to announce a routine success.
- **Disabling without explanation** — a disabled control with no hint why it's disabled or how to enable it.
