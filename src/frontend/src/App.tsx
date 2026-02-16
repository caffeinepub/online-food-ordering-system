import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useCurrentUserProfile';
import { CartProvider } from './cart/CartContext';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import RestaurantsListPage from './pages/RestaurantsListPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import CartPage from './pages/CartPage';
import OrdersListPage from './pages/OrdersListPage';
import OrderDetailPage from './pages/OrderDetailPage';
import AppLayout from './components/layout/AppLayout';
import ProfileSetupDialog from './components/profile/ProfileSetupDialog';
import RequireAuth from './components/auth/RequireAuth';
import { AppErrorBoundary } from './components/common/AppErrorBoundary';
import { UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Layout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="mb-8">
        <UtensilsCrossed className="w-24 h-24 mx-auto mb-6 text-primary" />
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          Welcome to FoodHub
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Discover delicious meals from your favorite restaurants. Order now and enjoy fast delivery right to your door.
        </p>
      </div>
      <div className="flex gap-4">
        <Button size="lg" onClick={() => navigate({ to: '/restaurants' })} className="text-lg px-8">
          Browse Restaurants
        </Button>
        {identity && (
          <Button size="lg" variant="outline" onClick={() => navigate({ to: '/orders' })} className="text-lg px-8">
            My Orders
          </Button>
        )}
      </div>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const restaurantsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/restaurants',
  component: RestaurantsListPage,
});

const restaurantDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/restaurants/$restaurantId',
  component: RestaurantDetailPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartPage,
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/orders',
  component: () => (
    <RequireAuth>
      <OrdersListPage />
    </RequireAuth>
  ),
});

const orderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/orders/$orderId',
  component: () => (
    <RequireAuth>
      <OrderDetailPage />
    </RequireAuth>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  restaurantsRoute,
  restaurantDetailRoute,
  cartRoute,
  ordersRoute,
  orderDetailRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AppErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <CartProvider>
          <RouterProvider router={router} />
          {showProfileSetup && <ProfileSetupDialog />}
          <Toaster />
        </CartProvider>
      </ThemeProvider>
    </AppErrorBoundary>
  );
}
