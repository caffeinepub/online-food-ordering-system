import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { CartItem } from '../backend';

export function usePlaceOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ restaurantId, cartItems }: { restaurantId: bigint; cartItems: CartItem[] }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.placeOrder(restaurantId, cartItems);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
