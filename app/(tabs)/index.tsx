/**
 * Home Screen - Main Landing Page
 */

import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, RefreshControl, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTrendingProducts, useBestSellers, useNewArrivals, useFlashDeals } from '@hooks/index';
import { ProductCardSkeleton } from '@components/ui';
import { HeroBanner } from '@features/home/components/HeroBanner';
import { CategoryList } from '@features/home/components/CategoryList';
import { ProductRow } from '@features/home/components/ProductRow';
import { SearchHeader } from '@features/home/components/SearchHeader';
import { AddressSelector } from '@features/home/components/AddressSelector';
import { AddressBottomSheet } from '@features/home/components/AddressBottomSheet';
import type { Address } from '@/types';

// Mock addresses for demonstration
const MOCK_ADDRESSES: Address[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+91 9876543210',
    addressLine1: '123, Main Street, Apartment 4B',
    addressLine2: 'Near City Mall',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    country: 'India',
    isDefault: true,
    type: 'home',
  },
  {
    id: '2',
    name: 'John Doe',
    phone: '+91 9876543210',
    addressLine1: '456, Tech Park, Floor 5',
    addressLine2: 'Sector 18',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122001',
    country: 'India',
    isDefault: false,
    type: 'work',
  },
];

export default function HomeScreen() {
  const { data: trending, isLoading: trendingLoading, refetch: refetchTrending } = useTrendingProducts();
  const { data: bestSellers, isLoading: bestSellersLoading, refetch: refetchBestSellers } = useBestSellers();
  const { data: newArrivals, isLoading: newArrivalsLoading, refetch: refetchNewArrivals } = useNewArrivals();
  const { data: flashDeals, isLoading: flashDealsLoading, refetch: refetchFlashDeals } = useFlashDeals();

  const [refreshing, setRefreshing] = React.useState(false);
  const scrollOffsetY = useRef(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [showAddressSheet, setShowAddressSheet] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(
    MOCK_ADDRESSES.find((addr) => addr.isDefault)
  );

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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const scrollDirection = currentOffset > scrollOffsetY.current ? 'down' : 'up';
    
    if (scrollDirection === 'down' && currentOffset > 100) {
      setIsScrollingDown(true);
    } else if (scrollDirection === 'up') {
      setIsScrollingDown(false);
    }
    
    scrollOffsetY.current = currentOffset;
  };

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={['top']}>
      {/* Address Selector */}
      <AddressSelector
        selectedAddress={selectedAddress}
        onAddressPress={() => setShowAddressSheet(true)}
      />
      
      <SearchHeader />
      
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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

      {/* Address Bottom Sheet */}
      <AddressBottomSheet
        isVisible={showAddressSheet}
        onClose={() => setShowAddressSheet(false)}
        onSelectAddress={handleSelectAddress}
        addresses={MOCK_ADDRESSES}
        selectedAddress={selectedAddress}
      />
    </SafeAreaView>
  );
}
