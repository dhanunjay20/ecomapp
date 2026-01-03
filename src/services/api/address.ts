/**
 * Address API Service
 */

import { apiClient } from './client';
import type { Address, ApiResponse } from '@/types';

export const addressApi = {
  /**
   * Get all user addresses
   */
  getAddresses: async (): Promise<ApiResponse<Address[]>> => {
    return apiClient.get('/addresses');
  },

  /**
   * Get address by ID
   */
  getAddressById: async (id: string): Promise<ApiResponse<Address>> => {
    return apiClient.get(`/addresses/${id}`);
  },

  /**
   * Add new address
   */
  addAddress: async (data: Omit<Address, 'id'>): Promise<ApiResponse<Address>> => {
    return apiClient.post('/addresses', data);
  },

  /**
   * Update address
   */
  updateAddress: async (id: string, data: Partial<Address>): Promise<ApiResponse<Address>> => {
    return apiClient.put(`/addresses/${id}`, data);
  },

  /**
   * Delete address
   */
  deleteAddress: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete(`/addresses/${id}`);
  },

  /**
   * Set default address
   */
  setDefaultAddress: async (id: string): Promise<ApiResponse<Address>> => {
    return apiClient.post(`/addresses/${id}/set-default`);
  },

  /**
   * Verify pincode serviceability
   */
  verifyPincode: async (pincode: string): Promise<ApiResponse<{ serviceable: boolean; estimatedDays: number }>> => {
    return apiClient.get(`/addresses/verify-pincode/${pincode}`);
  },
};
