import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Clock } from 'lucide-react';
import { FoodItem } from '../../types';
import { useAppStore } from '../../store/appStore';

interface Mobile3Props {
  items: FoodItem[];
  title?: string;
  subtitle?: string;
  onItemSelect?: (item: FoodItem) => void;
  className?: string;
}

/**
 * FEAZTO Mobile3 Component
 * Chef's Special Spotlight Card Deck matching Master Reference Specs:
 * - Counter badge `1 / 6`
 * - Realistic South Indian food photography
 * - ANMMA KITCHEN glass chip top-left
 * - Lucide line heart icon top-right (yellow fill when saved)
 * - Cuisine tag & Prep time bottom-left over image
 * - Food Title & Description
 * - FEAZTO Yellow `Add` button connected to store cart
 */
export const Mobile3: React.FC<Mobile3Props> = ({
  items,
  title = "CHEF'S SPECIAL SPOTLIGHT",
  subtitle = "Swipe to discover today's featured authentic recipes",
  onItemSelect,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { addToCart, toggleFavorite, isFavorite, setPage, setSelectedFood, showToast } = useAppStore();

  if (!items || items.length === 0) return null;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleCardClick = (item: FoodItem) => {
    if (onItemSelect) {
      onItemSelect(item);
    } else {
      setSelectedFood(item);
      setPage('food-detail');
    }
  };

  const handleAddToCart = (e: React.MouseEvent, item: FoodItem) => {
    e.stopPropagation();
    addToCart(item);
  };

  const handleToggleFavorite = (e: React.MouseEvent, item: FoodItem) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  return (
    <div className={`w-full my-6 ${className}`}>
      {/* Header section matching Master Reference Spec */}
      <div className="flex items-center justify-between px-1 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFD21F] animate-pulse" />
            <h3 className="text-base font-black text-[#111111] tracking-tight uppercase">
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="text-xs text-gray-500 font-medium mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Counter pill (e.g. 1 / 6) matching reference screenshot */}
        <div className="bg-[#111111] text-[#FFD21F] text-xs font-black px-3 py-1 rounded-full border border-black/10 shadow-sm">
          <span>{activeIndex + 1}</span>
          <span className="opacity-60 px-1">/</span>
          <span>{items.length}</span>
        </div>
      </div>

      {/* Main Interactive Mobile3 Card Deck */}
      <div className="relative w-full h-[350px] flex items-center justify-center overflow-hidden touch-pan-y">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            const isCurrent = index === activeIndex;
            const isNext = index === (activeIndex + 1) % items.length;
            const isPrev = index === (activeIndex - 1 + items.length) % items.length;

            if (!isCurrent && !isNext && !isPrev) return null;

            let zIndex = 10;
            let scale = 0.88;
            let translateY = 16;
            let opacity = 0;
            let rotate = 0;

            if (isCurrent) {
              zIndex = 30;
              scale = 1;
              translateY = 0;
              opacity = 1;
              rotate = 0;
            } else if (isNext) {
              zIndex = 20;
              scale = 0.94;
              translateY = 12;
              opacity = 0.75;
              rotate = 2;
            } else if (isPrev) {
              zIndex = 10;
              scale = 0.88;
              translateY = 24;
              opacity = 0.4;
              rotate = -2;
            }

            const itemIsFav = isFavorite(item.id);

            return (
              <motion.div
                key={item.id}
                initial={{ scale: 0.8, opacity: 0, y: 30 }}
                animate={{ scale, opacity, y: translateY, rotate }}
                exit={{ scale: 0.7, opacity: 0, y: -40 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                onClick={() => isCurrent && handleCardClick(item)}
                className={`absolute inset-0 w-full h-full cursor-pointer select-none rounded-[32px] bg-white border-2 border-[#111111] shadow-[0_12px_36px_rgba(17,17,17,0.12)] overflow-hidden flex flex-col justify-between ${
                  !isCurrent ? 'pointer-events-none' : ''
                }`}
                style={{ zIndex }}
              >
                {/* Top Image Box with Cinematic Food Photography */}
                <div className="relative w-full h-[210px] overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Top Overlay Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111]/90 backdrop-blur-md text-[#FFD21F] text-[10px] font-black uppercase tracking-wider border border-[#FFD21F]/30 shadow-md">
                      <Sparkles size={11} className="fill-[#FFD21F]" />
                      <span>{item.kitchenName}</span>
                    </div>

                    {/* Lucide Line Heart Button */}
                    <button
                      onClick={(e) => handleToggleFavorite(e, item)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
                        itemIsFav
                          ? 'bg-[#FFD21F] text-[#111111] border-2 border-[#111111]'
                          : 'bg-[#FFD21F] text-[#111111] border-2 border-[#111111] hover:scale-105'
                      }`}
                      aria-label="Save dish"
                    >
                      <Heart
                        size={16}
                        strokeWidth={2.5}
                        className={itemIsFav ? 'fill-[#111111] text-[#111111]' : 'text-[#111111]'}
                      />
                    </button>
                  </div>

                  {/* Bottom Image Overlay: Category, Prep Time & Title */}
                  <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-[#FFD21F] text-[#111111] px-2.5 py-0.5 rounded">
                        {item.cuisine}
                      </span>
                      {item.prepTime && (
                        <span className="text-[11px] font-bold text-gray-200 flex items-center gap-1">
                          <Clock size={11} />
                          {item.prepTime}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xl font-black leading-tight text-white drop-shadow-sm">
                      {item.name}
                    </h4>
                  </div>
                </div>

                {/* Bottom Details & Add Button matching reference image */}
                <div className="p-3.5 bg-white flex-1 flex items-center justify-between gap-3">
                  <p className="text-xs text-gray-600 line-clamp-2 font-medium leading-snug flex-1">
                    {item.description}
                  </p>

                  <button
                    onClick={(e) => handleAddToCart(e, item)}
                    className="px-5 py-2.5 bg-[#FFD21F] hover:bg-[#FFCC00] text-[#111111] font-black text-xs rounded-xl border-2 border-[#111111] active:scale-95 transition-all shadow-md cursor-pointer whitespace-nowrap"
                  >
                    Add
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Swipe Navigation Buttons */}
      <div className="flex items-center justify-between mt-3 px-2">
        <button
          onClick={handlePrev}
          className="px-3.5 py-1.5 bg-white border border-[#111111] rounded-xl text-xs font-black text-[#111111] hover:bg-[#FAFAFA] active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          ← PREV DISH
        </button>

        {/* Slide indicators */}
        <div className="flex items-center gap-1.5">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'w-6 bg-[#FFD21F] border border-[#111111]' : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="px-3.5 py-1.5 bg-[#111111] text-[#FFD21F] rounded-xl text-xs font-black hover:bg-black/90 active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          NEXT DISH →
        </button>
      </div>
    </div>
  );
};
