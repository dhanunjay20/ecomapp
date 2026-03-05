/**
 * Cart Screen
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useCartStore } from '@store/index';
import { Button, Card } from '@components/ui';
import { CartItem } from '@features/cart/components/CartItem';
import { CartSummary } from '@features/cart/components/CartSummary';
import { EmptyCart } from '@features/cart/components/EmptyCart';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
  const { cart, removeItem, updateQuantity, clearCart } = useCartStore();

  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }

  const handleClearCart = () => {
    if (clearCart) {
      clearCart();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={['top']}>
      {/* Modern Header */}
      <View className="bg-white dark:bg-gray-800 shadow-sm">
        <View className="px-4 py-4">
          <View className="flex-row items-center justify-between mb-2">
            <View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                Shopping Cart
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'} in your cart
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleClearCart}
              className="bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg flex-row items-center"
            >
              <Ionicons name="trash-outline" size={18} color="#ef4444" />
              <Text className="text-red-500 font-medium ml-2">Clear</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery Info Banner */}
        <View className="bg-green-50 dark:bg-green-900/20 px-4 py-3 flex-row items-center">
          <Ionicons name="checkmark-circle" size={20} color="#10b981" />
          <Text className="text-green-700 dark:text-green-400 text-sm ml-2 flex-1">
            Eligible for FREE delivery on orders above ₹499
          </Text>
        </View>
      </View>

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Cart Items */}
        <View className="px-4 pt-4">
          <Text className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Your Items
          </Text>
          {cart.items.map((item, index) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => removeItem(item.id)}
              onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
            />
          ))}
        </View>

        {/* Coupon Section */}
        <View className="px-4 mt-4">
          <Card variant="outlined" className="p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View className="bg-primary-100 dark:bg-primary-900/30 w-10 h-10 rounded-lg items-center justify-center mr-3">
                  <Ionicons name="pricetag" size={20} color="#e8496d" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900 dark:text-white">
                    Apply Coupon
                  </Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Save more with coupons
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text className="text-primary-500 font-semibold">Apply</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        {/* Recommended Products */}
        <View className="px-4 mt-6">
          <Text className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
            You may also like
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {[1, 2, 3].map((item) => (
              <Card key={item} variant="elevated" className="w-32 p-0">
                <TouchableOpacity>
                  <View className="bg-gray-200 dark:bg-gray-700 h-32 rounded-t-xl" />
                  <View className="p-2">
                    <Text 
                      className="text-xs font-medium text-gray-900 dark:text-white" 
                      numberOfLines={2}
                    >
                      Recommended Product
                    </Text>
                    <Text className="text-xs text-primary-500 font-bold mt-1">
                      ₹999
                    </Text>
                  </View>
                </TouchableOpacity>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* Cart Summary */}
        <View className="mt-6">
          <CartSummary cart={cart} />
        </View>

        {/* Trust Badges */}
        <View className="px-4 mt-4">
          <View className="flex-row justify-around py-4 bg-white dark:bg-gray-800 rounded-xl">
            <View className="items-center flex-1">
              <Ionicons name="shield-checkmark" size={24} color="#10b981" />
              <Text className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center">
                Secure Payment
              </Text>
            </View>
            <View className="items-center flex-1">
              <Ionicons name="refresh" size={24} color="#3b82f6" />
              <Text className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center">
                Easy Returns
              </Text>
            </View>
            <View className="items-center flex-1">
              <Ionicons name="car" size={24} color="#f59e0b" />
              <Text className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center">
                Fast Delivery
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button - Fixed at bottom */}
      <View className="bg-white dark:bg-gray-800 shadow-2xl border-t-2 border-gray-200 dark:border-gray-700">
        <View className="px-4 py-4">
          {/* Price Preview */}
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-1">
              <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Total Amount
              </Text>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{cart.total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)' as any)}
              className="flex-1 bg-primary-500 py-4 rounded-xl items-center justify-center ml-4"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <Text className="text-white font-bold text-base mr-2">
                  Checkout
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#ffffff" />
              </View>
            </TouchableOpacity>
          </View>
          
          {/* Savings Info */}
          {cart.discount > 0 && (
            <View className="bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-lg">
              <Text className="text-xs text-green-700 dark:text-green-400 text-center font-semibold">
                🎉 You're saving ₹{cart.discount.toFixed(2)} on this order
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
