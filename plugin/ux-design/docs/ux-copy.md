# UX Copy — `ux-copy`

> Write and review clear, user-centered interface microcopy — buttons, errors, empty states, onboarding, and confirmations.

## What it does
This skill writes and critiques the small but high-leverage words inside an interface. It produces copy that is clear, concise, and centered on the user's goal, and when reviewing existing copy it proposes before → after rewrites with a one-line reason each. It covers the full range of in-product text — CTAs, form labels and helper text, error and validation messages, empty states, success messages, onboarding, tooltips, confirmation dialogs, and notifications — and writes finalized copy directly into the relevant components or string/i18n files when the change lands in code.

## When it triggers
Skills activate automatically based on your request. This one triggers on phrases like:
- "write copy for"
- "what should this button say"
- "review this error message"
- "empty state copy"
- "onboarding text"
- "confirmation dialog wording"
- "rename this CTA"
- "microcopy"

## How to use it
- **Just ask:** "What should this delete button say?" / "Write copy for the empty projects screen." / "Review this error message and make it clearer."
- **Via command:** No dedicated command — trigger by asking.
- **Typical flow:**
  1. Identify whether you're authoring new copy or reviewing existing copy.
  2. Apply the principles: clarity over cleverness, lead with the user's goal, be concise, plain language, specific CTA verbs, consistent terminology, sentence case, and accessibility.
  3. For errors, use the what / why / how framework — name the problem, explain why only if it helps, then give the concrete fix — without blaming the user or leaking technical codes.
  4. Match a consistent voice to a context-appropriate tone.
  5. In review mode, run the checklist and present each issue as original → rewrite → reason.
  6. When it lands in code, write the strings into the right components or i18n keys, reusing existing keys for repeated phrases.

## What you get
Ready-to-use microcopy or a structured critique with before → after rewrites and reasons. When working in code, the copy is written directly into components or localization files following the project's existing conventions.

## Reference files
- `references/voice-and-tone.md` — defining a product voice with actionable do/don't attributes, a tone-by-context table, capitalization and punctuation conventions, preferred vs avoided word choices, and inclusive plain-language guidance.
- `references/error-message-patterns.md` — before → after error and validation patterns across required fields, formats, credentials, network/server failures, permissions, not-found, rate limits, and destructive confirmations, plus form- vs field-level placement and timing guidance and an anti-patterns list.

## Works well with
- **interaction-feedback** — which builds the empty/error/success states this skill then fills with words.
- **ux-audit** — which routes copy and microcopy issues (unclear labels, blaming errors, weak CTAs) here.
- **accessibility-review** — to confirm labels and messages work for screen readers and don't rely on color alone.
