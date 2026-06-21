---
name: New domain overlay
about: Propose a new domain overlay for the agentic-study-environment plugin
title: "[overlay] "
labels: domain-overlay
---

<!--
Thanks for proposing a new domain overlay! Domain overlays are the
highest-leverage contribution to this plugin — they let it specialize
to a kind of learning that the generic core doesn't fit cleanly.

Read plugin/agentic-study-environment/domains/ADDING_AN_OVERLAY.md first if
you haven't; it walks through writing one end-to-end.

Fill in what you can; leave sections blank if you're not sure yet.
-->

## Domain

<!-- Kebab-case identifier (e.g. `math`, `language-acquisition`, `music-theory`). Users will write `Domain: <this value>` in their sub-project CLAUDE.md to activate the overlay. -->

## What does practice in this domain look like?

<!-- One paragraph. What artifact does the user produce? A proof? A recording? A worked exam? A piece of music? What does the agent do during a practice session? -->

## What makes it different from coding or speech-therapy?

<!-- The generic core covers theory + practice sessions over markdown. The two existing overlays cover code stubs + idiomacy review, and patient simulation + clinical debrief. What does your domain need that neither of those covers? -->

## `/work/` layout

<!-- Sketch the directory tree under .studyenv/<sub-project>/work/ for this domain. Per-topic folders? Per-piece folders? Per-case folders? Flat? -->

```
work/
  ...
```

## Does it need a new session type?

<!-- Theory and practice cover most domains. Speech-therapy adds `simulation` because the role-play protocol is structurally different. Does your domain need something similar (e.g. `performance`, `composition`, `lab`)? If so, sketch the protocol. If theory + practice are enough, say so. -->

## Review focus

<!-- When the agent reviews user work in this domain, what should it attend to? Correctness? Style? Rigor? Technique? Form? Be specific — this is what makes the agent feel domain-aware. -->

## Source materials in this domain

<!-- What kinds of source materials would users typically drop into source-materials/? Textbooks? Scores? Papers? Audio? Patient profiles? Anything special the agent should know about extracting from them? -->

## Are you planning to write it, or just proposing the idea?

<!-- Both are welcome. If you're writing it, link to your draft when ready. If you're proposing, someone else may pick it up. -->
