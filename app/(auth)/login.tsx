/**
 * Login Screen
 */

import React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@utils/validation';
import { useAuthStore } from '@store/index';
import { Input, Button } from '@components/ui';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await login(data);
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="p-6">
            {/* Header */}
            <TouchableOpacity onPress={() => router.back()} className="mb-8">
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>

            <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </Text>
            <Text className="text-gray-600 dark:text-gray-400 mb-8">
              Sign in to continue shopping
            </Text>

            {/* Form */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.email?.message}
                  leftIcon={<Ionicons name="mail-outline" size={20} color="#9ca3af" />}
                  containerClassName="mb-4"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.password?.message}
                  leftIcon={<Ionicons name="lock-closed-outline" size={20} color="#9ca3af" />}
                  containerClassName="mb-2"
                />
              )}
            />

            <TouchableOpacity className="self-end mb-6">
              <Text className="text-primary-500 font-medium">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <Button
              title="Sign In"
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
              fullWidth
            />

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
              <Text className="mx-4 text-gray-500 dark:text-gray-400">OR</Text>
              <View className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
            </View>

            {/* Social Login */}
            <Button
              title="Continue with Google"
              variant="outline"
              fullWidth
              leftIcon={<Ionicons name="logo-google" size={20} color="#e8496d" />}
              className="mb-3"
            />

            {/* Sign Up Link */}
            <View className="flex-row items-center justify-center mt-6">
              <Text className="text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                <Text className="text-primary-500 font-semibold">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
