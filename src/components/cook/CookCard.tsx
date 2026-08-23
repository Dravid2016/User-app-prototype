import React from 'react';
import { Cook } from '../../types';
import { BentoCard } from '../bento/BentoCard';
import { BentoButton } from '../bento/BentoButton';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Rating } from '../common/Rating';
import { ChefHat, Award, ShieldCheck } from 'lucide-react';
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

  const defaultCover = "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80";

  return (
    <BentoCard padding="none" className="mb-4 flex flex-col border-2 border-[#111111] overflow-hidden shadow-sm hover:shadow-md transition-all text-left">
      {/* Kitchen Specialty Banner Header */}
      <div className="relative w-full h-28 bg-[#111111] overflow-hidden group">
        <img
          src={cook.coverImage || defaultCover}
          alt="Kitchen specialty"
          className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 bg-[#111111] text-[#FFD21F] text-[9.5px] font-black px-2.5 py-0.5 rounded-full border border-[#FFD21F] flex items-center gap-1 shadow-xs">
          <ShieldCheck size={11} className="text-[#FFD21F]" /> Verified Chef
        </div>

        <div className="absolute top-2.5 right-2.5 bg-[#FFD21F] text-[#111111] text-[9.5px] font-black px-2.5 py-0.5 rounded-full border border-[#111111] flex items-center gap-1 shadow-xs">
          <Award size={11} /> {cook.experience} Exp
        </div>

        {/* Round Profile Avatar Badge (Overlapping Bottom Edge) */}
        <div className="absolute -bottom-6 left-3.5 w-16 h-16 rounded-full border-2 border-[#111111] bg-white overflow-hidden shadow-md z-10 shrink-0">
          <ImageWithFallback
            src={cook.image}
            alt={cook.name}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="pt-7 px-3.5 pb-3.5 bg-white flex flex-col justify-between flex-1">
        <div className="mb-2">
          <h3 className="text-base font-black text-[#111111] leading-tight">
            {cook.name}
          </h3>
          <p className="text-xs font-bold text-[#707070]">
            {cook.title}
          </p>
        </div>

        <div className="flex items-center justify-between mb-2">
          <Rating rating={cook.rating} reviewCount={cook.reviews} />
          <span className="text-sm font-black text-[#111111]">
            ₹{cook.pricePerMeal} <span className="text-[10px] text-[#707070] font-bold">/ meal</span>
          </span>
        </div>

        <p className="text-xs text-[#707070] font-bold leading-snug line-clamp-2 mb-2.5">
          Specialty: <span className="text-[#111111] font-medium">{cook.specialty}</span>
        </p>

        <div className="flex items-center gap-1 flex-wrap mb-3.5">
          {cook.dishes.slice(0, 3).map((dish, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-[#FAFAFA] border border-black/10 rounded-md text-[9.5px] font-extrabold text-[#111111]"
            >
              {dish}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2.5 border-t border-black/10">
          <button
            onClick={handleViewProfile}
            className="flex-1 py-2 px-3 bg-[#FAFAFA] text-[#111111] text-xs font-black rounded-xl border border-black/10 hover:bg-black/5 transition-colors cursor-pointer"
          >
            View Profile
          </button>
          <BentoButton
            variant="primary"
            size="sm"
            onClick={onBook}
            className="flex-1 shadow-xs"
          >
            <ChefHat size={14} />
            Book Cook
          </BentoButton>
        </div>
      </div>
    </BentoCard>
  );
};

