/**
 * Input Component with Tailwind Styling
 */

import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import type { TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  helperText,
  containerClassName,
  secureTextEntry,
  className,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View className={`${containerClassName}`}>
      {label && (
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </Text>
      )}
      
      <View
        className={`
          flex-row items-center
          bg-white dark:bg-gray-800
          border rounded-xl px-4
          ${error ? 'border-error' : isFocused ? 'border-primary-500' : 'border-gray-300 dark:border-gray-600'}
        `}
      >
        {leftIcon && (
          <View className="mr-3">
            {leftIcon}
          </View>
        )}
        
        <TextInput
          className={`
            flex-1 py-3
            text-base text-gray-900 dark:text-white
            ${className}
          `}
          placeholderTextColor="#9ca3af"
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} className="ml-3">
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#9ca3af"
            />
          </TouchableOpacity>
        )}
        
        {rightIcon && !secureTextEntry && (
          <View className="ml-3">
            {rightIcon}
          </View>
        )}
      </View>
      
      {error && (
        <Text className="text-sm text-error mt-1">
          {error}
        </Text>
      )}
      
      {helperText && !error && (
        <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {helperText}
        </Text>
      )}
    </View>
  );
};
