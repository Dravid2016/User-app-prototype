export interface HealthyCafeItem {
  id: string;
  name: string;
  category: 'snack' | 'juice' | 'shot' | 'tea' | 'bake';
  price: number;
  calories: string;
  tag: string;
  description: string;
  image: string;
  rating: number;
  isPopular?: boolean;
}

export interface PopularKitchenItem {
  id: string;
  name: string;
  chefName: string;
  rating: number;
  reviewsCount: number;
  specialty: string;
  area: string;
  deliveryTime: string;
  image: string;
  featuredDishes: string[];
}

export const HEALTHY_CAFE_ITEMS: HealthyCafeItem[] = [
  {
    id: 'cafe-1',
    name: 'ABC Organic Cold-Pressed Juice',
    category: 'juice',
    price: 120,
    calories: '110 kcal',
    tag: '100% Organic',
    description: 'Fresh cold-pressed Apple, Beetroot, Carrot, Ginger & Lemon. Zero added sugar or water.',
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b7?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    isPopular: true,
  },
  {
    id: 'cafe-2',
    name: 'Roasted Makhana Chivda (Foxnuts)',
    category: 'snack',
    price: 95,
    calories: '120 kcal',
    tag: 'High Protein',
    description: 'Crispy foxnuts roasted in pure Desi Ghee with rock salt, curry leaves & roasted peanuts.',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    isPopular: true,
  },
  {
    id: 'cafe-3',
    name: 'Amla Mint Detox Elixir',
    category: 'shot',
    price: 85,
    calories: '45 kcal',
    tag: 'Immunity Booster',
    description: 'Fresh Indian Gooseberry juice infused with garden mint, rock salt & wild honey.',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    isPopular: true,
  },
  {
    id: 'cafe-4',
    name: 'Ragi & Jaggery Almond Cookies',
    category: 'bake',
    price: 140,
    calories: '140 kcal',
    tag: 'Gluten-Free',
    description: 'Handcrafted finger millet (Ragi) cookies baked with crushed almonds & organic jaggery.',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    isPopular: true,
  },
  {
    id: 'cafe-5',
    name: 'Chia & Tender Coconut Hydration Blast',
    category: 'juice',
    price: 110,
    calories: '90 kcal',
    tag: 'Electrolyte Rich',
    description: 'Natural tender coconut water mixed with tender coconut malai and soaked chia seeds.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
  },
  {
    id: 'cafe-6',
    name: 'Sprouted Moong & Oats Tikki',
    category: 'snack',
    price: 130,
    calories: '160 kcal',
    tag: 'Fiber Rich',
    description: 'Pan-seared sprouted green gram patties blended with rolled oats, herbs & mint chutney.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80',
    rating: 4.7,
  },
  {
    id: 'cafe-7',
    name: 'Moringa & Lemon Immunity Shot',
    category: 'shot',
    price: 60,
    calories: '25 kcal',
    tag: 'Superfood',
    description: 'Nutrient-packed organic Moringa drumstick leaf concentrate with lemon & black salt.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
  },
  {
    id: 'cafe-8',
    name: 'South Indian Brass Tumbler Filter Coffee',
    category: 'tea',
    price: 55,
    calories: '75 kcal',
    tag: 'Heritage Brew',
    description: 'Authentic 80:20 chicory blend brewed fresh and served frothy in a traditional brass tumbler.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80',
    rating: 5.0,
    isPopular: true,
  },
  {
    id: 'cafe-9',
    name: 'Kashmiri Saffron Kahwa Tea',
    category: 'tea',
    price: 75,
    calories: '50 kcal',
    tag: 'Artisanal Tea',
    description: 'Green tea infused with Kashmiri saffron threads, cardamom pods, cinnamon & crushed almonds.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
  },
  {
    id: 'cafe-10',
    name: 'Oats & Medjool Dates Energy Ladoo',
    category: 'snack',
    price: 110,
    calories: '130 kcal',
    tag: 'No Refined Sugar',
    description: 'Sugar-free energy balls made with dates, roasted oats, walnuts & cardamom powder.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
  },
];

export const POPULAR_KITCHENS: PopularKitchenItem[] = [
  {
    id: 'k-1',
    name: 'Amma’s Heritage Kitchen',
    chefName: 'Chef Meenakshi Amma',
    rating: 4.9,
    reviewsCount: 340,
    specialty: 'Authentic Chettinad Biryani & Crab Masala',
    area: 'Anna Nagar, Chennai',
    deliveryTime: '25-30 min',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
    featuredDishes: ['Chettinad Chicken Biryani', 'Mutton Sukka', 'Coin Parotta'],
  },
  {
    id: 'k-2',
    name: 'Tanjore Brahmin Home Kitchen',
    chefName: 'Chef Parvathy Ammal',
    rating: 4.9,
    reviewsCount: 420,
    specialty: 'Traditional Iyer Sambar, Rasam & Vathal Kozhambu',
    area: 'Mylapore, Chennai',
    deliveryTime: '20-25 min',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80',
    featuredDishes: ['Tanjore Full Meals Thali', 'Mor Kozhambu', 'Elaneer Payasam'],
  },
  {
    id: 'k-3',
    name: 'Sardarji’s Authentic Punjabi Kitchen',
    chefName: 'Chef Gurpreet Singh',
    rating: 4.8,
    reviewsCount: 290,
    specialty: 'Slow-Cooked Dal Makhani & Amritsari Kulcha',
    area: 'T. Nagar, Chennai',
    deliveryTime: '30-35 min',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    featuredDishes: ['Butter Chicken', 'Amritsari Paneer Kulcha', 'Sarson Saag'],
  },
  {
    id: 'k-4',
    name: 'Malabar Royal Kitchen',
    chefName: 'Chef Abdul Rahiman',
    rating: 4.9,
    reviewsCount: 310,
    specialty: 'Kerala Fish Curry & Flaky Layered Parotta',
    area: 'Adyar, Chennai',
    deliveryTime: '25-30 min',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    featuredDishes: ['Malabar Fish Curry', 'Kerala Porotta', 'Beef Roast'],
  },
];
