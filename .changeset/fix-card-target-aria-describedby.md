---
"@timhettler/radix-card": patch
---

Fix `Card.Target` `aria-describedby` returning a stale/dangling value. The description id is now coordinated through `Card.Root` state, so `aria-describedby` is only set when a `Card.TargetDescription` is actually rendered and correctly matches a custom `id` when one is provided.
