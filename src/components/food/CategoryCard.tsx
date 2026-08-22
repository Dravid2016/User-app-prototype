import React from 'react';
import { Category } from '../../types';
import { BentoCard } from '../bento/BentoCard';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useAppStore } from '../../store/appStore';

interface CategoryCardProps {
  category: Category;
  isSelected?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected = false,
}) => {
  const { setSelectedCategory, setPage } = useAppStore();

  const handleClick = () => {
    setSelectedCategory(category.id);
    setPage('explore');
  };

  return (
    <BentoCard
      onClick={handleClick}
      padding="none"
      variant={isSelected ? 'yellow' : 'default'}
      className={`w-32 flex-shrink-0 text-center transition-transform ${
        isSelected ? 'border-2 border-[#111111] scale-105' : 'border border-black/10'
      }`}
    >
      <div className="w-full h-20 relative">
        <ImageWithFallback src={category.image} alt={category.name} className="w-full h-full" />
      </div>
      <div className="p-2">
        <h4 className="text-xs font-black text-[#111111] line-clamp-1">
          {category.name}
        </h4>
        <span className="text-[10px] font-bold text-[#707070]">
          {category.itemCount} items
        </span>
      </div>
    </BentoCard>
  );
};
