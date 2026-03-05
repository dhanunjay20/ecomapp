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
      {/* ---------- TITLE ---------- */}
      <View className="px-4 mb-4">
        <Text className="text-xl font-bold text-gray-900 dark:text-white">
          Shop by Category
        </Text>
      </View>

      {/* ---------- CATEGORY SCROLL ---------- */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 18,
        }}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => router.push(`/category/${category.id}`)}
            activeOpacity={0.75}
            className="items-center w-20"
          >
            {/* ICON CIRCLE */}
            <View className="w-18 h-18 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 items-center justify-center shadow-sm mb-2">
              <Ionicons
                name={category.icon as any}
                size={30}
                color="#e8496d"
              />
            </View>

            {/* LABEL */}
            <Text
              numberOfLines={1}
              className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center"
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
