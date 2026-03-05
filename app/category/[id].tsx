import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../../src/constants';
import { MOCK_PRODUCTS } from '../../src/data/mockProducts';
import { ProductCard } from '../../src/features/product/components/ProductCard';

type SortOption = 'recommended' | 'price-low' | 'price-high' | 'rating' | 'newest';

export default function CategoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const category = useMemo(() => CATEGORIES.find(c => c.id === id), [id]);

  const categoryMap: Record<string, string> = {
    men: 'Men',
    women: 'Women',
    kids: 'Kids',
    jewellery: 'Jewellery',
    accessories: 'Accessories',
  };

  const availableBrands = useMemo(() => {
    return Array.from(new Set(MOCK_PRODUCTS.map(p => p.brand)));
  }, []);

  const products = useMemo(() => {
    const categoryName = id ? (categoryMap[id] ?? category?.name ?? '') : category?.name ?? '';
    if (!categoryName) return [];

    let filtered = MOCK_PRODUCTS.filter(p => p.category === categoryName);

    // price
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // brand
    if (selectedBrands.length) filtered = filtered.filter(p => selectedBrands.includes(p.brand));

    // rating
    if (minRating > 0) filtered = filtered.filter(p => p.rating >= minRating);

    // discount
    if (selectedDiscounts.length) {
      filtered = filtered.filter(p => {
        if (!p.originalPrice) return false;
        const discount = ((p.originalPrice - p.price) / p.originalPrice) * 100;
        return selectedDiscounts.some(d => {
          if (d === '50+') return discount >= 50;
          if (d === '40-50') return discount >= 40 && discount < 50;
          if (d === '30-40') return discount >= 30 && discount < 40;
          if (d === '20-30') return discount >= 20 && discount < 30;
          return false;
        });
      });
    }

    // sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      default:
        break;
    }

    return filtered;
  }, [id, category, sortBy, priceRange, selectedBrands, minRating, selectedDiscounts]);

  const resetFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedBrands([]);
    setMinRating(0);
    setSelectedDiscounts([]);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (priceRange[0] !== 0 || priceRange[1] !== 10000) count++;
    if (selectedBrands.length) count++;
    if (minRating > 0) count++;
    if (selectedDiscounts.length) count++;
    return count;
  }, [priceRange, selectedBrands, minRating, selectedDiscounts]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
      {/* Header */}
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>{category?.name ?? 'Category'}</Text>
            <Text style={{ fontSize: 12, color: '#6b7280' }}>{products.length} products</Text>
          </View>

          <TouchableOpacity onPress={() => router.push('/search')} style={{ padding: 6 }}>
            <Ionicons name="search-outline" size={22} color="#111827" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Grid */}
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 12, paddingBottom: 120 }}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
        renderItem={({ item }) => (
          <View style={{ width: '48%' }}>
            <ProductCard product={item} onPress={() => router.push(`/product/${item.id}`)} />
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#e8496d']} />}
      />

      {/* Bottom bar */}
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, borderTopWidth: 1, borderTopColor: '#e5e7eb', backgroundColor: '#fff' }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => setShowSortModal(true)} style={{ flex: 1, paddingVertical: 14, alignItems: 'center', borderRightWidth: 1, borderRightColor: '#e5e7eb' }}>
            <Ionicons name="swap-vertical-outline" size={18} color="#374151" />
            <Text style={{ marginTop: 4, fontWeight: '600' }}>SORT</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowFilterModal(true)} style={{ flex: 1, paddingVertical: 14, alignItems: 'center' }}>
            <Ionicons name="options-outline" size={18} color="#374151" />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Text style={{ fontWeight: '600' }}>FILTER</Text>
              {activeFilterCount > 0 && (
                <View style={{ marginLeft: 8, backgroundColor: '#e11d48', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 }}>
                  <Text style={{ color: '#fff', fontSize: 12 }}>{activeFilterCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ height: insets.bottom ?? 8 }} />
      </View>

      {/* Sort Modal */}
      <Modal visible={showSortModal} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 12, borderTopRightRadius: 12, paddingBottom: 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>Sort By</Text>
              <TouchableOpacity onPress={() => setShowSortModal(false)}>
                <Ionicons name="close" size={22} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            {[
              { label: 'Recommended', value: 'recommended' },
              { label: 'Price: Low to High', value: 'price-low' },
              { label: 'Price: High to Low', value: 'price-high' },
              { label: 'Customer Rating', value: 'rating' },
              { label: 'Newest First', value: 'newest' },
            ].map(opt => (
              <TouchableOpacity key={opt.value} onPress={() => { setSortBy(opt.value as SortOption); setShowSortModal(false); }} style={{ padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: sortBy === opt.value ? '#e11d48' : '#111827', fontWeight: sortBy === opt.value ? '700' : '500' }}>{opt.label}</Text>
                {sortBy === opt.value && <Ionicons name="checkmark" size={18} color="#e11d48" />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Filter Modal */}
      <Modal visible={showFilterModal} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Ionicons name="close" size={24} />
              </TouchableOpacity>
              <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 12 }}>Filters</Text>
            </View>
            <TouchableOpacity onPress={resetFilters}>
              <Text style={{ color: '#e11d48', fontWeight: '600' }}>CLEAR ALL</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 160 }}>
            <Text style={{ fontWeight: '700', marginBottom: 8 }}>Brands</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {availableBrands.map(b => (
                <TouchableOpacity key={b} onPress={() => setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b])} style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: selectedBrands.includes(b) ? '#e11d48' : '#d1d5db', marginRight: 8, marginBottom: 8 }}>
                  <Text style={{ color: selectedBrands.includes(b) ? '#e11d48' : '#111827' }}>{b}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ height: 12 }} />
            <Text style={{ fontWeight: '700', marginBottom: 8 }}>Price Range</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {[
                { label: 'Under ₹500', range: [0, 500] },
                { label: '₹500 - ₹1000', range: [500, 1000] },
                { label: '₹1000 - ₹2000', range: [1000, 2000] },
                { label: '₹2000 - ₹5000', range: [2000, 5000] },
                { label: 'Above ₹5000', range: [5000, 10000] },
              ].map(option => (
                <TouchableOpacity key={option.label} onPress={() => setPriceRange(option.range as [number, number])} style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: priceRange[0] === option.range[0] && priceRange[1] === option.range[1] ? '#e11d48' : '#d1d5db', marginRight: 8, marginBottom: 8 }}>
                  <Text style={{ color: priceRange[0] === option.range[0] && priceRange[1] === option.range[1] ? '#e11d48' : '#111827' }}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ height: 12 }} />
            <Text style={{ fontWeight: '700', marginBottom: 8 }}>Customer Rating</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {[4, 3, 2, 1].map(r => (
                <TouchableOpacity key={r} onPress={() => setMinRating(minRating === r ? 0 : r)} style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: minRating === r ? '#e11d48' : '#d1d5db', marginRight: 8, marginBottom: 8, flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="star" size={14} color={minRating === r ? '#e11d48' : '#fbbf24'} />
                  <Text style={{ marginLeft: 6, color: minRating === r ? '#e11d48' : '#111827' }}>{r}+</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ height: 12 }} />
            <Text style={{ fontWeight: '700', marginBottom: 8 }}>Discount</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {['50+', '40-50', '30-40', '20-30'].map(d => (
                <TouchableOpacity key={d} onPress={() => setSelectedDiscounts(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])} style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: selectedDiscounts.includes(d) ? '#e11d48' : '#d1d5db', marginRight: 8, marginBottom: 8 }}>
                  <Text style={{ color: selectedDiscounts.includes(d) ? '#e11d48' : '#111827' }}>{d}% OFF</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <SafeAreaView edges={['bottom']} style={{ padding: 12, borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => { resetFilters(); setShowFilterModal(false); }} style={{ flex: 1, marginRight: 8, paddingVertical: 12, borderRadius: 12, backgroundColor: '#f3f4f6', alignItems: 'center' }}>
                <Text style={{ fontWeight: '600', color: '#111827' }}>CLOSE</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowFilterModal(false)} style={{ flex: 1, marginLeft: 8, paddingVertical: 12, borderRadius: 12, backgroundColor: '#e11d48', alignItems: 'center' }}>
                <Text style={{ fontWeight: '700', color: '#fff' }}>APPLY ({products.length})</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
