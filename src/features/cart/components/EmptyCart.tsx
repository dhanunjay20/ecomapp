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
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-1 items-center justify-center px-6">
        <Ionicons name="cart-outline" size={100} color="#9ca3af" />
        
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-2">
          Your Cart is Empty
        </Text>
        
        <Text className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Looks like you haven't added anything to your cart yet
        </Text>

        <Button
          title="Start Shopping"
          onPress={() => router.push('/(tabs)')}
          leftIcon={<Ionicons name="arrow-back" size={20} color="#ffffff" />}
        />
      </View>
    </SafeAreaView>
  );
};
