/**
 * Notifications Screen
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Card } from '@components/ui';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen() {
  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #1234 has been delivered successfully',
      time: '2 hours ago',
      read: false,
      icon: 'checkmark-circle',
      color: '#10b981',
    },
    {
      id: 2,
      type: 'offer',
      title: 'New Offer Available',
      message: 'Get 50% off on all electronics. Limited time offer!',
      time: '5 hours ago',
      read: false,
      icon: 'pricetag',
      color: '#e8496d',
    },
    {
      id: 3,
      type: 'shipment',
      title: 'Order Shipped',
      message: 'Your order #1233 has been shipped and is on the way',
      time: '1 day ago',
      read: true,
      icon: 'cube',
      color: '#3b82f6',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={['top']}>
      {/* Header */}
      <View className="px-4 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              Notifications
            </Text>
          </View>
          <TouchableOpacity>
            <Text className="text-primary-500 font-semibold">Mark All Read</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons name="notifications-off-outline" size={80} color="#9ca3af" />
            <Text className="text-xl font-bold text-gray-900 dark:text-white mt-4">
              No Notifications
            </Text>
            <Text className="text-gray-600 dark:text-gray-400 mt-2">
              You're all caught up!
            </Text>
          </View>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              variant="elevated"
              className={`mb-3 ${!notification.read ? 'border-l-4 border-primary-500' : ''}`}
              onPress={() => {}}
            >
              <View className="flex-row items-start">
                <View
                  className="w-12 h-12 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: notification.color + '20' }}
                >
                  <Ionicons
                    name={notification.icon as any}
                    size={24}
                    color={notification.color}
                  />
                </View>

                <View className="flex-1">
                  <Text className="font-semibold text-gray-900 dark:text-white mb-1">
                    {notification.title}
                  </Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {notification.message}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {notification.time}
                  </Text>
                </View>

                {!notification.read && (
                  <View className="w-2 h-2 bg-primary-500 rounded-full mt-2" />
                )}
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
