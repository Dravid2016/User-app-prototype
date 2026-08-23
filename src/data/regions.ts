import { Region } from '../types';

export interface RegionTheme {
  background: string;     // Tailwind color class for page bg
  border: string;         // Tailwind border color class
  accentText: string;     // Tailwind text color class
  accentBg: string;       // Tailwind bg color class for pills
  badgeBorder: string;    // Tailwind border class for pills
  badgeText: string;      // Tailwind text class for pills
  glowColor: string;      // RGB/RGBA shadow glow
}

export interface RegionConfig {
  id: Region;
  name: string;
  tagline: string;
  intro: string;
  heroImage: string;
  badges: string[];       // Cultural icons displayed as tags on the cards
  theme: RegionTheme;
  motifType: 'kolam' | 'coconut' | 'chilli' | 'charminar' | 'palace';
}

export const MOCK_REGIONS: RegionConfig[] = [
  {
    id: 'tamilnadu',
    name: 'Tamil Nadu',
    tagline: 'From tiffin tables to temple streets.',
    intro: 'Experience traditional feasts served on authentic fresh banana leaves, accompanied by the rich aroma of traditional brass-filtered coffee and native spices.',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600',
    badges: ['Gopuram', 'Filter Coffee', 'Banana Leaf', 'Kolam Art'],
    motifType: 'kolam',
    theme: {
      background: 'bg-[#FDF9ED]',
      border: 'border-[#A0522D]',
      accentText: 'text-[#A0522D]',
      accentBg: 'bg-[#FFD21F]/15',
      badgeBorder: 'border-[#A0522D]/40',
      badgeText: 'text-[#A0522D]',
      glowColor: 'rgba(255, 210, 31, 0.15)',
    }
  },
  {
    id: 'kerala',
    name: 'Kerala',
    tagline: 'God’s own slow-cooked legacy.',
    intro: 'Lush coconut oil infusions, steamed puttu cylinders, and banana-leaf wrapped grilled delicacies prepared by native home chefs.',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600',
    badges: ['Houseboat', 'Coconut Palms', 'Kathakali', 'Kasavu Gold'],
    motifType: 'coconut',
    theme: {
      background: 'bg-[#F2F9F3]',
      border: 'border-[#1B5E20]',
      accentText: 'text-[#1B5E20]',
      accentBg: 'bg-[#4CAF50]/12',
      badgeBorder: 'border-[#1B5E20]/30',
      badgeText: 'text-[#1B5E20]',
      glowColor: 'rgba(76, 175, 80, 0.15)',
    }
  },
  {
    id: 'andhra',
    name: 'Andhra Pradesh',
    tagline: 'Fiery spices & Guntur traditions.',
    intro: 'Home to the iconic hot Guntur chillies, tangy Gongura herb pastes, and slow-simmered spicy local curries packed with punchy traditional flavours.',
    heroImage: 'https://images.unsplash.com/photo-1627440562306-0775a6c3826f?auto=format&fit=crop&q=80&w=600',
    badges: ['Guntur Chilli', 'Kondapalli Toys', 'Gongura Leaf', 'Spicy Curries'],
    motifType: 'chilli',
    theme: {
      background: 'bg-[#FFF2F0]',
      border: 'border-[#B71C1C]',
      accentText: 'text-[#B71C1C]',
      accentBg: 'bg-[#F44336]/10',
      badgeBorder: 'border-[#B71C1C]/30',
      badgeText: 'text-[#B71C1C]',
      glowColor: 'rgba(244, 67, 54, 0.15)',
    }
  },
  {
    id: 'telangana',
    name: 'Telangana',
    tagline: 'Nawabi slow-dum heritage.',
    intro: 'A blend of grand royal Nizam spices and rustic Deccan millets, featuring the world-famous slow-cooked clay pot Dum Biryanis and rich Haleem.',
    heroImage: 'https://images.unsplash.com/photo-1599933310672-0402b8d009b0?auto=format&fit=crop&q=80&w=600',
    badges: ['Charminar', 'Nizam Dum Pot', 'Deccan Spices', 'Pearl Accent'],
    motifType: 'charminar',
    theme: {
      background: 'bg-[#FAF4FC]',
      border: 'border-[#6A1B9A]',
      accentText: 'text-[#6A1B9A]',
      accentBg: 'bg-[#9C27B0]/10',
      badgeBorder: 'border-[#6A1B9A]/30',
      badgeText: 'text-[#6A1B9A]',
      glowColor: 'rgba(156, 39, 176, 0.15)',
    }
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    tagline: 'Karunadu textures & palace sweets.',
    intro: 'Earthy ragi millets, aromatic pure-ghee Mysore masala crepes, and sweet visual delights crafted with centuries-old local heritage.',
    heroImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=600',
    badges: ['Mysore Palace', 'Mysore Pak', 'Sandalwood', 'Udupi Clay Pots'],
    motifType: 'palace',
    theme: {
      background: 'bg-[#F4F6FC]',
      border: 'border-[#1A237E]',
      accentText: 'text-[#1A237E]',
      accentBg: 'bg-[#3F51B5]/12',
      badgeBorder: 'border-[#1A237E]/30',
      badgeText: 'text-[#1A237E]',
      glowColor: 'rgba(63, 81, 181, 0.15)',
    }
  }
];
