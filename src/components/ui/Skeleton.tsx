/**
 * Loading Skeleton Component
 */

import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 8,
  className,
}) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height: height as any,
          borderRadius,
        },
        animatedStyle,
      ]}
      className={`bg-gray-300 dark:bg-gray-700 ${className}`}
    />
  );
};

// Skeleton Variants
export const ProductCardSkeleton: React.FC = () => (
  <View className="bg-white dark:bg-gray-800 rounded-xl p-3 mb-4">
    <Skeleton width="100%" height={200} borderRadius={12} className="mb-3" />
    <Skeleton width="70%" height={16} className="mb-2" />
    <Skeleton width="50%" height={14} className="mb-3" />
    <View className="flex-row items-center justify-between">
      <Skeleton width={80} height={20} />
      <Skeleton width={60} height={32} borderRadius={8} />
    </View>
  </View>
);

export const ListItemSkeleton: React.FC = () => (
  <View className="flex-row items-center bg-white dark:bg-gray-800 rounded-xl p-4 mb-3">
    <Skeleton width={80} height={80} borderRadius={12} className="mr-4" />
    <View className="flex-1">
      <Skeleton width="80%" height={16} className="mb-2" />
      <Skeleton width="60%" height={14} className="mb-2" />
      <Skeleton width="40%" height={12} />
    </View>
  </View>
);
