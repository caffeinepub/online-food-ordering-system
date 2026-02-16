import { useNavigate } from '@tanstack/react-router';
import { useListRestaurants } from '../hooks/useRestaurants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingSkeleton, ErrorState, EmptyState } from '../components/common/QueryState';
import { ChevronRight, Store } from 'lucide-react';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { getRestaurantImageUrl, FALLBACK_IMAGES } from '../utils/imageFallbacks';
import { getErrorMessage } from '../utils/getErrorMessage';

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
        <ErrorState message={getErrorMessage(error)} />
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
        {restaurants.map((restaurant) => {
          // Defensive handling for missing/invalid restaurant data
          const restaurantId = restaurant?.id;
          const restaurantName = restaurant?.name || 'Unknown Restaurant';
          const restaurantDescription = restaurant?.description || 'No description available';
          const restaurantImageUrl = restaurant?.imageUrl || '';

          // Skip restaurants with invalid IDs
          if (!restaurantId || restaurantId <= 0n) {
            return null;
          }

          const restaurantIdString = restaurantId.toString();

          return (
            <Card
              key={restaurantIdString}
              className="hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden"
              onClick={() => navigate({ to: '/restaurants/$restaurantId', params: { restaurantId: restaurantIdString } })}
            >
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <ImageWithFallback
                  src={getRestaurantImageUrl(restaurantImageUrl, restaurantName)}
                  alt={restaurantName}
                  fallbackSrc={FALLBACK_IMAGES.restaurant}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center gap-2">
                      <Store className="h-5 w-5" />
                      {restaurantName}
                    </CardTitle>
                    <CardDescription className="mt-2">{restaurantDescription}</CardDescription>
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
          );
        })}
      </div>
    </div>
  );
}
