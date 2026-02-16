import { useNavigate } from '@tanstack/react-router';
import { useCart } from '../cart/CartContext';
import { usePlaceOrder } from '../hooks/usePlaceOrder';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { EmptyState } from '../components/common/QueryState';
import { toast } from 'sonner';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../backend';
import { formatINR } from '../utils/formatCurrency';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart, getRestaurantId } = useCart();
  const { mutate: placeOrder, isPending } = usePlaceOrder();
  const { identity, login } = useInternetIdentity();

  const restaurantId = getRestaurantId();
  const restaurantName = items.length > 0 ? items[0].restaurantName : '';

  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const handleCheckout = () => {
    if (!identity) {
      toast.error('Please log in to place an order');
      login();
      return;
    }

    if (!restaurantId || items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const cartItems: CartItem[] = items.map((item) => ({
      menuItemId: item.menuItemId,
      quantity: BigInt(item.quantity),
    }));

    placeOrder(
      { restaurantId, cartItems },
      {
        onSuccess: (orderId) => {
          toast.success('Order placed successfully!');
          clearCart();
          navigate({ to: '/orders' });
        },
        onError: (error) => {
          toast.error('Failed to place order: ' + error.message);
        },
      }
    );
  };

  if (items.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        <EmptyState
          title="Your cart is empty"
          description="Add some delicious items from our restaurants to get started."
        />
        <div className="mt-6 text-center">
          <Button onClick={() => navigate({ to: '/restaurants' })} size="lg">
            Browse Restaurants
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order from {restaurantName}</CardTitle>
              <CardDescription>{items.length} item(s) in your cart</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => {
                const itemTotal = Number(item.price) * item.quantity;

                return (
                  <div key={item.menuItemId.toString()}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.menuItemName}</h3>
                        <p className="text-sm text-muted-foreground">{formatINR(item.price)} each</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="w-24 text-right font-semibold">{formatINR(itemTotal)}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.menuItemId)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Separator className="mt-4" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
              </div>
              <Button onClick={handleCheckout} disabled={isPending} className="w-full" size="lg">
                {isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    Placing Order...
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Place Order
                  </>
                )}
              </Button>
              {!identity && (
                <p className="text-xs text-center text-muted-foreground">
                  You'll need to log in to complete your order
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
