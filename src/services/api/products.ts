/**
 * Products API Service
 */

import { apiClient } from './client';
import type { 
  Product, 
  ProductFilter, 
  SortOption, 
  PaginatedResponse,
  ApiResponse,
  Review 
} from '@/types';

export const productsApi = {
  /**
   * Get paginated products list
   */
  getProducts: async (
    page = 1,
    limit = 20,
    filters?: ProductFilter,
    sort?: SortOption
  ): Promise<PaginatedResponse<Product>> => {
    const response = await apiClient.get('/products', {
      params: { page, limit, ...filters, sort },
    });
    return response.data;
  },

  /**
   * Get product by ID
   */
  getProductById: async (id: string): Promise<ApiResponse<Product>> => {
    return apiClient.get(`/products/${id}`);
  },

  /**
   * Get trending products
   */
  getTrendingProducts: async (limit = 10): Promise<ApiResponse<Product[]>> => {
    return apiClient.get('/products/trending', { params: { limit } });
  },

  /**
   * Get best selling products
   */
  getBestSellers: async (limit = 10): Promise<ApiResponse<Product[]>> => {
    return apiClient.get('/products/best-sellers', { params: { limit } });
  },

  /**
   * Get new arrivals
   */
  getNewArrivals: async (limit = 10): Promise<ApiResponse<Product[]>> => {
    return apiClient.get('/products/new-arrivals', { params: { limit } });
  },

  /**
   * Get flash deals
   */
  getFlashDeals: async (): Promise<ApiResponse<Product[]>> => {
    return apiClient.get('/products/flash-deals');
  },

  /**
   * Get similar products
   */
  getSimilarProducts: async (productId: string, limit = 10): Promise<ApiResponse<Product[]>> => {
    return apiClient.get(`/products/${productId}/similar`, { params: { limit } });
  },

  /**
   * Search products
   */
  searchProducts: async (
    query: string,
    page = 1,
    limit = 20,
    filters?: ProductFilter
  ): Promise<PaginatedResponse<Product>> => {
    const response = await apiClient.get('/products/search', {
      params: { q: query, page, limit, ...filters },
    });
    return response.data;
  },

  /**
   * Get product reviews
   */
  getProductReviews: async (
    productId: string,
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<Review>> => {
    const response = await apiClient.get(`/products/${productId}/reviews`, {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Add product review
   */
  addReview: async (
    productId: string,
    data: { rating: number; title?: string; comment: string; images?: string[] }
  ): Promise<ApiResponse<Review>> => {
    return apiClient.post(`/products/${productId}/reviews`, data);
  },

  /**
   * Mark review as helpful
   */
  markReviewHelpful: async (reviewId: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.post(`/reviews/${reviewId}/helpful`);
  },
};
