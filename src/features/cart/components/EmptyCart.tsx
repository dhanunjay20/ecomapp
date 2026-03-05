/**
 * Empty Cart Component
 */

import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Button } from '@components/ui';
import { Ionicons } from '@expo/vector-icons';

export const EmptyCart: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={['top']}>
      <View className="flex-1 items-center justify-center px-8">
        {/* Cart Icon */}
        <View className="bg-gray-100 dark:bg-gray-800 w-40 h-40 rounded-full items-center justify-center mb-8">
          <Ionicons name="cart-outline" size={80} color="#9ca3af" />
        </View>
        
        {/* Title */}
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
          Your Cart is Empty
        </Text>
        
        {/* Description */}
        <Text className="text-center text-gray-600 dark:text-gray-400 text-base leading-6 mb-10 max-w-sm">
          Looks like you haven't added anything to your cart yet
        </Text>

        {/* Start Shopping Button */}
        <Button
          title="Start Shopping"
          onPress={() => router.push('/(tabs)')}
          leftIcon={<Ionicons name="arrow-back" size={20} color="#ffffff" />}
          className="px-8 py-4"
        />

        {/* Features */}
        <View className="mt-16 w-full">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
            Why Shop With Us?
          </Text>
          <View className="space-y-4">
            {[
              { icon: 'shield-checkmark', text: 'Secure payments' },
              { icon: 'car', text: 'Fast delivery' },
              { icon: 'repeat', text: 'Easy returns' },
            ].map((feature, index) => (
              <View key={index} className="flex-row items-center justify-center">
                <View className="bg-primary-100 dark:bg-primary-900/30 w-10 h-10 rounded-full items-center justify-center mr-3">
                  <Ionicons name={feature.icon as any} size={20} color="#e8496d" />
                </View>
                <Text className="text-gray-600 dark:text-gray-400 text-base">
                  {feature.text}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
