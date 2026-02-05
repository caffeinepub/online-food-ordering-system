import { useNavigate } from '@tanstack/react-router';
import { useListCallerOrders } from '../hooks/useOrders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSkeleton, ErrorState, EmptyState } from '../components/common/QueryState';
import { ChevronRight, Package } from 'lucide-react';

export default function OrdersListPage() {
  const navigate = useNavigate();
  const { data: orders, isLoading, error } = useListCallerOrders();

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        <LoadingSkeleton count={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        <ErrorState message={error.message} />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        <EmptyState
          title="No orders yet"
          description="You haven't placed any orders yet. Browse our restaurants to get started!"
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
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Package className="h-8 w-8" />
          My Orders
        </h1>
        <p className="text-muted-foreground text-lg">Track your order history and current deliveries</p>
      </div>

      <div className="space-y-4 max-w-4xl">
        {orders.map((order: any) => (
          <Card
            key={order.id.toString()}
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => navigate({ to: '/orders/$orderId', params: { orderId: order.id.toString() } })}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    Order #{order.id.toString()}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Placed on {new Date(Number(order.createdAt) / 1000000).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>{order.status}</Badge>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Amount</span>
                <span className="font-semibold">${(Number(order.totalAmount) / 100).toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
