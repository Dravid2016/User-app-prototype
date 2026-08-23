import React from 'react';
import { Utensils, ChefHat, Leaf } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

export const FoodHero: React.FC = () => {
  const { setPage } = useAppStore();

  return (
    <div className="w-full mb-5 select-none pt-1">
      {/* Quick Action Buttons Hierarchy */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {/* 1. Diet Meal: COMPACT, WHITE, BLACK BORDER, LEAF ICON */}
        <button
          onClick={() => setPage('explore')}
          className="py-2 px-3.5 bg-white text-[#111111] border-2 border-[#111111] rounded-2xl font-black text-xs flex items-center gap-1.5 hover:bg-[#FAFAFA] active:scale-95 transition-all shadow-[0_2px_0_#111111] cursor-pointer whitespace-nowrap animate-fade-in"
        >
          <Leaf size={14} className="text-[#111111] fill-transparent" strokeWidth={2.2} />
          <span>diet meal</span>
        </button>

        {/* 2. FOOD APP: PRIMARY ACTION (FEAZTO Yellow #FFD21F) */}
        <button
          onClick={() => setPage('explore')}
          className="py-2 px-4 bg-[#FFD21F] text-[#111111] border-2 border-[#111111] rounded-2xl font-black text-xs flex items-center gap-1.5 hover:bg-[#FFCC00] active:scale-95 transition-all shadow-[0_2px_0_#111111] cursor-pointer whitespace-nowrap"
        >
          <Utensils size={14} strokeWidth={2.5} />
          <span>FOOD APP</span>
        </button>

        {/* 3. BOOK COOK: SECONDARY ACTION (Black #111111) */}
        <button
          onClick={() => setPage('book-a-cook')}
          className="py-2 px-4 bg-[#111111] text-white border-2 border-[#111111] rounded-2xl font-black text-xs flex items-center gap-1.5 hover:bg-black/90 active:scale-95 transition-all shadow-[0_2px_0_#111111] cursor-pointer whitespace-nowrap"
        >
          <ChefHat size={14} strokeWidth={2.5} className="text-[#FFD21F]" />
          <span>BOOK COOK</span>
        </button>
      </div>
    </div>
  );
};
