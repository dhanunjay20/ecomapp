/**
 * Home Screen - Main Landing Page
 */

import React from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTrendingProducts, useBestSellers, useNewArrivals, useFlashDeals } from '@hooks/index';
import { ProductCardSkeleton } from '@components/ui';
import { HeroBanner } from '@features/home/components/HeroBanner';
import { CategoryList } from '@features/home/components/CategoryList';
import { ProductRow } from '@features/home/components/ProductRow';
import { SearchHeader } from '@features/home/components/SearchHeader';

export default function HomeScreen() {
  const { data: trending, isLoading: trendingLoading, refetch: refetchTrending } = useTrendingProducts();
  const { data: bestSellers, isLoading: bestSellersLoading, refetch: refetchBestSellers } = useBestSellers();
  const { data: newArrivals, isLoading: newArrivalsLoading, refetch: refetchNewArrivals } = useNewArrivals();
  const { data: flashDeals, isLoading: flashDealsLoading, refetch: refetchFlashDeals } = useFlashDeals();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      refetchTrending(),
      refetchBestSellers(),
      refetchNewArrivals(),
      refetchFlashDeals(),
    ]);
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={['top']}>
      <SearchHeader />
      
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Hero Banner */}
        <HeroBanner />

        {/* Categories */}
        <CategoryList />

        {/* Flash Deals */}
        {flashDealsLoading ? (
          <View className="px-4 mb-6">
            <ProductCardSkeleton />
          </View>
        ) : flashDeals?.data && flashDeals.data.length > 0 ? (
          <ProductRow
            title="⚡ Flash Deals"
            subtitle="Limited time offers"
            products={flashDeals.data}
          />
        ) : null}

        {/* Trending Products */}
        {trendingLoading ? (
          <View className="px-4 mb-6">
            <ProductCardSkeleton />
          </View>
        ) : trending?.data && trending.data.length > 0 ? (
          <ProductRow
            title="🔥 Trending Now"
            subtitle="Most popular items"
            products={trending.data}
          />
        ) : null}

        {/* New Arrivals */}
        {newArrivalsLoading ? (
          <View className="px-4 mb-6">
            <ProductCardSkeleton />
          </View>
        ) : newArrivals?.data && newArrivals.data.length > 0 ? (
          <ProductRow
            title="✨ New Arrivals"
            subtitle="Latest additions"
            products={newArrivals.data}
          />
        ) : null}

        {/* Best Sellers */}
        {bestSellersLoading ? (
          <View className="px-4 mb-6">
            <ProductCardSkeleton />
          </View>
        ) : bestSellers?.data && bestSellers.data.length > 0 ? (
          <ProductRow
            title="🏆 Best Sellers"
            subtitle="Customer favorites"
            products={bestSellers.data}
          />
        ) : null}

        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
