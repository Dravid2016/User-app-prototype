import React, { useState } from 'react';
import { ArrowLeft, Share2, Heart, Clock, Shield, Star, Plus } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { FeaztoLogo } from '../components/brand/FeaztoLogo';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { QuantityControl } from '../components/common/QuantityControl';
import { BentoButton } from '../components/bento/BentoButton';
import { BentoCard } from '../components/bento/BentoCard';
import { FoodCard } from '../components/food/FoodCard';
import { MOCK_FOODS } from '../data/foods';

export const FoodDetail: React.FC = () => {
  const {
    selectedFood,
    setPage,
    addToCart,
    toggleFavorite,
    isFavorite,
    showToast,
  } = useAppStore();
  const [quantity, setQuantity] = useState(1);

  if (!selectedFood) {
    return (
      <div className="p-6 text-center">
        <p>No food selected.</p>
        <button onClick={() => setPage('home')}>Back to Home</button>
      </div>
    );
  }

  const favorite = isFavorite(selectedFood.id);
  const relatedFoods = MOCK_FOODS.filter((f) => f.id !== selectedFood.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(selectedFood, quantity);
    setPage('cart');
  };

  const handleShare = () => {
    showToast(`Link to ${selectedFood.name} copied to clipboard!`);
  };

  return (
    <div className="pb-32 pt-2 px-4 animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between py-2 mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage('explore')}
            className="w-9 h-9 rounded-full bg-[#FAFAFA] border border-black/10 flex items-center justify-center text-[#111111] hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <FeaztoLogo onClick={() => setPage('home')} size="sm" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase text-[#111111] bg-[#FFD21F] px-2.5 py-1 rounded-full border border-[#111111] hidden sm:inline-block">
            {selectedFood.kitchenName}
          </span>
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-[#FAFAFA] border border-black/10 flex items-center justify-center text-[#111111] hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
          >
            <Share2 size={16} />
          </button>
          <button
            onClick={() => toggleFavorite(selectedFood.id)}
            className="w-9 h-9 rounded-full bg-[#FAFAFA] border border-black/10 flex items-center justify-center text-[#111111] hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
          >
            <Heart
              size={16}
              className={favorite ? 'fill-red-500 text-red-500' : 'text-[#111111]'}
            />
          </button>
        </div>
      </div>

      {/* Cinematic Large Food Photo */}
      <BentoCard padding="none" className="mb-5 overflow-hidden border-2 border-black/10 shadow-lg">
        <div className="relative w-full h-64">
          <ImageWithFallback src={selectedFood.image} alt={selectedFood.name} className="w-full h-full" />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 bg-[#111111]/80 backdrop-blur-md text-[#FFD21F] text-[10px] font-black rounded-lg border border-[#FFD21F]">
              {selectedFood.cuisine}
            </span>
            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#111111] text-[10px] font-extrabold rounded-lg flex items-center gap-1">
              <Clock size={11} />
              {selectedFood.prepTime}
            </span>
          </div>
        </div>
      </BentoCard>

      {/* Product Details Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h1 className="text-2xl font-black text-[#111111] leading-tight">
              {selectedFood.name}
            </h1>
            <p className="text-xs font-bold text-[#707070] mt-0.5">
              Prepared fresh by {selectedFood.kitchenName}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-black text-[#111111]">
              ₹{selectedFood.price}
            </div>
            <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
              Inclusive of taxes
            </span>
          </div>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-3 py-2 px-3 bg-[#FAFAFA] rounded-2xl border border-black/10 mb-4">
          <div className="flex items-center gap-1 bg-[#FFD21F] px-2 py-1 rounded-xl text-xs font-black text-[#111111]">
            <Star size={14} fill="#111111" strokeWidth={0} />
            {selectedFood.rating}
          </div>
          <span className="text-xs font-bold text-[#111111]">
            {selectedFood.reviewCount} Verified Customer Reviews
          </span>
        </div>

        {/* Description */}
        <p className="text-xs font-medium text-[#707070] leading-relaxed mb-4">
          {selectedFood.description}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between p-3.5 bg-white border-2 border-black/10 rounded-2xl shadow-sm mb-6">
          <span className="text-xs font-extrabold text-[#111111]">
            Select Quantity
          </span>
          <QuantityControl
            quantity={quantity}
            onIncrease={() => setQuantity(quantity + 1)}
            onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
            size="md"
          />
        </div>
      </div>

      {/* You May Also Like */}
      <div className="mb-6">
        <h3 className="text-sm font-black text-[#111111] uppercase tracking-wide mb-3">
          You May Also Like
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {relatedFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white/95 backdrop-blur-md border-t-2 border-black/10 p-4 z-40">
        <BentoButton
          variant="primary"
          fullWidth
          size="lg"
          onClick={handleAddToCart}
          className="shadow-[0_8px_24px_rgba(255,210,31,0.4)]"
        >
          <Plus size={18} strokeWidth={3} />
          Add to Cart • ₹{selectedFood.price * quantity}
        </BentoButton>
      </div>
    </div>
  );
};
