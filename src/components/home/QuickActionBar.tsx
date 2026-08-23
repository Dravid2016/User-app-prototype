import React from 'react';
import { useAppStore } from '../../store/appStore';
import { Utensils, ChefHat, Coffee } from 'lucide-react';

export const QuickActionBar: React.FC = () => {
  const { page, setPage } = useAppStore();

  const isFeaztoActive = page === 'home' || page === 'regional-food' || page === 'explore' || page === 'food-detail';
  const isBookCookActive = page === 'book-a-cook' || page === 'cook-detail';
  const isCafeActive = page === 'cafes' || page === 'cafe-detail';

  const actions = [
    {
      id: 'feazto',
      label: 'Feazto',
      icon: Utensils,
      isActive: isFeaztoActive,
      onClick: () => setPage('home'),
    },
    {
      id: 'book-cook',
      label: 'Book a cook',
      icon: ChefHat,
      isActive: isBookCookActive,
      onClick: () => setPage('book-a-cook'),
    },
    {
      id: 'cafe',
      label: 'Cafe',
      icon: Coffee,
      isActive: isCafeActive,
      onClick: () => setPage('cafes'),
    },
  ];

  return (
    <div className="quick-actions select-none">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`quick-action transition-all cursor-pointer ${
              action.isActive ? 'quick-action-active' : ''
            }`}
            data-type={action.isActive ? 'food' : 'default'}
            type="button"
          >
            <span
              className={`quick-action-dot ${
                action.isActive ? 'bg-[#111111]' : 'bg-[#FFD21F]'
              }`}
            />
            <Icon size={13} className="mr-1 inline-block" />
            {action.label}
          </button>
        );
      })}
    </div>
  );
};

