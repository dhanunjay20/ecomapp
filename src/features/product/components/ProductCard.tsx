/**
 * Product Card Component
 */

import React from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import type { Product } from '@/types';
import { formatCurrency, calculateDiscount, hapticFeedback } from '@utils/helpers';
import { useWishlistStore } from '@store/index';
import { Badge } from '@components/ui';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  width?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  width = 160,
}) => {
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      hapticFeedback.light();
    } else {
      hapticFeedback.success();
    }
    toggleWishlist(product);
  };

  return (
    <Animated.View style={[{ width }, animatedStyle]}>
    <Pressable
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm"
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {/* Product Image */}
      <View className="relative">
        <Image
          source={{ uri: product.images[0] }}
          style={{ width, height: width * 1.2 }}
          className="bg-gray-200 dark:bg-gray-700"
          resizeMode="cover"
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <View className="absolute top-2 left-2">
            <Badge text={`${discount}% OFF`} variant="error" size="sm" />
          </View>
        )}

        {/* Wishlist Button */}
        <TouchableOpacity
          className="absolute top-2 right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full items-center justify-center"
          onPress={(e) => {
            e.stopPropagation();
            handleWishlistToggle();
          }}
        >
          <Ionicons
            name={inWishlist ? 'heart' : 'heart-outline'}
            size={18}
            color={inWishlist ? '#e8496d' : '#9ca3af'}
          />
        </TouchableOpacity>
      </View>

      {/* Product Info */}
      <View className="p-3">
        <Text
          className="text-sm font-medium text-gray-900 dark:text-white mb-1"
          numberOfLines={2}
        >
          {product.name}
        </Text>

        <Text className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          {product.brand}
        </Text>

        {/* Price */}
        <View className="flex-row items-center mb-2">
          <Text className="text-base font-bold text-gray-900 dark:text-white">
            {formatCurrency(product.price)}
          </Text>
          {product.originalPrice && (
            <Text className="text-xs text-gray-500 dark:text-gray-400 line-through ml-2">
              {formatCurrency(product.originalPrice)}
            </Text>
          )}
        </View>

        {/* Rating */}
        <View className="flex-row items-center">
          <Ionicons name="star" size={14} color="#f59e0b" />
          <Text className="text-xs text-gray-600 dark:text-gray-400 ml-1">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </Text>
        </View>
      </View>
    </Pressable>
    </Animated.View>
  );
};
