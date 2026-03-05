/**
 * Address Selector Component - Display and select delivery address
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface AddressSelectorProps {
  selectedAddress?: any;
  onAddressPress: () => void;
}

export const AddressSelector: React.FC<AddressSelectorProps> = ({
  selectedAddress,
  onAddressPress,
}) => {
  // Default address if none selected
  const displayAddress = selectedAddress || {
    name: 'Select delivery location',
    addressLine1: 'Add your address for fast delivery',
    pincode: '',
  };

  const isDefaultMessage = !selectedAddress;

  return (
    <TouchableOpacity
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3"
      onPress={onAddressPress}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        <View className="bg-primary-50 dark:bg-primary-900/30 w-10 h-10 rounded-full items-center justify-center mr-3">
          <Ionicons name="location" size={20} color="#e8496d" />
        </View>
        
        <View className="flex-1">
          <View className="flex-row items-center">
            <Text 
              className={`text-sm font-semibold ${
                isDefaultMessage 
                  ? 'text-gray-500 dark:text-gray-400' 
                  : 'text-gray-900 dark:text-white'
              }`}
              numberOfLines={1}
            >
              {isDefaultMessage ? 'Deliver to' : `Deliver to ${displayAddress.name}`}
            </Text>
            {!isDefaultMessage && displayAddress.pincode && (
              <View className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded ml-2">
                <Text className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  {displayAddress.pincode}
                </Text>
              </View>
            )}
          </View>
          
          <Text 
            className="text-xs text-gray-500 dark:text-gray-400 mt-0.5" 
            numberOfLines={1}
          >
            {displayAddress.addressLine1}
          </Text>
        </View>

        <Ionicons 
          name="chevron-down" 
          size={20} 
          color={isDefaultMessage ? '#9ca3af' : '#e8496d'} 
        />
      </View>

      {isDefaultMessage && (
        <View className="mt-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg flex-row items-center">
          <Ionicons name="information-circle" size={16} color="#3b82f6" />
          <Text className="text-xs text-blue-700 dark:text-blue-400 ml-2 flex-1">
            Tap to add your delivery location for accurate delivery estimates
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
