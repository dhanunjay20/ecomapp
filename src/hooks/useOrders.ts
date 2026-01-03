/**
 * Custom Hooks for Orders API using React Query
 */

import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '@services/api';
import type { PaymentMethod } from '@/types';

// Query Keys
export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: () => [...orderKeys.lists()] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
  tracking: (id: string) => [...orderKeys.all, 'tracking', id] as const,
};

/**
 * Get user's orders with infinite scroll
 */
export const useOrders = () => {
  return useInfiniteQuery({
    queryKey: orderKeys.list(),
    queryFn: ({ pageParam = 1 }) => ordersApi.getOrders(pageParam, 10),
    getNextPageParam: (lastPage) => 
      lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
    initialPageParam: 1,
  });
};

/**
 * Get order by ID
 */
export const useOrder = (id: string) => {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => ordersApi.getOrderById(id),
    enabled: !!id,
  });
};

/**
 * Get order tracking info
 */
export const useOrderTracking = (id: string) => {
  return useQuery({
    queryKey: orderKeys.tracking(id),
    queryFn: () => ordersApi.getTracking(id),
    enabled: !!id,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

/**
 * Create order mutation
 */
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      addressId: string;
      paymentMethod: PaymentMethod;
      couponCode?: string;
    }) => ordersApi.createOrder(data),
    onSuccess: () => {
      // Invalidate orders list
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      // Clear cart after successful order
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

/**
 * Cancel order mutation
 */
export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) => 
      ordersApi.cancelOrder(id, reason),
    onSuccess: (_, variables) => {
      // Invalidate specific order and list
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
};

/**
 * Return order mutation
 */
export const useReturnOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason, items }: { id: string; reason: string; items?: string[] }) => 
      ordersApi.returnOrder(id, reason, items),
    onSuccess: (_, variables) => {
      // Invalidate specific order and list
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
};
