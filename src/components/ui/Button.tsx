/**
 * Button Component with Tailwind Styling
 */

import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import type { TouchableOpacityProps } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  icon,
  fullWidth = false,
  disabled,
  className,
  ...props
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 300,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
  };

  // Icon-only button support
  const isIconOnly = !!icon;

  const variantClasses = {
    primary: 'bg-primary-500 active:bg-primary-600',
    secondary: 'bg-secondary-500 active:bg-secondary-600',
    outline: 'bg-transparent border-2 border-primary-500 active:bg-primary-50',
    ghost: 'bg-transparent active:bg-gray-100',
  };

  const sizeClasses = {
    sm: isIconOnly ? 'w-10 h-10' : 'px-4 py-2',
    md: isIconOnly ? 'w-12 h-12' : 'px-6 py-3',
    lg: isIconOnly ? 'w-14 h-14' : 'px-8 py-4',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const textColorClasses = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-primary-500',
    ghost: 'text-primary-500',
  };

  const baseClasses = 'rounded-xl flex-row items-center justify-center';
  const disabledClasses = 'opacity-50';
  const widthClasses = fullWidth && !isIconOnly ? 'w-full' : '';

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || isLoading}
      {...props}
    >
      <Animated.View
        style={animatedStyle}
        className={`
          ${baseClasses}
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${widthClasses}
          ${disabled || isLoading ? disabledClasses : ''}
          ${className}
        `}
      >
        {isLoading ? (
          <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#e8496d' : '#ffffff'} />
        ) : (
          <>
            {/* Icon-only mode */}
            {isIconOnly && icon}

            {/* Normal mode with optional left icon */}
            {!isIconOnly && leftIcon && <View className="mr-2">{leftIcon}</View>}
            {!isIconOnly && (
              <Text className={`font-semibold ${textSizeClasses[size]} ${textColorClasses[variant]}`}>
                {title}
              </Text>
            )}
            {!isIconOnly && rightIcon && <View className="ml-2">{rightIcon}</View>}
          </>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};
