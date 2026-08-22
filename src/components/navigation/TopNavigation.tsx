import React from 'react';
import { MapPin, Bell, ShoppingBag } from 'lucide-react';
import { FeaztoLogo } from '../brand/FeaztoLogo';
import { useAppStore } from '../../store/appStore';

export const TopNavigation: React.FC = () => {
  const { page, setPage, cartCount, showToast } = useAppStore();

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-black/5 px-4 py-3 flex items-center justify-between transition-all">
      {/* FEAZTO Logo Left - Rule 9: Every page MUST have FEAZTO logo at Top-Left */}
      <FeaztoLogo onClick={() => setPage('home')} size="md" />

      {/* Location Context (Only rendered on non-Home pages to prevent duplicate location header on Home) */}
      {page !== 'home' && (
        <div
          onClick={() => showToast('Location set to Chennai, TN')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] border border-black/10 rounded-full cursor-pointer hover:bg-black/5 transition-colors"
        >
          <MapPin size={14} className="text-[#FFD21F] fill-[#111111]" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-extrabold text-[#707070] uppercase leading-none">
              Deliver to
            </span>
            <span className="text-xs font-black text-[#111111] leading-tight flex items-center gap-0.5">
              Anna Nagar, Chennai
              <span className="text-[9px]">▼</span>
            </span>
          </div>
        </div>
      )}

      {/* Utilities Right */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => showToast('No new notifications')}
          className="w-9 h-9 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#111111] hover:bg-black/5 active:scale-95 transition-all cursor-pointer shadow-sm"
          aria-label="Notifications"
        >
          <Bell size={16} strokeWidth={2.2} />
        </button>

        <button
          onClick={() => setPage('cart')}
          className="relative w-9 h-9 rounded-full bg-[#FFD21F] border border-[#111111] flex items-center justify-center text-[#111111] hover:bg-[#FFCC00] active:scale-95 transition-all cursor-pointer shadow-sm"
          aria-label="Cart"
        >
          <ShoppingBag size={16} strokeWidth={2.5} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#111111] text-[#FFD21F] text-[10px] font-extrabold flex items-center justify-center border-2 border-white shadow-sm animate-pulse-yellow">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
