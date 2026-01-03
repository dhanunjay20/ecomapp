/**
 * UI Store for App-Wide UI State
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@constants/index';

interface UIState {
  themeMode: 'light' | 'dark' | 'system';
  isOnboardingCompleted: boolean;
  activeFilters: Record<string, any>;
  searchHistory: string[];
}

interface UIActions {
  setThemeMode: (mode: 'light' | 'dark' | 'system') => Promise<void>;
  completeOnboarding: () => Promise<void>;
  setFilters: (filters: Record<string, any>) => void;
  clearFilters: () => void;
  addSearchQuery: (query: string) => Promise<void>;
  clearSearchHistory: () => Promise<void>;
  loadUIState: () => Promise<void>;
}

export const useUIStore = create<UIState & UIActions>((set, get) => ({
  // State
  themeMode: 'system',
  isOnboardingCompleted: false,
  activeFilters: {},
  searchHistory: [],

  // Actions
  setThemeMode: async (mode) => {
    set({ themeMode: mode });
    await AsyncStorage.setItem(STORAGE_KEYS.THEME_MODE, mode);
  },

  completeOnboarding: async () => {
    set({ isOnboardingCompleted: true });
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
  },

  setFilters: (filters) => {
    set({ activeFilters: filters });
  },

  clearFilters: () => {
    set({ activeFilters: {} });
  },

  addSearchQuery: async (query) => {
    const history = get().searchHistory;
    const newHistory = [query, ...history.filter(q => q !== query)].slice(0, 10);
    
    set({ searchHistory: newHistory });
    await AsyncStorage.setItem('search_history', JSON.stringify(newHistory));
  },

  clearSearchHistory: async () => {
    set({ searchHistory: [] });
    await AsyncStorage.removeItem('search_history');
  },

  loadUIState: async () => {
    try {
      const [themeMode, onboardingCompleted, searchHistory] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.THEME_MODE),
        AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED),
        AsyncStorage.getItem('search_history'),
      ]);

      set({
        themeMode: (themeMode as any) || 'system',
        isOnboardingCompleted: onboardingCompleted === 'true',
        searchHistory: searchHistory ? JSON.parse(searchHistory) : [],
      });
    } catch (error) {
      console.error('Failed to load UI state:', error);
    }
  },
}));
