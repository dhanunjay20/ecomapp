/**
 * Wishlist Store with Optimistic Updates
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@constants/index';
import { wishlistApi } from '@services/api';
import type { WishlistItem, Product } from '@/types';

interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;
}

interface WishlistActions {
  loadWishlist: () => Promise<void>;
  addItem: (product: Product) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => Promise<void>;
  clearWishlist: () => Promise<void>;
}

export const useWishlistStore = create<WishlistState & WishlistActions>((set, get) => ({
  // State
  items: [],
  isLoading: false,
  error: null,

  // Actions
  loadWishlist: async () => {
    try {
      set({ isLoading: true, error: null });

      // Load from cache first
      const cached = await AsyncStorage.getItem(STORAGE_KEYS.WISHLIST_DATA);
      if (cached) {
        set({ items: JSON.parse(cached), isLoading: false });
      }

      // Fetch from API
      try {
        const response = await wishlistApi.getWishlist();
        const items = response.data;
        
        await AsyncStorage.setItem(STORAGE_KEYS.WISHLIST_DATA, JSON.stringify(items));
        set({ items, isLoading: false });
      } catch (error) {
        set({ isLoading: false });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to load wishlist',
        isLoading: false,
      });
    }
  },

  addItem: async (product) => {
    try {
      const currentItems = get().items;

      // Check if already in wishlist
      if (currentItems.some(item => item.product.id === product.id)) {
        return;
      }

      // Optimistic update
      const newItem: WishlistItem = {
        id: `temp-${Date.now()}`,
        product,
        addedAt: new Date().toISOString(),
      };

      const newItems = [...currentItems, newItem];
      set({ items: newItems });
      await AsyncStorage.setItem(STORAGE_KEYS.WISHLIST_DATA, JSON.stringify(newItems));

      // API call
      const response = await wishlistApi.addItem(product.id);
      const addedItem = response.data;

      // Replace temp item with real item
      const updatedItems = newItems.map(item =>
        item.id === newItem.id ? addedItem : item
      );
      
      set({ items: updatedItems });
      await AsyncStorage.setItem(STORAGE_KEYS.WISHLIST_DATA, JSON.stringify(updatedItems));
    } catch (error: any) {
      // Rollback on error
      await get().loadWishlist();
      set({ error: error.message || 'Failed to add to wishlist' });
      throw error;
    }
  },

  removeItem: async (itemId) => {
    try {
      const currentItems = get().items;

      // Optimistic update
      const newItems = currentItems.filter(item => item.id !== itemId);
      set({ items: newItems });
      await AsyncStorage.setItem(STORAGE_KEYS.WISHLIST_DATA, JSON.stringify(newItems));

      // API call
      await wishlistApi.removeItem(itemId);
    } catch (error: any) {
      // Rollback on error
      await get().loadWishlist();
      set({ error: error.message || 'Failed to remove from wishlist' });
      throw error;
    }
  },

  isInWishlist: (productId) => {
    return get().items.some(item => item.product.id === productId);
  },

  toggleWishlist: async (product) => {
    const items = get().items;
    const existingItem = items.find(item => item.product.id === product.id);

    if (existingItem) {
      await get().removeItem(existingItem.id);
    } else {
      await get().addItem(product);
    }
  },

  clearWishlist: async () => {
    try {
      set({ items: [] });
      await AsyncStorage.removeItem(STORAGE_KEYS.WISHLIST_DATA);
      await wishlistApi.clearWishlist();
    } catch (error: any) {
      set({ error: error.message || 'Failed to clear wishlist' });
    }
  },
}));
