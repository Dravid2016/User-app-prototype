export interface CommunityPost {
  id: string;
  kitchenName: string;
  chefName: string;
  chefAvatar: string;
  location: string;
  isVerifiedChef: boolean;
  timestamp: string;
  category: 'Live Cooking' | 'Hygiene & Prep' | 'Special Menu Pitch' | 'Chef Story';
  statusBadge?: string;
  caption: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  ratingScore: number;
  rewardTier: 'Gold Kitchen' | 'Platinum Chef' | 'Rising Star';
  dishTags: string[];
  commentsList: {
    id: string;
    userName: string;
    userAvatar: string;
    text: string;
    timeAgo: string;
  }[];
}

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    kitchenName: 'Amma Samayal Kitchen',
    chefName: 'Chef Lakshmi Amma',
    chefAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    location: 'Anna Nagar West, Chennai',
    isVerifiedChef: true,
    timestamp: '10 mins ago',
    category: 'Live Cooking',
    statusBadge: '🔥 Fresh Batch Ready in 15 Mins!',
    caption: 'Preparing authentic Tanjore Kalyana Sapphire Meals with 14 traditional items! Hand-ground masala and cold-pressed sesame oil used exclusively. Book your afternoon lunch thali now! 🌿🍲',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80',
    likesCount: 142,
    commentsCount: 28,
    sharesCount: 19,
    isLiked: true,
    ratingScore: 4.9,
    rewardTier: 'Platinum Chef',
    dishTags: ['Tanjore Meal', 'Pure Veg', 'Fresh Batch'],
    commentsList: [
      {
        id: 'c1',
        userName: 'Ramesh Kumar',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        text: 'Lakshmi Amma, ordering 3 thalis right now! Your rasam is unmatched.',
        timeAgo: '5m ago',
      },
      {
        id: 'c2',
        userName: 'Priya Sundaram',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        text: 'Is the payasam included in today\'s special thali batch?',
        timeAgo: '2m ago',
      },
    ],
  },
  {
    id: 'post-2',
    kitchenName: 'Kongu Naadu Kitchen',
    chefName: 'Chef Murugan V.',
    chefAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    location: 'T. Nagar, Chennai',
    isVerifiedChef: true,
    timestamp: '25 mins ago',
    category: 'Special Menu Pitch',
    statusBadge: '🍗 Seeraga Samba Chicken Biryani Pitch',
    caption: 'Pitching today\'s special Kongu Nattu Chicken Biryani cooked slow over woodfire in brass uruli! 0% artificial color, 100% farm-raised country chicken. Pitching for the Weekly Feazto Top Kitchen Award! 🏆',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    likesCount: 218,
    commentsCount: 45,
    sharesCount: 34,
    isLiked: false,
    ratingScore: 4.85,
    rewardTier: 'Gold Kitchen',
    dishTags: ['Kongu Biryani', 'Seeraga Samba', 'Woodfire'],
    commentsList: [
      {
        id: 'c3',
        userName: 'Karthik Raja',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        text: 'Best Biryani in T. Nagar! Chef Murugan deserves the gift voucher this week!',
        timeAgo: '12m ago',
      },
    ],
  },
  {
    id: 'post-3',
    kitchenName: 'Chettinad Magic Kitchen',
    chefName: 'Chef Meenakshi Achi',
    chefAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    location: 'Adyar, Chennai',
    isVerifiedChef: true,
    timestamp: '1 hour ago',
    category: 'Hygiene & Prep',
    statusBadge: '✨ 100% Stainless Steel & Organic Prep',
    caption: 'Cleanliness is our culture! Here is a sneak peek into our kitchen sanitization routine before we start dinner orders for Special Egg Kothu Parotta & Pepper Chicken. Pure quality homemade food. ❤️',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    likesCount: 310,
    commentsCount: 52,
    sharesCount: 41,
    isLiked: true,
    ratingScore: 4.95,
    rewardTier: 'Platinum Chef',
    dishTags: ['Hygiene Approved', 'Chettinad', 'Dinner Special'],
    commentsList: [
      {
        id: 'c4',
        userName: 'Deepak V.',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
        text: 'So hygienic! Love ordering from Chettinad Magic for family weekend dinners.',
        timeAgo: '35m ago',
      },
    ],
  },
];

export interface KitchenRewardLeaderboard {
  rank: number;
  kitchenName: string;
  chefName: string;
  chefAvatar: string;
  ratingScore: number;
  likesCount: number;
  giftReward: string;
  badge: string;
}

export const KITCHEN_LEADERBOARD: KitchenRewardLeaderboard[] = [
  {
    rank: 1,
    kitchenName: 'Chettinad Magic Kitchen',
    chefName: 'Chef Meenakshi Achi',
    chefAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    ratingScore: 4.95,
    likesCount: 1240,
    giftReward: '₹5,000 Kitchen Equipment Gift Voucher',
    badge: '🥇 #1 Kitchen Pitch',
  },
  {
    rank: 2,
    kitchenName: 'Amma Samayal Kitchen',
    chefName: 'Chef Lakshmi Amma',
    chefAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    ratingScore: 4.9,
    likesCount: 980,
    giftReward: '₹3,000 Pure Ghee & Spice Hamper',
    badge: '🥈 #2 Top Rated',
  },
  {
    rank: 3,
    kitchenName: 'Kongu Naadu Kitchen',
    chefName: 'Chef Murugan V.',
    chefAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    ratingScore: 4.85,
    likesCount: 820,
    giftReward: '₹2,000 Organic Ingredients Box',
    badge: '🥉 #3 Trending',
  },
];
