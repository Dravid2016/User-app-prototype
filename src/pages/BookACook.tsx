import React, { useState } from 'react';
import { ChefHat, ArrowLeft, Calendar, Award, Star } from 'lucide-react';
import { MOCK_COOKS } from '../data/cooks';
import { CookCard } from '../components/cook/CookCard';
import { BookingModal } from '../components/cook/BookingModal';
import { Cook } from '../types';
import { useAppStore } from '../store/appStore';
import { FeaztoLogo } from '../components/brand/FeaztoLogo';

export const BookACook: React.FC = () => {
  const { setPage } = useAppStore();
  const [selectedBookingCook, setSelectedBookingCook] = useState<Cook | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Home Chefs' },
    { id: 'breakfast', label: 'Tiffin & Breakfast' },
    { id: 'tanjore', label: 'Traditional Tanjore' },
    { id: 'chettinad', label: 'Chettinad Feast' },
  ];

  return (
    <div className="pb-24 pt-3 px-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage('home')}
            className="w-9 h-9 rounded-full bg-[#FAFAFA] border border-black/10 flex items-center justify-center text-[#111111] hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <FeaztoLogo onClick={() => setPage('home')} size="sm" />
        </div>
        <span className="text-[10px] font-black uppercase text-[#111111] bg-[#FFD21F] px-2.5 py-1 rounded-full border border-[#111111]">
          Book a Cook
        </span>
      </div>

      {/* Hero Banner */}
      <div className="p-4 bg-[#111111] text-white rounded-[24px] border-2 border-black mb-5 relative overflow-hidden">
        <div className="relative z-10">
          <span className="inline-block px-2.5 py-0.5 bg-[#FFD21F] text-[#111111] text-[10px] font-extrabold rounded-full mb-1">
            Private Home Chef Service
          </span>
          <h2 className="text-lg font-black leading-tight text-white mb-1">
            Experience authentic family recipes cooked live in your kitchen.
          </h2>
          <p className="text-xs text-gray-300 font-medium max-w-xs">
            Hand-picked veteran cooks for daily meals, family gatherings, and festivals.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all border ${
              activeFilter === f.id
                ? 'bg-[#FFD21F] text-[#111111] border-[#111111] shadow-sm'
                : 'bg-[#FAFAFA] text-[#707070] border-black/10 hover:border-black'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cook List */}
      <div>
        {MOCK_COOKS.map((cook) => (
          <CookCard
            key={cook.id}
            cook={cook}
            onBook={() => setSelectedBookingCook(cook)}
          />
        ))}
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
