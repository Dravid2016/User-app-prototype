import React from 'react';
import { useAppStore } from '../../store/appStore';

export const CultureHeroBanner: React.FC = () => {
  const { setPage } = useAppStore();

  return (
    <div 
      className="culture-hero-banner select-none cursor-pointer"
      onClick={() => setPage('regional-food')}
      role="button"
      tabIndex={0}
      aria-label="Explore Regional Tamil Nadu Culture and Food"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setPage('regional-food');
        }
      }}
    >
      <div className="culture-hero-img-wrap">
        <img
          src="/culture/tamil-nadu-culture-hero.png"
          alt="Tamil Nadu Food and Culture Heritage Skyline"
          className="culture-hero-img"
          loading="eager"
        />
      </div>
    </div>
  );
};
