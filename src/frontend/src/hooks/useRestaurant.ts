import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Restaurant, MenuItem } from '../backend';

export function useGetRestaurant(restaurantId: bigint) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Restaurant | null>({
    queryKey: ['restaurant', restaurantId.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getRestaurant(restaurantId);
    },
    enabled: !!actor && !actorFetching && restaurantId > 0n,
  });
}

export function useGetRestaurantMenu(restaurantId: bigint) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<MenuItem[]>({
    queryKey: ['restaurantMenu', restaurantId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRestaurantMenu(restaurantId);
    },
    enabled: !!actor && !actorFetching && restaurantId > 0n,
  });
}
