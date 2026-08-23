import React from 'react';
import { useAppStore } from '../../store/appStore';
import { Bell, Heart } from 'lucide-react';

export const HomeHeader: React.FC = () => {
  const { page, setPage, savedItemIds, showToast } = useAppStore();

  const isSavedPage = page === 'saved';

  return (
    <header className="home-header select-none">
      <div 
        onClick={() => setPage('home')}
        className="home-brand cursor-pointer active:scale-95 transition-transform"
      >
        <img
          src="/brand/feazto-logo.png"
          alt="Feazto"
          className="home-logo"
        />
      </div>

      <div className="header-actions">
        {/* Wishlist / Saved Icon (Moved to Header) */}
        <button
          onClick={() => setPage('saved')}
          className={`header-icon-button relative transition-colors ${
            isSavedPage ? 'bg-[#FFD21F] border-[#111111]' : ''
          }`}
          aria-label="Wishlist"
          type="button"
        >
          <Heart
            size={17}
            strokeWidth={2.2}
            className={savedItemIds.length > 0 || isSavedPage ? 'fill-[#111111] text-[#111111]' : 'text-[#111111]'}
          />
          {savedItemIds.length > 0 && (
            <span className="absolute -top-1 -right-1 min-w-4 h-4 rounded-full bg-[#111111] text-[#FFD21F] text-[9px] font-black flex items-center justify-center px-1 shadow-[0_1px_0_#000000]">
              {savedItemIds.length}
            </span>
          )}
        </button>

        {/* Notifications Button */}
        <button
          onClick={() => showToast('No new notifications')}
          className="header-icon-button"
          aria-label="Notifications"
          type="button"
        >
          <span className="notification-dot" />
          <Bell size={17} strokeWidth={1.8} className="text-[#111111]" />
        </button>
      </div>
    </header>
  );
};
