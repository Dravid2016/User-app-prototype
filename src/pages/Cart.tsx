import React from 'react';
import { ShoppingBag, ArrowLeft, Trash2, ArrowRight } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { FeaztoLogo } from '../components/brand/FeaztoLogo';
import { CartItem } from '../components/cart/CartItem';
import { BillSummary } from '../components/cart/BillSummary';
import { BentoButton } from '../components/bento/BentoButton';
import { EmptyState } from '../components/common/EmptyState';

export const Cart: React.FC = () => {
  const { cart, clearCart, setPage, cartTotal } = useAppStore();

  if (cart.length === 0) {
    return (
      <div className="pb-24 pt-3 px-4">
        <EmptyState
          icon={ShoppingBag}
          title="Your Cart is Empty"
          description="Looks like you haven't added any homemade dishes yet. Explore our delicious South Indian menu!"
          actionText="Explore Food"
          onAction={() => setPage('explore')}
        />
      </div>
    );
  }

  return (
    <div className="pb-32 pt-3 px-4 animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage('home')}
            className="w-9 h-9 rounded-full bg-[#FAFAFA] border border-black/10 flex items-center justify-center text-[#111111] hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <FeaztoLogo onClick={() => setPage('home')} size="sm" />
        </div>

        <button
          onClick={clearCart}
          className="flex items-center gap-1 text-xs font-bold text-red-500 hover:underline px-2 py-1"
        >
          <Trash2 size={14} /> Clear
        </button>
      </div>

      {/* Cart Items List */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2 px-1 text-xs font-extrabold text-[#707070]">
          <span>ITEMS ({cart.length})</span>
          <span>QUANTITY & PRICE</span>
        </div>
        {cart.map((item) => (
          <CartItem key={item.food.id} item={item} />
        ))}
      </div>

      {/* Special Delivery Note */}
      <div className="mb-6">
        <label className="block text-xs font-extrabold text-[#111111] mb-1.5 px-1">
          Delivery Instructions for Home Chef
        </label>
        <input
          type="text"
          placeholder="E.g. Extra spicy sambar, less oil, leave at door..."
          className="w-full h-11 px-3.5 bg-[#FAFAFA] border border-black/10 rounded-xl text-xs font-semibold text-[#111111] placeholder:text-[#707070] focus:bg-white focus:outline-none focus:border-black"
        />
      </div>

      {/* Bill Details Breakdown */}
      <BillSummary />

      {/* Sticky Bottom Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white/95 backdrop-blur-md border-t-2 border-black/10 p-4 z-40">
        <BentoButton
          variant="primary"
          fullWidth
          size="lg"
          onClick={() => setPage('checkout')}
          className="shadow-[0_8px_24px_rgba(255,210,31,0.4)]"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight size={18} strokeWidth={3} />
        </BentoButton>
      </div>
    </div>
  );
};
