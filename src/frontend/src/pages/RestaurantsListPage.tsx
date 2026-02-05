import { useNavigate } from '@tanstack/react-router';
import { useListRestaurants } from '../hooks/useRestaurants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingSkeleton, ErrorState, EmptyState } from '../components/common/QueryState';
import { ChevronRight, Store } from 'lucide-react';

export default function RestaurantsListPage() {
  const navigate = useNavigate();
  const { data: restaurants, isLoading, error } = useListRestaurants();

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
        <LoadingSkeleton count={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
        <ErrorState message={error.message} />
      </div>
    );
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
        <EmptyState title="No restaurants available" description="Check back later for new restaurants." />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Restaurants</h1>
        <p className="text-muted-foreground text-lg">Discover delicious meals from our partner restaurants</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <Card
            key={restaurant.id.toString()}
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => navigate({ to: '/restaurants/$restaurantId', params: { restaurantId: restaurant.id.toString() } })}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    {restaurant.name}
                  </CardTitle>
                  <CardDescription className="mt-2">{restaurant.description}</CardDescription>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary">
                View Menu
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
