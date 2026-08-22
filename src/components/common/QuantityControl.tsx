import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTrashOnOne?: boolean;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  size = 'md',
  className = '',
  showTrashOnOne = false,
}) => {
  const sizeStyles = {
    sm: 'h-8 px-2 text-xs rounded-full gap-1.5',
    md: 'h-10 px-3 text-sm rounded-xl gap-2.5',
    lg: 'h-12 px-4 text-base rounded-2xl gap-3.5',
  };

  const btnSize = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
  };

  const iconSize = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <div
      className={`inline-flex items-center justify-between bg-[#111111] text-white font-bold border border-[#111111] shadow-sm ${sizeStyles[size]} ${className}`}
    >
      <button
        onClick={onDecrease}
        className={`${btnSize[size]} inline-flex items-center justify-center rounded-full hover:bg-white/20 active:scale-90 transition-transform cursor-pointer`}
        aria-label="Decrease quantity"
      >
        {quantity === 1 && showTrashOnOne ? (
          <Trash2 size={iconSize[size]} className="text-red-400" />
        ) : (
          <Minus size={iconSize[size]} />
        )}
      </button>
      <span className="min-w-[18px] text-center font-extrabold text-white">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className={`${btnSize[size]} inline-flex items-center justify-center rounded-full bg-[#FFD21F] text-[#111111] hover:bg-[#FFCC00] active:scale-90 transition-transform cursor-pointer`}
        aria-label="Increase quantity"
      >
        <Plus size={iconSize[size]} strokeWidth={3} />
      </button>
    </div>
  );
};
