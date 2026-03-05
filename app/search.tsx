/**
 * Search Screen - Product Search
 */

import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ProductCard } from '@features/product/components/ProductCard';
import { Ionicons } from '@expo/vector-icons';
import { useProductSearch } from '@hooks/index';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [debouncedQuery, setDebouncedQuery] = React.useState('');
  
  const { data: searchResults, isLoading } = useProductSearch(debouncedQuery);

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const recentSearches = [
    'Running Shoes',
    'T-Shirts',
    'Jeans',
    'Headphones',
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={['top']}>
      {/* Search Header */}
      <View className="px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          
          <View className="flex-1 flex-row items-center bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3">
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              className="flex-1 ml-3 text-base text-gray-900 dark:text-white"
              placeholder="Search products..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Search Results */}
      {searchQuery.length === 0 ? (
        <View className="p-4">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Recent Searches
          </Text>
          {recentSearches.map((search, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center py-3 border-b border-gray-200 dark:border-gray-700"
              onPress={() => setSearchQuery(search)}
            >
              <Ionicons name="time-outline" size={20} color="#9ca3af" />
              <Text className="ml-3 flex-1 text-gray-900 dark:text-white">
                {search}
              </Text>
              <Ionicons name="arrow-up-outline" size={18} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>
      ) : isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">Searching...</Text>
        </View>
      ) : !searchResults || !searchResults.pages[0] || searchResults.pages[0].data.length === 0 ? (
        <View className="flex-1 items-center justify-center p-8">
          <Ionicons name="search-outline" size={80} color="#9ca3af" />
          <Text className="text-xl font-bold text-gray-900 dark:text-white mt-4">
            No Results Found
          </Text>
          <Text className="text-center text-gray-600 dark:text-gray-400 mt-2">
            Try searching with different keywords
          </Text>
        </View>
      ) : (
        <FlatList
          data={searchResults.pages.flatMap((page) => page.data)}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ padding: 16 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <View className="w-[48%] mb-4">
              <ProductCard product={item} onPress={() => router.push(`/product/${item.id}`)} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
