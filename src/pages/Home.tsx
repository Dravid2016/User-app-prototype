import React from 'react';
import { FoodHero } from '../components/food/FoodHero';
import { BentoSection } from '../components/bento/BentoSection';
import { BentoCard } from '../components/bento/BentoCard';
import { KitchenCard } from '../components/food/KitchenCard';
import { FoodCard } from '../components/food/FoodCard';
import { CategoryCard } from '../components/food/CategoryCard';
import { MOCK_KITCHENS } from '../data/kitchens';
import { MOCK_FOODS } from '../data/foods';
import { MOCK_CATEGORIES } from '../data/categories';
import { useAppStore } from '../store/appStore';

import { Mobile3 } from '../components/mobile/Mobile3';

export const Home: React.FC = () => {
  const { setPage } = useAppStore();

  const popularFoods = MOCK_FOODS.filter((f) => f.isPopular);
  const spotlightFoods = MOCK_FOODS.filter((f) => f.isTrending || f.isPopular);

  return (
    <div className="pb-24 pt-0 px-4">
      {/* 1. Cultural Hero & Frame 90 Top Section Composition */}
      <FoodHero />

      {/* 2. Live Status Bar (Master Reference Specs) */}
      <div className="mb-6 px-4 py-3 bg-[#111111] text-white rounded-full flex items-center justify-between text-xs font-black shadow-md border border-black/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFD21F] animate-pulse-yellow" />
          <span className="font-black text-[#FFD21F] tracking-wide">LIVE IN CHENNAI</span>
          <span className="text-gray-200 font-medium">| 42 Home Chefs Active</span>
        </div>
        <span className="text-xs font-bold text-gray-300">Anna Nagar</span>
      </div>

      {/* 3. FEAZTO Mobile-3 Interactive Spotlight Deck */}
      <Mobile3
        items={spotlightFoods}
        title="Chef's Special Spotlight"
        subtitle="Swipe to discover today's featured authentic recipes"
      />

      {/* 4. Browse Categories */}
      <BentoSection title="Regional Categories" subtitle="Select your craving">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {MOCK_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </BentoSection>

      {/* 4. Popular Home Kitchens */}
      <BentoSection
        title="Popular Home Kitchens"
        subtitle="Verified authentic home chefs"
        badge="Top Rated"
        actionText="View All"
        onAction={() => setPage('explore')}
      >
        <div className="flex items-center gap-3.5 overflow-x-auto no-scrollbar pb-2">
          {MOCK_KITCHENS.map((kitchen) => (
            <KitchenCard key={kitchen.id} kitchen={kitchen} />
          ))}
        </div>
      </BentoSection>

      {/* 5. Popular / Trending Regional Food */}
      <BentoSection
        title="Popular Foods Near You"
        subtitle="Most loved traditional South Indian recipes"
        badge="Trending"
        actionText="Explore"
        onAction={() => setPage('explore')}
      >
        <div className="grid grid-cols-2 gap-3.5">
          {popularFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </BentoSection>
    </div>
  );
};
