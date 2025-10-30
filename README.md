<!-- markdownlint-disable -->
<!-- Disable all markdown linting for this file -->

# TrueWave - Modern E-Commerce Platform

A fully-featured e-commerce application built with React, TypeScript, and Redux Toolkit. This project showcases modern web development practices with a focus on type safety, state management, and user experience.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.9.2-764ABC?style=flat&logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.16-38B2AC?style=flat&logo=tailwind-css)

## 🚀 Live Demo

**[View Live Demo](#)** *(https://truewave.netlify.app/)*

## 📋 Table of Contents

- [Overview](#🎯-overview)
- [Features](#✨-features)
- [Tech Stack](#🛠-tech-stack)
- [Getting Started](#🏁-getting-started)
- [Project Structure](#📁-project-structure)
- [Key Implementations](#🔑-key-implementations)
- [What I Learned](#💡-what-i-learned)
- [Design Decisions](#🎨-design-decisions)
- [Contact Me](#🤝-connect-with-me)

## 🎯 Overview

TrueWave is a modern e-commerce web application that demonstrates proficiency in building complex React applications with advanced state management, API integration, and responsive design. The project integrates with the FakeStore API to provide a realistic shopping experience with product browsing, cart management, and checkout functionality.

The application features a cyberpunk-inspired dark theme with smooth animations, intuitive navigation, and real-time cart updates. All cart data persists across browser sessions using sessionStorage, ensuring users don't lose their selections.

## ✨ Features

### Product Catalog
- **Dynamic Product Display** - Browse products fetched from the FakeStore API
- **Category Filtering** - Filter products by category using a dynamic dropdown
- **Product Details** - View detailed information including ratings, descriptions, and pricing
- **Image Fallback** - Gracefully handles missing product images with custom placeholders
- **Responsive Grid Layout** - Adapts from 1 to 4 columns based on screen size

### Shopping Cart
- **Add to Cart** - Instantly add products with visual feedback via toast notifications
- **Quantity Management** - Increment/decrement product quantities with intuitive controls
- **Cart Persistence** - Cart state persists across browser sessions using sessionStorage
- **Real-time Updates** - Cart badge and totals update immediately on any change
- **Price Calculations** - Automatic subtotal, tax (7.25%), and total calculations
- **Empty State** - Helpful UI when cart is empty with link back to shopping

### User Experience
- **Toast Notifications** - Non-intrusive feedback using react-hot-toast
- **Loading States** - Skeleton loaders and spinners for async operations
- **Error Handling** - Graceful error states with retry options
- **Smooth Animations** - Hover effects, transitions, and loading animations
- **Accessibility** - ARIA labels and keyboard navigation support

## 🛠 Tech Stack

### Core
- **React 19.1.1** - Latest React with concurrent features
- **TypeScript 5.9.3** - Full type safety throughout the application
- **Vite** - Fast build tool with hot module replacement

### State Management
- **Redux Toolkit 2.9.2** - Simplified Redux with less boilerplate
- **React Redux 9.2.0** - Official React bindings for Redux

### Data Fetching
- **TanStack React Query 5.90.5** - Powerful data synchronization and caching
- **Axios 1.12.2** - Promise-based HTTP client

### Routing
- **React Router DOM 7.9.4** - Declarative routing for React

### Styling
- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **Lucide React 0.548.0** - Beautiful icon library

### User Feedback
- **React Hot Toast 2.6.0** - Lightweight toast notification library

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sys-Redux/truewave-adv-react-ts-ecommerce.git
   cd truewave-adv-react-ts-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📁 Project Structure

```file structure
src/
├── components/
│   ├── cart/
│   │   ├── CartItem.tsx         # Individual cart item with quantity controls
│   │   └── ShoppingCart.tsx     # Main cart component with checkout
│   ├── layout/
│   │   ├── Header.tsx           # Navigation header with cart badge
│   │   └── Layout.tsx           # Main layout wrapper with footer
│   └── products/
│       ├── CategoryFilter.tsx   # Dynamic category dropdown
│       ├── ProductCard.tsx      # Individual product display
│       └── ProductList.tsx      # Product grid container
├── context/
|   ├── ThemeContext.tsx          # Provider for light/dark theme
|   └── ThemeProvider.tsx
├── hooks/
│   ├── useProducts.ts           # React Query hooks for API calls
|   └── useTheme.ts              # Theme wrapper
├── pages/
│   ├── Cart.tsx                 # Shopping cart page
│   └── Home.tsx                 # Main product catalog page
├── services/
│   └── api.ts                   # Axios configuration and API functions
├── store/
│   ├── cartSlice.ts             # Redux cart slice with actions
│   └── store.ts                 # Redux store configuration
├── types/
│   └── product.ts               # TypeScript interfaces
├── utils/
│   ├── storage.ts               # SessionStorage utilities
|   └── toasts.ts                # Toast notifications
├── App.tsx                      # Main app component with routing
├── main.tsx                     # Application entry point
└── index.css                    # Global styles and Tailwind config
```

## 🔑 Key Implementations

### Redux State Management

Implemented a robust cart management system using Redux Toolkit:

```typescript
// cartSlice.ts - Simplified Redux with createSlice
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: loadCartFromStorage() },
  reducers: {
    addToCart: (state, action) => {
      // Immutable updates using Immer
      const existing = state.items.find(item => item.product.id === action.payload.id);
      existing ? existing.quantity++ : state.items.push({ product: action.payload, quantity: 1 });
      saveCartToStorage(state.items);
    },
    // ... other reducers
  }
});
```

### React Query Integration

Leveraged React Query for efficient data fetching with automatic caching:

```typescript
// useProducts.ts - Smart caching and background updates
export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => category ? productApi.getProductsByCategory(category) : productApi.getAllProducts(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
```

### Session Storage Persistence

Built custom utilities to persist cart data across browser sessions:

```typescript
// storage.ts - Robust error handling
export const saveCartToStorage = (items: CartItem[]): void => {
  try {
    sessionStorage.setItem('truewave_cart', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
};
```

### Toast Notifications

Integrated react-hot-toast for non-intrusive user feedback:

```typescript
// Instant feedback on cart actions
toast.success(`Added "${product.title}" to cart!`, { icon: '🛒' });
```

## 💡 What I Learned

Building TrueWave taught me several valuable lessons about modern React development:

### State Management
- How to structure Redux slices for scalability
- The power of Redux Toolkit's `createSlice` API vs traditional Redux
- Managing derived state with selectors
- Synchronizing Redux state with browser storage

### API Integration
- Implementing React Query for server state management
- The difference between client state (Redux) and server state (React Query)
- Optimistic updates and cache invalidation strategies
- Error handling and retry logic

### TypeScript
- Creating reusable type definitions and interfaces
- Leveraging TypeScript for better developer experience
- Type-safe Redux hooks with `RootState` and `AppDispatch`
- Generic types for flexible component props

### Performance
- Optimizing re-renders with proper memoization
- Code splitting with React Router
- Image lazy loading and fallback strategies
- Efficient list rendering with keys

### UX/UI
- Building accessible components with ARIA labels
- Creating responsive layouts with Tailwind CSS
- Implementing loading and error states
- Providing immediate user feedback with toast notifications

## 🎨 Design Decisions

### Why Redux + React Query?
I chose to use both Redux and React Query because they solve different problems:
- **Redux** manages client state (cart, UI preferences)
- **React Query** handles server state (products, categories)

This separation of concerns keeps the codebase clean and maintainable.

### Why Session Storage?
SessionStorage was chosen over localStorage to:
- Clear cart data when the browser session ends
- Avoid persistent cart issues across different users
- Meet the project requirements for session-based persistence

### Why Tailwind CSS v4?
The latest Tailwind CSS provides:
- CSS variables for dynamic theming
- Smaller bundle sizes
- Better performance with the new engine
- Modern CSS features support

## 🚧 Future Enhancements

- [ ] User authentication and profiles
- [ ] Product search functionality
- [ ] Wishlist/favorites feature
- [ ] Discount code system
- [ ] Order history
- [ ] Product reviews and ratings
- [ ] Unit and integration tests
- [ ] PWA capabilities for offline support

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Connect With Me

- **GitHub**: [@Sys-Redux](https://github.com/Sys-Redux)
- **LinkedIn**: [Trevor Edge](https://www.linkedin.com/in/t-edge/)

---

*Built with ❤️ using React, TypeScript, and modern web technologies*
