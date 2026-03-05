/**
 * Address Bottom Sheet - Manage delivery addresses
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { BottomSheet } from '@components/ui';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card } from '@components/ui';
import type { Address } from '@/types';

interface AddressBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectAddress: (address: Address) => void;
  addresses?: Address[];
  selectedAddress?: Address;
}

export const AddressBottomSheet: React.FC<AddressBottomSheetProps> = ({
  isVisible,
  onClose,
  onSelectAddress,
  addresses = [],
  selectedAddress,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredAddresses = addresses.filter(
    (addr) =>
      addr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addr.addressLine1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addr.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addr.pincode.includes(searchQuery)
  );

  const handleSelectAddress = (address: Address) => {
    onSelectAddress(address);
    onClose();
  };

  const handleUseCurrentLocation = () => {
    Alert.alert(
      'Location Access',
      'Allow EcomApp to access your location?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Allow',
          onPress: () => {
            // Here you would implement actual location services
            Alert.alert('Success', 'Location detected successfully');
          },
        },
      ]
    );
  };

  return (
    <BottomSheet visible={isVisible} onClose={onClose} height={0.85}>
      <View className="flex-1">
        {/* Header */}
        <View className="px-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              Select Delivery Location
            </Text>
            <TouchableOpacity onPress={onClose} className="p-2">
              <Ionicons name="close" size={24} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 flex-row items-center">
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              className="flex-1 ml-3 text-base text-gray-900 dark:text-white"
              placeholder="Search saved addresses or pincode..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>

          {/* Current Location Button */}
          <TouchableOpacity
            className="bg-primary-50 dark:bg-primary-900/30 rounded-xl px-4 py-3 flex-row items-center mt-3"
            onPress={handleUseCurrentLocation}
          >
            <View className="bg-primary-500 w-10 h-10 rounded-full items-center justify-center">
              <Ionicons name="navigate" size={20} color="#ffffff" />
            </View>
            <View className="flex-1 ml-3">
              <Text className="text-base font-semibold text-primary-500">
                Use Current Location
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Enable location services for accurate delivery
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#e8496d" />
          </TouchableOpacity>
        </View>

        {/* Address List */}
        <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
          {/* Saved Addresses Header */}
          {addresses.length > 0 && (
            <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
              SAVED ADDRESSES ({filteredAddresses.length})
            </Text>
          )}

          {/* Address Cards */}
          {filteredAddresses.map((address) => (
            <Card
              key={address.id}
              variant="outlined"
              className={`mb-3 ${
                selectedAddress?.id === address.id
                  ? 'border-primary-500 border-2'
                  : ''
              }`}
              onPress={() => handleSelectAddress(address)}
            >
              <View className="flex-row items-start">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <View
                      className={`px-2 py-1 rounded ${
                        address.type === 'home'
                          ? 'bg-green-100 dark:bg-green-900/30'
                          : address.type === 'work'
                          ? 'bg-blue-100 dark:bg-blue-900/30'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      <Text
                        className={`text-xs font-semibold ${
                          address.type === 'home'
                            ? 'text-green-700 dark:text-green-400'
                            : address.type === 'work'
                            ? 'text-blue-700 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {address.type.toUpperCase()}
                      </Text>
                    </View>
                    {address.isDefault && (
                      <View className="bg-primary-100 dark:bg-primary-900/30 px-2 py-1 rounded ml-2">
                        <Text className="text-xs font-semibold text-primary-500">
                          DEFAULT
                        </Text>
                      </View>
                    )}
                  </View>

                  <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                    {address.name}
                  </Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {address.addressLine1}
                    {address.addressLine2 ? `, ${address.addressLine2}` : ''}
                  </Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400">
                    {address.city}, {address.state} - {address.pincode}
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {address.phone}
                  </Text>
                </View>

                {selectedAddress?.id === address.id && (
                  <View className="bg-primary-500 w-6 h-6 rounded-full items-center justify-center ml-2">
                    <Ionicons name="checkmark" size={16} color="#ffffff" />
                  </View>
                )}
              </View>
            </Card>
          ))}

          {/* Empty State */}
          {addresses.length === 0 && (
            <View className="items-center justify-center py-12">
              <View className="bg-gray-100 dark:bg-gray-800 w-20 h-20 rounded-full items-center justify-center mb-4">
                <Ionicons name="location-outline" size={40} color="#9ca3af" />
              </View>
              <Text className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                No Saved Addresses
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400 text-center px-8">
                Add your first address to get started with faster checkout
              </Text>
            </View>
          )}

          {/* Add New Address Button */}
          <Button
            title="+ Add New Address"
            variant="outline"
            onPress={() => {
              onClose();
              // Navigate to add address screen
              Alert.alert('Add Address', 'This will navigate to add address form');
            }}
            className="mb-4"
            fullWidth
          />

          <View className="h-6" />
        </ScrollView>
      </View>
    </BottomSheet>
  );
};
