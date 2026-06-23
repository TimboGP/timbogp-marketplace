<!--
  Accessible modal Dialog — Svelte 5 (runes mode: $props / $state / $effect).

  Implements the WAI-ARIA APG dialog pattern:
   - role="dialog" + aria-modal="true" + aria-labelledby
   - focus moves into the dialog on open
   - focus trap (Tab / Shift+Tab wrap inside the dialog)
   - Escape closes; backdrop click closes
   - focus restored to the triggering element on close
   - body scroll lock while open
   - background made inert (optional, feature-detected)

  Styling: all visual values come from design tokens consumed via CSS variables
  (e.g. .dialog { background: var(--color-surface); ... }). No hardcoded colors.
-->

<script lang="ts">
  import type { Snippet } from "svelte";

  const FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    'input:not([disabled]):not([type="hidden"])',
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(",");

  let {
    open = false,
    title,
    onclose,
    children,
  }: {
    open?: boolean;
    title: string;
    onclose: () => void;
    children: Snippet;
  } = $props();

  let dialogEl = $state<HTMLDivElement | null>(null);
  // Unique id wires up aria-labelledby to the title.
  const titleId = `dialog-title-${crypto.randomUUID()}`;

  function getFocusable(): HTMLElement[] {
    if (!dialogEl) return [];
    return Array.from(
      dialogEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    );
  }

  // Side effects while open: focus capture/restore, scroll lock, background inert.
  // The cleanup function returned from $effect runs when `open` flips to false
  // or the component unmounts — that's where focus is restored to the trigger.
  $effect(() => {
    if (!open) return;

    // Remember the trigger so we can restore focus on close.
    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Move focus into the dialog — first focusable element, else the dialog.
    const focusTarget = getFocusable()[0] ?? dialogEl;
    focusTarget?.focus();

    // Lock body scroll.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Make sibling content inert where supported.
    const restoreInert: Array<() => void> = [];
    const siblings = Array.from(document.body.children).filter(
      (el) => !el.contains(dialogEl),
    ) as HTMLElement[];
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
      // Restore focus to the element that opened the dialog.
      previouslyFocused?.focus();
    };
  });

  function onkeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onclose();
      return;
    }
    if (event.key !== "Tab") return;

    // Focus trap: wrap at both ends so Tab never escapes the dialog.
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
  }

  function onbackdropmousedown(event: MouseEvent) {
    // Click on the backdrop (not the dialog) closes.
    if (event.target === event.currentTarget) onclose();
  }
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <!-- Backdrop is decorative; closing is also reachable via Escape and the close button. -->
  <div class="dialog-backdrop" onmousedown={onbackdropmousedown}>
    <div
      bind:this={dialogEl}
      class="dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabindex="-1"
      {onkeydown}
    >
      <header class="dialog__header">
        <h2 id={titleId} class="dialog__title">{title}</h2>
        <button
          type="button"
          class="dialog__close"
          aria-label="Close dialog"
          onclick={onclose}
        >
          <!-- aria-hidden icon; the button is named via aria-label -->
          <span aria-hidden="true">&times;</span>
        </button>
      </header>

      <div class="dialog__body">
        {@render children()}
      </div>
    </div>
  </div>
{/if}

<style>
  .dialog-backdrop {
    position: fixed;
    inset: 0;
    background: var(--color-backdrop, rgb(0 0 0 / 0.5));
    display: grid;
    place-items: center;
    padding: var(--space-4, 1rem);
  }

  .dialog {
    background: var(--color-surface, #fff);
    color: var(--color-on-surface, #111);
    border-radius: var(--radius-lg, 0.75rem);
    padding: var(--space-6, 1.5rem);
    max-inline-size: var(--size-dialog-max, 32rem);
    inline-size: 100%;
    box-shadow: var(--shadow-lg, 0 10px 30px rgb(0 0 0 / 0.2));
  }

  .dialog:focus-visible,
  .dialog__close:focus-visible {
    outline: var(--focus-ring, 2px solid Highlight);
    outline-offset: 2px;
  }

  .dialog__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-3, 0.75rem);
    margin-block-end: var(--space-4, 1rem);
  }

  .dialog__title {
    margin: 0;
    font-size: var(--font-size-lg, 1.25rem);
  }

  .dialog__close {
    /* WCAG 2.5.8: minimum target size. */
    min-block-size: 24px;
    min-inline-size: 24px;
    border: 0;
    background: transparent;
    color: inherit;
    font-size: var(--font-size-lg, 1.25rem);
    line-height: 1;
    cursor: pointer;
  }

  /* Only animate when the user has not asked to reduce motion. */
  @media (prefers-reduced-motion: no-preference) {
    .dialog {
      animation: dialog-in var(--motion-duration-sm, 150ms)
        var(--motion-ease, ease-out);
    }
    @keyframes dialog-in {
      from {
        opacity: 0;
        transform: translateY(0.5rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
</style>

<!--
  Example usage (parent component):

  <script lang="ts">
    import Dialog from "./dialog-svelte.svelte";
    let open = $state(false);
  </script>

  <button type="button" onclick={() => (open = true)}>Open</button>
  <Dialog {open} title="Confirm" onclose={() => (open = false)}>
    <p>Are you sure?</p>
    <button type="button" onclick={() => (open = false)}>Cancel</button>
  </Dialog>
-->
