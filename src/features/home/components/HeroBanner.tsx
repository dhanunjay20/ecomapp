/**
 * Hero Banner Carousel Component
 */

import React, { useRef, useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, Image } from 'react-native';
import { useInterval } from '@hooks/useCommon';

const { width } = Dimensions.get('window');

const BANNERS = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop',
    title: 'Summer Sale',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
    title: 'New Arrivals',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=400&fit=crop',
    title: 'Festive Collection',
  },
];

export const HeroBanner: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useInterval(() => {
    const nextIndex = (currentIndex + 1) % BANNERS.length;
    scrollViewRef.current?.scrollTo({
      x: nextIndex * width,
      animated: true,
    });
    setCurrentIndex(nextIndex);
  }, 3000);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  return (
    <View className="mb-6">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {BANNERS.map((banner) => (
          <View key={banner.id} style={{ width }}>
            <Image
              source={{ uri: banner.image }}
              className="w-full h-48"
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View className="flex-row justify-center mt-3">
        {BANNERS.map((_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full mx-1 ${
              index === currentIndex
                ? 'w-6 bg-primary-500'
                : 'w-2 bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </View>
    </View>
  );
};
