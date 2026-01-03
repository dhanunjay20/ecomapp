/**
 * Cart Summary Component
 */

import React from 'react';
import { View, Text } from 'react-native';
import type { Cart } from '@/types';
import { formatCurrency } from '@utils/helpers';
import { Card } from '@components/ui';

interface CartSummaryProps {
  cart: Cart;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ cart }) => {
  return (
    <Card variant="elevated" className="mx-4 mb-4">
      <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Price Details
      </Text>

      <View className="space-y-2">
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600 dark:text-gray-400">
            Subtotal ({cart.itemCount} items)
          </Text>
          <Text className="text-gray-900 dark:text-white font-medium">
            {formatCurrency(cart.subtotal)}
          </Text>
        </View>

        {cart.discount > 0 && (
          <View className="flex-row justify-between mb-2">
            <Text className="text-green-600 dark:text-green-400">
              Discount
            </Text>
            <Text className="text-green-600 dark:text-green-400 font-medium">
              - {formatCurrency(cart.discount)}
            </Text>
          </View>
        )}

        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600 dark:text-gray-400">
            Tax (GST 18%)
          </Text>
          <Text className="text-gray-900 dark:text-white font-medium">
            {formatCurrency(cart.tax)}
          </Text>
        </View>

        <View className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
          <View className="flex-row justify-between">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              Total
            </Text>
            <Text className="text-lg font-bold text-primary-500">
              {formatCurrency(cart.total)}
            </Text>
          </View>
        </View>
      </View>

      {cart.discount > 0 && (
        <View className="mt-4 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
          <Text className="text-sm text-green-700 dark:text-green-400 font-medium">
            You saved {formatCurrency(cart.discount)} on this order!
          </Text>
        </View>
      )}
    </Card>
  );
};
