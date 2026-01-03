# 🛍️ EcomApp - Production-Ready E-Commerce Mobile App

A **Myntra-level** e-commerce mobile application built with **Expo React Native**, **TypeScript**, **NativeWind (Tailwind CSS)**, and enterprise-grade architecture.

## 📱 Features

### Core Features
- ✅ **Authentication** - Login, Signup, OTP, Token Management
- ✅ **Home Screen** - Hero Banners, Categories, Trending, Best Sellers
- ✅ **Product Listing** - Filters, Sorting, Infinite Scroll, FlashList
- ✅ **Product Detail** - Image Gallery, Variants, Reviews, Add to Cart
- ✅ **Cart** - Real-time Updates, Optimistic UI, Offline Sync
- ✅ **Wishlist** - Add/Remove, Backend Sync, Persistent
- ✅ **Checkout** - Address Selection, Payment UI, Order Confirmation
- ✅ **Orders** - History, Details, Tracking, Cancel/Return
- ✅ **Profile** - User Info, Addresses, Settings

### Technical Features
- 🎨 **NativeWind (Tailwind CSS)** - Utility-first styling
- 🌗 **Dark Mode** - System-aware theme switching
- 📱 **Responsive Design** - Optimized for all screen sizes
- ⚡ **Performance** - FlashList, Memoization, Lazy Loading
- 🔄 **Offline Support** - AsyncStorage caching
- 🎭 **Animations** - Reanimated + Gesture Handler
- 🔐 **Security** - Secure token storage, API error handling

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Expo React Native (SDK 51) |
| **Language** | TypeScript |
| **Routing** | Expo Router (file-based) |
| **Styling** | NativeWind (Tailwind CSS) |
| **State Management** | Zustand (UI State), TanStack React Query (Server State) |
| **Forms** | React Hook Form + Zod |
| **Animations** | Reanimated 3 + Gesture Handler |
| **Lists** | FlashList |
| **Storage** | SecureStore (tokens), AsyncStorage (cache) |
| **HTTP Client** | Axios (with retry logic) |

---

## 📁 Project Architecture

```
ecomapp/
├── app/                          # Expo Router screens
│   ├── (auth)/                   # Authentication screens
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── _layout.tsx
│   ├── (tabs)/                   # Bottom tab navigation
│   │   ├── index.tsx             # Home
│   │   ├── categories.tsx        # Categories
│   │   ├── cart.tsx              # Cart
│   │   ├── profile.tsx           # Profile
│   │   └── _layout.tsx
│   ├── product/[id].tsx          # Product Detail
│   ├── checkout/                 # Checkout flow
│   └── _layout.tsx               # Root layout
├── src/
│   ├── components/               # Reusable UI components
│   │   └── ui/                   # Base components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Card.tsx
│   │       ├── Skeleton.tsx
│   │       ├── Badge.tsx
│   │       └── BottomSheet.tsx
│   ├── features/                 # Feature modules
│   │   ├── auth/
│   │   ├── home/
│   │   ├── product/
│   │   ├── cart/
│   │   └── wishlist/
│   ├── services/                 # API clients
│   │   └── api/
│   │       ├── client.ts         # Axios instance with interceptors
│   │       ├── auth.ts
│   │       ├── products.ts
│   │       ├── cart.ts
│   │       ├── wishlist.ts
│   │       ├── orders.ts
│   │       └── address.ts
│   ├── store/                    # Zustand stores
│   │   ├── authStore.ts
│   │   ├── cartStore.ts
│   │   ├── wishlistStore.ts
│   │   └── uiStore.ts
│   ├── hooks/                    # Custom hooks
│   │   ├── queryClient.tsx
│   │   ├── useProducts.ts
│   │   ├── useOrders.ts
│   │   ├── useAddress.ts
│   │   └── useCommon.ts
│   ├── theme/                    # Design tokens
│   │   ├── global.css
│   │   └── tokens.ts
│   ├── utils/                    # Utility functions
│   │   ├── helpers.ts
│   │   └── validation.ts
│   ├── constants/                # App constants
│   │   ├── index.ts
│   │   └── env.ts
│   └── types/                    # TypeScript types
│       └── index.ts
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── babel.config.js
└── app.json
```

### Why This Architecture?

1. **Feature-Based Structure**
   - Each feature (auth, cart, product) is self-contained
   - Easy to locate and modify feature-specific code
   - Scales well for large teams

2. **Separation of Concerns**
   - `components/` - Presentational components
   - `features/` - Business logic components
   - `services/` - API communication
   - `store/` - Global state management
   - `hooks/` - Reusable logic

3. **Type Safety**
   - Centralized types in `types/index.ts`
   - Strong TypeScript across the codebase
   - Zod schema validation for forms

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm start
```

3. **Run on Platform**
```bash
npm run ios       # iOS Simulator
npm run android   # Android Emulator
npm run web       # Web Browser
```

### Environment Variables

Create `.env` file:
```env
EXPO_PUBLIC_API_URL=https://api.ecomapp.com
EXPO_PUBLIC_WS_URL=wss://api.ecomapp.com
EXPO_PUBLIC_ENVIRONMENT=development
EXPO_PUBLIC_ENABLE_ANALYTICS=false
```

---

## 🎨 NativeWind (Tailwind) Setup

### Configuration

**tailwind.config.js**
```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: { 500: '#e8496d', /* ... */ },
        secondary: { 500: '#577da1', /* ... */ },
      },
    },
  },
  darkMode: 'class',
}
```

### Usage Example

```tsx
// ❌ DON'T use StyleSheet
const styles = StyleSheet.create({ container: { ... } })

// ✅ DO use Tailwind classes
<View className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
  <Text className="text-lg font-bold text-gray-900 dark:text-white">
    Hello World
  </Text>
</View>
```

### Design Tokens

All design tokens are defined in `tailwind.config.js`:
- Colors: `primary-500`, `secondary-500`, `success`, `error`
- Spacing: `p-4`, `mb-6`, `gap-3`
- Typography: `text-lg`, `font-bold`
- Border Radius: `rounded-xl`

---

## 🗄️ State Management

### Zustand (UI & Business Logic)

**Example: Auth Store**
```ts
export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (credentials) => {
    const response = await authApi.login(credentials);
    set({ user: response.data.user, isAuthenticated: true });
  },
  
  logout: async () => {
    await SecureStore.deleteItemAsync('auth_token');
    set({ user: null, isAuthenticated: false });
  },
}));
```

### TanStack React Query (Server State)

**Example: Products Hook**
```ts
export const useProducts = (filters, sort) => {
  return useInfiniteQuery({
    queryKey: ['products', filters, sort],
    queryFn: ({ pageParam = 1 }) => 
      productsApi.getProducts(pageParam, 20, filters, sort),
    getNextPageParam: (lastPage) => 
      lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
  });
};
```

---

## 🔌 API Integration

### Centralized API Client

```ts
// services/api/client.ts
class ApiClient {
  private client: AxiosInstance;
  
  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: 30000,
    });
    
    this.setupInterceptors(); // Auto token refresh, error handling
  }
  
  async get<T>(url: string): Promise<ApiResponse<T>> {
    return this.withRetry(() => this.client.get(url));
  }
}
```

### Features
- ✅ Auto token refresh on 401
- ✅ Retry logic with exponential backoff
- ✅ Centralized error handling
- ✅ Request/Response interceptors

---

## ⚡ Performance Optimizations

### 1. FlashList (Instead of FlatList)
```tsx
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={products}
  renderItem={({ item }) => <ProductCard product={item} />}
  estimatedItemSize={200}
/>
```

### 2. Memoization
```tsx
const ProductCard = React.memo(({ product }) => {
  // Component logic
});
```

### 3. Lazy Image Loading
```tsx
import { Image } from 'expo-image';

<Image
  source={{ uri: product.image }}
  placeholder={blurhash}
  transition={200}
/>
```

### 4. Optimistic Updates
```ts
// Cart Store
addItem: async (product) => {
  // 1. Update UI immediately
  set({ cart: optimisticCart });
  
  // 2. Call API
  const response = await cartApi.addItem(product.id);
  
  // 3. Update with real data
  set({ cart: response.data });
}
```

---

## 🔐 Security

### Token Storage
```ts
import * as SecureStore from 'expo-secure-store';

// Store
await SecureStore.setItemAsync('auth_token', token);

// Retrieve
const token = await SecureStore.getItemAsync('auth_token');
```

### API Error Handling
- Network errors → Retry with backoff
- 401 Unauthorized → Auto token refresh
- 403 Forbidden → Logout user
- 500 Server Error → Show error message

---

## 🎯 Best Practices

### 1. Code Organization
- Keep components small and focused
- Extract business logic to hooks
- Use feature-based folder structure

### 2. TypeScript
- Define all types in `types/index.ts`
- Use strict mode
- Avoid `any` type

### 3. Styling
- Use Tailwind classes only
- Extract reusable components
- Support dark mode

### 4. Performance
- Use FlashList for long lists
- Memoize expensive computations
- Lazy load images
- Implement optimistic updates

---

## 📦 Build & Deploy

### Build for Production

**iOS**
```bash
expo build:ios
```

**Android**
```bash
expo build:android
```

### EAS Build
```bash
eas build --platform android
eas build --platform ios
```

---

## 🔮 Future Enhancements

- [ ] Push Notifications
- [ ] Biometric Authentication
- [ ] Social Login (Google, Facebook)
- [ ] Product Recommendations (ML)
- [ ] AR Try-On (for jewellery)
- [ ] Multi-language Support
- [ ] Analytics Integration
- [ ] Crash Reporting (Sentry)

---

## 👨‍💻 Development Guidelines

### Commit Convention
```
feat: Add product detail page
fix: Cart quantity update issue
refactor: Optimize home screen performance
docs: Update API documentation
```

### Code Style
- Use ESLint + Prettier
- Follow Airbnb style guide
- Write self-documenting code
- Add comments for complex logic

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **Expo Team** - For the amazing framework
- **NativeWind** - For Tailwind CSS in React Native
- **Zustand** - For simple state management
- **TanStack Query** - For server state management

---

**Built with ❤️ by a Senior Mobile Architect**
