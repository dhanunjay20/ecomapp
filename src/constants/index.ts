/**
 * App Constants
 */

export const APP_NAME = 'EcomApp';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.ecomapp.com',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  CART_DATA: 'cart_data',
  WISHLIST_DATA: 'wishlist_data',
  THEME_MODE: 'theme_mode',
  ONBOARDING_COMPLETED: 'onboarding_completed',
} as const;

// Categories
export const CATEGORIES = [
  { id: 'men', name: 'Men', icon: 'person' },
  { id: 'women', name: 'Women', icon: 'person-outline' },
  { id: 'jewellery', name: 'Jewellery', icon: 'diamond' },
  { id: 'accessories', name: 'Accessories', icon: 'watch' },
] as const;

// Sort Options
export const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'newest', label: 'New Arrivals' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
] as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PRODUCTS_PER_PAGE: 20,
  ORDERS_PER_PAGE: 10,
  REVIEWS_PER_PAGE: 10,
} as const;

// Order Status Colors
export const ORDER_STATUS_COLORS = {
  pending: '#f59e0b',
  confirmed: '#3b82f6',
  processing: '#8b5cf6',
  shipped: '#06b6d4',
  delivered: '#10b981',
  cancelled: '#ef4444',
  returned: '#f97316',
} as const;

// Payment Methods
export const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI', icon: 'qr-code' },
  { id: 'card', name: 'Credit/Debit Card', icon: 'card' },
  { id: 'netbanking', name: 'Net Banking', icon: 'business' },
  { id: 'wallet', name: 'Wallet', icon: 'wallet' },
  { id: 'cod', name: 'Cash on Delivery', icon: 'cash' },
] as const;

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PHONE_LENGTH: 10,
  OTP_LENGTH: 6,
  PINCODE_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;

// Animation Durations (ms)
export const ANIMATION = {
  FAST: 150,
  NORMAL: 250,
  SLOW: 350,
  VERY_SLOW: 500,
} as const;

// Image Placeholders
export const PLACEHOLDERS = {
  PRODUCT_IMAGE: 'https://via.placeholder.com/300x400?text=Product',
  USER_AVATAR: 'https://via.placeholder.com/100x100?text=User',
  BANNER_IMAGE: 'https://via.placeholder.com/800x400?text=Banner',
} as const;

// Deep Linking
export const DEEP_LINK_CONFIG = {
  prefixes: ['ecomapp://', 'https://ecomapp.com'],
  config: {
    screens: {
      '(tabs)': {
        screens: {
          home: 'home',
          categories: 'categories',
          cart: 'cart',
          profile: 'profile',
        },
      },
      'product/[id]': 'product/:id',
      'order/[id]': 'order/:id',
      '(auth)/login': 'login',
      '(auth)/signup': 'signup',
    },
  },
} as const;

// Feature Flags
export const FEATURES = {
  ENABLE_SOCIAL_LOGIN: true,
  ENABLE_BIOMETRIC_AUTH: true,
  ENABLE_PUSH_NOTIFICATIONS: true,
  ENABLE_ANALYTICS: true,
  ENABLE_OFFLINE_MODE: true,
} as const;
