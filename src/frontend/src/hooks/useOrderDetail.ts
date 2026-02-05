import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { OrderStatus, OrderItem } from '../backend';

export function useGetOrderStatus(orderId: bigint) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<OrderStatus | null>({
    queryKey: ['orderStatus', orderId.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getOrderStatus(orderId);
    },
    enabled: !!actor && !actorFetching && orderId > 0n,
  });
}

export function useGetOrderItems(orderId: bigint) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<OrderItem[]>({
    queryKey: ['orderItems', orderId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrderItems(orderId);
    },
    enabled: !!actor && !actorFetching && orderId > 0n,
  });
}
