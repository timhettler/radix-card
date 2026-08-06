# @timhettler/radix-card

## 1.2.2

### Patch Changes

- 5c0cc8c: Fix `Card.Target` `aria-describedby` returning a stale/dangling value. The description id is now coordinated through `Card.Root` state, so `aria-describedby` is only set when a `Card.TargetDescription` is actually rendered and correctly matches a custom `id` when one is provided.
- 63cc94d: Ship the low-level `@radix-ui/*` primitives as externalized regular `dependencies` (mirroring how the official `@radix-ui/react-*` packages publish) so they dedupe with the consumer's other Radix packages into single shared instances instead of being bundled as private copies. Also mark the package `sideEffects: false` for better tree-shaking.

  Require React `>=18` via `peerDependencies`, since the component relies on `useId`.

- 8c1f2ca: Update runtime dependencies, most notably the bundled `@radix-ui/*` primitives (`@radix-ui/react-primitive` 2.1, `@radix-ui/react-context` 1.2, `@radix-ui/primitive` 1.1.7, `@radix-ui/react-compose-refs` 1.1.5).

## 1.2.1

### Patch Changes

- 96574c9: Update all dependencies; in particular: @radix-ui/primitive 1.1.1 and React 19

## 1.2.0

### Minor Changes

- 3c2c295: Support auxiliary clicks, i.e. clicking with the middle mouse button to open the link in a new tab

## 1.1.2

### Patch Changes

- b186bec: Remove console log

## 1.1.1

### Patch Changes

- Improve hook type
