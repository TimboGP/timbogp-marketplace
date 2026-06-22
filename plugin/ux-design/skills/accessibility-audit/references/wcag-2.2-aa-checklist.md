# WCAG 2.2 Level AA checklist (POUR)

Practical checklist covering all Level A and AA success criteria required for WCAG 2.2 AA conformance, organized by principle. Each item lists the **success criterion number + name**, **what to check** (plain language), and **how to test** (manual / automated). New 2.2 criteria are marked **[2.2]**. Criterion numbers are normative — keep them exact in reports.

Notes on scope:
- 4.1.1 Parsing was **removed** in WCAG 2.2 (it is now always satisfied) — do not report it.
- 2.4.7 Focus Visible is Level AA. 2.4.11 Focus Not Obscured (Minimum) is AA; 2.4.12 (Enhanced) and 2.4.13 Focus Appearance are AAA (listed for awareness, not required for AA).

---

## Perceivable

### 1.1 Text alternatives
- **1.1.1 Non-text Content (A)** — Every image, icon, chart, and control has a text alternative serving an equivalent purpose; decorative images are hidden (empty `alt=""` or `aria-hidden`). Test: read markup / inspect `alt`, `aria-label`, `aria-labelledby`; automated tools flag missing `alt`, manual judgement for quality.

### 1.2 Time-based media
- **1.2.1 Audio-only and Video-only (Prerecorded) (A)** — Transcript for audio-only; audio description or transcript for video-only. Test: manual review of media.
- **1.2.2 Captions (Prerecorded) (A)** — Synchronized captions on prerecorded video with audio. Test: play media, confirm captions.
- **1.2.3 Audio Description or Media Alternative (Prerecorded) (A)** — Audio description or full text alternative for prerecorded video. Test: manual.
- **1.2.4 Captions (Live) (AA)** — Captions for live audio in synchronized media. Test: manual during live content.
- **1.2.5 Audio Description (Prerecorded) (AA)** — Audio description track for prerecorded video. Test: manual.

### 1.3 Adaptable
- **1.3.1 Info and Relationships (A)** — Structure conveyed visually is also in markup: headings, lists, tables with headers, form labels, landmarks. Test: inspect semantics; automated catches some (e.g. table headers), manual for correctness.
- **1.3.2 Meaningful Sequence (A)** — Reading/DOM order matches the intended sequence when linearized. Test: disable CSS or tab through; confirm order makes sense.
- **1.3.3 Sensory Characteristics (A)** — Instructions don't rely solely on shape, size, position, or sound ("click the round button"). Test: manual content review.
- **1.3.4 Orientation (AA)** — Content not locked to portrait or landscape unless essential. Test: rotate device/emulator.
- **1.3.5 Identify Input Purpose (AA)** — Inputs collecting user info use appropriate `autocomplete` tokens (name, email, tel, etc.). Test: inspect `autocomplete` attributes.

### 1.4 Distinguishable
- **1.4.1 Use of Color (A)** — Color is not the only means of conveying info (e.g. links, errors, required fields, chart series). Test: grayscale view / manual.
- **1.4.2 Audio Control (A)** — Audio that plays >3s can be paused/stopped or volume-controlled. Test: manual.
- **1.4.3 Contrast (Minimum) (AA)** — Text contrast ≥ **4.5:1**; large text (≥18pt / ≥14pt bold, i.e. 24px / 18.66px bold) ≥ **3:1**. Test: `contrast.mjs` or a contrast tool; automated tools sample.
- **1.4.4 Resize Text (AA)** — Text resizes to 200% without loss of content/function. Test: browser zoom to 200%.
- **1.4.5 Images of Text (AA)** — Use real text instead of images of text (except logos). Test: inspect images / manual.
- **1.4.10 Reflow (AA)** — No 2D scrolling at 320 CSS px width (400% zoom on 1280px); content reflows to one column. Test: set viewport to 320px / zoom 400%.
- **1.4.11 Non-text Contrast (AA)** — UI components (borders, states) and meaningful graphics have ≥ **3:1** contrast against adjacent colors. Test: `contrast.mjs` with the UI/non-text result; manual.
- **1.4.12 Text Spacing (AA)** — No loss of content when line-height 1.5×, paragraph spacing 2×, letter-spacing 0.12×, word-spacing 0.16× font size are applied. Test: apply text-spacing bookmarklet/CSS.
- **1.4.13 Content on Hover or Focus (AA)** — Hover/focus-revealed content is dismissable, hoverable, and persistent until dismissed. Test: hover tooltips/menus, try to move into and dismiss them.

---

## Operable

### 2.1 Keyboard accessible
- **2.1.1 Keyboard (A)** — All functionality operable from the keyboard. Test: keyboard-only walkthrough.
- **2.1.2 No Keyboard Trap (A)** — Focus can move away from any component with standard keys. Test: tab through, confirm no trap.
- **2.1.4 Character Key Shortcuts (A)** — Single-character shortcuts can be turned off, remapped, or are active only on focus. Test: inspect shortcut config / manual.

### 2.2 Enough time
- **2.2.1 Timing Adjustable (A)** — Time limits can be turned off, adjusted, or extended (with exceptions). Test: trigger any timeout.
- **2.2.2 Pause, Stop, Hide (A)** — Moving/auto-updating content >5s can be paused/stopped/hidden. Test: find carousels, marquees, auto-refresh.

### 2.3 Seizures
- **2.3.1 Three Flashes or Below Threshold (A)** — Nothing flashes more than 3 times per second. Test: manual / flash analyzer.

### 2.4 Navigable
- **2.4.1 Bypass Blocks (A)** — A skip link or landmarks let users bypass repeated content. Test: Tab from page top for a skip link; check landmarks.
- **2.4.2 Page Titled (A)** — Each page has a descriptive `<title>`. Test: inspect title.
- **2.4.3 Focus Order (A)** — Focus order preserves meaning and operability. Test: keyboard tab order review.
- **2.4.4 Link Purpose (In Context) (A)** — Link purpose clear from text or its context. Test: read links out of context ("click here" fails).
- **2.4.5 Multiple Ways (AA)** — More than one way to locate a page (nav, search, sitemap), except in a process. Test: site review.
- **2.4.6 Headings and Labels (AA)** — Headings and labels are descriptive. Test: review heading text and form labels.
- **2.4.7 Focus Visible (AA)** — Keyboard focus indicator is visible. Test: tab through; watch for the indicator.
- **2.4.11 Focus Not Obscured (Minimum) (AA) [2.2]** — When an element receives focus, it is not entirely hidden by author content (e.g. sticky headers/footers, cookie banners). Test: tab through with sticky elements present; ensure the focused control stays at least partially visible.

### 2.5 Input modalities
- **2.5.1 Pointer Gestures (A)** — Multipoint or path-based gestures have a single-pointer alternative. Test: try operating with one tap/click.
- **2.5.2 Pointer Cancellation (A)** — Down-event doesn't trigger; action on up-event, abortable, or reversible. Test: press, drag off, release — should cancel.
- **2.5.3 Label in Name (A)** — Accessible name includes the visible label text. Test: compare visible label to `aria-label`/name.
- **2.5.4 Motion Actuation (A)** — Device-motion features have a UI alternative and can be disabled. Test: shake/tilt features.
- **2.5.7 Dragging Movements (AA) [2.2]** — Any drag operation (sliders, drag-and-drop, reorder) has a single-pointer alternative that is not a drag (e.g. tap targets, buttons). Test: attempt the action without dragging.
- **2.5.8 Target Size (Minimum) (AA) [2.2]** — Pointer targets are at least **24×24 CSS px**, or have sufficient spacing (a 24px-diameter circle doesn't overlap adjacent targets), with exceptions (inline links, equivalent control, essential, user-agent default). Test: measure interactive targets and spacing.

---

## Understandable

### 3.1 Readable
- **3.1.1 Language of Page (A)** — `<html lang>` set to the page language. Test: inspect `lang`.
- **3.1.2 Language of Parts (AA)** — Inline language changes marked with `lang`. Test: inspect foreign-language passages.

### 3.2 Predictable
- **3.2.1 On Focus (A)** — Receiving focus doesn't trigger a context change. Test: tab through; watch for unexpected navigation/popups.
- **3.2.2 On Input (A)** — Changing a setting doesn't auto-change context unless the user is warned. Test: change selects/checkboxes.
- **3.2.3 Consistent Navigation (AA)** — Repeated navigation is in the same relative order across pages. Test: compare pages.
- **3.2.4 Consistent Identification (AA)** — Components with the same function are identified consistently (icons, labels). Test: compare repeated controls.
- **3.2.6 Consistent Help (A) [2.2]** — Help mechanisms (contact info, chat, help link) appear in the same relative order across pages where present. Test: locate help across pages, confirm consistent placement. (Note: 3.2.6 is Level A.)

### 3.3 Input assistance
- **3.3.1 Error Identification (A)** — Errors are identified and described in text. Test: submit invalid input.
- **3.3.2 Labels or Instructions (A)** — Inputs have labels/instructions. Test: inspect form fields.
- **3.3.3 Error Suggestion (AA)** — When a fix is known, suggest it. Test: trigger validation; check guidance.
- **3.3.4 Error Prevention (Legal, Financial, Data) (AA)** — Submissions are reversible, checked, or confirmable. Test: review checkout/legal/data forms.
- **3.3.7 Redundant Entry (A) [2.2]** — Information already entered in a process is auto-populated or available to select, not re-typed (except passwords, security, stale data). Test: walk a multi-step flow; check for repeated entry. (Note: 3.3.7 is Level A.)
- **3.3.8 Accessible Authentication (Minimum) (AA) [2.2]** — No cognitive function test (e.g. remembering a password, solving a puzzle, transcribing) for any auth step, unless an alternative exists or it's object recognition / personal content. Password managers/paste must be allowed; CAPTCHAs that require puzzles fail. Test: review login/auth; confirm paste and password-manager support, no required puzzles.

---

## Robust

- **4.1.2 Name, Role, Value (A)** — Every UI component exposes a correct name, role, state, and value to assistive tech (native semantics or correct ARIA). Test: inspect with accessibility tree / screen reader; automated catches some ARIA misuse.
- **4.1.3 Status Messages (AA)** — Status updates (e.g. "5 results", "saved", errors) are announced via roles/live regions without moving focus. Test: trigger status changes with a screen reader; check `role="status"`/`aria-live`.

> Reminder: 4.1.1 Parsing is obsolete in WCAG 2.2 — do not include it as a finding.
