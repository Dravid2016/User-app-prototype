import React from 'react';
import { SearchBar } from '../common/SearchBar';
import { MapPin, Utensils, ChefHat, ChevronDown } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

/**
 * FoodHero Component
 * Rebuilt to match Master Reference Specs:
 * 1. Cultural skyline artwork sits under top branding, fading naturally into background.
 * 2. Location pill ("Anna Nagar, Chennai ˅") + Tagline ("food . culture . connect").
 * 3. Full-width Search Bar ("Search homemade & regional food...").
 * 4. Quick Actions:
 *    - diet meal: COMPACT, WHITE, BLACK BORDER, TEXT ONLY (NO icon, NO leaf, NO emoji)
 *    - FOOD APP: PRIMARY YELLOW (#FFD21F), BLACK BORDER, Utensils icon
 *    - BOOK COOK: SECONDARY BLACK (#111111), WHITE TEXT, ChefHat icon
 */
export const FoodHero: React.FC = () => {
  const { setPage, searchTerm, setSearchTerm, showToast } = useAppStore();

  return (
    <div className="relative w-full overflow-hidden mb-5 -mx-4 px-4 pt-1 pb-4">
      {/* 1. Cultural Hero Skyline Artwork (Visually light, fading into background) */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-0 overflow-hidden opacity-35 mix-blend-multiply">
        <img
          src="/culture/tamil-nadu-culture-hero.svg"
          alt="Tamil Nadu Cultural Skyline"
          className="w-full h-full object-cover object-top filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white" />
      </div>

      {/* 2. Content Structure matching Reference Specs */}
      <div className="relative z-10">
        
        {/* Row 1: Location Pill + Tagline */}
        <div className="flex items-center justify-between gap-2 mb-3.5 pt-1">
          {/* Location Selector Pill */}
          <div
            onClick={() => showToast('Location set to Anna Nagar, Chennai')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-[#111111] rounded-full cursor-pointer hover:bg-[#FAFAFA] active:scale-95 transition-all shadow-sm"
          >
            <MapPin size={13} className="text-[#111111] fill-[#FFD21F]" />
            <span className="text-xs font-black text-[#111111] tracking-tight">
              Anna Nagar, Chennai
            </span>
            <ChevronDown size={12} strokeWidth={2.5} className="text-[#111111]" />
          </div>

          {/* Branding Tagline */}
          <div className="text-right">
            <span className="text-xs font-black text-[#111111] tracking-tight lowercase">
              food . culture . connect
            </span>
          </div>
        </div>

        {/* Row 2: Search Bar */}
        <div className="mb-3.5">
          <SearchBar
            value={searchTerm}
            onChange={(val) => {
              setSearchTerm(val);
              if (val) setPage('explore');
            }}
            placeholder="Search homemade & regional food..."
          />
        </div>

        {/* Row 3: Quick Action Buttons Hierarchy */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {/* 1. Diet Meal: SMALL / COMPACT, TEXT ONLY (NO LOGO, NO ICON, NO LEAF, NO EMOJI) */}
          <button
            onClick={() => setPage('explore')}
            className="py-2 px-3.5 bg-white text-[#111111] border-2 border-[#111111] rounded-2xl font-black text-xs hover:bg-[#FAFAFA] active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            <span>diet meal</span>
          </button>

          {/* 2. FOOD APP: PRIMARY ACTION (FEAZTO Yellow #FFD21F) */}
          <button
            onClick={() => setPage('explore')}
            className="py-2 px-4 bg-[#FFD21F] text-[#111111] border-2 border-[#111111] rounded-2xl font-black text-xs flex items-center gap-1.5 hover:bg-[#FFCC00] active:scale-95 transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <Utensils size={14} strokeWidth={2.5} />
            <span>FOOD APP</span>
          </button>

          {/* 3. BOOK COOK: SECONDARY ACTION (Black #111111) */}
          <button
            onClick={() => setPage('book-a-cook')}
            className="py-2 px-4 bg-[#111111] text-white border-2 border-[#111111] rounded-2xl font-black text-xs flex items-center gap-1.5 hover:bg-black/90 active:scale-95 transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <ChefHat size={14} strokeWidth={2.5} className="text-[#FFD21F]" />
            <span>BOOK COOK</span>
          </button>
        </div>

      </div>
    </div>
  );
};
