export interface FestivalSpecial {
  id: string;
  festivalName: string;
  regionalTitle: string;
  dishTitle: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  discountBadge: string;
  price: number;
  originalPrice: number;
  servesCount: string;
  chefName: string;
  isPreBook: boolean;
  preBookSlot: string;
}

export const FESTIVAL_SPECIALS: FestivalSpecial[] = [
  {
    id: 'fest-onam',
    festivalName: 'Onam Thiruvonam Sadhya',
    regionalTitle: 'ഓണം സദ്യ ഗ്രാൻഡ് ഫീസ്റ്റ്',
    dishTitle: 'Kerala 24-Item Royal Banana Leaf Sadhya',
    subtitle: 'Grand feast with Sharkara Varatti, Parippu Payasam & Avial',
    description: 'Complete festive feast crafted by native Kerala grandmothers. Includes Red Matta Rice, Sambar, Rasam, Avial, Olan, Thoran, Kalan, Pachadi, 3 Payasams, Inji Puli, and crisp banana chips.',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80&w=800',
    badge: 'Onam Special',
    discountBadge: '20% EARLY BIRD',
    price: 349,
    originalPrice: 429,
    servesCount: 'Serves 1-2',
    chefName: 'Ammini Amma & Kuttanad Cooks',
    isPreBook: true,
    preBookSlot: 'Booking Open · Deliveries on Festival Day',
  },
  {
    id: 'fest-pongal',
    festivalName: 'Pongal Thiruvizha Virundhu',
    regionalTitle: 'பொங்கல் திருவிழா சிறப்பு விருந்து',
    dishTitle: 'Claypot Sakkarai Pongal & Medu Vada Combo',
    subtitle: 'Simmered with fresh harvest jaggery, pure ghee & whole cashews',
    description: 'Slow-cooked in clay pots with newly harvested raw rice, organic country jaggery, generous pure cow ghee, cardamom, and fried cashews. Paired with hot crispy Medu Vada and coconut chutney.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800',
    badge: 'Harvest Festive',
    discountBadge: 'BESTSELLER',
    price: 199,
    originalPrice: 249,
    servesCount: 'Serves 2',
    chefName: 'Thanjavur Amma Kaivannam',
    isPreBook: false,
    preBookSlot: 'Fresh Batch Ready Today',
  },
  {
    id: 'fest-diwali',
    festivalName: 'Diwali Homemade Palagaram Box',
    regionalTitle: 'தீபாவளி பாரம்பரிய பலகாரம்',
    dishTitle: '7-Item Traditional Ghee Sweets & Savory Box',
    subtitle: 'Melt-in-mouth Mysore Pak, Tirunelveli Halwa & Kai Murukku',
    description: 'Fresh festive celebration gift box containing Pure Ghee Mysore Pak, Wheat Halwa, Ribbon Pakoda, Thattai, Spicy Mixture, and handcrafted Kai Murukku made using stone-ground rice flour.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
    badge: 'Diwali Box',
    discountBadge: 'GIFT PACK',
    price: 399,
    originalPrice: 499,
    servesCount: '500g Assorted Box',
    chefName: 'Madurai Sweet Masters',
    isPreBook: true,
    preBookSlot: 'Pre-Order for Fresh Delivery',
  },
  {
    id: 'fest-eid',
    festivalName: 'Eid & Ramzan Dum Feast',
    regionalTitle: 'ஈத் ஸ்பெஷல் தம் பிரியாணி',
    dishTitle: 'Nawabi Mutton Dum Biryani & Shahi Tukda',
    subtitle: 'Seeraga Samba slow dum with Hyderabadi Mirchi Ka Salan',
    description: 'Tender marinated country mutton cooked on slow coal dum with seeraga samba rice, served with boiled egg, brinjal gravy, onion raita, and rich saffron-infused Shahi Tukda dessert.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800',
    badge: 'Eid Dum Special',
    discountBadge: 'LIMITED BATCH',
    price: 320,
    originalPrice: 380,
    servesCount: 'Serves 1-2',
    chefName: 'Bawarchi Ustad Kitchen',
    isPreBook: false,
    preBookSlot: 'Fresh Hot Dum at 1:00 PM',
  },
];
