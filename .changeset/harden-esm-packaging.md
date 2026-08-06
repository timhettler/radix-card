---
"@timhettler/radix-card": patch
---

Ship the low-level `@radix-ui/*` primitives as externalized regular `dependencies` (mirroring how the official `@radix-ui/react-*` packages publish) so they dedupe with the consumer's other Radix packages into single shared instances instead of being bundled as private copies. Also mark the package `sideEffects: false` for better tree-shaking.

Require React `>=18` via `peerDependencies`, since the component relies on `useId`.
