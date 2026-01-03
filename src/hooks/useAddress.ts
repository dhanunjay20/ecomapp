/**
 * Custom Hooks for Address API using React Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addressApi } from '@services/api';
import type { Address } from '@/types';

// Query Keys
export const addressKeys = {
  all: ['addresses'] as const,
  lists: () => [...addressKeys.all, 'list'] as const,
  list: () => [...addressKeys.lists()] as const,
  details: () => [...addressKeys.all, 'detail'] as const,
  detail: (id: string) => [...addressKeys.details(), id] as const,
};

/**
 * Get all user addresses
 */
export const useAddresses = () => {
  return useQuery({
    queryKey: addressKeys.list(),
    queryFn: () => addressApi.getAddresses(),
  });
};

/**
 * Get address by ID
 */
export const useAddress = (id: string) => {
  return useQuery({
    queryKey: addressKeys.detail(id),
    queryFn: () => addressApi.getAddressById(id),
    enabled: !!id,
  });
};

/**
 * Add address mutation
 */
export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Address, 'id'>) => addressApi.addAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.lists() });
    },
  });
};

/**
 * Update address mutation
 */
export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Address> }) => 
      addressApi.updateAddress(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: addressKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: addressKeys.lists() });
    },
  });
};

/**
 * Delete address mutation
 */
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => addressApi.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.lists() });
    },
  });
};

/**
 * Set default address mutation
 */
export const useSetDefaultAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => addressApi.setDefaultAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.lists() });
    },
  });
};

/**
 * Verify pincode
 */
export const useVerifyPincode = (pincode: string) => {
  return useQuery({
    queryKey: ['verify-pincode', pincode],
    queryFn: () => addressApi.verifyPincode(pincode),
    enabled: pincode.length === 6,
  });
};
