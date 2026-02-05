import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetOrderStatus, useGetOrderItems } from '../hooks/useOrderDetail';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LoadingSkeleton, ErrorState, EmptyState } from '../components/common/QueryState';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500',
  confirmed: 'bg-blue-500',
  preparing: 'bg-purple-500',
  outForDelivery: 'bg-orange-500',
  delivered: 'bg-green-500',
  cancelled: 'bg-red-500',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  outForDelivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export default function OrderDetailPage() {
  const { orderId } = useParams({ from: '/orders/$orderId' });
  const navigate = useNavigate();
  const orderIdBigInt = BigInt(orderId);

  const { data: status, isLoading: statusLoading, error: statusError, refetch } = useGetOrderStatus(orderIdBigInt);
  const { data: items, isLoading: itemsLoading, error: itemsError } = useGetOrderItems(orderIdBigInt);

  const isLoading = statusLoading || itemsLoading;
  const error = statusError || itemsError;

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div>
        <Button variant="ghost" onClick={() => navigate({ to: '/orders' })} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Button>
        <LoadingSkeleton count={2} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Button variant="ghost" onClick={() => navigate({ to: '/orders' })} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Button>
        <ErrorState message={error.message} />
      </div>
    );
  }

  if (!status) {
    return (
      <div>
        <Button variant="ghost" onClick={() => navigate({ to: '/orders' })} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Button>
        <EmptyState title="Order not found" description="The order you're looking for doesn't exist or you don't have access to it." />
      </div>
    );
  }

  const statusKey = Object.keys(status)[0];
  const statusLabel = statusLabels[statusKey] || statusKey;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => navigate({ to: '/orders' })}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Button>
        <Button variant="outline" onClick={handleRefresh} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">Order #{orderId}</CardTitle>
              <CardDescription className="mt-1">Track your order status and details</CardDescription>
            </div>
            <Badge className={statusColors[statusKey] || ''}>{statusLabel}</Badge>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
          <CardDescription>
            {items && items.length > 0 ? `${items.length} item(s) in this order` : 'No items found'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!items || items.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Order items are not available. This may be due to backend data storage limitations.
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id.toString()}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Menu Item #{item.menuItemId.toString()}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity.toString()}</p>
                    </div>
                    <p className="font-semibold">${(Number(item.price) / 100).toFixed(2)}</p>
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
