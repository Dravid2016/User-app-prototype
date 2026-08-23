import React from 'react';
import { Bell, Heart } from 'lucide-react';
import { useAppStore } from '../../../store/appStore';
import './header.css';

interface HeaderProps {
  onNotificationClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNotificationClick,
}) => {
  const { page, setPage, cartCount, savedItemIds, showToast } = useAppStore();

  const handleNotificationClick = onNotificationClick || (() => {
    showToast('No new notifications');
  });

  const isSavedPage = page === 'saved';

  return (
    <header className="feazto-header select-none">
      <div className="feazto-header__inner">
        {/* Top Row: Logo & Actions */}
        <div className="feazto-header__top">
          <button
            onClick={() => setPage('home')}
            className="feazto-header__logo cursor-pointer border-none bg-transparent p-0 active:scale-95 transition-transform"
            aria-label="Feazto Home"
          >
            <img
              src="/brand/feazto-logo.png"
              alt="Feazto"
            />
          </button>

          <div className="feazto-header__actions">
            {/* Wishlist / Saved Icon (Moved to Header) */}
            <button
              type="button"
              className={`feazto-header__icon-button relative transition-colors ${
                isSavedPage ? 'bg-[#FFD21F] border-[#111111]' : ''
              }`}
              aria-label="Wishlist"
              onClick={() => setPage('saved')}
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
              type="button"
              className="feazto-header__icon-button relative"
              aria-label="Notifications"
              onClick={handleNotificationClick}
            >
              <Bell size={17} strokeWidth={1.8} />
              {cartCount > 0 && page !== 'home' && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#111111]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
