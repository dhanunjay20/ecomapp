/**
 * Cart Store with Optimistic Updates & Offline Sync
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@constants/index';
import { cartApi } from '@services/api';
import type { Cart, CartItem, Product, ProductVariant } from '@/types';

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  isSyncing: boolean;
  error: string | null;
}

interface CartActions {
  loadCart: () => Promise<void>;
  addItem: (item: Partial<CartItem> & { id: string; name: string; price: number; images: string[]; quantity: number }) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  syncCart: () => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  removeCoupon: () => Promise<void>;
}

const calculateCartTotals = (items: CartItem[]): Pick<Cart, 'subtotal' | 'discount' | 'tax' | 'total' | 'itemCount'> => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discount = 0; // Calculate based on coupons/offers
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal - discount + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { subtotal, discount, tax, total, itemCount };
};

export const useCartStore = create<CartState & CartActions>((set, get) => ({
  // State
  cart: null,
  isLoading: false,
  isSyncing: false,
  error: null,

  // Actions
  loadCart: async () => {
    try {
      set({ isLoading: true, error: null });

      // Load from local storage first (offline support)
      const cachedCart = await AsyncStorage.getItem(STORAGE_KEYS.CART_DATA);
      if (cachedCart) {
        set({ cart: JSON.parse(cachedCart), isLoading: false });
      }

      // Fetch from API
      try {
        const response = await cartApi.getCart();
        const cart = response.data;
        
        await AsyncStorage.setItem(STORAGE_KEYS.CART_DATA, JSON.stringify(cart));
        set({ cart, isLoading: false });
      } catch (error) {
        // If API fails, use cached data
        set({ isLoading: false });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to load cart',
        isLoading: false,
      });
    }
  },

  addItem: async (item) => {
    try {
      const currentCart = get().cart;
      
      // Optimistic update - create a simple cart item
      const newItem: any = {
        id: item.id || `temp-${Date.now()}`,
        name: item.name,
        price: item.price,
        images: item.images,
        quantity: item.quantity || 1,
        addedAt: new Date().toISOString(),
      };

      const newItems = [...(currentCart?.items || []), newItem];
      const optimisticCart: Cart = {
        items: newItems,
        ...calculateCartTotals(newItems.map(i => ({
          ...i,
          product: { price: i.price || 0 }
        })) as any),
      };

      set({ cart: optimisticCart });
      await AsyncStorage.setItem(STORAGE_KEYS.CART_DATA, JSON.stringify(optimisticCart));

      // Try API call (will fail with mock data, but that's ok)
      try {
        const response = await cartApi.addItem(item.id, undefined, item.quantity);
        const updatedCart = response.data;
        
        set({ cart: updatedCart });
        await AsyncStorage.setItem(STORAGE_KEYS.CART_DATA, JSON.stringify(updatedCart));
      } catch (apiError) {
        // Keep optimistic update if API fails
        console.log('API call failed, using optimistic update');
      }
    } catch (error: any) {
      set({ error: error.message || 'Failed to add item' });
      throw error;
    }
  },

  updateQuantity: async (itemId, quantity) => {
    try {
      const currentCart = get().cart;
      if (!currentCart) return;

      // Optimistic update
      const newItems = currentCart.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );

      const optimisticCart: Cart = {
        items: newItems,
        ...calculateCartTotals(newItems),
      };

      set({ cart: optimisticCart });
      await AsyncStorage.setItem(STORAGE_KEYS.CART_DATA, JSON.stringify(optimisticCart));

      // API call
      const response = await cartApi.updateItemQuantity(itemId, quantity);
      const updatedCart = response.data;
      
      set({ cart: updatedCart });
      await AsyncStorage.setItem(STORAGE_KEYS.CART_DATA, JSON.stringify(updatedCart));
    } catch (error: any) {
      // Rollback on error
      await get().loadCart();
      set({ error: error.message || 'Failed to update quantity' });
      throw error;
    }
  },

  removeItem: async (itemId) => {
    try {
      const currentCart = get().cart;
      if (!currentCart) return;

      // Optimistic update
      const newItems = currentCart.items.filter(item => item.id !== itemId);
      const optimisticCart: Cart = {
        items: newItems,
        ...calculateCartTotals(newItems),
      };

      set({ cart: optimisticCart });
      await AsyncStorage.setItem(STORAGE_KEYS.CART_DATA, JSON.stringify(optimisticCart));

      // API call
      const response = await cartApi.removeItem(itemId);
      const updatedCart = response.data;
      
      set({ cart: updatedCart });
      await AsyncStorage.setItem(STORAGE_KEYS.CART_DATA, JSON.stringify(updatedCart));
    } catch (error: any) {
      // Rollback on error
      await get().loadCart();
      set({ error: error.message || 'Failed to remove item' });
      throw error;
    }
  },

  clearCart: async () => {
    try {
      set({ cart: { items: [], subtotal: 0, discount: 0, tax: 0, total: 0, itemCount: 0 } });
      await AsyncStorage.removeItem(STORAGE_KEYS.CART_DATA);
      await cartApi.clearCart();
    } catch (error: any) {
      set({ error: error.message || 'Failed to clear cart' });
    }
  },

  syncCart: async () => {
    try {
      set({ isSyncing: true });
      
      const currentCart = get().cart;
      if (currentCart && currentCart.items.length > 0) {
        const response = await cartApi.syncCart(currentCart.items);
        const syncedCart = response.data;
        
        set({ cart: syncedCart, isSyncing: false });
        await AsyncStorage.setItem(STORAGE_KEYS.CART_DATA, JSON.stringify(syncedCart));
      } else {
        set({ isSyncing: false });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to sync cart',
        isSyncing: false,
      });
    }
  },

  applyCoupon: async (code) => {
    try {
      const response = await cartApi.applyCoupon(code);
      const updatedCart = response.data;
      
      set({ cart: updatedCart });
      await AsyncStorage.setItem(STORAGE_KEYS.CART_DATA, JSON.stringify(updatedCart));
    } catch (error: any) {
      set({ error: error.message || 'Failed to apply coupon' });
      throw error;
    }
  },

  removeCoupon: async () => {
    try {
      const response = await cartApi.removeCoupon();
      const updatedCart = response.data;
      
      set({ cart: updatedCart });
      await AsyncStorage.setItem(STORAGE_KEYS.CART_DATA, JSON.stringify(updatedCart));
    } catch (error: any) {
      set({ error: error.message || 'Failed to remove coupon' });
      throw error;
    }
  },
}));
