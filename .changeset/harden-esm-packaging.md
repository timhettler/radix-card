---
"@timhettler/radix-card": patch
---

Externalize the `@radix-ui/*` primitives from the published bundle (they remain runtime `dependencies`) to avoid duplicate React context instances when a consumer also uses Radix, and mark the package `sideEffects: false` for better tree-shaking.

Require React `>=18` via `peerDependencies`, since the component relies on `useId`.

Rebuild the redundant-click event from explicit `MouseEventInit` fields instead of spreading the React synthetic event; modifier keys, button, and pointer coordinates are preserved.
