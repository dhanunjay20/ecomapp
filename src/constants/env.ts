/**
 * Environment Configuration
 */

export const ENV = {
  API_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.ecomapp.com',
  WS_URL: process.env.EXPO_PUBLIC_WS_URL || 'wss://api.ecomapp.com',
  ENVIRONMENT: process.env.EXPO_PUBLIC_ENVIRONMENT || 'development',
  ENABLE_ANALYTICS: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS === 'true',
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN || '',
} as const;

export const isDevelopment = ENV.ENVIRONMENT === 'development';
export const isProduction = ENV.ENVIRONMENT === 'production';
