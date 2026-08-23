import React from 'react';
import { RegionConfig } from '../../data/regions';
import { BentoCard } from '../bento/BentoCard';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useAppStore } from '../../store/appStore';

interface RegionalCulturalCardProps {
  region: RegionConfig;
}

export const RegionalCulturalCard: React.FC<RegionalCulturalCardProps> = ({ region }) => {
  const { setSelectedRegion, setPage } = useAppStore();

  const handleClick = () => {
    setSelectedRegion(region.id);
    setPage('regional-food');
  };

  const { theme } = region;

  return (
    <div 
      onClick={handleClick}
      className="w-[180px] flex-shrink-0 cursor-pointer group flex flex-col select-none"
    >
      {/* 1. Card containing ONLY the famous landmark picture */}
      <BentoCard
        padding="none"
        className="w-full h-40 border-2 border-[#111111] overflow-hidden bg-white group-hover:translate-y-[-4px] transition-transform duration-200"
        style={{
          boxShadow: `0 6px 0 #111111, 0 10px 24px ${theme.glowColor}`
        }}
      >
        <div className="w-full h-full relative">
          <ImageWithFallback 
            src={region.heroImage} 
            alt={region.name} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute top-2 left-2 bg-[#111111] text-white border border-white text-[8px] font-black uppercase px-2 py-0.5 rounded-md">
            {region.name}
          </div>
        </div>
      </BentoCard>

      {/* 2. Regional details rendered UNDER the card */}
      <div className="mt-3 px-1.5 flex flex-col gap-1.5 text-left">
        <div>
          <h4 className="text-xs font-black text-[#111111] tracking-tight group-hover:text-[#FFD21F] transition-colors">
            {region.name}
          </h4>
          <p className="text-[9px] font-bold text-[#707070] line-clamp-1 leading-normal">
            {region.tagline}
          </p>
        </div>

        {/* Signature cultural pill badges */}
        <div className="flex flex-wrap gap-1">
          {region.badges.slice(0, 2).map((badge, idx) => (
            <span
              key={idx}
              className={`text-[8px] font-black px-1.5 py-0.5 rounded-md border ${theme.badgeBorder} ${theme.accentBg} ${theme.badgeText}`}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
