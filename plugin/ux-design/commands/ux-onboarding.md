---
description: Get familiar with a project's UX/design choices and patterns — a guided, part-by-part walkthrough that sends you to read the real code, checks your understanding with questions, and has you reimplement a small recent change.
argument-hint: [path or area to focus on, e.g. "the design system" or "components/"]
allowed-tools: [Read, Glob, Grep, Bash]
---

# /ux-onboarding

Build a working mental model of **how this project does UX** — its design tokens, component patterns, accessibility conventions, interaction-feedback states, and copy voice — by being walked through the real code, not by reading a summary. This is familiarization, not scaffolding (`/ux-bootstrap`) or scoring (`/ux-audit`). Lean on the `ux-foundations`, `design-tokens`, `accessible-components`, `interaction-feedback`, and `ux-audit` skills for what "good" looks like in each area.

Optional focus from `$ARGUMENTS` (a path, or an area like "tokens" or "the dialog component"). If empty, cover the project's design layer end to end.

## Procedure

1. **Detect the stack and survey the design layer.** Use `${CLAUDE_PLUGIN_ROOT}/skills/ux-foundations/references/stack-detection.md`; report framework, styling approach, and language in one line. Then build a short map: where tokens/theme live, the component library and its primitives, styling conventions, the accessibility patterns in use, the interaction-feedback patterns (loading / empty / error / success, toasts), and copy/voice conventions. Skim recent history (`git log`, recently merged PRs) for changes to use in step 3.
2. **Confirm the path.** List the parts you'll walk through — dependencies first, usually **tokens → primitives → composed components → app screens** — and confirm scope. Honor any focus in `$ARGUMENTS`.
3. **Walk it part by part** — one part at a time, never a wall of text. For each:
   - **Explain** how *this* project handles it and the pattern/convention it follows.
   - **Send the user to the code** — name concrete files/components to open and read (e.g. *"open `tokens.css` and `Button.tsx`"*), rather than pasting them.
   - **Ask questions to answer** — a few comprehension/prediction questions (*"which token drives the focus-ring color?"*, *"what makes this dialog's focus trap correct?"*), then check the answers, correct misconceptions, and push deeper before moving on.
4. **Reimplement a recent change.** From recent history, pick **a few smaller UX/design changes** — a new component variant, a token change, an added interaction state, a copy fix — each small enough to redo in one sitting and ideally in a part already walked. Present them as an **interactive choice**; the user picks one (or asks for different candidates). Stub out or revert it in a **scratch copy** (without showing the original diff), state the change's intent and acceptance criteria, and have the user reimplement it. Then review against what the project actually shipped — convention fit, accessibility, and which approach is better and why.
5. **Wrap up.** Summarize the parts covered and the user's comprehension, the reimplementation outcome, and suggest `/ux-audit` (to score what they now understand) or `/ux-review` (to dig into one component) as next steps.

Read-only by default — do not modify the project's real files; the user's reimplementation happens in a scratch copy. Keep each part short and interactive: the user reading the real code and answering is the point.
