# Specification

## Summary
**Goal:** Add and wire up new static image assets for the Pizza Palace restaurant and its existing menu items so they display consistently across the app and are persisted via updated backend seed and migration.

**Planned changes:**
- Add new Pizza Palace cover and dish images under `frontend/public/assets/generated/` using the required `.dim_*` filenames and dimensions.
- Update the centralized image mapping in `frontend/src/utils/imageFallbacks.ts` so Pizza Palace and its 5 menu items resolve to the new static assets anywhere images render.
- Update backend seed data in `backend/main.mo` so Pizza Palace (restaurantId=2) and menuItemIds 6–10 point to the new `/assets/generated/*.dim_*` imageUrl paths on fresh deploy.
- Extend `backend/migration.mo` upgrade logic to overwrite any existing persisted Pizza Palace restaurant/menu `imageUrl` values (restaurantId=2, menuItemIds 6–10) with the new asset paths.

**User-visible outcome:** Pizza Palace shows the new cover image in restaurant lists/details, and its 5 menu items show their specific new dish images (instead of a generic fallback), including after upgrading an existing deployment.
