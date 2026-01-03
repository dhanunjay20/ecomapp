/**
 * Cart Item Component
 */

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { CartItem as CartItemType } from '@/types';
import { formatCurrency } from '@utils/helpers';

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onUpdateQuantity,
}) => {
  const { product, variant, quantity } = item;

  return (
    <View className="bg-white dark:bg-gray-800 rounded-xl p-3 mb-3 flex-row">
      {/* Product Image */}
      <Image
        source={{ uri: product.images[0] }}
        className="w-24 h-24 rounded-lg bg-gray-200 dark:bg-gray-700"
        resizeMode="cover"
      />

      {/* Product Info */}
      <View className="flex-1 ml-3">
        <Text
          className="text-base font-medium text-gray-900 dark:text-white mb-1"
          numberOfLines={2}
        >
          {product.name}
        </Text>

        {variant && (
          <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {variant.type}: {variant.value}
          </Text>
        )}

        <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {formatCurrency(product.price * quantity)}
        </Text>

        {/* Quantity Controls */}
        <View className="flex-row items-center">
          <TouchableOpacity
            className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg items-center justify-center"
            onPress={() => {
              if (quantity > 1) {
                onUpdateQuantity(quantity - 1);
              }
            }}
            disabled={quantity <= 1}
          >
            <Ionicons
              name="remove"
              size={16}
              color={quantity <= 1 ? '#9ca3af' : '#374151'}
            />
          </TouchableOpacity>

          <Text className="mx-4 text-base font-medium text-gray-900 dark:text-white">
            {quantity}
          </Text>

          <TouchableOpacity
            className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg items-center justify-center"
            onPress={() => onUpdateQuantity(quantity + 1)}
          >
            <Ionicons name="add" size={16} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Remove Button */}
      <TouchableOpacity
        className="w-8 h-8 items-center justify-center"
        onPress={onRemove}
      >
        <Ionicons name="trash-outline" size={20} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );
};
