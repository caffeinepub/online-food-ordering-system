# Specification

## Summary
**Goal:** Stop dosa imagery from being used as a generic placeholder and ensure each dish shows the correct image across the app.

**Planned changes:**
- Update the centralized frontend dish-image resolution so missing/invalid menu-item image URLs use a neutral generic dish placeholder, and only resolve to the dosa image when the dish name is actually “Dosa” (case-insensitive, normalized).
- Refine legacy/invalid image URL detection in `frontend/src/utils/imageFallbacks.ts` to avoid incorrectly treating valid `/assets/generated/` URLs as legacy and forcing fallback.
- Update backend seed data for specified South Indian menu items so `MenuItem.imageUrl` points to the existing `.dim_*` generated assets, and add an upgrade migration to correct persisted records on canister upgrade.
- Replace the existing generated dosa asset with a clearer, more appetizing dosa image, ensuring it appears only for the Dosa dish throughout the UI (restaurant detail, cart, order list/detail).

**User-visible outcome:** Menu items no longer show dosa imagery unless the item is Dosa; items with missing/bad image URLs show a generic dish placeholder, and South Indian dishes display their correct seeded images consistently (including after upgrades).
