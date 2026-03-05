/**
 * Products API Service
 */

import { apiClient } from './client';
import { MOCK_PRODUCTS } from '@/data/mockProducts';
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
    // Return mock data for now
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    let filteredProducts = [...MOCK_PRODUCTS];
    
    // Apply filters
    if (filters?.category) {
      filteredProducts = filteredProducts.filter(p => p.category === filters.category);
    }
    
    // Apply sorting
    if (sort === 'price-low-high') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high-low') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredProducts.slice(startIndex, endIndex);
    
    return {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limit),
        hasMore: endIndex < filteredProducts.length,
      },
    };
  },

  /**
   * Get product by ID
   */
  getProductById: async (id: string): Promise<ApiResponse<Product>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return {
      success: true,
      data: product,
      message: 'Product fetched successfully',
    };
  },

  /**
   * Get trending products
   */
  getTrendingProducts: async (limit = 10): Promise<ApiResponse<Product[]>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const trending = MOCK_PRODUCTS.filter(p => p.tags?.includes('trending')).slice(0, limit);
    return {
      success: true,
      data: trending,
      message: 'Trending products fetched successfully',
    };
  },

  /**
   * Get best selling products
   */
  getBestSellers: async (limit = 10): Promise<ApiResponse<Product[]>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const bestSellers = MOCK_PRODUCTS.filter(p => p.tags?.includes('bestseller')).slice(0, limit);
    return {
      success: true,
      data: bestSellers,
      message: 'Best sellers fetched successfully',
    };
  },

  /**
   * Get new arrivals
   */
  getNewArrivals: async (limit = 10): Promise<ApiResponse<Product[]>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newArrivals = MOCK_PRODUCTS.filter(p => p.tags?.includes('new')).slice(0, limit);
    return {
      success: true,
      data: newArrivals,
      message: 'New arrivals fetched successfully',
    };
  },

  /**
   * Get flash deals
   */
  getFlashDeals: async (): Promise<ApiResponse<Product[]>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Return products with high discounts
    const flashDeals = MOCK_PRODUCTS.filter(p => {
      if (p.originalPrice && p.price) {
        const discount = ((p.originalPrice - p.price) / p.originalPrice) * 100;
        return discount >= 30;
      }
      return false;
    }).slice(0, 10);
    return {
      success: true,
      data: flashDeals,
      message: 'Flash deals fetched successfully',
    };
  },

  /**
   * Get similar products
   */
  getSimilarProducts: async (productId: string, limit = 10): Promise<ApiResponse<Product[]>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (!product) {
      return { success: true, data: [], message: 'No similar products found' };
    }
    // Return products from the same category
    const similar = MOCK_PRODUCTS
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, limit);
    return {
      success: true,
      data: similar,
      message: 'Similar products fetched successfully',
    };
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
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Search by name or description
    let results = MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
    
    // Apply filters
    if (filters?.category) {
      results = results.filter(p => p.category === filters.category);
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = results.slice(startIndex, endIndex);
    
    return {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: results.length,
        totalPages: Math.ceil(results.length / limit),
        hasMore: endIndex < results.length,
      },
    };
  },

  /**
   * Get product reviews
   */
  getProductReviews: async (
    productId: string,
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<Review>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Return empty reviews for now
    return {
      data: [],
      pagination: {
        page,
        limit,
        total: 0,
        totalPages: 0,
        hasMore: false,
      },
    };
  },

  /**
   * Add product review
   */
  addReview: async (
    productId: string,
    data: { rating: number; title?: string; comment: string; images?: string[] }
  ): Promise<ApiResponse<Review>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const review: Review = {
      id: `review-${Date.now()}`,
      userId: 'user-1',
      userName: 'Current User',
      productId,
      rating: data.rating,
      title: data.title,
      comment: data.comment,
      images: data.images,
      helpful: 0,
      verified: true,
      createdAt: new Date().toISOString(),
    };
    return {
      success: true,
      data: review,
      message: 'Review added successfully',
    };
  },

  /**
   * Mark review as helpful
   */
  markReviewHelpful: async (reviewId: string): Promise<ApiResponse<{ message: string }>> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return {
      success: true,
      data: { message: 'Review marked as helpful' },
      message: 'Success',
    };
  },
};
