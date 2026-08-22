import React, { useState } from 'react';
import { Cook } from '../../types';
import { BentoButton } from '../bento/BentoButton';
import { X, Calendar, Clock, Users, UtensilsCrossed, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

interface BookingModalProps {
  cook: Cook;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ cook, onClose }) => {
  const { showToast } = useAppStore();
  const [date, setDate] = useState('Today, Aug 21');
  const [slot, setSlot] = useState(cook.availableSlots[1] || '12:30 PM - Lunch');
  const [guests, setGuests] = useState(4);
  const [mealType, setMealType] = useState('Traditional Banana Leaf Feast');
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    showToast(`Cook booking confirmed with ${cook.name}!`);
  };

  if (confirmed) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-[24px] border-2 border-[#111111] p-6 max-w-xs w-full text-center animate-scale-up">
          <div className="w-16 h-16 bg-[#FFD21F] rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-[#111111]">
            <CheckCircle2 size={36} className="text-[#111111]" />
          </div>
          <h3 className="text-xl font-black text-[#111111] mb-1">
            Booking Confirmed!
          </h3>
          <p className="text-xs font-medium text-[#707070] mb-4">
            {cook.name} will arrive at your home on {date} at {slot}.
          </p>
          <div className="p-3 bg-[#FAFAFA] rounded-xl border border-black/10 text-left text-xs font-bold text-[#111111] mb-5 space-y-1">
            <div>• Meal: {mealType}</div>
            <div>• Guests: {guests} People</div>
            <div>• Total Fee: ₹{cook.pricePerMeal}</div>
          </div>
          <BentoButton variant="primary" fullWidth onClick={onClose}>
            Done
          </BentoButton>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-[28px] sm:rounded-[28px] border-t-2 sm:border-2 border-[#111111] p-5 max-w-sm w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-4">
          <div>
            <span className="text-[10px] font-black uppercase text-[#FFD21F] bg-[#111111] px-2 py-0.5 rounded">
              Book a Chef
            </span>
            <h3 className="text-base font-black text-[#111111] mt-0.5">
              Book {cook.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Date Selection */}
        <div className="mb-4">
          <label className="text-xs font-extrabold text-[#111111] flex items-center gap-1 mb-1.5">
            <Calendar size={14} className="text-[#FFD21F]" /> Select Date
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Today, Aug 21', 'Tomorrow', 'Saturday'].map((d) => (
              <button
                key={d}
                onClick={() => setDate(d)}
                className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all ${
                  date === d
                    ? 'bg-[#FFD21F] text-[#111111] border-[#111111] shadow-sm'
                    : 'bg-[#FAFAFA] text-[#707070] border-black/10 hover:border-black'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slot Selection */}
        <div className="mb-4">
          <label className="text-xs font-extrabold text-[#111111] flex items-center gap-1 mb-1.5">
            <Clock size={14} className="text-[#FFD21F]" /> Select Time Slot
          </label>
          <div className="space-y-2">
            {cook.availableSlots.map((s) => (
              <button
                key={s}
                onClick={() => setSlot(s)}
                className={`w-full py-2 px-3 text-xs font-bold rounded-xl border text-left transition-all ${
                  slot === s
                    ? 'bg-[#FFD21F] text-[#111111] border-[#111111] shadow-sm'
                    : 'bg-[#FAFAFA] text-[#707070] border-black/10 hover:border-black'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Guest Count */}
        <div className="mb-4">
          <label className="text-xs font-extrabold text-[#111111] flex items-center gap-1 mb-1.5">
            <Users size={14} className="text-[#FFD21F]" /> Number of Guests
          </label>
          <div className="flex items-center justify-between p-3 bg-[#FAFAFA] border border-black/10 rounded-xl">
            <span className="text-xs font-bold text-[#111111]">{guests} People</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-7 h-7 rounded-lg bg-white border border-black/20 text-[#111111] font-black"
              >
                -
              </button>
              <button
                onClick={() => setGuests(guests + 1)}
                className="w-7 h-7 rounded-lg bg-[#FFD21F] border border-[#111111] text-[#111111] font-black"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Meal Type */}
        <div className="mb-5">
          <label className="text-xs font-extrabold text-[#111111] flex items-center gap-1 mb-1.5">
            <UtensilsCrossed size={14} className="text-[#FFD21F]" /> Meal Preference
          </label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full h-11 px-3 bg-[#FAFAFA] border border-black/10 rounded-xl text-xs font-bold text-[#111111] focus:outline-none"
          >
            <option>Traditional Banana Leaf Feast</option>
            <option>Chettinad Special Dinner</option>
            <option>Pure Veg Sattvic Lunch</option>
            <option>South Indian Breakfast Spread</option>
          </select>
        </div>

        <BentoButton variant="primary" fullWidth onClick={handleConfirm}>
          Confirm Booking • ₹{cook.pricePerMeal}
        </BentoButton>
      </div>
    </div>
  );
};
