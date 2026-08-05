---
"@timhettler/radix-card": patch
---

Fix `aria-describedby` wiring so `CardTargetDescription` registers its id via an effect instead of mutating context during render. The association now resolves reliably under production single-render and concurrent/StrictMode, and is omitted entirely when no description is present.

Externalize the `@radix-ui/*` primitives from the published bundle (they remain runtime `dependencies`) to avoid duplicate React context instances when a consumer also uses Radix, and mark the package `sideEffects: false` for better tree-shaking.

Require React `>=18` via `peerDependencies`, since the component relies on `useId`.
