# Specification

## Summary
**Goal:** Fix mismatched Sakthi Snacks dish images by replacing incorrect generated assets and ensuring frontend/backend mappings point to the corrected static files.

**Planned changes:**
- Review the Sakthi Snacks dish images under `frontend/public/assets/generated/` to identify which ones do not visually match their filenames, and add corrected replacement images using a deterministic `.v2` filename scheme.
- Update `frontend/src/utils/imageFallbacks.ts` so Sakthi Snacks dish name-to-image mappings resolve to the corrected Sakthi Snacks assets and remove/repair any incorrect cross-item mappings.
- Update seeded Sakthi Snacks (restaurantId = 7) menu items in `backend/main.mo` so returned `imageUrl` values (when present) point to the correct `/assets/generated/...` filenames, using a conditional migration if required by persisted state.

**User-visible outcome:** Sakthi Snacks menu items display the correct dish photos (including when `imageUrl` is missing/legacy), with all images served as static frontend assets and no mismatched Sakthi Snacks mappings affecting other items.
