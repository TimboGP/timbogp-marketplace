/**
 * Accessible Tabs — React + TypeScript.
 *
 * Implements the WAI-ARIA APG tabs pattern:
 *  - role="tablist" with an accessible name (aria-label)
 *  - each tab: role="tab", aria-selected, aria-controls, id
 *  - each panel: role="tabpanel", aria-labelledby, tabindex={0}
 *  - roving tabindex: only the selected tab is in the tab order (tabIndex 0),
 *    all others tabIndex -1 — the tablist is a single tab stop
 *  - keyboard: Left/Right move between tabs (wrapping), Home/End jump to ends
 *
 * Activation model: AUTOMATIC — selection follows focus, so arrowing to a tab
 * immediately shows its panel. This is the right default for cheap-to-render
 * panels. For expensive panels, switch to MANUAL activation: keep focus moving
 * with the arrows but only change selection on Enter/Space (and on click). See
 * the `onKeyDown` note below.
 *
 * Styling: visual values come from design tokens via classNames. The selected
 * state is conveyed by more than color (weight + underline/border) so it does
 * not rely on color alone.
 */

import { useId, useRef, useState } from "react";

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  /** Accessible name for the tablist. */
  label: string;
  /** Index of the initially selected tab. */
  defaultIndex?: number;
}

export function Tabs({ items, label, defaultIndex = 0 }: TabsProps) {
  const [selected, setSelected] = useState(defaultIndex);
  const baseId = useId();
  // Refs to each tab button so we can move DOM focus during keyboard nav.
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = (i: number) => `${baseId}-panel-${i}`;

  // Move focus to a tab and (automatic activation) select it at the same time.
  const focusTab = (index: number) => {
    setSelected(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = items.length - 1;
    let next: number | null = null;

    switch (event.key) {
      case "ArrowRight":
        next = selected === last ? 0 : selected + 1; // wrap
        break;
      case "ArrowLeft":
        next = selected === 0 ? last : selected - 1; // wrap
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }

    event.preventDefault();
    // AUTOMATIC activation: focusing the tab also selects it.
    // For MANUAL activation, replace this with a focus-only helper and add a
    // separate Enter/Space handler that calls setSelected(focusedIndex).
    focusTab(next);
  };

  return (
    <div className="tabs">
      <div role="tablist" aria-label={label} className="tabs__list">
        {items.map((item, i) => {
          const isSelected = i === selected;
          return (
            <button
              key={i}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={tabId(i)}
              aria-selected={isSelected}
              aria-controls={panelId(i)}
              // Roving tabindex: only the selected tab is tabbable.
              tabIndex={isSelected ? 0 : -1}
              className="tabs__tab"
              onClick={() => setSelected(i)}
              onKeyDown={onKeyDown}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item, i) => (
        <div
          key={i}
          role="tabpanel"
          id={panelId(i)}
          aria-labelledby={tabId(i)}
          // Panel is focusable so keyboard users can scroll/read it.
          tabIndex={0}
          hidden={i !== selected}
          className="tabs__panel"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}

/* Example usage:
 *
 * <Tabs
 *   label="Account settings"
 *   items={[
 *     { label: "Profile", content: <p>Profile settings…</p> },
 *     { label: "Billing", content: <p>Billing settings…</p> },
 *     { label: "Notifications", content: <p>Notification settings…</p> },
 *   ]}
 * />
 *
 * Token-driven styles (illustrative — keep in your stylesheet):
 *
 *   .tabs__list { display: flex; gap: var(--space-2); border-block-end: 1px solid var(--color-border); }
 *   .tabs__tab {
 *     padding: var(--space-2) var(--space-3);
 *     border: 0; background: transparent; color: var(--color-on-surface-muted);
 *     border-block-end: 2px solid transparent;  // reserve space so layout doesn't shift
 *     cursor: pointer;
 *   }
 *   // Selected state uses weight + underline/border, not color alone:
 *   .tabs__tab[aria-selected="true"] {
 *     color: var(--color-on-surface);
 *     font-weight: var(--font-weight-bold);
 *     border-block-end-color: var(--color-accent);
 *   }
 *   .tabs__tab:focus-visible { outline: var(--focus-ring); outline-offset: 2px; }
 *   .tabs__panel { padding: var(--space-4); }
 *   .tabs__panel:focus-visible { outline: var(--focus-ring); }
 *
 *   @media (prefers-reduced-motion: no-preference) {
 *     .tabs__tab { transition: border-color var(--motion-duration-sm) var(--motion-ease); }
 *   }
 */
