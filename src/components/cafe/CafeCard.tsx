import React from 'react';
import { Cafe } from '../../types';
import { BentoCard } from '../bento/BentoCard';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Rating } from '../common/Rating';
import { Coffee, MapPin } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

interface CafeCardProps {
  cafe: Cafe;
}

export const CafeCard: React.FC<CafeCardProps> = ({ cafe }) => {
  const { setSelectedCafe, setPage } = useAppStore();

  const handleClick = () => {
    setSelectedCafe(cafe);
    setPage('cafe-detail');
  };

  return (
    <BentoCard onClick={handleClick} padding="none" className="mb-4 flex flex-col border-2 border-black/10 shadow-sm overflow-hidden group">
      <div className="relative w-full aspect-[16/9] sm:h-44 overflow-hidden bg-gray-100">
        <ImageWithFallback 
          src={cafe.image} 
          alt={cafe.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#FFD21F] text-[#111111] text-[10px] font-black rounded-md border border-[#111111] shadow-xs">
          {cafe.ambiance}
        </span>
      </div>

      <div className="p-3.5 flex flex-col justify-between flex-1 text-left bg-white">
        <div>
          <div className="flex items-center justify-between mb-1">
            <Rating rating={cafe.rating} reviewCount={cafe.reviews} />
            <span className="text-[10px] font-bold text-[#707070] flex items-center gap-0.5">
              <MapPin size={10} />
              {cafe.distance}
            </span>
          </div>

          <h3 className="text-sm font-black text-[#111111] leading-tight">
            {cafe.name}
          </h3>
          <p className="text-[11px] font-medium text-[#707070] line-clamp-1 mt-0.5">
            {cafe.tagline}
          </p>
        </div>

        <div className="flex items-center gap-1 flex-wrap mt-2 mb-2">
          {cafe.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-[#FAFAFA] border border-black/10 rounded-md text-[9px] font-extrabold text-[#111111]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-2 border-t border-black/10 flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#707070] flex items-center gap-1 truncate max-w-[180px]">
            <Coffee size={12} className="text-[#FFD21F] flex-shrink-0" />
            {cafe.popularItems[0]}
          </span>
          <span className="text-[11px] font-black text-[#111111] group-hover:translate-x-0.5 transition-transform">
            Explore →
          </span>
        </div>
      </div>
    </BentoCard>
  );
};
