/**
 * Orders Screen - View all orders
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Card, Badge } from '@components/ui';
import { Ionicons } from '@expo/vector-icons';
import { useOrders } from '@hooks/index';

export default function OrdersScreen() {
  const { data: orders, isLoading } = useOrders();

  const ordersData = orders?.pages?.flatMap(page => page.data) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'processing':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'info';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={['top']}>
      {/* Header */}
      <View className="px-4 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            My Orders
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View className="items-center justify-center py-20">
            <Text className="text-gray-500">Loading orders...</Text>
          </View>
        ) : ordersData.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons name="receipt-outline" size={80} color="#9ca3af" />
            <Text className="text-xl font-bold text-gray-900 dark:text-white mt-4">
              No Orders Yet
            </Text>
            <Text className="text-gray-600 dark:text-gray-400 mt-2 text-center px-8">
              Start shopping to see your orders here
            </Text>
            <TouchableOpacity
              className="bg-primary-500 px-6 py-3 rounded-xl mt-6"
              onPress={() => router.push('/(tabs)')}
            >
              <Text className="text-white font-semibold">
                Start Shopping
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          ordersData.map((order: any) => (
            <Card
              key={order.id}
              variant="elevated"
              className="mb-4"
              onPress={() => router.push('/orders' as any)}
            >
              <View className="flex-row justify-between items-start mb-3">
                <View>
                  <Text className="text-sm font-semibold text-gray-900 dark:text-white">
                    Order #{order.orderNumber}
                  </Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <Badge variant={getStatusColor(order.status)} text={order.status} />
              </View>

              <View className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <View className="flex-row items-center">
                  {order.items.slice(0, 3).map((item: any, index: number) => (
                    <Image
                      key={index}
                      source={{ uri: item.product.image }}
                      className="w-12 h-12 rounded-lg mr-2"
                    />
                  ))}
                  {order.items.length > 3 && (
                    <View className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 items-center justify-center">
                      <Text className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                        +{order.items.length - 3}
                      </Text>
                    </View>
                  )}
                </View>

                <View className="flex-row justify-between items-center mt-3">
                  <Text className="text-sm text-gray-600 dark:text-gray-400">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </Text>
                  <Text className="text-lg font-bold text-gray-900 dark:text-white">
                    ₹{order.total.toLocaleString()}
                  </Text>
                </View>
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
