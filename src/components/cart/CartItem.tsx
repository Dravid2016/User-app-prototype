import React from 'react';
import { CartItem as CartItemType } from '../../types';
import { useAppStore } from '../../store/appStore';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { QuantityControl } from '../common/QuantityControl';
import { BentoCard } from '../bento/BentoCard';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateCartQuantity, removeFromCart } = useAppStore();

  return (
    <BentoCard padding="sm" className="mb-3 flex items-center justify-between gap-3 border border-black/10">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-black/5">
          <ImageWithFallback src={item.food.image} alt={item.food.name} className="w-full h-full" />
        </div>
        <div>
          <h4 className="text-xs font-black text-[#111111] line-clamp-1">
            {item.food.name}
          </h4>
          <span className="text-[10px] font-bold text-[#707070]">
            {item.food.kitchenName}
          </span>
          <div className="text-xs font-black text-[#111111] mt-0.5">
            ₹{item.food.price * item.quantity}
          </div>
        </div>
      </div>

      <QuantityControl
        quantity={item.quantity}
        onIncrease={() => updateCartQuantity(item.food.id, 1)}
        onDecrease={() => {
          if (item.quantity === 1) {
            removeFromCart(item.food.id);
          } else {
            updateCartQuantity(item.food.id, -1);
          }
        }}
        size="sm"
        showTrashOnOne={true}
      />
    </BentoCard>
  );
};
