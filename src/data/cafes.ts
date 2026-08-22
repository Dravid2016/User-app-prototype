import { Cafe } from '../types';

export const MOCK_CAFES: Cafe[] = [
  {
    id: 'cafe-1',
    name: 'Madras Filter Coffee Club',
    tagline: 'Authentic brass tumbler degree coffee & hot savory snacks',
    rating: 4.9,
    reviews: 320,
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600',
    ambiance: 'Traditional South Indian Heritage',
    tags: ['Degree Coffee', 'Filter Coffee', 'Work-Friendly', 'Snacks'],
    address: 'Mylapore Tank, Chennai',
    popularItems: [' Kumbakonam Degree Coffee', 'Butter Bun Maska', 'Mini Sundal', 'Davara Coffee'],
  },
  {
    id: 'cafe-2',
    name: 'Banyan Tree Artisan Roast',
    tagline: 'Specialty Indian origin cold brews & sourdough tiffin toasts',
    rating: 4.8,
    reviews: 195,
    distance: '2.5 km',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600',
    ambiance: 'Modern Glasshouse & Garden',
    tags: ['Cold Brew', 'Work-Friendly', 'Wifi', 'Pastries'],
    address: 'ECR, Palavakkam, Chennai',
    popularItems: ['Monsooned Malabar Cold Brew', 'Podi Cheese Toast', 'Cardamom Latte', 'Coconut Cake'],
  },
  {
    id: 'cafe-3',
    name: 'Beachside Kaapi & Stories',
    tagline: 'Sea breeze, acoustic music, fresh roasted coffee beans & chats',
    rating: 4.85,
    reviews: 240,
    distance: '3.8 km',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600',
    ambiance: 'Coastal Sunset Vibe',
    tags: ['Sea View', 'Sunset Spot', 'Desserts'],
    address: 'Besant Nagar Beach, Chennai',
    popularItems: ['Sea Salt Caramel Kaapi', 'Banana Cake', 'Iced Espresso', 'Panner Tikka Sandwich'],
  }
];
