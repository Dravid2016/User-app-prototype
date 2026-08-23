export interface StreakMilestone {
  day: number;
  label: string;
  reward: string;
  isUnlocked: boolean;
}

export interface HomeEventData {
  userStreak: {
    currentDays: number;
    targetDays: number;
    monthName: string;
    monthlyPrize: string;
    monthlyPrizeWorth: number;
    milestones: StreakMilestone[];
  };
  referral: {
    code: string;
    friendDiscount: number;
    userBonus: number;
    tierGifts: {
      invites: number;
      giftTitle: string;
      icon: string;
    }[];
  };
  deliveryPerk: {
    freeThreshold: number;
    riderSupportFee: number;
    headline: string;
    subtitle: string;
  };
}

export const HOME_EVENT_CONFIG: HomeEventData = {
  userStreak: {
    currentDays: 6,
    targetDays: 30,
    monthName: 'August 2026',
    monthlyPrize: 'Grand Family Feast Box + Golden Brass Tiffin Trophy',
    monthlyPrizeWorth: 1500,
    milestones: [
      { day: 7, label: '7-Day Spark', reward: 'Free Elaneer Payasam', isUnlocked: false },
      { day: 15, label: '15-Day Flame', reward: '20% OFF Weekend Meals', isUnlocked: false },
      { day: 30, label: '30-Day Legend', reward: '₹1500 Monthly Mega Feast', isUnlocked: false },
    ],
  },
  referral: {
    code: 'FEAZTO-AMMA-99',
    friendDiscount: 50,
    userBonus: 50,
    tierGifts: [
      { invites: 1, giftTitle: '₹50 Feazto Wallet Cash', icon: 'Wallet' },
      { invites: 3, giftTitle: 'Handcrafted Brass Filter Coffee Maker', icon: 'Coffee' },
      { invites: 5, giftTitle: 'Traditional Pure Ghee & Gunpowder Box', icon: 'Gift' },
    ],
  },
  deliveryPerk: {
    freeThreshold: 100,
    riderSupportFee: 25,
    headline: '100% Free Delivery on Orders Above ₹100',
    subtitle: 'Fair Rider Guarantee: For orders under ₹100, 100% of the ₹25 delivery fee goes directly to your local neighborhood delivery partner.',
  },
};
