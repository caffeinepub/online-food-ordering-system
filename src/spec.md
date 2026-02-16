# Specification

## Summary
**Goal:** Fix errors when opening a restaurant detail page so navigation and rendering are reliable for all seeded restaurants.

**Planned changes:**
- Fix frontend restaurant card click/navigation so it consistently routes to `/restaurants/<restaurantId>` and renders the Restaurant Detail page (header + menu) without runtime errors for seeded restaurants.
- Add/ensure user-friendly invalid-ID handling on the Restaurant Detail route (empty, non-numeric, or negative IDs show an error UI instead of crashing).
- Ensure existing fetch-failure behavior uses the current `ErrorState` UI and that the Back button still works.
- Harden backend APIs (`getRestaurant`, `getRestaurantMenu`) to safely handle missing/invalid/nonexistent restaurant IDs by returning `null` / empty list without trapping.

**User-visible outcome:** Clicking any seeded restaurant from the list opens its detail page reliably without a blank screen or uncaught exception; invalid URLs and data-fetch failures show a friendly error state instead of crashing.
