/**
 * Profile Screen - Enhanced with Fake User Data
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Fake user data
const FAKE_USER = {
  name: 'Raj Kumar',
  email: 'raj.kumar@gmail.com',
  phone: '+91 98765 43210',
  avatar: 'https://ui-avatars.com/api/?name=Raj+Kumar&background=3b82f6&color=fff&size=200',
  memberSince: 'January 2023',
  totalOrders: 24,
  totalSpent: 45890,
  savedAmount: 8920,
  wishlistCount: 12,
};

export default function ProfileScreen() {
  const menuItems = [
    { icon: 'receipt-outline', label: 'My Orders', route: '/orders', badge: '3' },
    { icon: 'location-outline', label: 'Saved Addresses', route: '/addresses' },
    { icon: 'heart-outline', label: 'Wishlist', route: '/wishlist', badge: FAKE_USER.wishlistCount.toString() },
    { icon: 'notifications-outline', label: 'Notifications', route: '/notifications', badge: '5' },
    { icon: 'settings-outline', label: 'Settings', route: '/settings' },
    { icon: 'help-circle-outline', label: 'Help & Support', route: '/support' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="bg-white dark:bg-gray-800 pt-4 pb-6 mb-4">
          <View className="px-4">
            <View className="flex-row items-center mb-4">
              <Image
                source={{ uri: FAKE_USER.avatar }}
                className="w-20 h-20 rounded-full"
              />
              <View className="ml-4 flex-1">
                <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                  {FAKE_USER.name}
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 mt-1">
                  {FAKE_USER.email}
                </Text>
                <Text className="text-gray-500 dark:text-gray-500 text-sm mt-1">
                  Member since {FAKE_USER.memberSince}
                </Text>
              </View>
              <TouchableOpacity className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center">
                <Ionicons name="create-outline" size={20} color="#3b82f6" />
              </TouchableOpacity>
            </View>

            {/* Stats */}
            <View className="flex-row mt-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
              <View className="flex-1 items-center border-r border-gray-200">
                <Text className="text-2xl font-bold text-gray-900">{FAKE_USER.totalOrders}</Text>
                <Text className="text-xs text-gray-600 mt-1">Orders</Text>
              </View>
              <View className="flex-1 items-center border-r border-gray-200">
                <Text className="text-2xl font-bold text-gray-900">₹{(FAKE_USER.totalSpent / 1000).toFixed(1)}K</Text>
                <Text className="text-xs text-gray-600 mt-1">Total Spent</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-2xl font-bold text-green-600">₹{(FAKE_USER.savedAmount / 1000).toFixed(1)}K</Text>
                <Text className="text-xs text-gray-600 mt-1">Saved</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-4 mb-4">
          <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">QUICK ACTIONS</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => router.push('/orders')}
              className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 mr-2 items-center"
            >
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
                <Ionicons name="cube-outline" size={24} color="#3b82f6" />
              </View>
              <Text className="text-sm font-medium text-gray-900 dark:text-white">Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/wishlist')}
              className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 mx-1 items-center"
            >
              <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mb-2">
                <Ionicons name="heart-outline" size={24} color="#ef4444" />
              </View>
              <Text className="text-sm font-medium text-gray-900 dark:text-white">Wishlist</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/support')}
              className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 ml-2 items-center"
            >
              <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                <Ionicons name="headset-outline" size={24} color="#10b981" />
              </View>
              <Text className="text-sm font-medium text-gray-900 dark:text-white">Support</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-4">
          <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">ACCOUNT</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => router.push(item.route as any)}
              className={`bg-white dark:bg-gray-800 px-4 py-4 flex-row items-center justify-between ${
                index === 0 ? 'rounded-t-xl' : ''
              } ${
                index === menuItems.length - 1 ? 'rounded-b-xl mb-4' : 'border-b border-gray-100 dark:border-gray-700'
              }`}
            >
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full items-center justify-center">
                  <Ionicons name={item.icon as any} size={20} color="#6b7280" />
                </View>
                <Text className="ml-4 text-base font-medium text-gray-900 dark:text-white">
                  {item.label}
                </Text>
              </View>
              <View className="flex-row items-center">
                {item.badge && (
                  <View className="bg-red-500 px-2 py-1 rounded-full mr-2">
                    <Text className="text-white text-xs font-bold">{item.badge}</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View className="px-4 mb-6">
          <TouchableOpacity
            onPress={() => router.push('/(auth)/login')}
            className="bg-white dark:bg-gray-800 rounded-xl px-4 py-4 flex-row items-center justify-center border border-red-200"
          >
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
            <Text className="ml-2 text-base font-semibold text-red-500">
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        <View className="px-4 pb-6">
          <Text className="text-center text-xs text-gray-400">
            Version 2.0.0 • Made with ❤️
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

