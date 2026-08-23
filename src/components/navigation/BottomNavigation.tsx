import React from 'react';
import { Home, Compass, ShoppingBag, Heart, User } from 'lucide-react';
import { AppPage } from '../../types';

interface BottomNavigationProps {
  active: AppPage;
  onChange: (page: AppPage) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  active,
  onChange,
}) => {
  const tabs = [
    { id: 'home' as AppPage, label: 'Home', icon: Home },
    { id: 'explore' as AppPage, label: 'Explore', icon: Compass },
    { id: 'orders' as AppPage, label: 'Orders', icon: ShoppingBag },
    { id: 'profile' as AppPage, label: 'You', icon: User },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-40 w-full bg-white/95 backdrop-blur-md border-t border-black/10 px-3 py-2 pb-safe shadow-[0_-4px_20px_rgba(17,17,17,0.06)]">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            (tab.id === 'home' && (active === 'home' || active === 'regional-food')) ||
            (tab.id === 'explore' && (active === 'explore' || active === 'food-detail' || active === 'cafes' || active === 'cafe-detail')) ||
            (tab.id === 'orders' && (active === 'orders' || active === 'cart' || active === 'checkout' || active === 'order-success')) ||
            (tab.id === 'saved' && active === 'saved') ||
            (tab.id === 'profile' && active === 'profile');

          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 cursor-pointer select-none ${
                isActive
                  ? 'text-[#111111] font-black scale-105'
                  : 'text-[#707070] font-semibold hover:text-[#111111]'
              }`}
            >
              <div
                className={`relative p-1.5 rounded-xl transition-colors ${
                  isActive ? 'bg-[#FFD21F] shadow-[0_2px_8px_rgba(255,210,31,0.4)]' : ''
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={isActive ? 'text-[#111111]' : ''}
                />
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
