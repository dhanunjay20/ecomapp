/**
 * Product Row Component - Horizontal Scrollable Product List
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import type { Product } from '@/types';
import { ProductCard } from '@features/product/components/ProductCard';
import { Ionicons } from '@expo/vector-icons';

interface ProductRowProps {
  title: string;
  subtitle?: string;
  products: Product[];
  onSeeAll?: () => void;
}

export const ProductRow: React.FC<ProductRowProps> = ({
  title,
  subtitle,
  products,
  onSeeAll,
}) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <View className="mb-6">
      {/* Header */}
      <View className="px-4 mb-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </Text>
            {subtitle && (
              <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {subtitle}
              </Text>
            )}
          </View>
          {onSeeAll && (
            <TouchableOpacity
              className="flex-row items-center"
              onPress={onSeeAll}
            >
              <Text className="text-sm font-medium text-primary-500 mr-1">
                See All
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#e8496d" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Products Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pl-4"
        contentContainerStyle={{ gap: 12, paddingRight: 16 }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={() => router.push(`/product/${product.id}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
};
