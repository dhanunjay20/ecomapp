/**
 * Orders API Service
 */

import { apiClient } from './client';
import type { Order, Address, PaymentMethod, PaginatedResponse, ApiResponse } from '@/types';

export const ordersApi = {
  /**
   * Get user's orders
   */
  getOrders: async (page = 1, limit = 10): Promise<PaginatedResponse<Order>> => {
    const response = await apiClient.get('/orders', {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Get order by ID
   */
  getOrderById: async (id: string): Promise<ApiResponse<Order>> => {
    return apiClient.get(`/orders/${id}`);
  },

  /**
   * Create order
   */
  createOrder: async (data: {
    addressId: string;
    paymentMethod: PaymentMethod;
    couponCode?: string;
  }): Promise<ApiResponse<Order>> => {
    return apiClient.post('/orders', data);
  },

  /**
   * Cancel order
   */
  cancelOrder: async (id: string, reason?: string): Promise<ApiResponse<Order>> => {
    return apiClient.post(`/orders/${id}/cancel`, { reason });
  },

  /**
   * Request order return
   */
  returnOrder: async (id: string, reason: string, items?: string[]): Promise<ApiResponse<Order>> => {
    return apiClient.post(`/orders/${id}/return`, { reason, items });
  },

  /**
   * Get order tracking info
   */
  getTracking: async (id: string): Promise<ApiResponse<Order['tracking']>> => {
    return apiClient.get(`/orders/${id}/tracking`);
  },

  /**
   * Download invoice
   */
  downloadInvoice: async (id: string): Promise<Blob> => {
    const response = await apiClient.get(`/orders/${id}/invoice`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
