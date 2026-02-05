# Specification

## Summary
**Goal:** Build a simple online food ordering app with Internet Identity login, restaurant/menu browsing, cart-based ordering, and order tracking.

**Planned changes:**
- Add Internet Identity sign-in/sign-out in the frontend and create/update a backend user profile keyed by caller Principal on first login.
- Define normalized backend data models with stable IDs and references for Restaurant, MenuItem, Order, and OrderItem (Restaurant → MenuItem, User → Order, Order → OrderItem).
- Implement read-only browse APIs and UI screens: list restaurants, restaurant details, and menu items for a selected restaurant.
- Implement cart and checkout flow: add/remove items, adjust quantities, submit order; persist Order and OrderItem records linked to the authenticated user.
- Implement order tracking: order status lifecycle, user-only order list (recent first), and order detail view with status and timestamps/history.
- Seed backend with deterministic sample data (at least 3 restaurants, 5 menu items each) without duplication across redeploys/upgrades.
- Create a coherent React UI for core flows using Tailwind, shadcn/ui composition, and React Query for fetching/caching, with an app-appropriate theme that avoids a predominantly blue-and-purple primary palette.

**User-visible outcome:** Users can sign in with Internet Identity, browse seeded restaurants and menus, build a cart, place orders, and view/track only their own orders and statuses from an orders screen.
