import React from 'react';
import { Bike, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { HOME_EVENT_CONFIG } from '../../data/homeEvents';
import { useAppStore } from '../../store/appStore';

export const DeliveryPerksCard: React.FC = () => {
  const { deliveryPerk } = HOME_EVENT_CONFIG;
  const { cartSubtotal, setPage } = useAppStore();

  const isFreeDelivery = cartSubtotal >= deliveryPerk.freeThreshold;
  const amountNeeded = Math.max(0, deliveryPerk.freeThreshold - cartSubtotal);

  return (
    <div className="event-feature-card bg-[#fffdf5] border-2 border-[#111111] rounded-2xl p-3.5 shadow-[0_3px_0_#111111] relative overflow-hidden text-left">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 rounded-full bg-[#FFD21F] border-2 border-[#111111] flex items-center justify-center shadow-[0_1.5px_0_#111111]">
            <Bike size={16} className="text-[#111111]" />
          </div>
          <div>
            <span className="text-[7.5px] font-black uppercase tracking-wider bg-[#111111] text-[#ffffff] px-1.5 py-0.5 rounded">
              Fair Delivery Policy
            </span>
            <h3 className="text-[13px] font-black text-[#111111] leading-tight">
              100% Free Delivery & Rider Support
            </h3>
          </div>
        </div>
      </div>

      <p className="text-[9px] text-[#707070] font-bold mb-2.5 leading-relaxed">
        {deliveryPerk.subtitle}
      </p>

      {/* Comparison Grid: Below 100 vs Above 100 */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {/* Tier 1: Below 100 */}
        <div className="bg-white p-2.5 rounded-xl border-1.5 border-[#111111] shadow-[0_1.5px_0_#111111] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-[8px] font-extrabold text-[#707070] uppercase">
              <ShieldCheck size={10} className="text-[#111111]" />
              Small Orders &lt; ₹100
            </div>
            <div className="text-[14px] font-black text-[#111111] mt-0.5">₹25 Delivery</div>
          </div>
          <p className="text-[7.5px] font-bold text-[#707070] mt-1.5 border-t border-black/5 pt-1">
            🛵 100% goes directly to your local neighborhood rider.
          </p>
        </div>

        {/* Tier 2: Above 100 */}
        <div className="bg-[#fff9df] p-2.5 rounded-xl border-1.5 border-[#111111] shadow-[0_1.5px_0_#111111] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-[8px] font-extrabold text-[#111111] uppercase">
              <Zap size={10} className="fill-[#111111]" />
              Feasts &gt; ₹100
            </div>
            <div className="text-[14px] font-black text-[#111111] mt-0.5 text-green-700">
              FREE DELIVERY
            </div>
          </div>
          <p className="text-[7.5px] font-bold text-[#707070] mt-1.5 border-t border-black/5 pt-1">
            ✨ Feazto sponsors rider compensation on family meals.
          </p>
        </div>
      </div>

      {/* Dynamic Status / Cart Bar */}
      <div className="bg-white p-2 rounded-xl border border-[#111111] flex items-center justify-between">
        <div className="text-[8.5px] font-bold text-[#111111]">
          {cartSubtotal === 0 ? (
            <span>Add homemade items worth <strong className="text-[#111111]">₹100+</strong> for Free Delivery</span>
          ) : isFreeDelivery ? (
            <span className="text-green-700 font-extrabold">🎉 You unlocked FREE Delivery for this order!</span>
          ) : (
            <span>Add <strong className="text-[#111111]">₹{amountNeeded}</strong> more to unlock Free Delivery!</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setPage('explore')}
          className="text-[8px] font-black bg-[#111111] text-white px-2.5 py-1 rounded-md active:scale-95 transition-transform flex items-center gap-1"
        >
          Explore <ArrowRight size={9} />
        </button>
      </div>
    </div>
  );
};
