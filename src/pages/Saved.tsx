import React from 'react';
import { Heart, Utensils } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { FoodCard } from '../components/food/FoodCard';
import { MOCK_FOODS } from '../data/foods';
import { EmptyState } from '../components/common/EmptyState';

export const Saved: React.FC = () => {
  const { savedItemIds, setPage } = useAppStore();

  const savedFoods = MOCK_FOODS.filter((food) => savedItemIds.includes(food.id));

  return (
    <div className="pb-24 pt-3 px-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-black text-[#111111] uppercase tracking-tight flex items-center gap-2">
          <Heart size={22} className="text-red-500 fill-red-500" />
          Saved Foods ({savedFoods.length})
        </h1>
      </div>

      {savedFoods.length > 0 ? (
        <div className="grid grid-cols-2 gap-3.5">
          {savedFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Heart}
          title="No Saved Dishes"
          description="Tap the heart icon on any dish to save it to your personal favorite collection."
          actionText="Explore Dishes"
          onAction={() => setPage('explore')}
        />
      )}
    </div>
  );
};
