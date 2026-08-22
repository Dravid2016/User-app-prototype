export type AppPage =
  | 'home'
  | 'explore'
  | 'food-detail'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'orders'
  | 'saved'
  | 'profile'
  | 'book-a-cook'
  | 'cook-detail'
  | 'cafes'
  | 'cafe-detail';

export interface FoodItem {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  description: string;
  kitchenId: string;
  kitchenName: string;
  category: string;
  cuisine: string;
  image: string;
  tags: string[];
  isPopular?: boolean;
  isTrending?: boolean;
  isHomemade?: boolean;
  prepTime: string;
}

export interface Kitchen {
  id: string;
  name: string;
  subtitle: string;
  rating: number;
  reviewCount: number;
  distance: string;
  image: string;
  specialty: string;
  location: string;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  food: FoodItem;
  quantity: number;
  specialInstructions?: string;
}

export interface Cook {
  id: string;
  name: string;
  title: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  pricePerMeal: number;
  image: string;
  bio: string;
  availableSlots: string[];
  dishes: string[];
}

export interface Cafe {
  id: string;
  name: string;
  tagline: string;
  rating: number;
  reviews: number;
  distance: string;
  image: string;
  ambiance: string;
  tags: string[];
  address: string;
  popularItems: string[];
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  itemTotal: number;
  deliveryFee: number;
  packagingCharges: number;
  total: number;
  status: 'preparing' | 'picked_up' | 'on_the_way' | 'delivered';
  deliveryAddress: string;
  paymentMethod: string;
  eta: string;
}

export interface UserAddress {
  id: string;
  label: string;
  line1: string;
  line2: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}
