# Specification

## Summary
**Goal:** Add photo-realistic images for Chennai Spice seafood menu items and ensure both seeded and persisted menu data points to the new assets.

**Planned changes:**
- Generate and add 8 new 512x512 static dish images for Chennai Spice seafood items under `frontend/public/assets/generated/` using the specified filenames.
- Update backend seed data in `backend/main.mo` so Chennai Spice menuItemIds 46–53 `imageUrl` values reference the new `/assets/generated/*.dim_512x512.png` paths.
- Update `frontend/src/utils/imageFallbacks.ts` so these 8 dish names resolve by name to the new assets (including handling names with slashes).
- Add a safe, conditional backend upgrade migration (in `backend/migration.mo` if needed) to update persisted `MenuItem.imageUrl` values for menuItemIds 46–53 to the new asset paths.

**User-visible outcome:** The Chennai Spice restaurant detail/menu UI shows correct, non-generic images for the 8 seafood dishes on fresh deploys and after upgrades.
