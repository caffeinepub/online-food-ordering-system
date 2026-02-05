import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Restaurant } from '../backend';

export function useListRestaurants() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Restaurant[]>({
    queryKey: ['restaurants'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listRestaurants();
    },
    enabled: !!actor && !actorFetching,
  });
}
