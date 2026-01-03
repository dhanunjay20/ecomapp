/**
 * Cart API Service
 */

import { apiClient } from './client';
import type { Cart, CartItem, ApiResponse } from '@/types';

export const cartApi = {
  /**
   * Get user's cart
   */
  getCart: async (): Promise<ApiResponse<Cart>> => {
    return apiClient.get('/cart');
  },

  /**
   * Add item to cart
   */
  addItem: async (productId: string, variantId?: string, quantity = 1): Promise<ApiResponse<Cart>> => {
    return apiClient.post('/cart/items', { productId, variantId, quantity });
  },

  /**
   * Update item quantity
   */
  updateItemQuantity: async (itemId: string, quantity: number): Promise<ApiResponse<Cart>> => {
    return apiClient.put(`/cart/items/${itemId}`, { quantity });
  },

  /**
   * Remove item from cart
   */
  removeItem: async (itemId: string): Promise<ApiResponse<Cart>> => {
    return apiClient.delete(`/cart/items/${itemId}`);
  },

  /**
   * Clear cart
   */
  clearCart: async (): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete('/cart');
  },

  /**
   * Apply coupon code
   */
  applyCoupon: async (code: string): Promise<ApiResponse<Cart>> => {
    return apiClient.post('/cart/coupon', { code });
  },

  /**
   * Remove coupon
   */
  removeCoupon: async (): Promise<ApiResponse<Cart>> => {
    return apiClient.delete('/cart/coupon');
  },

  /**
   * Sync cart from local storage
   */
  syncCart: async (items: CartItem[]): Promise<ApiResponse<Cart>> => {
    return apiClient.post('/cart/sync', { items });
  },
};
