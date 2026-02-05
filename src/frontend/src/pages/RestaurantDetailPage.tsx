import { useParams, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useGetRestaurant, useGetRestaurantMenu } from '../hooks/useRestaurant';
import { useCart } from '../cart/CartContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LoadingSkeleton, ErrorState, EmptyState } from '../components/common/QueryState';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';

export default function RestaurantDetailPage() {
  const { restaurantId } = useParams({ from: '/restaurants/$restaurantId' });
  const navigate = useNavigate();
  const restaurantIdBigInt = BigInt(restaurantId);

  const { data: restaurant, isLoading: restaurantLoading, error: restaurantError } = useGetRestaurant(restaurantIdBigInt);
  const { data: menuItems, isLoading: menuLoading, error: menuError } = useGetRestaurantMenu(restaurantIdBigInt);
  const { addItem, getRestaurantId } = useCart();

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const isLoading = restaurantLoading || menuLoading;
  const error = restaurantError || menuError;

  const handleAddToCart = (menuItem: any) => {
    const currentRestaurantId = getRestaurantId();
    if (currentRestaurantId && currentRestaurantId !== restaurantIdBigInt) {
      toast.error('You can only order from one restaurant at a time. Please clear your cart first.');
      return;
    }

    const quantity = quantities[menuItem.id.toString()] || 1;
    addItem({
      menuItemId: menuItem.id,
      menuItemName: menuItem.name,
      price: menuItem.price,
      quantity,
      restaurantId: restaurantIdBigInt,
      restaurantName: restaurant?.name || '',
    });
    toast.success(`Added ${quantity}x ${menuItem.name} to cart`);
    setQuantities((prev) => ({ ...prev, [menuItem.id.toString()]: 1 }));
  };

  const updateQuantity = (menuItemId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[menuItemId] || 1;
      const newValue = Math.max(1, current + delta);
      return { ...prev, [menuItemId]: newValue };
    });
  };

  if (isLoading) {
    return (
      <div>
        <Button variant="ghost" onClick={() => navigate({ to: '/restaurants' })} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Restaurants
        </Button>
        <LoadingSkeleton count={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Button variant="ghost" onClick={() => navigate({ to: '/restaurants' })} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Restaurants
        </Button>
        <ErrorState message={error.message} />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div>
        <Button variant="ghost" onClick={() => navigate({ to: '/restaurants' })} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Restaurants
        </Button>
        <EmptyState title="Restaurant not found" description="The restaurant you're looking for doesn't exist." />
      </div>
    );
  }

  return (
    <div>
      <Button variant="ghost" onClick={() => navigate({ to: '/restaurants' })} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Restaurants
      </Button>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">{restaurant.name}</CardTitle>
          <CardDescription className="text-base">{restaurant.description}</CardDescription>
        </CardHeader>
      </Card>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <Separator />
      </div>

      {!menuItems || menuItems.length === 0 ? (
        <EmptyState title="No menu items" description="This restaurant hasn't added any menu items yet." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {menuItems.map((item) => {
            const quantity = quantities[item.id.toString()] || 1;
            const priceInDollars = Number(item.price) / 100;

            return (
              <Card key={item.id.toString()} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription className="mt-1">{item.description}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="ml-2 text-base font-semibold">
                      ${priceInDollars.toFixed(2)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id.toString(), -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id.toString(), 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button onClick={() => handleAddToCart(item)} className="flex-1 gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
