import React, { useState } from 'react';
import { ArrowLeft, Star, Award, Clock, ChefHat, Check, ShieldCheck } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { FeaztoLogo } from '../components/brand/FeaztoLogo';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { BentoCard } from '../components/bento/BentoCard';
import { BentoButton } from '../components/bento/BentoButton';
import { BookingModal } from '../components/cook/BookingModal';

export const CookDetail: React.FC = () => {
  const { selectedCook, setPage } = useAppStore();
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!selectedCook) {
    return (
      <div className="p-6 text-center">
        <p>No cook selected.</p>
        <button onClick={() => setPage('book-a-cook')}>Back to Cook List</button>
      </div>
    );
  }

  return (
    <div className="pb-32 pt-3 px-4 animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage('book-a-cook')}
            className="w-9 h-9 rounded-full bg-[#FAFAFA] border border-black/10 flex items-center justify-center text-[#111111] hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <FeaztoLogo onClick={() => setPage('home')} size="sm" />
        </div>
        <span className="text-xs font-black uppercase text-[#111111] bg-[#FFD21F] px-3 py-1 rounded-full border border-[#111111]">
          Chef Profile
        </span>
      </div>

      {/* Hero Photo Card */}
      <BentoCard padding="none" className="mb-5 overflow-hidden border-2 border-black/10 shadow-md">
        <div className="relative w-full h-60">
          <ImageWithFallback src={selectedCook.image} alt={selectedCook.name} className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 text-white">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FFD21F] text-[#111111] text-xs font-black rounded-md mb-1">
                <Award size={13} /> {selectedCook.experience} Experience
              </span>
              <h1 className="text-xl font-black text-white leading-tight">
                {selectedCook.name}
              </h1>
              <p className="text-xs text-gray-200 font-medium">
                {selectedCook.title}
              </p>
            </div>
          </div>
        </div>
      </BentoCard>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        <div className="p-3 bg-[#FAFAFA] border border-black/10 rounded-2xl text-center">
          <span className="text-[10px] font-black text-[#707070] uppercase block">Rating</span>
          <div className="text-base font-black text-[#111111] flex items-center justify-center gap-1">
            <Star size={14} fill="#FFD21F" className="text-[#FFD21F]" />
            {selectedCook.rating}
          </div>
        </div>
        <div className="p-3 bg-[#FAFAFA] border border-black/10 rounded-2xl text-center">
          <span className="text-[10px] font-black text-[#707070] uppercase block">Reviews</span>
          <span className="text-base font-black text-[#111111]">{selectedCook.reviews}</span>
        </div>
        <div className="p-3 bg-[#FAFAFA] border border-black/10 rounded-2xl text-center">
          <span className="text-[10px] font-black text-[#707070] uppercase block">Price</span>
          <span className="text-base font-black text-[#111111]">₹{selectedCook.pricePerMeal}</span>
        </div>
      </div>

      {/* Biography */}
      <div className="mb-5">
        <h3 className="text-xs font-black uppercase text-[#707070] tracking-wider mb-1 px-1">
          Chef Bio & Culinary Background
        </h3>
        <p className="text-xs font-medium text-[#707070] leading-relaxed p-3 bg-white rounded-2xl border border-black/10">
          {selectedCook.bio}
        </p>
      </div>

      {/* Specialty Dishes */}
      <div className="mb-5">
        <h3 className="text-xs font-black uppercase text-[#707070] tracking-wider mb-2 px-1">
          Signature Dishes Prepared
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {selectedCook.dishes.map((dish, idx) => (
            <div
              key={idx}
              className="p-2.5 bg-[#FAFAFA] border border-black/10 rounded-xl text-xs font-bold text-[#111111] flex items-center gap-2"
            >
              <Check size={14} className="text-[#FFD21F] flex-shrink-0" strokeWidth={3} />
              <span className="truncate">{dish}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Available Slots */}
      <div className="mb-6">
        <h3 className="text-xs font-black uppercase text-[#707070] tracking-wider mb-2 px-1">
          Available Meal Slots
        </h3>
        <div className="space-y-2">
          {selectedCook.availableSlots.map((slot) => (
            <div
              key={slot}
              className="p-3 bg-white border border-black/10 rounded-xl text-xs font-bold text-[#111111] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Clock size={14} className="text-[#FFD21F]" />
                {slot}
              </span>
              <span className="text-[10px] font-black text-green-700 bg-green-50 px-2 py-0.5 rounded uppercase">
                Available
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white/95 backdrop-blur-md border-t-2 border-black/10 p-4 z-40">
        <BentoButton
          variant="primary"
          fullWidth
          size="lg"
          onClick={() => setShowBookingModal(true)}
          className="shadow-[0_8px_24px_rgba(255,210,31,0.4)]"
        >
          <ChefHat size={18} />
          Book {selectedCook.name} • ₹{selectedCook.pricePerMeal}
        </BentoButton>
      </div>

      {showBookingModal && (
        <BookingModal
          cook={selectedCook}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
};
