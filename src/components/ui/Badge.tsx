/**
 * Badge Component
 */

import React from 'react';
import { View, Text } from 'react-native';

interface BadgeProps {
  text: string | number;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'primary',
  size = 'md',
  className,
}) => {
  const variantClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    info: 'bg-info',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5',
    md: 'px-3 py-1',
    lg: 'px-4 py-1.5',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <View
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        rounded-full
        ${className}
      `}
    >
      <Text className={`${textSizeClasses[size]} font-medium text-white`}>
        {text}
      </Text>
    </View>
  );
};
