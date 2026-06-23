<!--
  Accessible modal Dialog — Vue 3 (<script setup>, TypeScript).

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

<script setup lang="ts">
import { nextTick, ref, useId, watch } from "vue";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const props = defineProps<{
  open: boolean;
  title: string;
}>();

const emit = defineEmits<{ close: [] }>();

const dialogRef = ref<HTMLDivElement | null>(null);
// useId() gives a stable, SSR-safe id to wire up aria-labelledby.
const titleId = useId();
// Remember the element focused before the dialog opened, to restore later.
let previouslyFocused: HTMLElement | null = null;
let restoreInert: Array<() => void> = [];
let prevOverflow = "";

function getFocusable(): HTMLElement[] {
  const root = dialogRef.value;
  if (!root) return [];
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
}

async function activate() {
  // Capture the trigger so we can restore focus to it on close.
  previouslyFocused = document.activeElement as HTMLElement | null;

  // Wait for the dialog DOM to render before moving focus into it.
  await nextTick();

  // Move focus into the dialog — first focusable element, else the dialog itself.
  const focusTarget = getFocusable()[0] ?? dialogRef.value;
  focusTarget?.focus();

  // Lock body scroll.
  prevOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  // Make sibling content inert where supported (hides it from AT + pointer/focus).
  restoreInert = [];
  const siblings = Array.from(document.body.children).filter(
    (el) => !el.contains(dialogRef.value),
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
}

function deactivate() {
  document.body.style.overflow = prevOverflow;
  restoreInert.forEach((fn) => fn());
  restoreInert = [];
  // Restore focus to the element that opened the dialog.
  previouslyFocused?.focus();
  previouslyFocused = null;
}

// React to open changes: run focus/scroll/inert side effects.
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) activate();
    else deactivate();
  },
);

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.stopPropagation();
    emit("close");
    return;
  }
  if (event.key !== "Tab") return;

  // Focus trap: Tab from last wraps to first; Shift+Tab from first wraps to last.
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

function onBackdropMousedown(event: MouseEvent) {
  // Click on the backdrop (not the dialog) closes.
  if (event.target === event.currentTarget) emit("close");
}
</script>

<template>
  <!-- Teleport to <body> keeps the dialog out of clipping/stacking contexts. -->
  <Teleport to="body">
    <div
      v-if="open"
      class="dialog-backdrop"
      @mousedown="onBackdropMousedown"
    >
      <div
        ref="dialogRef"
        class="dialog"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        tabindex="-1"
        @keydown="onKeydown"
      >
        <header class="dialog__header">
          <h2 :id="titleId" class="dialog__title">{{ title }}</h2>
          <button
            type="button"
            class="dialog__close"
            aria-label="Close dialog"
            @click="emit('close')"
          >
            <!-- aria-hidden icon; the button is named via aria-label -->
            <span aria-hidden="true">&times;</span>
          </button>
        </header>

        <div class="dialog__body">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
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

  <script setup lang="ts">
  import { ref } from "vue";
  import Dialog from "./dialog-vue.vue";

  const open = ref(false);
  </script>

  <template>
    <button type="button" @click="open = true">Open</button>
    <Dialog :open="open" title="Confirm" @close="open = false">
      <p>Are you sure?</p>
      <button type="button" @click="open = false">Cancel</button>
    </Dialog>
  </template>
-->
