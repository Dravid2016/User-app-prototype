import React, { useState } from 'react';
import { ChefHat, ArrowLeft, Star, MapPin, Sparkles, Utensils } from 'lucide-react';
import { MOCK_COOKS } from '../data/cooks';
import { POPULAR_KITCHENS, PopularKitchenItem } from '../data/healthyCafeData';
import { CookCard } from '../components/cook/CookCard';
import { BookingModal } from '../components/cook/BookingModal';
import { QuickActionBar } from '../components/home/QuickActionBar';
import { Cook } from '../types';
import { useAppStore } from '../store/appStore';
import { BentoCard } from '../components/bento/BentoCard';
import { BentoButton } from '../components/bento/BentoButton';

export const BookACook: React.FC = () => {
  const { setPage, showToast } = useAppStore();
  const [selectedBookingCook, setSelectedBookingCook] = useState<Cook | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Home Chefs' },
    { id: 'breakfast', label: 'Tiffin & Breakfast' },
    { id: 'tanjore', label: 'Traditional Tanjore' },
    { id: 'chettinad', label: 'Chettinad Feast' },
  ];

  return (
    <div className="pb-24 pt-2 px-4 animate-fade-in text-left">
      {/* 1. Mode Switcher Bar (Feazto | Book a cook | Cafe) */}
      <div className="mb-3">
        <QuickActionBar />
      </div>

      {/* Hero Banner */}
      <div className="p-4 bg-[#111111] text-white rounded-[24px] border-2 border-black mb-5 relative overflow-hidden shadow-md">
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="inline-block px-2.5 py-0.5 bg-[#FFD21F] text-[#111111] text-[10px] font-black rounded-full uppercase">
              Private Home Chef & Kitchens
            </span>
            <span className="text-[10px] font-bold text-gray-300 flex items-center gap-1">
              <Sparkles size={11} className="text-[#FFD21F]" /> Verified Chefs
            </span>
          </div>

          <h2 className="text-xl font-black leading-tight text-white mb-1 tracking-tight">
            Authentic family recipes cooked live by veteran home chefs.
          </h2>
          <p className="text-xs text-gray-300 font-medium max-w-xs">
            Book top-rated home cooks for daily meals, private gatherings, or direct home kitchen orders.
          </p>
        </div>
      </div>

      {/* 2. Popular Kitchens Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-black text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
              <Utensils size={16} className="text-[#FFD21F]" /> Popular Home Kitchens
            </h3>
            <p className="text-[10px] font-bold text-[#707070]">
              Chennai's top-rated authentic family home kitchens
            </p>
          </div>
          <span className="text-[10px] font-black bg-[#111111] text-[#FFD21F] px-2 py-0.5 rounded-full">
            {POPULAR_KITCHENS.length} Kitchens
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {POPULAR_KITCHENS.map((kitchen: PopularKitchenItem) => (
            <BentoCard key={kitchen.id} padding="none" className="border-2 border-[#111111] overflow-hidden shadow-sm">
              <div className="relative h-32 w-full overflow-hidden">
                <img
                  src={kitchen.image}
                  alt={kitchen.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-2 right-2 bg-[#FFD21F] text-[#111111] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#111111] flex items-center gap-1">
                  <Star size={11} className="fill-[#111111]" /> {kitchen.rating} ({kitchen.reviewsCount})
                </div>
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h4 className="text-xs font-black drop-shadow-sm">{kitchen.name}</h4>
                  <p className="text-[10px] text-gray-200 font-medium flex items-center gap-1">
                    <MapPin size={11} className="text-[#FFD21F]" /> {kitchen.area} • {kitchen.deliveryTime}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white">
                <p className="text-xs font-bold text-[#111111] mb-2">
                  Specialty: <span className="text-[#707070] font-medium">{kitchen.specialty}</span>
                </p>

                {/* Dish Highlights */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {kitchen.featuredDishes.map((dish, i) => (
                    <span key={i} className="text-[9px] font-extrabold bg-[#FAFAFA] text-[#111111] px-2 py-0.5 rounded border border-black/10">
                      {dish}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-black/10">
                  <span className="text-[10px] font-black text-[#707070]">
                    Owner: <span className="text-[#111111] font-black">{kitchen.chefName}</span>
                  </span>
                  <button
                    onClick={() => {
                      showToast(`Opened ${kitchen.name} Menu`);
                      setPage('explore');
                    }}
                    className="px-3 py-1 bg-[#FFD21F] text-[#111111] text-xs font-black rounded-lg border border-[#111111] active:scale-95 transition-all shadow-xs cursor-pointer"
                  >
                    View Kitchen Menu →
                  </button>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>
      </div>

      {/* 3. Popular Home Chefs Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-black text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
              <ChefHat size={16} className="text-[#FFD21F]" /> Popular Home Cooks
            </h3>
            <p className="text-[10px] font-bold text-[#707070]">
              Hire veteran cooks to prepare meals at your house
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all border cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-[#FFD21F] text-[#111111] border-[#111111] shadow-xs'
                  : 'bg-[#FAFAFA] text-[#707070] border-black/10 hover:border-black'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cook List */}
        <div className="space-y-3">
          {MOCK_COOKS.map((cook) => (
            <CookCard
              key={cook.id}
              cook={cook}
              onBook={() => setSelectedBookingCook(cook)}
            />
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedBookingCook && (
        <BookingModal
          cook={selectedBookingCook}
          onClose={() => setSelectedBookingCook(null)}
        />
      )}
    </div>
  );
};

