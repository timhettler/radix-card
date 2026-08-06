---
"@timhettler/radix-card": patch
---

Bundle the low-level `@radix-ui/*` primitives (and their types) into the published package and move them to `devDependencies`, so the package is self-contained and no longer adds Radix to the consumer's dependency tree. Also mark the package `sideEffects: false` for better tree-shaking.

Require React `>=18` via `peerDependencies`, since the component relies on `useId`.
