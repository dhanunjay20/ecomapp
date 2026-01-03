/**
 * Design Tokens for the E-Commerce App
 * 
 * These tokens are used throughout the app via Tailwind classes
 * and provide a consistent design system.
 */

export const colors = {
  // Primary - Brand color (Pink/Red for fashion)
  primary: {
    50: '#fef2f4',
    100: '#fde6e9',
    200: '#fbd0d8',
    300: '#f7aab7',
    400: '#f27690',
    500: '#e8496d', // Main brand color
    600: '#d42c5a',
    700: '#b2204a',
    800: '#951d43',
    900: '#801c3e',
    950: '#480b1e',
  },
  
  // Secondary - Supporting color (Blue/Navy)
  secondary: {
    50: '#f5f7fa',
    100: '#eaeef4',
    200: '#d0dbe7',
    300: '#a7bdd2',
    400: '#789ab9',
    500: '#577da1',
    600: '#446387',
    700: '#38506e',
    800: '#31445c',
    900: '#2d3b4e',
    950: '#1e2734',
  },
  
  // Functional colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const;

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

export const theme = {
  colors,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  shadows,
} as const;

export type Theme = typeof theme;
