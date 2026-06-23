/**
 * Accessible Menu Button (actions menu) in React + TypeScript.
 *
 * Pattern (WAI-ARIA APG — "Menu Button"):
 *   - Trigger is a native <button aria-haspopup="true" aria-expanded
 *     aria-controls> that opens a popup menu of *actions* (not navigation
 *     links, and not value selection — use a listbox/combobox for those).
 *   - The menu is role="menu"; each item is role="menuitem".
 *   - Roving focus: real DOM focus moves between menuitems via refs (each
 *     menuitem is tabIndex={-1} so it is focusable programmatically but not a
 *     tab stop).
 *
 * Keyboard:
 *   - On the button: Enter / Space / Down open the menu and focus the FIRST
 *     item; Up opens and focuses the LAST item.
 *   - In the menu: Up / Down move (wrapping), Home / End jump to first / last,
 *     Escape closes and returns focus to the trigger, Tab closes the menu.
 *   - Selecting an item runs its action, closes the menu, and returns focus to
 *     the trigger. Clicking outside closes.
 *
 * The focused item is marked with a visible focus ring (not color alone).
 * Style via the token-based class names below (see menu-button.html for the
 * matching CSS); listeners are cleaned up on unmount / close.
 */
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';

type MenuAction = {
  label: string;
  onSelect: () => void;
};

type MenuButtonProps = {
  label: string;
  actions: MenuAction[];
};

export function MenuButton({ label, actions }: MenuButtonProps) {
  const [open, setOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // The item index to focus once the menu has rendered open. We can't focus a
  // DOM node before it exists, so we stash the target and apply it in an effect.
  const pendingFocus = useRef<number | null>(null);

  const triggerId = useId();
  const menuId = useId();

  // Roving focus: move real DOM focus to the chosen menuitem (wrapping).
  const focusItem = useCallback(
    (index: number) => {
      const max = actions.length - 1;
      const next = index < 0 ? max : index > max ? 0 : index;
      itemRefs.current[next]?.focus();
    },
    [actions.length],
  );

  const openMenu = useCallback((index: number) => {
    pendingFocus.current = index;
    setOpen(true);
  }, []);

  const closeMenu = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  // Apply the pending roving focus after the menu renders.
  useEffect(() => {
    if (open && pendingFocus.current !== null) {
      focusItem(pendingFocus.current);
      pendingFocus.current = null;
    }
  }, [open, focusItem]);

  // Outside-click closes (without restoring focus to the trigger).
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeMenu(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown, true);
    return () =>
      document.removeEventListener('pointerdown', onPointerDown, true);
  }, [open, closeMenu]);

  function currentIndex(): number {
    return itemRefs.current.indexOf(
      document.activeElement as HTMLButtonElement,
    );
  }

  // Trigger keyboard: open to first / open to last.
  function onTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        event.preventDefault();
        openMenu(0); // focus FIRST item
        break;
      case 'ArrowUp':
        event.preventDefault();
        openMenu(actions.length - 1); // focus LAST item
        break;
    }
  }

  // Menu keyboard: move / jump / close.
  function onMenuKeyDown(event: ReactKeyboardEvent<HTMLUListElement>) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusItem(currentIndex() + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusItem(currentIndex() - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusItem(0);
        break;
      case 'End':
        event.preventDefault();
        focusItem(actions.length - 1);
        break;
      case 'Escape':
        event.preventDefault();
        closeMenu(); // returns focus to trigger
        break;
      case 'Tab':
        // Tab closes the menu but lets focus move on naturally.
        closeMenu(false);
        break;
    }
  }

  function selectItem(action: MenuAction) {
    action.onSelect();
    closeMenu(); // returns focus to trigger
  }

  return (
    <div className="menu-button" ref={rootRef}>
      <button
        type="button"
        className="menu-button__trigger"
        id={triggerId}
        ref={triggerRef}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onKeyDown={onTriggerKeyDown}
        onClick={() => (open ? closeMenu() : openMenu(0))}
      >
        <span>{label}</span>
        <span className="menu-button__icon" aria-hidden="true">
          &#9662;
        </span>
      </button>

      {open && (
        <ul
          className="menu-button__menu"
          id={menuId}
          role="menu"
          aria-labelledby={triggerId}
          onKeyDown={onMenuKeyDown}
        >
          {actions.map((action, index) => (
            <li role="none" key={action.label}>
              <button
                type="button"
                className="menu-button__item"
                role="menuitem"
                tabIndex={-1}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                onClick={() => selectItem(action)}
              >
                {action.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* Example usage:

  <MenuButton
    label="Actions"
    actions={[
      { label: 'Edit', onSelect: () => console.log('edit') },
      { label: 'Duplicate', onSelect: () => console.log('duplicate') },
      { label: 'Archive', onSelect: () => console.log('archive') },
      { label: 'Delete', onSelect: () => console.log('delete') },
    ]}
  />
*/
