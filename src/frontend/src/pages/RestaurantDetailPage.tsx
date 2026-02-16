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
import ImageWithFallback from '../components/common/ImageWithFallback';
import { getRestaurantImageUrl, getDishImageUrl, FALLBACK_IMAGES } from '../utils/imageFallbacks';
import { formatINR } from '../utils/formatCurrency';
import { parseRestaurantId } from '../utils/restaurantId';
import { getErrorMessage } from '../utils/getErrorMessage';
import type { MenuItem } from '../backend';

export default function RestaurantDetailPage() {
  const params = useParams({ from: '/restaurants/$restaurantId' });
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Parse and validate restaurant ID
  const idResult = parseRestaurantId(params.restaurantId);
  
  // Use a safe default for hooks (always call hooks unconditionally)
  const safeRestaurantId = idResult.valid ? idResult.id : 0n;
  
  // Always call hooks with safe values
  const { data: restaurant, isLoading: restaurantLoading, error: restaurantError } = useGetRestaurant(safeRestaurantId);
  const { data: menuItems, isLoading: menuLoading, error: menuError } = useGetRestaurantMenu(safeRestaurantId);
  const { addItem, getRestaurantId } = useCart();

  const isLoading = restaurantLoading || menuLoading;
  const error = restaurantError || menuError;

  const handleAddToCart = (menuItem: MenuItem) => {
    if (!idResult.valid) return;
    
    const currentRestaurantId = getRestaurantId();
    if (currentRestaurantId && currentRestaurantId !== idResult.id) {
      toast.error('You can only order from one restaurant at a time. Please clear your cart first.');
      return;
    }

    const quantity = quantities[menuItem.id.toString()] || 1;
    addItem({
      menuItemId: menuItem.id,
      menuItemName: menuItem.name,
      price: menuItem.price,
      quantity,
      restaurantId: idResult.id,
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

  // Handle invalid ID after all hooks have been called
  if (!idResult.valid) {
    return (
      <div>
        <Button variant="ghost" onClick={() => navigate({ to: '/restaurants' })} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Restaurants
        </Button>
        <ErrorState message={idResult.error} />
      </div>
    );
  }

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
        <ErrorState message={getErrorMessage(error)} />
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

      <Card className="mb-8 overflow-hidden">
        <div className="relative h-64 w-full overflow-hidden bg-muted">
          <ImageWithFallback
            src={getRestaurantImageUrl(restaurant.imageUrl, restaurant.name)}
            alt={restaurant.name || 'Restaurant'}
            fallbackSrc={FALLBACK_IMAGES.restaurant}
            className="w-full h-full object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-3xl">{restaurant.name || 'Unknown Restaurant'}</CardTitle>
          <CardDescription className="text-base">{restaurant.description || 'No description available'}</CardDescription>
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

            return (
              <Card key={item.id.toString()} className="hover:shadow-md transition-shadow overflow-hidden">
                <div className="flex gap-4">
                  <div className="relative w-32 h-32 shrink-0 bg-muted">
                    <ImageWithFallback
                      src={getDishImageUrl(item.imageUrl, item.name)}
                      alt={item.name || 'Dish'}
                      fallbackSrc={FALLBACK_IMAGES.dish}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{item.name || 'Unknown Item'}</CardTitle>
                          <CardDescription className="mt-1 line-clamp-2">{item.description || 'No description'}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="ml-2 text-base font-semibold whitespace-nowrap">
                          {formatINR(item.price)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2 mt-auto">
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
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
