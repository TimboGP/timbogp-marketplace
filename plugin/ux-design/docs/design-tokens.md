# Design Tokens — `design-tokens`

> Scaffold or refactor a single source of truth for color, type, spacing, radius, shadow, motion, and z-index, emitted in the format your stack expects.

## What it does
This skill establishes a coherent, themeable design token foundation — or migrates a codebase of hardcoded values onto one — adapted to the project's existing stack. It uses semantic color layering (a small primitive palette mapped to semantic roles), generates a modular type scale, and supports light/dark theming via both an explicit `[data-theme]` override and a `prefers-color-scheme` block. Tokens are the contract every other UX skill builds on: components reference token names, never raw values.

## When it triggers
Skills activate automatically based on your request. This one triggers on phrases like:
- "set up design tokens" / "create a design system foundation"
- "extract these hardcoded colors into tokens"
- "add a type scale"
- "dark mode tokens" / "theming setup"

## How to use it
- **Just ask:** "Set up design tokens for this project", "Extract these hardcoded colors into tokens", or "Add a dark theme."
- **Via command:** No dedicated command — trigger by asking. (It is also invoked by `/ux-bootstrap` as part of the foundations baseline.)
- **Typical flow:**
  1. Detect the stack (framework, styling, token format, language) using the shared stack-detection procedure.
  2. Define token categories up front: color (semantic layering), type scale, spacing, radius, shadow, motion, z-index, breakpoints.
  3. Emit in the stack's format (CSS custom properties, Tailwind v3/v4, CSS-in-JS theme object, or portable DTCG JSON).
  4. Add theming — light/dark via explicit override and system `prefers-color-scheme`.
  5. In migration mode: inventory hardcoded literals, map each to the nearest semantic token, replace incrementally with diffs, and guard against new raw values.

## What you get
A token source of truth in the format your stack consumes, with verified-contrast colors, a generated type scale, and light/dark theming. For migrations, an incremental refactor swapping literals for token references.

## Bundled tools
- `node plugin/ux-design/skills/design-tokens/scripts/type-scale.mjs 16 1.25` — prints a modular type scale (px/rem table) plus paste-ready `--font-size-*` CSS custom properties. Args: `[basePx=16] [ratio=1.25] [stepsUp=6] [stepsDown=2]`.
- `node plugin/ux-design/skills/design-tokens/scripts/contrast-check.mjs` — checks the default token color pairs against WCAG (text pairs gate at 4.5; non-text/border at 3.0); exits non-zero on failure, so it can gate CI. Also accepts `"#fg:#bg"` args, e.g. `node plugin/ux-design/skills/design-tokens/scripts/contrast-check.mjs "#111:#fff" "#999:#fff"`.

## Reference files
- `assets/tokens.css` — starter CSS custom properties on `:root` with a `[data-theme="dark"]` override; the canonical CSS baseline.
- `assets/tokens.json` — the same tokens in W3C DTCG format; the portable source of truth for tooling (Style Dictionary, etc.).

## Works well with
Run after (or as part of) `ux-foundations`. Tokens are the foundation that `accessible-components` consumes for styling and that `interaction-feedback` uses for motion durations/easings. Verify color choices with the bundled `contrast-check.mjs`, or run a fuller `accessibility-audit` for evaluation.
