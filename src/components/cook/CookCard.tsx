import React from 'react';
import { Cook } from '../../types';
import { BentoCard } from '../bento/BentoCard';
import { BentoButton } from '../bento/BentoButton';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Rating } from '../common/Rating';
import { ChefHat, Award, Clock } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

interface CookCardProps {
  cook: Cook;
  onBook: () => void;
}

export const CookCard: React.FC<CookCardProps> = ({ cook, onBook }) => {
  const { setSelectedCook, setPage } = useAppStore();

  const handleViewProfile = () => {
    setSelectedCook(cook);
    setPage('cook-detail');
  };

  return (
    <BentoCard padding="none" className="mb-4 flex flex-col border-2 border-black/10 shadow-sm">
      <div className="relative w-full h-44">
        <ImageWithFallback src={cook.image} alt={cook.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 text-white">
          <div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#FFD21F] text-[#111111] text-[10px] font-black rounded-md mb-1">
              <Award size={11} />
              {cook.experience} Exp
            </span>
            <h3 className="text-base font-black text-white leading-tight">
              {cook.name}
            </h3>
            <p className="text-xs text-gray-200 font-medium">
              {cook.title}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white flex flex-col justify-between flex-1">
        <div className="flex items-center justify-between mb-2">
          <Rating rating={cook.rating} reviewCount={cook.reviews} />
          <span className="text-sm font-black text-[#111111]">
            ₹{cook.pricePerMeal} <span className="text-[10px] text-[#707070] font-bold">/ meal</span>
          </span>
        </div>

        <p className="text-xs text-[#707070] font-medium line-clamp-2 mb-3">
          {cook.specialty}
        </p>

        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          {cook.dishes.slice(0, 3).map((dish, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-[#FAFAFA] border border-black/10 rounded-lg text-[10px] font-extrabold text-[#111111]"
            >
              {dish}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-black/10">
          <button
            onClick={handleViewProfile}
            className="flex-1 py-2 px-3 bg-[#FAFAFA] text-[#111111] text-xs font-bold rounded-xl border border-black/10 hover:bg-black/5 transition-colors"
          >
            View Profile
          </button>
          <BentoButton
            variant="primary"
            size="sm"
            onClick={onBook}
            className="flex-1"
          >
            <ChefHat size={14} />
            Book Cook
          </BentoButton>
        </div>
      </div>
    </BentoCard>
  );
};
