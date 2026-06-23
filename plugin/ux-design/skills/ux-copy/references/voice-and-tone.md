# Voice & Tone Reference

Practical guidance for keeping UX copy consistent in personality and appropriate in the moment.

## Voice vs. tone

- **Voice is constant.** It's the product's personality — who it sounds like across every screen. It doesn't change between a confirmation and an error.
- **Tone is contextual.** It's how that voice flexes for the situation. The same voice is warm and light in a success message and steady and reassuring in a failure. Think of voice as character and tone as mood.

If voice answers "who is talking?", tone answers "how do they sound right now?"

## Defining a product voice

Pick three to four voice attributes and make each actionable with a do and a don't. Example set:

| Attribute | Do | Don't |
|-----------|----|-------|
| **Clear** | Use plain words and short sentences. "We saved your changes." | Hedge or pad. "Your changes have, at this time, been successfully persisted." |
| **Human** | Talk like a helpful person. "Something went wrong on our end." | Sound like a machine. "Error: operation failed." |
| **Respectful** | Assume competence; never condescend or blame. "That code has expired." | Scold. "You entered the wrong code again." |
| **Confident** | Be direct and take responsibility. "We couldn't reach the server. Try again." | Be wishy-washy or over-apologetic. "Oopsie! We're soooo sorry!!!" |

Adapt the attributes to the actual product, but always pair each with concrete do/don't examples — abstract adjectives ("friendly," "professional") don't guide writers on their own.

## Tone by context

| Context | Goal | Tone | Example |
|---------|------|------|---------|
| **Error** | Help recover | Calm, plain, solution-first; never alarmed or blaming | "We couldn't save your changes. Check your connection and try again." |
| **Success / confirmation** | Acknowledge & reassure | Brief, positive, low-key (don't over-celebrate routine actions) | "Changes saved." |
| **Empty state** | Orient & invite action | Encouraging, helpful; can be light | "No projects yet. Create your first one to get started." |
| **Onboarding** | Build confidence | Warm, guiding, paced; one idea at a time | "Add a teammate to share this board." |
| **Destructive confirmation** | Make consequences clear | Serious, specific, unambiguous; no jokes | "Delete this project? This permanently removes 24 files and can't be undone." |
| **Marketing / promo (in-product)** | Persuade gently | Upbeat but honest; never pushy or false-urgent | "Upgrade to add unlimited boards." |

Match the tone to the user's emotional state in that moment. The bigger the stakes or the worse the situation, the plainer and steadier the tone.

## Capitalization & punctuation conventions

- **Sentence case** for buttons, labels, headings, and menu items by default ("Save changes," not "Save Changes"). It's friendlier, easier to read, and avoids ambiguity in multi-word labels.
- **No ALL CAPS** for emphasis — it reads as shouting and hurts readability and screen-reader output. Use weight, size, or placement to emphasize instead.
- **Oxford comma:** use it ("invoices, reports, and exports"). It removes ambiguity in lists.
- **Periods:** use them in full sentences (helper text, body copy, multi-sentence messages). Omit them on short standalone labels, buttons, and single-line tooltips.
- **Exclamation points:** sparingly — at most one per message, and never in errors or destructive confirmations.
- **Avoid ellipses** except to indicate a real in-progress action ("Saving…") or that a control opens further input ("Export…").
- **Numerals:** use digits for numbers in UI ("3 items," not "three items") for scannability.

## Word choices to prefer / avoid

| Prefer | Avoid | Why |
|--------|-------|-----|
| Delete | Remove / Trash (when "delete" is meant) | One word per concept |
| Sign in / Sign out | Login / Logout (verbs) | Consistent, grammatical |
| We couldn't… | You failed to… / Invalid… | Don't blame the user |
| Try again | Retry the operation | Plain language |
| Help | Assistance / Support resources | Shorter, clearer |
| Now / Save changes | At this time / Submit | Concrete and specific |

Cut filler: "please," "simply," "just," "in order to," "successfully," "kindly." They add length without meaning ("simply" and "just" can also make a stuck user feel dumb).

## Inclusive & plain-language guidance

- **Plain language:** target a broad reading level. Prefer common words, short sentences, and active voice ("We saved your file," not "Your file has been saved by the system").
- **Avoid idioms, slang, and culture-specific references** — they confuse non-native speakers and break in translation.
- **Be inclusive:** use gender-neutral language ("they," "the team," "people"); avoid ableist metaphors ("crazy," "sanity check," "blind to"); don't assume the user's abilities, family, or location.
- **Don't rely on copy alone** for critical meaning — pair it with icon, color, and structure, and make sure the text alone (as a screen reader reads it) still makes sense.
- **Write meaningful link and button text** — "View invoice," not "Click here." Out-of-context labels must still be understandable for assistive tech.
