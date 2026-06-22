# Stack detection (shared convention)

Every implement skill (`design-tokens`, `accessible-components`, `interaction-feedback`, `ux-foundations`, and `ux-copy` when editing components) MUST run this procedure before generating code. The goal: emit code that looks like it already belonged in the project.

Report what was detected to the user in one line before writing anything.

## 1. Is there a project at all?

- Look for `package.json` at the working directory or a sensible root.
- If none exists and there are no source files, fall back to **framework-agnostic mode**: plain HTML + CSS custom properties (`:root { --color-... }`). Skip all framework-specific steps below.

## 2. Framework

Check `dependencies` + `devDependencies` in `package.json` (and confirm with file extensions if ambiguous):

| Signal | Framework |
|---|---|
| `react`, `react-dom`, `next`, `.jsx`/`.tsx` files | **React** (note Next.js if `next` present) |
| `vue`, `nuxt`, `.vue` files | **Vue** |
| `svelte`, `@sveltejs/kit`, `.svelte` files | **Svelte / SvelteKit** |
| `@angular/core`, `angular.json` | **Angular** |
| none of the above | **Vanilla** (HTML/JS) |

## 3. Styling approach

Check in this precedence order; the first match wins:

| Signal | Styling | Token format to emit |
|---|---|---|
| `tailwind.config.{js,ts,cjs,mjs}` or `@import "tailwindcss"` / `@theme` in CSS | **Tailwind** | Extend `theme` (Tailwind v3) or `@theme` CSS vars (v4). Map tokens to Tailwind scale keys. |
| `styled-components` or `@emotion/*` in deps | **CSS-in-JS** | A typed `theme` object passed to `<ThemeProvider>`; tokens as JS/TS exports. |
| `*.module.css` / `*.module.scss` files | **CSS Modules** | CSS custom properties in a global stylesheet; consumed via `var(--token)`. |
| `sass`/`scss` present, no modules | **Sass** | SCSS variables/maps OR CSS custom properties (prefer custom properties for runtime theming). |
| plain `.css` / nothing | **Vanilla CSS** | CSS custom properties on `:root`. |

When two are plausible (e.g. Tailwind + CSS Modules), prefer the one used by the majority of recent components; ask if genuinely split.

## 4. TypeScript

- `tsconfig.json` present or `.ts`/`.tsx` files → emit TypeScript (typed token exports, typed component props).
- Otherwise emit JavaScript/JSX.

## 5. Conventions to mirror

Before writing, sample 1–3 existing components to match:
- File naming (`PascalCase.tsx` vs `kebab-case.vue`), and directory layout (`components/`, `src/components/`, `app/`, etc.).
- Import style (aliases like `@/components` vs relative).
- Existing token/variable names — extend them, don't create a parallel system.
- Test framework (`vitest`, `jest`, `@testing-library/*`, `playwright`) for any a11y test setup.

## 6. Output contract

After detection, hold these decisions and reuse them across the whole task:

```
framework  = react | vue | svelte | angular | vanilla
styling    = tailwind | css-in-js | css-modules | sass | vanilla-css
tokenFormat= <from table in §3>
language   = ts | js
rootDir    = <where components/styles live>
```

If any value is uncertain, ask one concise question rather than guessing — a wrong framework guess wastes the most time.
