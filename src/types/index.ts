/**
 * Global Type Definitions for the E-Commerce App
 */

// ============= User & Auth Types =============

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface OTPData {
  phone: string;
  otp: string;
}

// ============= Product Types =============

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: Category;
  subcategory?: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  variants?: ProductVariant[];
  specifications?: Record<string, string>;
  tags?: string[];
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  type: 'size' | 'color' | 'weight';
  name: string;
  value: string;
  inStock: boolean;
  priceModifier?: number;
}

export type Category = 'men' | 'women' | 'jewellery' | 'accessories';

export interface ProductFilter {
  category?: Category;
  subcategory?: string[];
  brands?: string[];
  priceRange?: [number, number];
  rating?: number;
  inStock?: boolean;
  tags?: string[];
}

export type SortOption = 
  | 'popularity' 
  | 'price-low-high' 
  | 'price-high-low' 
  | 'newest' 
  | 'rating';

// ============= Cart Types =============

export interface CartItem {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  itemCount: number;
}

// ============= Wishlist Types =============

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}

// ============= Address Types =============

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
  type: 'home' | 'work' | 'other';
}

// ============= Order Types =============

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  tracking?: TrackingInfo;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  price: number;
  total: number;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'returned';

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod' | 'wallet';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface TrackingInfo {
  courier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  updates: TrackingUpdate[];
}

export interface TrackingUpdate {
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

// ============= Review Types =============

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt: string;
}

// ============= Notification Types =============

export interface Notification {
  id: string;
  type: 'order' | 'offer' | 'cart' | 'general';
  title: string;
  body: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: string;
}

// ============= API Response Types =============

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

// ============= Form Types =============

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

export interface AddressFormData {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  type: 'home' | 'work' | 'other';
  isDefault: boolean;
}

// ============= Navigation Types =============

export type RootStackParamList = {
  '(tabs)': undefined;
  '(auth)/login': undefined;
  '(auth)/signup': undefined;
  '(auth)/otp': { phone: string };
  'product/[id]': { id: string };
  'category/[category]': { category: Category };
  'checkout/address': undefined;
  'checkout/payment': undefined;
  'checkout/confirmation': { orderId: string };
  'order/[id]': { id: string };
  'search': { query?: string };
};
