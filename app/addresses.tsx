/**
 * Addresses Screen - Manage delivery addresses
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Card, Button } from '@components/ui';
import { Ionicons } from '@expo/vector-icons';
import { useAddresses } from '@hooks/index';

export default function AddressesScreen() {
  const { data: addresses, isLoading } = useAddresses();

  const addressData = addresses?.data || [];

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
              Saved Addresses
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/settings' as any)}>
            <Ionicons name="add-circle" size={28} color="#e8496d" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View className="items-center justify-center py-20">
            <Text className="text-gray-500">Loading addresses...</Text>
          </View>
        ) : addressData.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons name="location-outline" size={80} color="#9ca3af" />
            <Text className="text-xl font-bold text-gray-900 dark:text-white mt-4">
              No Saved Addresses
            </Text>
            <Text className="text-gray-600 dark:text-gray-400 mt-2 text-center px-8">
              Add a delivery address for faster checkout
            </Text>
            <Button
              title="Add Address"
              onPress={() => router.push('/settings' as any)}
              className="mt-6"
            />
          </View>
        ) : (
          addressData.map((address: any) => (
            <Card
              key={address.id}
              variant="elevated"
              className="mb-4"
              onPress={() => router.push('/settings' as any)}
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <Ionicons
                      name={address.type === 'home' ? 'home' : 'briefcase'}
                      size={18}
                      color="#e8496d"
                    />
                    <Text className="ml-2 font-semibold text-gray-900 dark:text-white capitalize">
                      {address.type}
                    </Text>
                    {address.isDefault && (
                      <View className="ml-2 bg-primary-100 px-2 py-1 rounded">
                        <Text className="text-xs font-semibold text-primary-500">
                          Default
                        </Text>
                      </View>
                    )}
                  </View>
                  
                  <Text className="text-gray-900 dark:text-white font-medium">
                    {address.name}
                  </Text>
                  <Text className="text-gray-600 dark:text-gray-400 mt-1">
                    {address.street}, {address.city}
                  </Text>
                  <Text className="text-gray-600 dark:text-gray-400">
                    {address.state} - {address.pincode}
                  </Text>
                  {address.phone && (
                    <Text className="text-gray-600 dark:text-gray-400 mt-1">
                      Phone: {address.phone}
                    </Text>
                  )}
                </View>

                <TouchableOpacity onPress={() => router.push('/settings' as any)}>
                  <Ionicons name="create-outline" size={22} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
