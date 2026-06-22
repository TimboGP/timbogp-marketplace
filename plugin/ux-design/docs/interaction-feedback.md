# Interaction Feedback — `interaction-feedback`

> Give every async action and data-backed view clear, accessible feedback for its loading, empty, error, and success states.

## What it does
This skill makes sure the interface always tells users what happened. It implements the four core states every data- or action-backed component needs — empty, loading, error, and success — plus toasts, micro-interactions, optimistic UI, and inline validation. It wires accessibility announcements (`aria-live`, `role="alert"`, focus management) into each pattern and adapts the implementation to the detected stack, reusing existing toast, form, and data libraries rather than introducing parallel systems.

## When it triggers
Skills activate automatically based on your request. This one triggers on phrases like:
- "add loading and error states"
- "show a success message" / "add a toast/notification"
- "inline form validation"
- "optimistic UI"
- "empty state for this list"
- "this button gives no feedback"
- "add a skeleton loader"

## How to use it
- **Just ask:** "Add loading and error states to this dashboard." / "This save button gives no feedback — fix it." / "Add an accessible toast when the form submits."
- **Via command:** No dedicated command of its own — it's one of the implement skills driven by `/ux-bootstrap` (alongside ux-foundations). You can also just trigger it by asking.
- **Typical flow:**
  1. Detect the stack (framework, styling, language) per the ux-foundations stack-detection procedure and report it in one line.
  2. Identify which of the four states the component is missing and treat any unhandled state as a bug.
  3. Reuse existing toast/validation/data libraries; style via design tokens, not hardcoded values.
  4. Implement the loading/empty/error/success patterns with correct timing (e.g., delay spinners ~200–300ms, auto-dismiss neutral toasts ~4–6s, never auto-dismiss errors).
  5. Add accessibility: live regions present before content, focus moved to the first invalid field on error, `aria-invalid`/`aria-describedby`, and reduced-motion gating.

## What you get
Scaffolded, stack-appropriate state handling and feedback wired into your components — skeletons/spinners, in-context confirmations and toasts, inline and form-level validation, optimistic updates with rollback, and the ARIA announcements that make them perceivable to screen-reader and keyboard users.

## Reference files
- `references/states-and-feedback.md` — a decision table (situation → pattern → a11y mechanism → timing), the four states in depth, toast accessibility, inline validation timing, skeleton vs spinner vs progress bar, optimistic-UI rollback UX, reduced-motion handling, and an anti-patterns list.
- `examples/toast-aria-live.html` — a working, framework-agnostic accessible toast system: a polite status region plus a separate assertive alert region, pause-on-hover/focus auto-dismiss, errors that don't auto-dismiss, and meaning conveyed by icon + text rather than color alone.

## Works well with
- **ux-copy** — for the wording of error messages, empty-state CTAs, and confirmations once the states exist.
- **accessibility-audit** — to verify the feedback meets WCAG (contrast, focus, ARIA correctness).
- **ux-audit** — which hands "missing or unhandled states" findings to this skill.
- **/ux-bootstrap** — the command that orchestrates this skill with ux-foundations and the other implement skills.
