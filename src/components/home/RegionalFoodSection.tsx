import React from 'react';
import { regionalFoods } from '../../data/regionalFoods';
import { RegionalFoodCard } from './RegionalFoodCard';

export const RegionalFoodSection: React.FC = () => {
  return (
    <section className="regional-section select-none">
      <div className="section-heading text-left mb-3">
        <div>
          <h2 className="regional-title">
            What's Cooking Across the South?
          </h2>
          <p className="section-subtitle">
            Traditional recipes, region by region
          </p>
        </div>
      </div>

      <div className="regional-scroller no-scrollbar">
        {regionalFoods.map((region) => (
          <RegionalFoodCard
            key={region.id}
            region={region}
          />
        ))}
      </div>
    </section>
  );
};
