import React from 'react';
import { BentoCard } from '../bento/BentoCard';
import { Receipt, ShieldCheck, Tag } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

export const BillSummary: React.FC = () => {
  const { cartSubtotal, deliveryFee, packagingFee, cartTotal, showToast } = useAppStore();

  return (
    <BentoCard padding="md" className="mb-6 border-2 border-black/10 shadow-sm">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-black/10">
        <Receipt size={18} className="text-[#111111]" />
        <h3 className="text-sm font-black text-[#111111] uppercase tracking-wide">
          Bill Details
        </h3>
      </div>

      <div className="space-y-2 text-xs font-semibold">
        <div className="flex items-center justify-between text-[#707070]">
          <span>Item Total</span>
          <span className="font-bold text-[#111111]">₹{cartSubtotal}</span>
        </div>

        <div className="flex items-center justify-between text-[#707070]">
          <span className="flex items-center gap-1">
            Delivery Fee
            <span className="text-[10px] text-green-600 font-extrabold bg-green-50 px-1 rounded">
              Standard
            </span>
          </span>
          <span className="font-bold text-[#111111]">₹{deliveryFee}</span>
        </div>

        <div className="flex items-center justify-between text-[#707070]">
          <span>Packaging Charges</span>
          <span className="font-bold text-[#111111]">₹{packagingFee}</span>
        </div>

        <div
          onClick={() => showToast('Coupon FEAZTOFIRST applied! Saved ₹30')}
          className="flex items-center justify-between py-2 px-2.5 bg-[#FFD21F]/20 border border-[#FFD21F] rounded-xl cursor-pointer hover:bg-[#FFD21F]/30 transition-colors"
        >
          <span className="flex items-center gap-1.5 font-bold text-[#111111] text-[11px]">
            <Tag size={13} className="text-[#111111]" />
            Apply Coupon: FEAZTOFIRST
          </span>
          <span className="text-[10px] font-black text-green-700 uppercase">
            Apply
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t-2 border-black/10 text-sm font-black text-[#111111]">
          <span>TOTAL AMOUNT</span>
          <span className="text-base text-[#111111]">₹{cartTotal}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1 text-[10px] font-extrabold text-[#707070] bg-[#FAFAFA] p-2 rounded-xl border border-black/5">
        <ShieldCheck size={14} className="text-green-600" />
        100% Safe Delivery & Hygienic Packaging
      </div>
    </BentoCard>
  );
};
