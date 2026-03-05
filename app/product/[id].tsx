/**
 * Product Detail Screen - Complete Redesign
 */

import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useCartStore, useWishlistStore } from '../../src/store/index';
import { Button, Badge } from '../../src/components/ui';
import { ProductRow } from '../../src/features/home/components/ProductRow';
import { MOCK_PRODUCTS } from '../../src/data/mockProducts';
import { hapticFeedback } from '../../src/utils/helpers';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Bank offers data
const BANK_OFFERS = [
  { id: 1, bank: 'HDFC', offer: '10% instant discount on HDFC Credit Cards', icon: 'card' },
  { id: 2, bank: 'SBI', offer: '5% cashback on SBI Debit Cards', icon: 'cash' },
  { id: 3, bank: 'ICICI', offer: 'No Cost EMI on ICICI Bank Cards', icon: 'time' },
];

// Mock sizes and colors for all products
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Red', hex: '#EF4444' },
  { name: 'Green', hex: '#10B981' },
];

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Find product from MOCK_PRODUCTS
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  
  const addToCart = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isButtonsSticky, setIsButtonsSticky] = useState(false);

  const inWishlist = product ? isInWishlist(product.id) : false;

  const handleToggleWishlist = () => {
    if (!product) return;
    if (inWishlist) hapticFeedback.light();
    else hapticFeedback.success();
    toggleWishlist(product);
  };

  const handleAddToBag = () => {
    if (!product) return;

    if (!selectedSize) {
      Alert.alert('Select size', 'Please select a size');
      return;
    }
    if (!selectedColor) {
      Alert.alert('Select color', 'Please select a color');
      return;
    }

    hapticFeedback.medium();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      quantity,
    });
    Alert.alert('Added', 'Added to bag!');
  };

  const handleBuyNow = () => {
    if (!product) return;

    if (!selectedSize) {
      Alert.alert('Select size', 'Please select a size');
      return;
    }
    if (!selectedColor) {
      Alert.alert('Select color', 'Please select a color');
      return;
    }

    hapticFeedback.medium();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      quantity,
    });
    router.push('/(tabs)/cart');
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // Make buttons sticky after scrolling past size selector (approximately 600px)
    setIsButtonsSticky(offsetY > 600);
  };

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-500">Product not found</Text>
      </SafeAreaView>
    );
  }

  // Compute similar products (simple mock)
  const similarProducts = MOCK_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id);
  const productData = product; // keep naming used below

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={['top']}>
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.push('/search')} className="mr-3">
            <Ionicons name="search" size={24} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/cart')}>
            <Ionicons name="cart-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Product Images Carousel */}
        <View className="relative">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x;
              const index = Math.round(x / width);
              setSelectedImage(index);
            }}
            scrollEventThrottle={16}
          >
            {productData.images.map((img, idx) => (
              <Image
                key={idx}
                source={{ uri: img }}
                style={{ width, height: width }} // Aspect ratio 1:1
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          {/* Pagination Dots */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center items-center gap-2">
            {productData.images.map((_, idx) => (
              <View
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  selectedImage === idx ? 'bg-primary-500 w-6' : 'bg-gray-300/80 w-2'
                }`}
              />
            ))}
          </View>
          
          {/* Wishlist Button */}
          <TouchableOpacity
            onPress={handleToggleWishlist}
            className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg"
          >
            <Ionicons
              name={inWishlist ? 'heart' : 'heart-outline'}
              size={24}
              color="#e8496d"
            />
          </TouchableOpacity>

          {/* Image Thumbnails */}
          {productData.images.length > 1 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="px-4 py-3"
            >
              {productData.images.map((image: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-lg mr-2 overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary-500' : 'border-gray-200'
                  }`}
                >
                  <Image source={{ uri: image }} className="w-full h-full" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Product Info */}
        <View className="px-4 py-4">
          {/* Name & Rating */}
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {productData.name}
          </Text>
          
          <View className="flex-row items-center mb-4">
            <View className="flex-row items-center bg-green-100 px-2 py-1 rounded">
              <Ionicons name="star" size={14} color="#10b981" />
              <Text className="ml-1 text-sm font-semibold text-green-700">
                {productData.rating.toFixed(1)}
              </Text>
            </View>
            <Text className="ml-2 text-sm text-gray-600">
              ({productData.reviewCount} reviews)
            </Text>
          </View>

          {/* Price */}
          <View className="flex-row items-center mb-4">
            <Text className="text-3xl font-bold text-gray-900 dark:text-white">
              ₹{productData.price.toLocaleString()}
            </Text>
            {productData.originalPrice && (
              <>
                <Text className="ml-3 text-lg text-gray-500 line-through">
                  ₹{productData.originalPrice.toLocaleString()}
                </Text>
                <Badge 
                  variant="success" 
                  className="ml-2"
                  text={`${Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)}% OFF`}
                />
              </>
            )}
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Description
            </Text>
            <Text className="text-gray-600 dark:text-gray-400 leading-6">
              {productData.description}
            </Text>
          </View>

          {/* Size Selector */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Select Size
            </Text>
            <View className="flex-row flex-wrap">
              {SIZES.map((size) => (
                <TouchableOpacity
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  className={`px-4 py-2 mr-2 mb-2 rounded-lg border-2 ${
                    selectedSize === size
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      selectedSize === size ? 'text-primary-500' : 'text-gray-700'
                    }`}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Color Selector */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Select Color
            </Text>
            <View className="flex-row flex-wrap">
              {COLORS.map((color) => (
                <TouchableOpacity
                  key={color.name}
                  onPress={() => setSelectedColor(color.name)}
                  className={`mr-3 mb-3 items-center`}
                >
                  <View
                    className={`w-12 h-12 rounded-full border-4 ${
                      selectedColor === color.name ? 'border-primary-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <Text className="text-xs text-gray-600 mt-1">{color.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity Selector */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Quantity
            </Text>
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg items-center justify-center"
              >
                <Ionicons name="remove" size={24} color="#374151" />
              </TouchableOpacity>
              <Text className="mx-8 text-xl font-semibold text-gray-900 dark:text-white min-w-[40px] text-center">
                {quantity}
              </Text>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg items-center justify-center"
              >
                <Ionicons name="add" size={24} color="#374151" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Similar Products */}
        {similarProducts && similarProducts.length > 0 && (
          <ProductRow
            title="Similar Products"
            subtitle="You might also like"
            products={similarProducts}
          />
        )}

        <View className="h-32" />
      </ScrollView>

      {/* Bottom Action Buttons with SafeAreaView */}
      <View className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 shadow-2xl pt-2">
        <View className="px-4 py-3 flex-row items-center gap-3">
          <View className="flex-1">
            <Button
              title="Add to Cart"
              variant="outline"
              onPress={handleAddToBag}
              size="lg"
              fullWidth
              icon={<Ionicons name="bag-outline" size={20} color="#e8496d" style={{ marginRight: 8 }} />}
            />
          </View>
          <View className="flex-1">
            <Button
              title="Buy Now"
              variant="primary"
              onPress={handleBuyNow}
              size="lg"
              fullWidth
              icon={<Ionicons name="flash-outline" size={20} color="white" style={{ marginRight: 8 }} />}
            />
          </View>
        </View>
        <View style={{ paddingBottom: insets.bottom || 0 }} />
      </View>
    </SafeAreaView>
  );
}
