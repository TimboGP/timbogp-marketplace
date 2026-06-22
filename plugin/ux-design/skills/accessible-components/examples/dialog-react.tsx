/**
 * Accessible modal Dialog — React + TypeScript.
 *
 * Implements the WAI-ARIA APG dialog pattern:
 *  - role="dialog" + aria-modal="true" + aria-labelledby
 *  - focus moves into the dialog on open
 *  - focus trap (Tab / Shift+Tab wrap inside the dialog)
 *  - Escape closes; backdrop click closes
 *  - focus restored to the triggering element on close
 *  - body scroll lock while open
 *  - background made inert (optional, feature-detected)
 *
 * Styling: all visual values come from design tokens consumed via classNames
 * (e.g. .dialog { background: var(--color-surface); ... }). No hardcoded styles here.
 */

import { useCallback, useEffect, useId, useRef } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  /** Selector or ref for the element that should regain focus on close.
   *  Defaults to whatever was focused when the dialog opened. */
  initialFocusRef?: React.RefObject<HTMLElement>;
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  initialFocusRef,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  // Remember the element focused before the dialog opened, to restore later.
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const getFocusable = useCallback((): HTMLElement[] => {
    const root = dialogRef.current;
    if (!root) return [];
    return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
  }, []);

  // Open/close side effects: focus, scroll lock, background inert.
  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    // Move focus into the dialog.
    const focusTarget =
      initialFocusRef?.current ?? getFocusable()[0] ?? dialogRef.current;
    focusTarget?.focus();

    // Lock body scroll.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Make background inert where supported.
    const siblings = Array.from(document.body.children).filter(
      (el) => !el.contains(dialogRef.current),
    ) as HTMLElement[];
    const restoreInert: Array<() => void> = [];
    for (const el of siblings) {
      if ("inert" in el) {
        const had = el.hasAttribute("inert");
        el.setAttribute("inert", "");
        restoreInert.push(() => {
          if (!had) el.removeAttribute("inert");
        });
      }
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      restoreInert.forEach((fn) => fn());
      // Restore focus to the trigger.
      previouslyFocused.current?.focus();
    };
  }, [open, getFocusable, initialFocusRef]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      // Focus trap.
      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [getFocusable, onClose],
  );

  if (!open) return null;

  return (
    <div
      className="dialog-backdrop"
      // Click on the backdrop (not the dialog) closes.
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={onKeyDown}
        tabIndex={-1}
      >
        <header className="dialog__header">
          <h2 id={titleId} className="dialog__title">
            {title}
          </h2>
          <button
            type="button"
            className="dialog__close"
            aria-label="Close dialog"
            onClick={onClose}
          >
            {/* aria-hidden icon; the button itself is named via aria-label */}
            <span aria-hidden="true">&times;</span>
          </button>
        </header>

        <div className="dialog__body">{children}</div>
      </div>
    </div>
  );
}

/* Example usage:
 *
 * function Example() {
 *   const [open, setOpen] = useState(false);
 *   return (
 *     <>
 *       <button type="button" onClick={() => setOpen(true)}>Open</button>
 *       <Dialog open={open} onClose={() => setOpen(false)} title="Confirm">
 *         <p>Are you sure?</p>
 *         <button type="button" onClick={() => setOpen(false)}>Cancel</button>
 *       </Dialog>
 *     </>
 *   );
 * }
 *
 * Token-driven styles (illustrative — keep in your stylesheet, not inline):
 *
 *   .dialog-backdrop {
 *     position: fixed; inset: 0;
 *     background: var(--color-backdrop, rgb(0 0 0 / 0.5));
 *     display: grid; place-items: center;
 *     padding: var(--space-4);
 *   }
 *   .dialog {
 *     background: var(--color-surface);
 *     color: var(--color-on-surface);
 *     border-radius: var(--radius-lg);
 *     padding: var(--space-6);
 *     max-width: var(--size-dialog-max, 32rem);
 *     width: 100%;
 *   }
 *   .dialog:focus-visible,
 *   .dialog__close:focus-visible { outline: var(--focus-ring); }
 *   .dialog__close { min-block-size: 24px; min-inline-size: 24px; }
 *
 *   @media (prefers-reduced-motion: no-preference) {
 *     .dialog { animation: dialog-in var(--motion-duration-sm) var(--motion-ease); }
 *   }
 */
