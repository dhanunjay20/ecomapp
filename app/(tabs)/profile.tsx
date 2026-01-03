/**
 * Profile Screen
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuthStore } from '@store/index';
import { Card } from '@components/ui';
import { Ionicons } from '@expo/vector-icons';
import { getInitials } from '@utils/helpers';

export default function ProfileScreen() {
  const { user, isAuthenticated, logout } = useAuthStore();

  const menuItems = [
    { icon: 'receipt-outline', label: 'My Orders', route: '/orders' },
    { icon: 'location-outline', label: 'Saved Addresses', route: '/addresses' },
    { icon: 'card-outline', label: 'Payment Methods', route: '/payments' },
    { icon: 'heart-outline', label: 'Wishlist', route: '/wishlist' },
    { icon: 'notifications-outline', label: 'Notifications', route: '/notifications' },
    { icon: 'settings-outline', label: 'Settings', route: '/settings' },
    { icon: 'help-circle-outline', label: 'Help & Support', route: '/support' },
  ];

  if (!isAuthenticated) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900 items-center justify-center p-6">
        <Ionicons name="person-circle-outline" size={100} color="#9ca3af" />
        <Text className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
          Not Logged In
        </Text>
        <Text className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Sign in to access your profile and orders
        </Text>
        <TouchableOpacity
          className="bg-primary-500 px-8 py-3 rounded-xl"
          onPress={() => router.push('/(auth)/login')}
        >
          <Text className="text-white font-semibold text-base">
            Sign In
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="bg-white dark:bg-gray-800 p-6 mb-4">
          <View className="flex-row items-center">
            <View className="w-20 h-20 bg-primary-500 rounded-full items-center justify-center">
              <Text className="text-white text-2xl font-bold">
                {getInitials(user?.name || 'User')}
              </Text>
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-xl font-bold text-gray-900 dark:text-white">
                {user?.name}
              </Text>
              <Text className="text-gray-600 dark:text-gray-400 mt-1">
                {user?.email}
              </Text>
              {user?.phone && (
                <Text className="text-gray-600 dark:text-gray-400 mt-1">
                  {user.phone}
                </Text>
              )}
            </View>
            <TouchableOpacity>
              <Ionicons name="create-outline" size={24} color="#e8496d" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-4">
          {menuItems.map((item) => (
            <Card
              key={item.label}
              variant="outlined"
              className="mb-3"
              onPress={() => router.push(item.route as any)}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name={item.icon as any} size={24} color="#9ca3af" />
                  <Text className="ml-4 text-base font-medium text-gray-900 dark:text-white">
                    {item.label}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </View>
            </Card>
          ))}
        </View>

        {/* Logout Button */}
        <View className="p-4 mt-4">
          <TouchableOpacity
            className="bg-error/10 border border-error rounded-xl p-4"
            onPress={logout}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="log-out-outline" size={24} color="#ef4444" />
              <Text className="ml-3 text-base font-semibold text-error">
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
