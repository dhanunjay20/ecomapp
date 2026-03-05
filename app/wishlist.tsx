/**
 * Wishlist Screen - Saved Items
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useWishlistStore } from '@store/index';
import { ProductCard } from '@features/product/components/ProductCard';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@components/ui';

export default function WishlistScreen() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleClearAll = () => {
    Alert.alert(
      'Clear Wishlist',
      'Are you sure you want to remove all items from your wishlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => clearWishlist(),
        },
      ]
    );
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  const renderGridItem = ({ item }: any) => (
    <View className="w-[48%] mb-4">
      <ProductCard 
        product={item.product} 
        onPress={() => router.push(`/product/${item.product.id}`)} 
      />
    </View>
  );

  const renderListItem = ({ item }: any) => (
    <Card variant="elevated" className="mb-3">
      <TouchableOpacity
        onPress={() => router.push(`/product/${item.product.id}`)}
        activeOpacity={0.7}
      >
        <View className="flex-row">
          <Image
            source={{ uri: item.product.images[0] }}
            className="w-24 h-24 rounded-lg bg-gray-200 dark:bg-gray-700"
            resizeMode="cover"
          />
          <View className="flex-1 ml-3">
            <Text 
              className="text-base font-semibold text-gray-900 dark:text-white mb-1"
              numberOfLines={2}
            >
              {item.product.name}
            </Text>
            <View className="flex-row items-center mb-2">
              <Ionicons name="star" size={14} color="#f59e0b" />
              <Text className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                {item.product.rating} ({item.product.reviewCount})
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-bold text-primary-500">
                  ₹{item.product.price}
                </Text>
                {item.product.originalPrice && (
                  <Text className="text-xs text-gray-400 line-through">
                    ₹{item.product.originalPrice}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={() => handleRemoveItem(item.id)}
                className="bg-red-50 dark:bg-red-900/20 w-8 h-8 rounded-full items-center justify-center"
              >
                <Ionicons name="trash-outline" size={16} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={['top']}>
      {/* Header */}
      <View className="bg-white dark:bg-gray-800 shadow-sm">
        <View className="px-4 py-4 flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                My Wishlist
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved
              </Text>
            </View>
          </View>
          
          {items.length > 0 && (
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="mr-3"
              >
                <Ionicons 
                  name={viewMode === 'grid' ? 'list' : 'grid'} 
                  size={24} 
                  color="#374151" 
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleClearAll}>
                <Text className="text-error font-semibold">Clear All</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Stats Banner */}
        {items.length > 0 && (
          <View className="bg-primary-50 dark:bg-primary-900/20 px-4 py-3 flex-row items-center">
            <Ionicons name="heart" size={20} color="#e8496d" />
            <Text className="text-primary-700 dark:text-primary-400 text-sm ml-2 flex-1">
              {items.length} items waiting for you! Add to cart before they're gone.
            </Text>
          </View>
        )}
      </View>

      {items.length === 0 ? (
        <View className="flex-1 items-center justify-center p-8">
          {/* Heart Icon */}
          <View className="bg-gray-100 dark:bg-gray-800 w-40 h-40 rounded-full items-center justify-center mb-8">
            <Ionicons name="heart-outline" size={80} color="#9ca3af" />
          </View>

          {/* Title */}
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
            Your Wishlist is Empty
          </Text>

          {/* Description */}
          <Text className="text-center text-gray-600 dark:text-gray-400 text-base leading-6 mb-10 px-4 max-w-sm">
            Save items you love to your wishlist and never lose track of them
          </Text>

          {/* Start Shopping Button */}
          <TouchableOpacity
            className="bg-primary-500 px-10 py-4 rounded-xl flex-row items-center shadow-lg"
            onPress={() => router.push('/(tabs)')}
            activeOpacity={0.7}
          >
            <Ionicons name="storefront" size={22} color="#ffffff" />
            <Text className="text-white font-bold ml-3 text-base">
              Start Shopping
            </Text>
          </TouchableOpacity>

          {/* Features */}
          <View className="mt-16 w-full">
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-6 px-4 text-center">
              Why use Wishlist?
            </Text>
            <View className="space-y-5">
              {[
                { icon: 'bookmark', text: 'Save items for later' },
                { icon: 'notifications', text: 'Get price drop alerts' },
                { icon: 'gift', text: 'Share with friends & family' },
              ].map((feature, index) => (
                <View key={index} className="flex-row items-center px-8">
                  <View className="bg-primary-100 dark:bg-primary-900/30 w-12 h-12 rounded-full items-center justify-center mr-4">
                    <Ionicons name={feature.icon as any} size={22} color="#e8496d" />
                  </View>
                  <Text className="text-gray-600 dark:text-gray-400 text-base flex-1">
                    {feature.text}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          numColumns={viewMode === 'grid' ? 2 : 1}
          key={viewMode}
          contentContainerStyle={{ 
            padding: 16, 
            paddingBottom: 24 
          }}
          columnWrapperStyle={viewMode === 'grid' ? { justifyContent: 'space-between' } : undefined}
          renderItem={viewMode === 'grid' ? renderGridItem : renderListItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
