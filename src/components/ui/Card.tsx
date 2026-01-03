/**
 * Card Component with Tailwind Styling
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import type { ViewProps, TouchableOpacityProps } from 'react-native';

interface CardProps extends ViewProps {
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  variant = 'default',
  padding = 'md',
  className,
  ...props
}) => {
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800',
    elevated: 'bg-white dark:bg-gray-800 shadow-md',
    outlined: 'bg-transparent border border-gray-200 dark:border-gray-700',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  };

  const baseClasses = 'rounded-xl';

  if (onPress) {
    return (
      <TouchableOpacity
        className={`
          ${baseClasses}
          ${variantClasses[variant]}
          ${paddingClasses[padding]}
          ${className}
        `}
        onPress={onPress}
        activeOpacity={0.7}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </View>
  );
};
