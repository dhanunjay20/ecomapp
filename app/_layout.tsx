/**
 * Root Layout - App Entry Point
 */

import '../src/theme/global.css';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryProvider } from '@hooks/queryClient';
import { useAuthStore, useCartStore, useWishlistStore, useUIStore } from '@store/index';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const loadUser = useAuthStore((state) => state.loadUser);
  const loadCart = useCartStore((state) => state.loadCart);
  const loadWishlist = useWishlistStore((state) => state.loadWishlist);
  const loadUIState = useUIStore((state) => state.loadUIState);

  useEffect(() => {
    // Initialize app state
    const initializeApp = async () => {
      await Promise.all([
        loadUser(),
        loadCart(),
        loadWishlist(),
        loadUIState(),
      ]);
    };

    initializeApp();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryProvider>
          <StatusBar style="auto" />
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen 
              name="product/[id]" 
              options={{ 
                presentation: 'card',
                animation: 'slide_from_bottom' 
              }} 
            />
            <Stack.Screen 
              name="checkout" 
              options={{ 
                presentation: 'card' 
              }} 
            />
          </Stack>
        </QueryProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
