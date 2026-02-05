import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';

export function useListCallerOrders() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery({
    queryKey: ['orders', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return [];
      // Backend doesn't have listCallerOrders yet, return empty array
      return [];
    },
    enabled: !!actor && !actorFetching && !!identity,
  });
}
