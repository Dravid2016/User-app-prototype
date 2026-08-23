export interface RakhiFestiveItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
  giftTag: string;
  serves: string;
  isBestseller?: boolean;
}

export const RAKSHA_BANDHAN_CONFIG = {
  festivalDate: 'August 28, 2026',
  countdownDays: 5,
  couponCode: 'RAKHI28',
  couponDiscountText: 'FLAT ₹100 OFF on Sibling Feasts above ₹299',
  freeGiftText: 'Free Handcrafted Silk Rakhi + Roli Chawal with every box',
  items: [
    {
      id: 'rakhi-mithai-box',
      title: 'Shahi Kaju Katli & Motichoor Rakhi Thali',
      subtitle: 'Pure Ghee Sweets + Free Silk Rakhi & Roli Chawal',
      description: 'Handcrafted diamond-cut Kaju Katli made with premium Goan cashews and golden Motichoor Ladoos. Packed in a festive brass celebration thali with a designer silk Rakhi.',
      price: 299,
      originalPrice: 399,
      discount: '25% OFF',
      image: '/festivals/raksha-bandhan/rakhi-sweets-thali.jpg',
      giftTag: 'FREE DESIGNER RAKHI INCLUDED',
      serves: '450g Gift Thali',
      isBestseller: true,
    },
    {
      id: 'rakhi-sibling-feast',
      title: 'Sibling Celebration Grand Meal Combo (for 2)',
      subtitle: 'Paneer Makhani, Butter Naan, Ghee Pulao, Samosas & Gulab Jamun',
      description: 'A grand homemade celebration feast for brother & sister: Rich Paneer Makhani in copper handi, Butter Naans, Ghee Jeera Rice, 4 Crispy Samosas, 2 Kesar Badam Milk bottles and hot Gulab Jamuns.',
      price: 349,
      originalPrice: 499,
      discount: '30% OFF',
      image: '/festivals/raksha-bandhan/rakhi-sibling-feast.jpg',
      giftTag: 'PERFECT FOR BROTHER & SISTER',
      serves: 'Serves 2-3',
      isBestseller: true,
    },
    {
      id: 'rakhi-rasmalai-ladoo',
      title: 'Saffron Rasmalai & Motichoor Ladoo Platter',
      subtitle: 'Melt-in-mouth Rabri Rasmalai with Pistachio Ladoos',
      description: 'Spongy fresh cottage cheese discs soaked in saffron-cardamom clotted milk rabri paired with golden pure cow ghee motichoor ladoos and decorative silk Rakhi.',
      price: 249,
      originalPrice: 320,
      discount: '22% OFF',
      image: '/festivals/raksha-bandhan/rakhi-rasmalai-box.jpg',
      giftTag: 'FRESH BATCH FOR AUG 28',
      serves: 'Serves 2-4',
    },
    {
      id: 'rakhi-mysore-besan',
      title: 'South & North Festive Sweet Box',
      subtitle: 'Ghee Mysore Pak & Traditional Besan Ladoo Platter',
      description: 'A harmonious blend of South Indian melt-in-mouth Pure Ghee Mysore Pak and slow-roasted aromatic Besan Ladoos garnished with almond flakes and silk Rakhi thread.',
      price: 220,
      originalPrice: 280,
      discount: '21% OFF',
      image: '/festivals/raksha-bandhan/rakhi-mysore-besan.jpg',
      giftTag: '100% HOMEMADE PURE GHEE',
      serves: '350g Box',
    }
  ] as RakhiFestiveItem[]
};
