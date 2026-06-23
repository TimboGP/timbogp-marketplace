# Error & Validation Message Patterns

Concrete patterns for error and validation copy, with before → after rewrites. Every good error message follows the **what / why / how** structure:

1. **What** happened — name the problem plainly.
2. **Why** — only when it helps the user act.
3. **How** to fix it — the concrete next step.

Keep the tone calm, never blame the user, and keep raw technical codes out of the primary message.

---

## Field-level patterns

### Required field
- **Before:** "This field is required." / "Required!"
- **After:** "Enter your email address." (Name the field, use a verb. Show it next to the field, not in a top banner.)

### Invalid format — email
- **Before:** "Invalid input."
- **After:** "That email doesn't look right. Check for typos like a missing '@'." (What's wrong + how to fix.)

### Invalid format — password (on create)
- **Before:** "Password does not meet requirements."
- **After:** "Use at least 8 characters with a number." (State the rule the user can act on. Better still, show requirements *before* they type and check them live.)

### Wrong credentials — don't leak which was wrong
- **Before:** "Incorrect password for this account." (Reveals the email exists — a security and privacy leak.)
- **After:** "That email and password don't match. Try again or reset your password." (Ambiguous on purpose; offers a recovery path.)

---

## System & access patterns

### Network / server failure with retry
- **Before:** "Error 500: Internal Server Error."
- **After:** "We couldn't load your data. Check your connection and try again." (Plus a **Try again** button. Take responsibility — "we," not "you.")

### Permission denied
- **Before:** "Access Denied. (403)"
- **After:** "You don't have access to this project. Ask an admin to invite you." (Explains the state and the path forward, not just the wall.)

### Not found
- **Before:** "404 Not Found."
- **After:** "We couldn't find that page. It may have been moved or deleted." (Plus a link back to a known-good place, e.g., **Go to dashboard**.)

### Rate limit
- **Before:** "Too many requests. (429)"
- **After:** "You've tried too many times. Wait a minute and try again." (Tell them *what to do and when* — give the wait if you know it.)

---

## Confirmation & destructive actions

### Destructive confirmation
- **Before:** "Are you sure?" with "OK" / "Cancel."
- **After:** Title: "Delete this project?" Body: "This permanently deletes 24 files and can't be undone." Buttons: **Delete project** / **Cancel**. (State the specific consequence; label the action button with the verb, not "OK"; make the safe choice easy.)

---

## Form-level vs field-level errors

- **Field-level** — for problems with a specific input. Place the message immediately next to or below that field, and mark the field itself (not just color — pair with an icon/text). Validate on blur or on submit, not on every keystroke.
- **Form-level** — for problems affecting the whole submission (e.g., a server rejection or a cross-field rule). Place a summary near the submit button or top of the form, and where possible link each summary item to its field.
- **Don't** show only a top banner for a single bad field — the user shouldn't have to hunt. If using a summary for accessibility, still mark the individual field.

### Form-level example
- **Before:** Top banner: "Form submission failed."
- **After:** "We couldn't create your account. Fix the highlighted fields below and try again." (And highlight them.)

---

## Placement & timing

- **Inline, near the source.** Show the error where the problem is, so the user doesn't search for it.
- **Right moment.** Validate after the user finishes a field (on blur) or on submit — not aggressively mid-typing, which feels like nagging. Confirm fixes by clearing the error as soon as the input becomes valid.
- **Persist until resolved.** Don't auto-dismiss errors the user still needs to act on (unlike transient success toasts).
- **Match severity to placement.** A blocking error belongs inline and visible; a minor warning can be quieter.

---

## Anti-patterns to avoid

- **Blaming the user** — "You entered an invalid value." Say what's wrong, not who's at fault.
- **Jargon / technical terms** — "Null reference exception," "malformed payload." Translate to plain language.
- **Vague catch-alls** — "An error occurred," "Something went wrong" with no next step. Always say what to do next.
- **Codes only** — "Error 0x80004005." If a code is needed for support, show it secondarily, never as the whole message.
- **ALL CAPS** — reads as shouting and hurts readability and screen readers.
- **Alarming or dramatic tone** — "FATAL ERROR!", "Oops! Disaster!" Stay calm; match the real stakes.
- **Over-apologizing** — strings of "we're so sorry" delay the actual help. Acknowledge briefly, then guide.
- **Dead ends** — an error with no recovery path. Always offer a way forward (retry, reset, go back, contact).
