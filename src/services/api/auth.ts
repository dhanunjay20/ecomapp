/**
 * Authentication API Service
 */

import { apiClient } from './client';
import type { 
  User, 
  AuthTokens, 
  LoginCredentials, 
  SignupData, 
  OTPData,
  ApiResponse 
} from '@/types';

export const authApi = {
  /**
   * Login with email and password
   */
  login: async (credentials: LoginCredentials): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> => {
    return apiClient.post('/auth/login', credentials);
  },

  /**
   * Signup with user data
   */
  signup: async (data: SignupData): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> => {
    return apiClient.post('/auth/signup', data);
  },

  /**
   * Send OTP to phone number
   */
  sendOTP: async (phone: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.post('/auth/otp/send', { phone });
  },

  /**
   * Verify OTP
   */
  verifyOTP: async (data: OTPData): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> => {
    return apiClient.post('/auth/otp/verify', data);
  },

  /**
   * Logout
   */
  logout: async (): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.post('/auth/logout');
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string): Promise<ApiResponse<AuthTokens>> => {
    return apiClient.post('/auth/refresh', { refreshToken });
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<ApiResponse<User>> => {
    return apiClient.get('/auth/profile');
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    return apiClient.put('/auth/profile', data);
  },

  /**
   * Change password
   */
  changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.post('/auth/change-password', { currentPassword, newPassword });
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.post('/auth/forgot-password', { email });
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token: string, newPassword: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.post('/auth/reset-password', { token, newPassword });
  },
};
