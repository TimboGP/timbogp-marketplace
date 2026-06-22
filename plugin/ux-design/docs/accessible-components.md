# Accessible Components — `accessible-components`

> Scaffold WAI-ARIA APG component patterns adapted to your framework, then wire up automated accessibility linting.

## What it does
This skill builds or fixes accessible UI components that match the project's stack, then installs automated a11y linting so regressions get caught. It builds on semantic HTML first, adds ARIA only to fill gaps, and ships correct keyboard support and focus management following the WAI-ARIA Authoring Practices (APG). Components are styled via classes that consume design tokens, never hardcoded values.

## When it triggers
Skills activate automatically based on your request. This one triggers on phrases like:
- "make this modal accessible"
- "build an accessible dropdown / tabs / combobox / tooltip / accordion"
- "add ARIA to this"
- "fix keyboard navigation" / "set up a11y linting"

## How to use it
- **Just ask:** "Make this modal accessible", "Build an accessible dropdown", or "Set up a11y linting and add it to CI."
- **Via command:** No dedicated command — trigger by asking. (It is also invoked by `/ux-bootstrap` to scaffold the base primitives.)
- **Typical flow:**
  1. Detect the stack (framework, styling, language, rootDir); fall back to framework-agnostic HTML + vanilla JS + CSS custom properties if there's no project.
  2. Pick the correct APG pattern and read `references/aria-patterns.md` for roles, the keyboard map, focus rules, and common mistakes.
  3. Implement semantics first — native elements before ARIA, accessible names, the full keyboard map (roving tabindex / `aria-activedescendant` for composite widgets), and focus management (trap, restore, deliberate moves).
  4. Wire styling to design tokens.
  5. Set up automated a11y linting matched to the stack (e.g. `eslint-plugin-jsx-a11y`, `eslint-plugin-vuejs-accessibility`, Svelte compiler warnings, `@angular-eslint/template`) and add a lint script.

## What you get
Accessible component(s) built on semantic HTML with correct ARIA, complete keyboard support, and proper focus management, styled with tokens — plus stack-matched a11y lint config and a `lint` (and optional `lint:a11y`) script in `package.json`.

## Reference files
- `references/aria-patterns.md` — condensed, accurate APG reference for Dialog, Disclosure, Tabs, Menu/Menu button, Combobox, Tooltip, Accordion, and Switch (required roles/attributes, full keyboard map, focus rules, common mistakes).

### Examples
See `examples/README.md` for the full index. Highlights:

| Pattern | Files |
|---|---|
| Dialog (modal) | `examples/dialog-react.tsx`, `examples/dialog-vue.vue`, `examples/dialog-svelte.svelte` |
| Tabs | `examples/tabs-react.tsx`, `examples/tabs.html` |
| Menu button | `examples/menu-button-react.tsx`, `examples/menu-button.html` |
| Combobox (list autocomplete) | `examples/combobox.html` |
| Disclosure | `examples/disclosure.html` |

`.html` examples open directly in a browser; framework files (`.tsx`, `.vue`, `.svelte`) are drop-in references. Every example leads with semantic HTML, full keyboard support, focus management, non-color state cues, and `prefers-reduced-motion` where it animates.

## Works well with
Run after `design-tokens` so components have tokens to consume, typically in the sequence `design-tokens` → `accessible-components` → `interaction-feedback`. For evaluation rather than building, run an `accessibility-audit` (via `/ux-audit`) or the broader `ux-audit`.
