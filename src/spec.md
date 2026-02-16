# Specification

## Summary
**Goal:** Generate accurate images for four Sakthi Snacks dishes and ensure the app displays them consistently via seeded data and name-based fallback mapping.

**Planned changes:**
- Add new generated dish images for Jalebi, Vegetable Frankie Roll, Vegetable Momos, and Vegetable Sandwich under `frontend/public/assets/generated/` using the specified filenames.
- Update `frontend/src/utils/imageFallbacks.ts` to map the Sakthi dish names (including the normalized `vegetable momos (6 pcs)` key) to the new `/assets/generated/dish-sakthi-*.dim_512x512.png` paths.
- Update Sakthi Snacks (restaurantId = 7) seeded menu items in `backend/main.mo` so their `imageUrl` values no longer point to legacy/mismatched images and resolve to the new static assets (directly or via empty `imageUrl` + frontend mapping).

**User-visible outcome:** On the Sakthi Snacks restaurant and menu screens, Jalebi, Vegetable Frankie Roll, Vegetable Momos (including “6 pcs”), and Vegetable Sandwich display the correct newly generated images.
