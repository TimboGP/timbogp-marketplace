# Nielsen's 10 Usability Heuristics — Evaluation Reference

Jakob Nielsen's 10 general principles for interaction design. They are "heuristics" because they are broad rules of thumb, not specific usability guidelines. Use them as the lens for inspection: walk each one against the interface and record concrete findings.

---

## 1. Visibility of system status

The system should always keep users informed about what is going on, through appropriate feedback within a reasonable time.

**Look for:**
- Loading, progress, and saving indicators for anything that takes more than a moment.
- Clear current state — which tab/step/page is active, what's selected, what mode you're in.
- Immediate acknowledgement of actions (a click registers, a form submits, an item is added).

**Common violation:** A "Submit" button that gives no feedback after the click, so the user can't tell if it worked and clicks again, creating duplicates.

---

## 2. Match between the system and the real world

Speak the users' language with familiar words, phrases, and concepts. Follow real-world conventions; make information appear in a natural and logical order.

**Look for:**
- Plain language instead of internal jargon, system codes, or developer terms.
- Labels and icons that mean what users expect (a trash can deletes; a magnifying glass searches).
- Logical ordering (dates, steps, sizes) that mirrors how people think about the task.

**Common violation:** An error reading "Exception 0x80004005" instead of "We couldn't save your file. Check your connection and try again."

---

## 3. User control and freedom

Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave the unwanted state — support undo and redo.

**Look for:**
- Easy cancel/back/close on every flow, modal, and multi-step process.
- Undo for destructive or hard-to-reverse actions (delete, send, archive).
- No traps — the user can always get out without finishing or losing work.

**Common violation:** A multi-step wizard with no Back button, forcing users to abandon and restart to fix a mistake on a prior step.

---

## 4. Consistency and standards

Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform and industry conventions (Jakob's Law: users spend most of their time on *other* sites).

**Look for:**
- Internal consistency — same concept named, styled, and placed the same way everywhere.
- External consistency — conventions for primary buttons, navigation, links, icons match the platform and the web at large.
- Consistent interaction patterns (the same gesture does the same thing throughout).

**Common violation:** "Delete," "Remove," and "Trash" used interchangeably for the same action across different screens.

---

## 5. Error prevention

Even better than good error messages is a careful design that prevents problems from occurring in the first place. Eliminate error-prone conditions or check for them and confirm before committing.

**Look for:**
- Constraints and good defaults that make invalid input impossible or unlikely (date pickers, input masks, disabled invalid options).
- Confirmation or two-step commit for destructive/irreversible actions.
- Inline validation that catches problems before submission, not after.

**Common violation:** A "Delete account" button that fires immediately with no confirmation and no way to undo.

---

## 6. Recognition rather than recall

Minimize memory load by making elements, actions, and options visible. Users should not have to remember information from one part of the interface to another.

**Look for:**
- Options shown rather than memorized (visible menus, recently used items, autocomplete).
- Context carried forward (the cart shows what's in it; the form remembers prior steps).
- Help and instructions available in context, when needed.

**Common violation:** A coupon-code field that requires the user to remember and retype a code shown on a previous, now-inaccessible screen.

---

## 7. Flexibility and efficiency of use

Accelerators — unseen by novices — can speed up interaction for experts, so the design serves both. Let users tailor frequent actions.

**Look for:**
- Shortcuts, bulk actions, and saved/recent items for power users.
- Sensible defaults that get novices through without extra steps.
- Personalization or remembered preferences for repeated tasks.

**Common violation:** A list tool where every item must be deleted one at a time, with no select-all or multi-select for frequent cleanup.

---

## 8. Aesthetic and minimalist design

Interfaces should not contain information that is irrelevant or rarely needed. Every extra unit of content competes with the relevant units and diminishes their visibility.

**Look for:**
- A clear visual hierarchy where the primary action and key content dominate.
- Restraint — no clutter, redundant controls, or decorative noise that distracts from the task.
- Progressive disclosure of advanced/rare options instead of showing everything at once.

**Common violation:** A dashboard where the one metric users came for is buried among a dozen equally-weighted widgets and promotional banners.

---

## 9. Help users recognize, diagnose, and recover from errors

Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution.

**Look for:**
- Errors that say what happened and how to fix it, in human language.
- Messages placed next to the thing that's wrong, at the right time.
- A clear recovery path that preserves the user's work.

**Common violation:** A red "Invalid input" banner at the top of a long form with no indication of *which* field is wrong.

---

## 10. Help and documentation

It's best if the system needs no documentation, but help may still be necessary. It should be easy to search, focused on the user's task, list concrete steps, and not be too large.

**Look for:**
- Contextual, task-focused help (tooltips, inline hints) where confusion is likely.
- Searchable, well-organized documentation that's easy to reach.
- Help that lists concrete steps rather than abstract explanations.

**Common violation:** A complex feature with no in-product guidance and a generic FAQ that never addresses the actual question.

---

## Severity rating scale (0–4)

Rate each finding to prioritize fixes. Severity is a single number summarizing how serious a usability problem is.

| Rating | Meaning |
|--------|---------|
| **0** | Not a usability problem at all. |
| **1** | Cosmetic problem only — fix only if extra time is available. |
| **2** | Minor usability problem — low priority to fix. |
| **3** | Major usability problem — important to fix, high priority. |
| **4** | Usability catastrophe — imperative to fix before the product is released. |

### The three factors behind severity

A rating is a judgment that weighs three independent factors. Estimate each, then combine:

1. **Frequency** — Is the problem common or rare? Something every user hits on every visit is far more serious than an edge case.
2. **Impact** — Will it be easy or hard for users to overcome once they hit it? A blocker that stops the task cold scores higher than a slowdown.
3. **Persistence** — Is it a one-time problem users learn to work around, or a recurring one that bothers them repeatedly? Problems users can't adapt to are worse.

A problem that is frequent, high-impact, and persistent is a catastrophe (4). A rare, low-impact, one-off annoyance is cosmetic (1). When ranking findings for the report summary, order by roughly **severity × frequency × impact** so the highest-leverage fixes surface first. Note: it is normal and useful to get multiple independent ratings on the same problem — evaluators often disagree, and the spread is informative.
