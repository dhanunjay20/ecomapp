/**
 * Search Header Component
 */

import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export const SearchHeader: React.FC = () => {
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

        {/* Wishlist Icon */}
        <TouchableOpacity
          className="w-11 h-11 items-center justify-center"
          onPress={() => router.push('/wishlist')}
        >
          <Ionicons name="heart-outline" size={24} color="#e8496d" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
