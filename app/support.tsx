/**
 * Help & Support Screen
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Card } from '@components/ui';
import { Ionicons } from '@expo/vector-icons';

export default function SupportScreen() {
  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order from the "My Orders" section in your profile. Click on any order to see detailed tracking information.',
    },
    {
      question: 'What is the return policy?',
      answer: 'We offer a 30-day return policy for most items. Items must be in original condition with tags attached.',
    },
    {
      question: 'How do I cancel my order?',
      answer: 'You can cancel your order within 24 hours of placing it from the order details page.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards, UPI, net banking, and cash on delivery.',
    },
  ];

  const contactOptions = [
    {
      icon: 'mail',
      label: 'Email Support',
      value: 'support@ecomapp.com',
      action: () => Linking.openURL('mailto:support@ecomapp.com'),
    },
    {
      icon: 'call',
      label: 'Phone Support',
      value: '+91 1800-XXX-XXXX',
      action: () => Linking.openURL('tel:+911800XXXXXXX'),
    },
    {
      icon: 'chatbubble-ellipses',
      label: 'Live Chat',
      value: 'Available 24/7',
      action: () => {},
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
            Help & Support
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Contact Options */}
        <View className="p-4">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Contact Us
          </Text>
          
          {contactOptions.map((option, index) => (
            <Card
              key={index}
              variant="elevated"
              className="mb-3"
              onPress={option.action}
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full items-center justify-center">
                  <Ionicons name={option.icon as any} size={24} color="#e8496d" />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="font-semibold text-gray-900 dark:text-white">
                    {option.label}
                  </Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {option.value}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </View>
            </Card>
          ))}
        </View>

        {/* FAQs */}
        <View className="p-4">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Frequently Asked Questions
          </Text>

          {faqs.map((faq, index) => (
            <Card key={index} variant="elevated" className="mb-3">
              <Text className="font-semibold text-gray-900 dark:text-white mb-2">
                {faq.question}
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400 leading-6">
                {faq.answer}
              </Text>
            </Card>
          ))}
        </View>

        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
