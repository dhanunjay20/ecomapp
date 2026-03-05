/**
 * Search Header Component
 */

import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore, useWishlistStore } from '@store/index';

export const SearchHeader: React.FC = () => {
  const cart = useCartStore((state) => state.cart);
  const wishlistItems = useWishlistStore((state) => state.items);

  return (
    <View className="px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <View className="flex-row items-center">
        {/* Search Bar */}
        <TouchableOpacity
          className="flex-1 flex-row items-center bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 mr-3"
          onPress={() => router.push('/search')}
        >
          <Ionicons name="search" size={20} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-3 text-base text-gray-900 dark:text-white"
            placeholder="Search products..."
            placeholderTextColor="#9ca3af"
            editable={false}
          />
        </TouchableOpacity>

        {/* Wishlist Icon with Badge */}
        <TouchableOpacity
          className="w-11 h-11 items-center justify-center relative"
          onPress={() => router.push('/wishlist')}
        >
          <Ionicons name="heart-outline" size={24} color="#e8496d" />
          {wishlistItems.length > 0 && (
            <View className="absolute -top-1 -right-1 bg-error rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
              <Text className="text-white text-[10px] font-bold">
                {wishlistItems.length > 99 ? '99+' : wishlistItems.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Cart Icon */}
        <TouchableOpacity
          className="w-11 h-11 items-center justify-center relative"
          onPress={() => router.push('/(tabs)/cart')}
        >
          <Ionicons name="cart-outline" size={24} color="#e8496d" />
          {cart && cart.itemCount > 0 && (
            <View className="absolute -top-1 -right-1 bg-error rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
              <Text className="text-white text-[10px] font-bold">
                {cart.itemCount > 99 ? '99+' : cart.itemCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
