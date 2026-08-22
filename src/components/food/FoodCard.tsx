import React from 'react';
import { Heart, Plus, Clock } from 'lucide-react';
import { FoodItem } from '../../types';
import { useAppStore } from '../../store/appStore';
import { BentoCard } from '../bento/BentoCard';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Rating } from '../common/Rating';

interface FoodCardProps {
  food: FoodItem;
  layout?: 'grid' | 'horizontal';
}

export const FoodCard: React.FC<FoodCardProps> = ({
  food,
  layout = 'grid',
}) => {
  const { setPage, setSelectedFood, addToCart, toggleFavorite, isFavorite } = useAppStore();
  const favorite = isFavorite(food.id);

  const handleCardClick = () => {
    setSelectedFood(food);
    setPage('food-detail');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(food, 1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(food.id);
  };

  if (layout === 'horizontal') {
    return (
      <BentoCard onClick={handleCardClick} padding="none" className="flex h-32">
        <div className="relative w-32 h-full flex-shrink-0">
          <ImageWithFallback src={food.image} alt={food.name} className="w-full h-full" />
          <button
            onClick={handleToggleFavorite}
            className="absolute top-2 left-2 p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-[#111111] hover:scale-110 active:scale-90 transition-transform"
          >
            <Heart
              size={14}
              className={favorite ? 'fill-red-500 text-red-500' : 'text-[#111111]'}
            />
          </button>
        </div>
        <div className="flex-1 p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-extrabold uppercase text-[#707070] truncate">
                {food.kitchenName}
              </span>
              <Rating rating={food.rating} />
            </div>
            <h3 className="text-sm font-black text-[#111111] line-clamp-1">
              {food.name}
            </h3>
            <p className="text-[11px] text-[#707070] line-clamp-1 mt-0.5">
              {food.description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/5">
            <span className="text-sm font-black text-[#111111]">
              ₹{food.price}
            </span>
            <button
              onClick={handleAddToCart}
              className="px-3 py-1 bg-[#FFD21F] text-[#111111] font-extrabold text-xs rounded-xl border border-[#111111] hover:bg-[#FFCC00] active:scale-95 transition-all flex items-center gap-1"
            >
              <Plus size={14} strokeWidth={3} />
              Add
            </button>
          </div>
        </div>
      </BentoCard>
    );
  }

  return (
    <BentoCard onClick={handleCardClick} padding="none" className="flex flex-col h-full">
      <div className="relative w-full h-36">
        <ImageWithFallback src={food.image} alt={food.name} className="w-full h-full" />

        {/* Favorite Heart Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-[#111111] hover:scale-110 active:scale-90 transition-all shadow-sm"
          aria-label="Save dish"
        >
          <Heart
            size={16}
            className={favorite ? 'fill-red-500 text-red-500' : 'text-[#111111]'}
          />
        </button>

        {/* Prep Time Tag */}
        <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[10px] font-bold">
          <Clock size={10} />
          {food.prepTime}
        </span>
      </div>

      <div className="p-3.5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] font-black uppercase text-[#707070] truncate">
              {food.kitchenName}
            </span>
            <Rating rating={food.rating} reviewCount={food.reviewCount} />
          </div>
          <h3 className="text-sm font-black text-[#111111] line-clamp-1 leading-snug">
            {food.name}
          </h3>
        </div>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-black/10">
          <span className="text-base font-black text-[#111111]">
            ₹{food.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-3.5 py-1.5 bg-[#FFD21F] text-[#111111] font-black text-xs rounded-xl border-2 border-[#111111] hover:bg-[#FFCC00] active:scale-95 transition-all flex items-center gap-1 shadow-sm"
          >
            <Plus size={14} strokeWidth={3} />
            Add
          </button>
        </div>
      </div>
    </BentoCard>
  );
};
