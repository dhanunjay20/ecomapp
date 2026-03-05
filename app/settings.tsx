/**
 * Settings Screen
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Card } from '@components/ui';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        {
          icon: 'notifications',
          label: 'Push Notifications',
          type: 'toggle',
          value: pushNotifications,
          onToggle: setPushNotifications,
        },
        {
          icon: 'mail',
          label: 'Email Notifications',
          type: 'toggle',
          value: emailNotifications,
          onToggle: setEmailNotifications,
        },
        {
          icon: 'moon',
          label: 'Dark Mode',
          type: 'toggle',
          value: darkMode,
          onToggle: setDarkMode,
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          icon: 'person',
          label: 'Edit Profile',
          type: 'link',
          route: '/profile/edit',
        },
        {
          icon: 'lock-closed',
          label: 'Change Password',
          type: 'link',
          route: '/profile/password',
        },
        {
          icon: 'shield-checkmark',
          label: 'Privacy & Security',
          type: 'link',
          route: '/privacy',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'help-circle',
          label: 'Help Center',
          type: 'link',
          route: '/support',
        },
        {
          icon: 'document-text',
          label: 'Terms & Conditions',
          type: 'link',
          route: '/terms',
        },
        {
          icon: 'document',
          label: 'Privacy Policy',
          type: 'link',
          route: '/privacy-policy',
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          icon: 'information-circle',
          label: 'App Version',
          type: 'text',
          value: '1.0.0',
        },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={['top']}>
      {/* Header */}
      <View className="px-4 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            Settings
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} className="mb-6">
            <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 px-1">
              {section.title}
            </Text>

            {section.items.map((item, itemIndex) => (
              <Card
                key={itemIndex}
                variant="elevated"
                className="mb-2"
                onPress={'route' in item && item.type === 'link' ? () => router.push(item.route as any) : undefined}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <Ionicons
                      name={item.icon as any}
                      size={22}
                      color="#9ca3af"
                    />
                    <Text className="ml-3 text-gray-900 dark:text-white font-medium">
                      {item.label}
                    </Text>
                  </View>

                  {item.type === 'toggle' && 'value' in item && 'onToggle' in item && (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: '#d1d5db', true: '#fda4af' }}
                      thumbColor={item.value ? '#e8496d' : '#f3f4f6'}
                    />
                  )}

                  {item.type === 'link' && (
                    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                  )}

                  {item.type === 'text' && 'value' in item && (
                    <Text className="text-gray-500">{item.value}</Text>
                  )}
                </View>
              </Card>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
