# EcomApp - Production-Ready E-commerce Mobile App

A modern, feature-rich e-commerce mobile application built with Expo React Native, TypeScript, and NativeWind (Tailwind CSS).

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Expo CLI (will be installed via npx)
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Dependencies are already installed!** ✅

2. **Add placeholder assets (temporary):**
   The app needs icon assets. For development, you can either:
   - Download placeholder icons and add to `assets/` folder
   - Or temporarily comment out asset paths in `app.json`

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator:**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## 📦 Tech Stack

- **Framework:** Expo SDK 51 + React Native 0.74
- **Language:** TypeScript 5.3 (strict mode)
- **Styling:** NativeWind 4.0 (Tailwind CSS for React Native)
- **Navigation:** Expo Router 3.5 (file-based routing)
- **State Management:** 
  - Zustand 4.5 (UI state)
  - TanStack React Query 5.17 (server state)
- **Forms:** React Hook Form 7.49 + Zod 3.22
- **Animations:** Reanimated 3.10 + Gesture Handler 2.16
- **Lists:** FlashList 1.6
- **HTTP:** Axios 1.6
- **Storage:** Expo SecureStore + AsyncStorage

## 🏗️ Project Structure

```
ecomapp/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Bottom tab navigation
│   │   ├── index.tsx      # Home screen
│   │   ├── categories.tsx
│   │   ├── cart.tsx
│   │   └── profile.tsx
│   └── (auth)/            # Auth screens
│       ├── login.tsx
│       └── signup.tsx
├── src/
│   ├── components/        # Reusable UI components
│   │   └── ui/           # Base components (Button, Input, Card, etc.)
│   ├── features/         # Feature-specific components
│   │   ├── home/
│   │   ├── product/
│   │   └── cart/
│   ├── services/         # API integration
│   │   └── api/
│   ├── store/            # Zustand stores
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript types
│   ├── utils/            # Helper functions
│   └── constants/        # App constants
└── assets/               # Images, fonts, icons
```

## ✨ Features

### Implemented:
- ✅ Authentication (Login/Signup with validation)
- ✅ Home screen with hero banner, categories, product rows
- ✅ Shopping cart with optimistic updates
- ✅ Wishlist functionality
- ✅ User profile
- ✅ Dark mode support
- ✅ Form validation (Zod schemas)
- ✅ State management (Zustand + React Query)
- ✅ API client with retry logic and auto-refresh

### To Be Implemented:
- ⏳ Product listing page with filters
- ⏳ Product detail page
- ⏳ Checkout flow
- ⏳ Order history & tracking
- ⏳ Search functionality
- ⏳ Performance optimizations

## 🎨 Styling with NativeWind

This app uses NativeWind (Tailwind CSS for React Native). Examples:

```tsx
// Using Tailwind classes
<View className="flex-1 bg-white dark:bg-gray-900 p-4">
  <Text className="text-xl font-bold text-gray-900 dark:text-white">
    Hello World
  </Text>
</View>
```

## 🔧 Running the App

```bash
npx expo start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- Scan QR code with Expo Go app

## 📄 Documentation

See [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed documentation.

## ⚠️ Note About Assets

The app requires icon assets in the `assets/` folder. Asset warnings are normal during development. You can:
1. Add your own icons to `assets/`
2. Or temporarily work without them (app will still run)

---

**Ready to run!** Just execute `npx expo start` 🚀
