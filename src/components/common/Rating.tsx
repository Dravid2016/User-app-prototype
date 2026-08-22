import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  reviewCount,
  size = 'sm',
  className = '',
}) => {
  const iconSize = size === 'sm' ? 12 : 14;
  return (
    <div className={`inline-flex items-center gap-1 font-bold text-[#111111] ${className}`}>
      <span className="inline-flex items-center gap-1 bg-[#FFD21F] px-1.5 py-0.5 rounded-md text-[11px] font-extrabold text-[#111111]">
        <Star size={iconSize} fill="#111111" strokeWidth={0} />
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className="text-[11px] text-[#707070] font-medium">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
