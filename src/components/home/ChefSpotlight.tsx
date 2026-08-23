import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { chefSpotlights, ChefSpotlightItem } from '../../data/chefSpotlights';
import { SpotlightCard } from './SpotlightCard';
import { SpotlightPagination } from './SpotlightPagination';

export const ChefSpotlight: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { addToCart, toggleFavorite, isFavorite, setPage, setSelectedFood } = useAppStore();

  const total = chefSpotlights.length;
  if (total === 0) return null;

  const currentItem = chefSpotlights[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  // Convert ChefSpotlightItem to FoodItem on the fly to support cart and details
  const getFoodItem = (item: ChefSpotlightItem) => {
    return {
      id: item.id,
      name: item.title,
      price: item.price,
      image: item.image,
      description: item.description,
      prepTime: item.prepTime,
      rating: 4.8,
      reviewCount: 42,
      kitchenName: item.chef,
      cuisine: item.region,
      category: 'breakfast',
      isTrending: true,
      isPopular: true
    };
  };

  const handleAddToCart = (e: React.MouseEvent, item: ChefSpotlightItem) => {
    e.stopPropagation();
    addToCart(getFoodItem(item) as any);
  };

  const handleToggleFavorite = (e: React.MouseEvent, item: ChefSpotlightItem) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  const handleCardClick = (item: ChefSpotlightItem) => {
    setSelectedFood(getFoodItem(item) as any);
    setPage('food-detail');
  };

  return (
    <section className="spotlight-section">
      <div className="section-heading select-none">
        <div>
          <p className="section-kicker">CHEF'S SPECIAL SPOTLIGHT</p>
          <p className="section-subtitle">
            Swipe to discover today's featured authentic recipes
          </p>
        </div>

        <span className="section-counter">
          {activeIndex + 1}/{total}
        </span>
      </div>

      <SpotlightCard
        item={currentItem}
        isFav={isFavorite(currentItem.id)}
        onToggleFavorite={(e) => handleToggleFavorite(e, currentItem)}
        onAdd={(e) => handleAddToCart(e, currentItem)}
        onClick={() => handleCardClick(currentItem)}
      />

      <SpotlightPagination
        activeIndex={activeIndex}
        total={total}
        onPrev={handlePrev}
        onNext={handleNext}
        onDotClick={handleDotClick}
      />
    </section>
  );
};
