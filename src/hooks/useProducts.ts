/**
 * Custom Hooks for Products API using React Query
 */

import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '@services/api';
import type { Product, ProductFilter, SortOption } from '@/types';

// Query Keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters?: ProductFilter, sort?: SortOption) => 
    [...productKeys.lists(), { filters, sort }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  trending: () => [...productKeys.all, 'trending'] as const,
  bestSellers: () => [...productKeys.all, 'best-sellers'] as const,
  newArrivals: () => [...productKeys.all, 'new-arrivals'] as const,
  flashDeals: () => [...productKeys.all, 'flash-deals'] as const,
  similar: (id: string) => [...productKeys.all, 'similar', id] as const,
  reviews: (id: string) => [...productKeys.all, 'reviews', id] as const,
  search: (query: string) => [...productKeys.all, 'search', query] as const,
};

/**
 * Get paginated products with infinite scroll
 */
export const useProducts = (filters?: ProductFilter, sort?: SortOption) => {
  return useInfiniteQuery({
    queryKey: productKeys.list(filters, sort),
    queryFn: ({ pageParam = 1 }) => 
      productsApi.getProducts(pageParam, 20, filters, sort),
    getNextPageParam: (lastPage) => 
      lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
    initialPageParam: 1,
  });
};

/**
 * Get product by ID
 */
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productsApi.getProductById(id),
    enabled: !!id,
  });
};

/**
 * Get trending products
 */
export const useTrendingProducts = (limit = 10) => {
  return useQuery({
    queryKey: productKeys.trending(),
    queryFn: () => productsApi.getTrendingProducts(limit),
  });
};

/**
 * Get best sellers
 */
export const useBestSellers = (limit = 10) => {
  return useQuery({
    queryKey: productKeys.bestSellers(),
    queryFn: () => productsApi.getBestSellers(limit),
  });
};

/**
 * Get new arrivals
 */
export const useNewArrivals = (limit = 10) => {
  return useQuery({
    queryKey: productKeys.newArrivals(),
    queryFn: () => productsApi.getNewArrivals(limit),
  });
};

/**
 * Get flash deals
 */
export const useFlashDeals = () => {
  return useQuery({
    queryKey: productKeys.flashDeals(),
    queryFn: () => productsApi.getFlashDeals(),
    staleTime: 1 * 60 * 1000, // 1 minute (flash deals change quickly)
  });
};

/**
 * Get similar products
 */
export const useSimilarProducts = (productId: string, limit = 10) => {
  return useQuery({
    queryKey: productKeys.similar(productId),
    queryFn: () => productsApi.getSimilarProducts(productId, limit),
    enabled: !!productId,
  });
};

/**
 * Search products with infinite scroll
 */
export const useProductSearch = (query: string, filters?: ProductFilter) => {
  return useInfiniteQuery({
    queryKey: productKeys.search(query),
    queryFn: ({ pageParam = 1 }) => 
      productsApi.searchProducts(query, pageParam, 20, filters),
    getNextPageParam: (lastPage) => 
      lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
    enabled: query.length >= 2,
    initialPageParam: 1,
  });
};

/**
 * Get product reviews
 */
export const useProductReviews = (productId: string) => {
  return useInfiniteQuery({
    queryKey: productKeys.reviews(productId),
    queryFn: ({ pageParam = 1 }) => 
      productsApi.getProductReviews(productId, pageParam, 10),
    getNextPageParam: (lastPage) => 
      lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
    enabled: !!productId,
    initialPageParam: 1,
  });
};

/**
 * Add product review mutation
 */
export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      productId, 
      data 
    }: { 
      productId: string; 
      data: { rating: number; title?: string; comment: string; images?: string[] } 
    }) => productsApi.addReview(productId, data),
    onSuccess: (_, variables) => {
      // Invalidate reviews query
      queryClient.invalidateQueries({ 
        queryKey: productKeys.reviews(variables.productId) 
      });
      // Invalidate product detail to update rating
      queryClient.invalidateQueries({ 
        queryKey: productKeys.detail(variables.productId) 
      });
    },
  });
};
