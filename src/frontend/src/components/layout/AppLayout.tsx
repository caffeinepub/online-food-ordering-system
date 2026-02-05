import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import AuthButton from '../auth/AuthButton';
import { useCart } from '../../cart/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UtensilsCrossed, ShoppingCart, Package } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const { items } = useCart();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                FoodHub
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <Button
                variant={isActive('/restaurants') ? 'secondary' : 'ghost'}
                onClick={() => navigate({ to: '/restaurants' })}
              >
                Restaurants
              </Button>
              <Button
                variant={isActive('/orders') ? 'secondary' : 'ghost'}
                onClick={() => navigate({ to: '/orders' })}
              >
                <Package className="h-4 w-4 mr-2" />
                Orders
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={isActive('/cart') ? 'secondary' : 'ghost'}
              onClick={() => navigate({ to: '/cart' })}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
            <AuthButton />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        {children}
      </main>

      <footer className="border-t py-6 bg-muted/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2026. Built with ❤️ using <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">caffeine.ai</a></p>
        </div>
      </footer>
    </div>
  );
}
