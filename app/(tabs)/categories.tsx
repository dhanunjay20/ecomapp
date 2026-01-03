/**
 * Categories Screen
 */

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Card } from '@components/ui';
import { CATEGORIES } from '@constants/index';
import { Ionicons } from '@expo/vector-icons';

export default function CategoriesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={['top']}>
      <View className="px-4 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">
          Categories
        </Text>
      </View>

      <ScrollView className="flex-1 p-4">
        <View className="flex-row flex-wrap justify-between">
          {CATEGORIES.map((category) => (
            <Card
              key={category.id}
              variant="elevated"
              className="w-[48%] mb-4"
              onPress={() => router.push(`/category/${category.id}`)}
            >
              <View className="items-center py-8">
                <View className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full items-center justify-center mb-3">
                  <Ionicons
                    name={category.icon as any}
                    size={40}
                    color="#e8496d"
                  />
                </View>
                <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                  {category.name}
                </Text>
              </View>
            </Card>
          ))}
        </View>

        {/* Subcategories can be added here */}
        <View className="mt-6">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Shop by Collection
          </Text>
          
          {['Summer Collection', 'Winter Special', 'Festive Wear', 'Casual Wear'].map((collection) => (
            <Card
              key={collection}
              variant="outlined"
              className="mb-3"
              onPress={() => {}}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-medium text-gray-900 dark:text-white">
                  {collection}
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
