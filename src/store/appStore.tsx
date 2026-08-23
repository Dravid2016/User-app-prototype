import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppPage, FoodItem, CartItem, Order, UserAddress, Cook, Cafe, User, Region } from '../types';
import { MOCK_FOODS } from '../data/foods';
import { INITIAL_ORDERS } from '../data/orders';

interface AppContextType {
  page: AppPage;
  setPage: (page: AppPage) => void;
  previousPage: AppPage | null;
  selectedFood: FoodItem | null;
  setSelectedFood: (food: FoodItem | null) => void;
  selectedCook: Cook | null;
  setSelectedCook: (cook: Cook | null) => void;
  selectedCafe: Cafe | null;
  setSelectedCafe: (cafe: Cafe | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  
  // Auth
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  authRedirectPage: AppPage | null;
  setAuthRedirectPage: (page: AppPage | null) => void;

  // Regional Discovery
  selectedRegion: Region | null;
  setSelectedRegion: (region: Region | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (food: FoodItem, quantity?: number) => void;
  updateCartQuantity: (foodId: string, delta: number) => void;
  removeFromCart: (foodId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  deliveryFee: number;
  packagingFee: number;
  cartTotal: number;

  // Favorites
  savedItemIds: string[];
  toggleFavorite: (foodId: string) => void;
  isFavorite: (foodId: string) => boolean;

  // Checkout
  addresses: UserAddress[];
  selectedAddressId: string;
  setSelectedAddressId: (id: string) => void;
  deliveryMode: 'standard' | 'express';
  setDeliveryMode: (mode: 'standard' | 'express') => void;
  paymentMode: 'upi' | 'card';
  setPaymentMode: (mode: 'upi' | 'card') => void;

  // Orders
  orders: Order[];
  activeOrder: Order | null;
  placeOrder: () => void;
  reorder: (order: Order) => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_ADDRESSES: UserAddress[] = [
  {
    id: 'addr-1',
    label: 'Home',
    line1: '12, Anna Nagar Main Road',
    line2: 'Near Roundtana',
    city: 'Chennai',
    pincode: '600040',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Work',
    line1: 'Tidel Park, Module 4B, 3rd Floor',
    line2: 'Taramani',
    city: 'Chennai',
    pincode: '600113',
    isDefault: false,
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [page, setPageState] = useState<AppPage>('home');
  const [previousPage, setPreviousPage] = useState<AppPage | null>(null);

  const setPage = (newPage: AppPage) => {
    if (newPage !== page) {
      setPreviousPage(page);
    }
    setPageState(newPage);
  };

  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('feazto_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authRedirectPage, setAuthRedirectPage] = useState<AppPage | null>(null);

  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(MOCK_FOODS[0]);
  const [selectedCook, setSelectedCook] = useState<Cook | null>(null);
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([
    { food: MOCK_FOODS[0], quantity: 1 },
    { food: MOCK_FOODS[1], quantity: 1 }
  ]);

  // Saved / Favorite State
  const [savedItemIds, setSavedItemIds] = useState<string[]>(['dosa-1', 'kothu-1', 'meals-1']);

  // Checkout state
  const [addresses] = useState<UserAddress[]>(DEFAULT_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('addr-1');
  const [deliveryMode, setDeliveryMode] = useState<'standard' | 'express'>('standard');
  const [paymentMode, setPaymentMode] = useState<'upi' | 'card'>('upi');

  // Orders State
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const activeOrder = orders.find(o => o.status !== 'delivered') || null;

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const addToCart = (food: FoodItem, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.food.id === food.id);
      if (existing) {
        return prev.map((item) =>
          item.food.id === food.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { food, quantity }];
    });
    showToast(`Added ${food.name} to Cart`);
  };

  const updateCartQuantity = (foodId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.food.id === foodId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (foodId: string) => {
    setCart((prev) => prev.filter((item) => item.food.id !== foodId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (foodId: string) => {
    setSavedItemIds((prev) => {
      const exists = prev.includes(foodId);
      if (exists) {
        showToast('Removed from Saved');
        return prev.filter((id) => id !== foodId);
      } else {
        showToast('Added to Saved');
        return [...prev, foodId];
      }
    });
  };

  const isFavorite = (foodId: string) => savedItemIds.includes(foodId);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.food.price * item.quantity, 0);
  const deliveryFee = deliveryMode === 'express' ? 35 : (cartSubtotal >= 100 ? 0 : (cartSubtotal > 0 ? 25 : 0));
  const packagingFee = cart.length > 0 ? 15 : 0;
  const cartTotal = cartSubtotal > 0 ? cartSubtotal + deliveryFee + packagingFee : 0;

  const placeOrder = () => {
    if (cart.length === 0) return;
    const selectedAddr = addresses.find(a => a.id === selectedAddressId);
    const newOrder: Order = {
      id: `FZ-${Math.floor(10000 + Math.random() * 90000)}`,
      date: 'Just now',
      items: [...cart],
      itemTotal: cartSubtotal,
      deliveryFee,
      packagingCharges: packagingFee,
      total: cartTotal,
      status: 'preparing',
      deliveryAddress: selectedAddr ? `${selectedAddr.label} — ${selectedAddr.line1}, ${selectedAddr.city}` : 'Home Address',
      paymentMethod: paymentMode === 'upi' ? 'GPay / UPI' : 'Credit Card',
      eta: deliveryMode === 'express' ? '18 min' : '32 min',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setPage('order-success');
    showToast('Order Placed Successfully!');
  };

  const reorder = (order: Order) => {
    setCart(order.items.map((item) => ({ ...item })));
    setPage('cart');
    showToast('Items added back to Cart');
  };

  const login = (newUser: User) => {
    setUser(newUser);
    try {
      localStorage.setItem('feazto_user', JSON.stringify(newUser));
    } catch (e) {
      console.error('Failed to persist user session', e);
    }
    const destination = authRedirectPage || 'profile';
    setPage(destination);
    setAuthRedirectPage(null);
    showToast(`Welcome back, ${newUser.name}!`);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('feazto_user');
    } catch (e) {
      console.error('Failed to clear user session', e);
    }
    setPage('home');
    showToast('Logged out successfully');
  };

  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        previousPage,
        user,
        login,
        logout,
        authRedirectPage,
        setAuthRedirectPage,
        selectedRegion,
        setSelectedRegion,
        selectedFood,
        setSelectedFood,
        selectedCook,
        setSelectedCook,
        selectedCafe,
        setSelectedCafe,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        deliveryFee,
        packagingFee,
        cartTotal,
        savedItemIds,
        toggleFavorite,
        isFavorite,
        addresses,
        selectedAddressId,
        setSelectedAddressId,
        deliveryMode,
        setDeliveryMode,
        paymentMode,
        setPaymentMode,
        orders,
        activeOrder,
        placeOrder,
        reorder,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};
