/**
 * Cart Screen
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useCartStore } from '@store/index';
import { Button } from '@components/ui';
import { CartItem } from '@features/cart/components/CartItem';
import { CartSummary } from '@features/cart/components/CartSummary';
import { EmptyCart } from '@features/cart/components/EmptyCart';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
  const { cart, removeItem, updateQuantity } = useCartStore();

  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={['top']}>
      {/* Header */}
      <View className="px-4 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            My Cart ({cart.itemCount})
          </Text>
          <TouchableOpacity>
            <Ionicons name="trash-outline" size={24} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4">
          {cart.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => removeItem(item.id)}
              onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
            />
          ))}
        </View>

        {/* Cart Summary */}
        <CartSummary cart={cart} />
      </ScrollView>

      {/* Checkout Button */}
      <View className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <Button
          title={`Proceed to Checkout • ${cart.total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}`}
          onPress={() => router.push('/checkout/address')}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}
