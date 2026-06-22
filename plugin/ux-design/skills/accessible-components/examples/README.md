# Accessible component examples

Reference implementations of common WAI-ARIA APG patterns, each one self-contained and built accessibility-first. The `.html` files can be opened directly in a browser to try the keyboard and screen-reader behavior; the framework files (`.tsx`, `.vue`, `.svelte`) are drop-in references to adapt into your own project.

| Pattern | Framework | File | Notes |
| --- | --- | --- | --- |
| Dialog (modal) | React | [`dialog-react.tsx`](./dialog-react.tsx) | Focus trap, focus restore, `aria-modal`, Escape to close. |
| Dialog (modal) | Vue | [`dialog-vue.vue`](./dialog-vue.vue) | Same modal pattern, idiomatic Vue. |
| Dialog (modal) | Svelte | [`dialog-svelte.svelte`](./dialog-svelte.svelte) | Same modal pattern, idiomatic Svelte. |
| Disclosure (show/hide) | Vanilla | [`disclosure.html`](./disclosure.html) | Native `<button>` with `aria-expanded` / `aria-controls`. |
| Tabs | React | [`tabs-react.tsx`](./tabs-react.tsx) | Roving tabindex, arrow-key navigation, `aria-selected`. |
| Tabs | Vanilla | [`tabs.html`](./tabs.html) | Roving tabindex, Home/End, automatic activation. |
| Menu button (actions) | Vanilla | [`menu-button.html`](./menu-button.html) | `aria-haspopup` trigger, roving focus, open-to-first / open-to-last, Escape returns focus. |
| Menu button (actions) | React | [`menu-button-react.tsx`](./menu-button-react.tsx) | Same menu pattern with ref-based focus management and listener cleanup. |
| Combobox (list autocomplete) | Vanilla | [`combobox.html`](./combobox.html) | Editable input with `aria-activedescendant`; DOM focus stays on the input. |

## Each example demonstrates

- **Semantic HTML first** — native `<button>`, `<input>`, and `<label>` carry roles and keyboard behavior for free; ARIA is added only where no native element fits.
- **Full keyboard support** — every interaction works without a mouse: arrows, Home/End, Enter/Space, Escape, and Tab follow the APG keyboard map.
- **Focus management** — focus is moved deliberately (roving focus for menus/tabs, `aria-activedescendant` for the combobox) and restored to the trigger on close.
- **Visible non-color state** — active/selected/expanded states use focus rings, check marks, and icon rotation, never color alone (WCAG 1.4.1).
- **Reduced motion** — transitions are gated behind `prefers-reduced-motion: no-preference`.

All styling is driven by CSS custom-property design tokens, so the examples can inherit your own token system by overriding the `:root` variables.
