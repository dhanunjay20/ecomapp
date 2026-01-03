/**
 * Category List Component
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { CATEGORIES } from '@constants/index';
import { Ionicons } from '@expo/vector-icons';

export const CategoryList: React.FC = () => {
  return (
    <View className="mb-6">
      <View className="px-4 mb-3">
        <Text className="text-xl font-bold text-gray-900 dark:text-white">
          Shop by Category
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4"
        contentContainerStyle={{ gap: 16 }}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            className="items-center"
            onPress={() => router.push(`/category/${category.id}`)}
          >
            <View className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full items-center justify-center mb-2 shadow-md">
              <Ionicons
                name={category.icon as any}
                size={32}
                color="#e8496d"
              />
            </View>
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
