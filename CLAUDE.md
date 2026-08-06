# CLAUDE.md

Guidance for working in this repo. Keep it concise and current.

## What this is

`@timhettler/radix-card` — an accessible, unstyled "block link / redundant click" card built on Radix primitives. (Component API lives in [README.md](README.md).) The repo also serves as a **repeatable, professional component-library template**. Two goals shape most decisions:

1. It should be a clean template others can copy for a full component library.
2. The card should behave **exactly like an official Radix ecosystem component** — same interop, packaging, and conventions.

## Toolchain (read first)

- **Node 22 is required** (`.nvmrc` = `22`, `engines.node >= 22.13`). A default shell is often on Node 18, which **breaks Vite 8** with `The requested module 'node:util' does not provide an export named 'styleText'`. Run `nvm use` (or otherwise select Node 22) before any `yarn`/build/test command.
- **Yarn 4** (Berry, via `packageManager` + `.yarn/releases`). Use `yarn` — not npm or pnpm.

## Monorepo layout (Yarn workspaces + Turborepo)

| Workspace  | Package                          | Role                                                                    |
| ---------- | -------------------------------- | ----------------------------------------------------------------------- |
| `lib/`     | `@timhettler/radix-card`         | the published library (ESM-only, Vite build)                            |
| `docs/`    | `@timhettler/radix-card-docs`    | Storybook — docs, examples, **and the test suite** (deployed to Vercel) |
| `example/` | `@timhettler/radix-card-example` | Next.js app — real-framework consumer / integration smoke test          |
| `config/`  | `@timhettler/config`             | shared tsconfig / ESLint / Prettier, consumed by the other workspaces   |

Turbo tasks (`build`, `lint`, `typecheck`, `test`) are defined in the root `turbo.json`.

## Common commands (run under Node 22)

- `yarn lint` / `yarn typecheck` / `yarn build` / `yarn format` (+ `yarn format:check`) — across all workspaces via Turbo.
- `yarn test` — the browser test suite (see below).
- `yarn workspace @timhettler/radix-card check:package` — validate the published package (`publint` + `attw`). Run after any packaging change.
- `yarn workspace @timhettler/radix-card-docs storybook` — Storybook dev server.

## Testing (real browser, not jsdom)

- Component behavior is tested by the Storybook **`play` functions in `docs/stories/`**, run headlessly in **Chromium** via `@storybook/addon-vitest` + Playwright (Vitest 4 browser mode). There are intentionally **no jsdom/unit tests in `lib`** — jsdom can't faithfully exercise the redundant-click DOM behavior (`MouseEvent` `view`, the Selection API, navigation).
- First run needs the browser: `yarn workspace @timhettler/radix-card-docs exec playwright install chromium`.
- **Flake note:** the first `yarn test` after changing Vite/Storybook config can fail with _"Re-optimizing dependencies because vite config has changed"_ — just re-run. (Not an issue in CI's fresh, single run.)

## Packaging conventions (important — mirror Radix)

- **ESM-only.** No CJS build, no top-level `main`; `exports` map + `module`, `sideEffects: false`. Types are rolled into a single self-contained `dist/main.d.ts` via `vite-plugin-dts` (`rollupTypes`).
- **The low-level `@radix-ui/*` primitives are externalized and declared as regular `dependencies`** — _not_ bundled, _not_ peers — exactly as the official `@radix-ui/react-*` packages ship. This lets them **dedupe** with the consumer's other Radix packages into single shared instances, so `asChild`/Slot and scope composition interop keep working. Do **not** bundle them or make them peers.
- **Only `react`/`react-dom` are peer dependencies** (`>=18`; the code uses `useId`) — they are the true singletons.
- After packaging changes, `check:package` must stay green; `attw` must pass for `node16 (from ESM)` and `bundler`.

## Releasing (Changesets)

- Every consumer-facing change needs a changeset (`yarn changeset`). Keep semver honest, and verify dependency/packaging claims against actually-published packages (`npm view <pkg> dependencies`) rather than assumptions.
- Merging to `main` opens/updates a **"Version Packages" PR**; merging _that_ PR is what publishes to npm.
- The Release workflow authenticates with a **PAT secret `RELEASE_TOKEN`** that has `contents` + `pull-requests` + **`workflows`** write. The default `GITHUB_TOKEN` cannot push to `.github/workflows/**`, which the Version PR sometimes needs to include.

## Deploy

- Storybook (`docs/`) deploys to Vercel. The Vercel project's **Root Directory must be `docs`**; build command/output are auto-detected from the root `turbo.json` `build` task.

## CI

- The **Verify** workflow (`.github/workflows/ci.yml`) runs, on PRs and pushes to `main`: lint → format:check → typecheck → build → install Chromium → test → `check:package`.
