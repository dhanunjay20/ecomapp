/**
 * Categories Screen
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Card } from '@components/ui';
import { CATEGORIES } from '@constants/index';
import { Ionicons } from '@expo/vector-icons';

const CATEGORY_IMAGES = {
  men: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400',
  women: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
  kids: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400',
  jewellery: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
  accessories: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
};

const COLLECTIONS = [
  { id: '1', name: 'Summer Collection', icon: 'sunny', color: '#f59e0b', count: 120 },
  { id: '2', name: 'Winter Special', icon: 'snow', color: '#3b82f6', count: 95 },
  { id: '3', name: 'Festive Wear', icon: 'gift', color: '#e8496d', count: 150 },
  { id: '4', name: 'Casual Wear', icon: 'shirt', color: '#10b981', count: 200 },
  { id: '5', name: 'Formal Wear', icon: 'business', color: '#8b5cf6', count: 85 },
  { id: '6', name: 'Sports & Fitness', icon: 'fitness', color: '#06b6d4', count: 110 },
];

export default function CategoriesScreen() {
  const [selectedTab, setSelectedTab] = useState<'categories' | 'collections'>('categories');

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={['top']}>
      {/* Header */}
      <View className="px-4 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Shop
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          Browse by categories & collections
        </Text>
      </View>

      {/* Tabs */}
      <View className="flex-row bg-white dark:bg-gray-800 px-4 pt-3">
        <TouchableOpacity
          onPress={() => setSelectedTab('categories')}
          className={`flex-1 pb-3 border-b-2 ${
            selectedTab === 'categories' 
              ? 'border-primary-500' 
              : 'border-transparent'
          }`}
        >
          <Text className={`text-center font-semibold ${
            selectedTab === 'categories'
              ? 'text-primary-500'
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            Categories
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('collections')}
          className={`flex-1 pb-3 border-b-2 ${
            selectedTab === 'collections'
              ? 'border-primary-500'
              : 'border-transparent'
          }`}
        >
          <Text className={`text-center font-semibold ${
            selectedTab === 'collections'
              ? 'text-primary-500'
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            Collections
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {selectedTab === 'categories' ? (
          /* Categories Grid */
          <View className="p-4">
            <View className="flex-row flex-wrap justify-between">
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  className="w-[48%] mb-4 rounded-2xl overflow-hidden"
                  onPress={() => router.push(`/category/${category.id}`)}
                  activeOpacity={0.8}
                >
                  <Card variant="elevated" className="p-0">
                    <View className="relative">
                      <Image
                        source={{ uri: CATEGORY_IMAGES[category.id as keyof typeof CATEGORY_IMAGES] }}
                        className="w-full h-40"
                        resizeMode="cover"
                      />
                      <View className="absolute inset-0 bg-black/30" />
                      <View className="absolute bottom-0 left-0 right-0 p-4">
                        <View className="flex-row items-center justify-between">
                          <View className="flex-1">
                            <Text className="text-white text-xl font-bold mb-1">
                              {category.name}
                            </Text>
                            <Text className="text-white/80 text-xs">
                              Explore collection
                            </Text>
                          </View>
                          <View className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                            <Ionicons
                              name={category.icon as any}
                              size={24}
                              color="#ffffff"
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>

            {/* Featured Section */}
            <View className="mt-4">
              <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Categories
              </Text>
              <Card variant="elevated" className="p-0 overflow-hidden">
                <TouchableOpacity onPress={() => router.push('/category/trending')}>
                  <View className="relative h-48">
                    <Image
                      source={{ uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800' }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                    <View className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <View className="absolute bottom-0 left-0 right-0 p-6">
                      <View className="bg-primary-500 self-start px-3 py-1 rounded-full mb-2">
                        <Text className="text-white text-xs font-bold">TRENDING</Text>
                      </View>
                      <Text className="text-white text-2xl font-bold mb-1">
                        Top Trending Items
                      </Text>
                      <Text className="text-white/90 text-sm">
                        Discover what's hot this season
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Card>
            </View>
          </View>
        ) : (
          /* Collections List */
          <View className="p-4">
            {COLLECTIONS.map((collection, index) => (
              <Card
                key={collection.id}
                variant="elevated"
                className="mb-3"
                onPress={() => router.push(`/category/${collection.id}`)}
              >
                <View className="flex-row items-center">
                  <View 
                    className="w-16 h-16 rounded-2xl items-center justify-center mr-4"
                    style={{ backgroundColor: `${collection.color}20` }}
                  >
                    <Ionicons
                      name={collection.icon as any}
                      size={28}
                      color={collection.color}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {collection.name}
                    </Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">
                      {collection.count} items available
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
                </View>
              </Card>
            ))}

            {/* Special Offers Section */}
            <View className="mt-6">
              <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Special Offers
              </Text>
              
              <Card variant="elevated" className="p-0 overflow-hidden mb-4">
                <TouchableOpacity>
                  <View className="relative h-32">
                    <Image
                      source={{ uri: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800' }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                    <View className="absolute inset-0 bg-primary-500/20" />
                    <View className="absolute inset-0 p-4 justify-center">
                      <Text className="text-2xl font-bold text-white mb-1">
                        50% OFF
                      </Text>
                      <Text className="text-white text-sm">
                        On selected items • Limited time
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Card>

              <Card variant="elevated" className="p-0 overflow-hidden">
                <TouchableOpacity>
                  <View className="relative h-32">
                    <Image
                      source={{ uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800' }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                    <View className="absolute inset-0 bg-black/30" />
                    <View className="absolute inset-0 p-4 justify-center">
                      <Text className="text-2xl font-bold text-white mb-1">
                        New Arrivals
                      </Text>
                      <Text className="text-white text-sm">
                        Fresh styles just landed
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Card>
            </View>
          </View>
        )}

        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
