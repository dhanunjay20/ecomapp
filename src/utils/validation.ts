/**
 * Form Validation Schemas using Zod
 */

import { z } from 'zod';
import { VALIDATION } from '@constants/index';

// Auth Validation Schemas
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`),
});

export const signupSchema = z.object({
  name: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`)
    .max(VALIDATION.NAME_MAX_LENGTH, `Name must not exceed ${VALIDATION.NAME_MAX_LENGTH} characters`),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[6-9]\d{9}$/.test(val),
      'Invalid phone number'
    ),
  password: z
    .string()
    .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`)
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(VALIDATION.OTP_LENGTH, `OTP must be ${VALIDATION.OTP_LENGTH} digits`)
    .regex(/^\d+$/, 'OTP must contain only numbers'),
});

// Address Validation Schema
export const addressSchema = z.object({
  name: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, 'Name is required')
    .max(VALIDATION.NAME_MAX_LENGTH, 'Name is too long'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid phone number'),
  addressLine1: z
    .string()
    .min(5, 'Address is required')
    .max(200, 'Address is too long'),
  addressLine2: z
    .string()
    .max(200, 'Address is too long')
    .optional(),
  city: z
    .string()
    .min(2, 'City is required')
    .max(100, 'City name is too long'),
  state: z
    .string()
    .min(2, 'State is required')
    .max(100, 'State name is too long'),
  pincode: z
    .string()
    .regex(/^[1-9][0-9]{5}$/, 'Invalid pincode'),
  type: z.enum(['home', 'work', 'other']),
  isDefault: z.boolean().default(false),
});

// Review Validation Schema
export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, 'Rating is required')
    .max(5, 'Rating must be between 1 and 5'),
  title: z
    .string()
    .max(100, 'Title is too long')
    .optional(),
  comment: z
    .string()
    .min(10, 'Review must be at least 10 characters')
    .max(1000, 'Review is too long'),
});

// Profile Update Schema
export const profileUpdateSchema = z.object({
  name: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`)
    .max(VALIDATION.NAME_MAX_LENGTH, `Name must not exceed ${VALIDATION.NAME_MAX_LENGTH} characters`),
  email: z
    .string()
    .email('Invalid email address'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid phone number')
    .optional(),
});

// Change Password Schema
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`)
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type OTPFormData = z.infer<typeof otpSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
