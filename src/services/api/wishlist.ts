/**
 * Wishlist API Service
 */

import { apiClient } from './client';
import type { WishlistItem, ApiResponse } from '@/types';

export const wishlistApi = {
  /**
   * Get user's wishlist
   */
  getWishlist: async (): Promise<ApiResponse<WishlistItem[]>> => {
    return apiClient.get('/wishlist');
  },

  /**
   * Add item to wishlist
   */
  addItem: async (productId: string): Promise<ApiResponse<WishlistItem>> => {
    return apiClient.post('/wishlist/items', { productId });
  },

  /**
   * Remove item from wishlist
   */
  removeItem: async (itemId: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete(`/wishlist/items/${itemId}`);
  },

  /**
   * Check if product is in wishlist
   */
  isInWishlist: async (productId: string): Promise<ApiResponse<{ inWishlist: boolean }>> => {
    return apiClient.get(`/wishlist/check/${productId}`);
  },

  /**
   * Move item from wishlist to cart
   */
  moveToCart: async (itemId: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.post(`/wishlist/items/${itemId}/move-to-cart`);
  },

  /**
   * Clear wishlist
   */
  clearWishlist: async (): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete('/wishlist');
  },
};
