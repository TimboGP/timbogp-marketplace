# WAI-ARIA APG patterns (condensed reference)

A practical, accurate condensation of the WAI-ARIA Authoring Practices Guide (APG) for the most common interactive components. For each pattern: required roles/attributes, the full keyboard interaction map, focus-management notes, and the top mistakes to avoid.

## Semantic HTML first, ARIA second

Native elements ship with correct roles, states, focusability, and keyboard behavior. Always prefer them:

- `<button>` over `<div role="button">`
- `<a href>` for navigation
- `<dialog>` for modals; `<details>/<summary>` for disclosure
- `<input type="checkbox">`, `<input type="radio">`, `<select>` for form controls
- `<nav>`, `<main>`, `<header>`, `<ul>/<ol>/<li>`, `<table>` for structure

Reach for ARIA only when no native element expresses the needed role or state.

## The five rules of ARIA (paraphrased)

1. **Use a native element if one exists.** Don't recreate built-in semantics with ARIA when HTML already provides them.
2. **Don't change native semantics unless you truly must.** Avoid `<h2 role="button">`; wrap or nest instead.
3. **All interactive ARIA controls must be keyboard operable.** If it has a role like `button`/`menuitem`, it must respond to the keyboard.
4. **Don't put `role="presentation"` or `aria-hidden="true"` on a focusable element.** That hides it from assistive tech while it can still receive focus — a trap.
5. **Every interactive element needs an accessible name.** Via label, `aria-label`, `aria-labelledby`, or text content.

---

## Dialog (modal)

**Roles/attributes:** container `role="dialog"` (or `role="alertdialog"` for urgent confirmations) with `aria-modal="true"`. Label it via `aria-labelledby` pointing at the title, or `aria-label`. Optionally `aria-describedby` for body text. Native `<dialog>` opened with `showModal()` provides modality, top-layer rendering, and a backdrop automatically.

**Keyboard:**
- `Tab` / `Shift+Tab`: move focus through tabbable elements **inside** the dialog only (wraps; focus must not escape).
- `Escape`: close the dialog.
- `Enter`: activate the focused control (default).

**Focus management:**
- On open, move focus into the dialog — to the first focusable element, or the dialog/heading if there's a lot of content.
- **Trap focus** while open: `Tab` from the last element wraps to the first; `Shift+Tab` from the first wraps to the last.
- On close, **restore focus** to the element that opened the dialog.
- Make background content inert: `inert` on the rest of the page, or `aria-hidden="true"` on sibling content. Lock body scroll.

**Top mistakes:** (1) focus not trapped, so Tab leaks to the page behind; (2) focus not restored to the trigger on close; (3) missing accessible name (no `aria-labelledby`/`aria-label`).

---

## Disclosure (show/hide)

**Roles/attributes:** a native `<button>` with `aria-expanded="true|false"` and `aria-controls="<id of region>"`. The toggled region is a normal element referenced by that id.

**Keyboard:**
- `Enter` / `Space`: toggle the controlled region and flip `aria-expanded`.

**Focus management:** focus stays on the button after toggling. Do not move focus into the revealed region automatically (unless product flow demands it).

**Top mistakes:** (1) using a non-button (`<div>`/`<a>` without role) so it isn't keyboard operable; (2) forgetting to update `aria-expanded` on toggle; (3) `aria-controls` id not matching the region.

---

## Tabs

**Roles/attributes:** `role="tablist"` wraps tabs. Each tab is `role="tab"` with `aria-selected="true|false"` and `aria-controls` pointing to its panel. Each panel is `role="tabpanel"` with `aria-labelledby` pointing to its tab. Give the tablist an `aria-label` or `aria-labelledby`.

**Keyboard (roving tabindex — only the active tab has `tabindex="0"`, others `-1`):**
- `Left/Right Arrow` (horizontal) or `Up/Down` (vertical): move between tabs.
- `Home` / `End`: first / last tab.
- `Enter` / `Space`: activate a tab (only needed for **manual** activation).
- Optionally `Delete` to remove a deletable tab.

Choose **automatic activation** (panel updates as focus moves) for cheap panels, or **manual activation** (activate with Enter/Space) when switching is expensive.

**Focus management:** roving tabindex keeps a single tab stop. The tab panel itself is typically `tabindex="0"` if it has no focusable children, so users can read it.

**Top mistakes:** (1) every tab is a tab stop instead of roving tabindex; (2) arrow keys don't move between tabs; (3) `aria-selected` not kept in sync with the visible panel.

---

## Menu / Menu button

Use this only for **application menus** (actions/commands), not for site navigation (use links) and not for selecting a value (use a listbox/combobox).

**Roles/attributes:** trigger is a `<button>` with `aria-haspopup="menu"` (or `true`) and `aria-expanded`. The menu is `role="menu"`; items are `role="menuitem"` (or `menuitemcheckbox` / `menuitemradio`). Associate the menu's label with the button.

**Keyboard:**
- On the button: `Enter`/`Space`/`Down Arrow` open the menu and focus the first item; `Up Arrow` opens and focuses the last item.
- Within the menu: `Up/Down Arrow` move between items (wrapping optional); `Home`/`End` to first/last; type-ahead jumps to a matching item.
- `Enter`/`Space`: activate the focused item.
- `Escape`: close the menu and return focus to the button.
- `Tab`: close the menu (and move on).

**Focus management:** moving focus uses roving tabindex or `aria-activedescendant`. On close, restore focus to the menu button.

**Top mistakes:** (1) using `role="menu"` for plain navigation links; (2) Escape doesn't return focus to the trigger; (3) no arrow-key movement / type-ahead.

---

## Combobox (with listbox popup)

**Roles/attributes:** an `<input role="combobox">` with `aria-expanded`, `aria-controls` (id of the popup), and `aria-haspopup="listbox"`. The popup is `role="listbox"` with `role="option"` children; the active option carries `aria-selected="true"` and is referenced by the input's `aria-activedescendant`. Add `aria-autocomplete="list"` (or `"both"` for inline completion).

**Keyboard:**
- `Down/Up Arrow`: open the popup and move the active option (`aria-activedescendant`).
- `Enter`: select the active option and close.
- `Escape`: close the popup; a second press may clear the input.
- `Home`/`End`: move within the input text (or to first/last option, per variant).
- `Alt+Down`: open the popup without moving selection.
- Typing filters options (for filtering comboboxes).

**Focus management:** **DOM focus stays on the input**; the visually-highlighted option is tracked via `aria-activedescendant`, not by moving focus into the list.

**Top mistakes:** (1) moving real focus into the listbox instead of using `aria-activedescendant`; (2) missing `aria-expanded`/`aria-controls`; (3) not announcing the count or active option (consider an `aria-live` status of result counts).

---

## Tooltip

**Roles/attributes:** the tooltip bubble is `role="tooltip"` with an id; the trigger references it with `aria-describedby` (for supplementary info) — use `aria-labelledby` only when the tooltip is the element's name. The trigger must itself be focusable (a real button/link/input).

**Keyboard / interaction (WCAG 1.4.13 — Content on Hover or Focus):**
- Shows on **focus** and on **hover**.
- `Escape`: dismiss without moving focus.
- Content must be **hoverable** (movable mouse onto it without it vanishing) and **persistent** (stays until Escape, blur, or hover-out — no auto-timeout).

**Focus management:** never move focus into the tooltip. Tooltips contain no interactive content (use a popover/dialog if you need buttons/links inside).

**Top mistakes:** (1) tooltips on non-focusable elements (keyboard users never see them); (2) dismiss-on-any-mouse-move so users can't reach the content; (3) putting interactive content in a `role="tooltip"`.

---

## Accordion

**Roles/attributes:** each header is a `<button>` wrapped in an appropriate heading (`<h3>` etc.), with `aria-expanded` and `aria-controls` pointing at its panel. Each panel has `role="region"` (or is a section) and `aria-labelledby` pointing back to its header button.

**Keyboard:**
- `Enter` / `Space`: toggle the focused section's panel.
- `Tab` / `Shift+Tab`: move between header buttons and into open-panel content (headers are individual tab stops — accordions do **not** use roving tabindex).
- Optional: `Down/Up Arrow` move between headers; `Home`/`End` to first/last header.

**Focus management:** focus stays on the header button after toggling. If a section can't collapse (single always-open), set `aria-disabled="true"` on its expanded header.

**Top mistakes:** (1) headers that aren't buttons or aren't wrapped in heading elements; (2) `aria-expanded` not updated; (3) confusing it with Tabs (accordions allow multiple panels open and use normal tabbing).

---

## Switch

**Roles/attributes:** `role="switch"` with `aria-checked="true|false"` and an accessible name. Prefer a native `<button>` with `role="switch"`, or `<input type="checkbox" role="switch">`. The on/off state must not be conveyed by color alone — add a visible label or position indicator.

**Keyboard:**
- `Enter` / `Space`: toggle, flipping `aria-checked`.

**Focus management:** focus stays on the switch after toggling.

**Top mistakes:** (1) using `aria-pressed` (that's a toggle button) instead of `aria-checked` for an on/off setting; (2) signaling state with color only; (3) no accessible name.
