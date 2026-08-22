import React from 'react';
import { MapPin, ChefHat } from 'lucide-react';
import { Kitchen } from '../../types';
import { BentoCard } from '../bento/BentoCard';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Rating } from '../common/Rating';
import { useAppStore } from '../../store/appStore';

interface KitchenCardProps {
  kitchen: Kitchen;
}

export const KitchenCard: React.FC<KitchenCardProps> = ({ kitchen }) => {
  const { setPage, setSearchTerm } = useAppStore();

  const handleClick = () => {
    setSearchTerm(kitchen.name);
    setPage('explore');
  };

  return (
    <BentoCard
      onClick={handleClick}
      padding="none"
      className="w-52 flex-shrink-0 flex flex-col h-full border-2 border-black/10"
    >
      <div className="relative w-full h-28">
        <ImageWithFallback src={kitchen.image} alt={kitchen.name} className="w-full h-full" />
        {kitchen.badge && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#FFD21F] text-[#111111] text-[10px] font-black rounded-md border border-[#111111] shadow-sm">
            {kitchen.badge}
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <Rating rating={kitchen.rating} reviewCount={kitchen.reviewCount} />
            <span className="text-[10px] font-bold text-[#707070] flex items-center gap-0.5">
              <MapPin size={10} />
              {kitchen.distance}
            </span>
          </div>

          <h3 className="text-sm font-black text-[#111111] truncate">
            {kitchen.name}
          </h3>

          <p className="text-[11px] font-medium text-[#707070] truncate mt-0.5">
            {kitchen.specialty}
          </p>
        </div>

        <div className="mt-2 pt-2 border-t border-black/5 flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#111111] flex items-center gap-1">
            <ChefHat size={12} className="text-[#FFD21F]" />
            {kitchen.location}
          </span>
          <span className="text-[11px] font-black text-[#111111]">
            View →
          </span>
        </div>
      </div>
    </BentoCard>
  );
};
