import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, MapPin, Phone, ShieldCheck, Home } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { FeaztoLogo } from '../components/brand/FeaztoLogo';
import { BentoCard } from '../components/bento/BentoCard';
import { BentoButton } from '../components/bento/BentoButton';

export const OrderSuccess: React.FC = () => {
  const { setPage, activeOrder, orders } = useAppStore();
  const currentOrder = activeOrder || orders[0];
  const [stage, setStage] = useState<number>(0);

  // Auto progression demo timer for order status stages
  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 3500); // Picked Up
    const timer2 = setTimeout(() => setStage(2), 8000); // On The Way
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const stages = [
    { label: 'PREPARING', desc: 'Home chef is crafting your meal' },
    { label: 'PICKED UP', desc: 'Delivery partner has collected food' },
    { label: 'ON THE WAY', desc: 'Rider is navigating to your address' },
    { label: 'DELIVERED', desc: 'Enjoy your hot regional meal!' },
  ];

  return (
    <div className="pb-24 pt-2 px-4 animate-fade-in text-center">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-4">
        <FeaztoLogo onClick={() => setPage('home')} size="sm" />
        <span className="text-xs font-black uppercase text-[#111111] bg-[#FFD21F] px-2.5 py-1 rounded-full border border-[#111111]">
          Order Live
        </span>
      </div>
      {/* Confirmed Icon Header */}
      <div className="w-20 h-20 bg-[#FFD21F] rounded-full border-4 border-[#111111] flex items-center justify-center mx-auto mb-3 shadow-[0_8px_30px_rgba(255,210,31,0.4)] animate-bounce">
        <CheckCircle2 size={44} className="text-[#111111]" strokeWidth={2.5} />
      </div>

      <span className="inline-block px-3 py-1 bg-[#111111] text-[#FFD21F] text-xs font-black rounded-full uppercase tracking-wider mb-2">
        ORDER CONFIRMED #{currentOrder?.id || 'FZ-90241'}
      </span>

      <h1 className="text-2xl font-black text-[#111111] uppercase tracking-tight mb-1">
        Your Food Is Being Prepared
      </h1>
      <p className="text-xs font-medium text-[#707070] mb-6">
        Est. Delivery Time: <span className="font-extrabold text-[#111111]">32 Minutes</span>
      </p>

      {/* Interactive Status Stage Tracker */}
      <BentoCard padding="md" className="mb-6 border-2 border-black/10 text-left shadow-sm">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/10">
          <span className="text-xs font-black text-[#111111] flex items-center gap-1.5">
            <Clock size={16} className="text-[#FFD21F]" /> Live Status Tracker
          </span>
          <span className="text-[10px] font-black text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
            {stages[stage].label}
          </span>
        </div>

        {/* Progress Bar Line */}
        <div className="relative flex items-center justify-between mb-6 px-2">
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-200 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-4 h-1 bg-[#FFD21F] -translate-y-1/2 z-0 transition-all duration-700"
            style={{ width: `${(stage / 3) * 100}%` }}
          />

          {stages.map((stg, idx) => (
            <div key={stg.label} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                  idx <= stage
                    ? 'bg-[#FFD21F] text-[#111111] border-2 border-[#111111] scale-110 shadow-sm'
                    : 'bg-gray-100 text-gray-400 border border-gray-300'
                }`}
              >
                {idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Current Stage Highlight Card */}
        <div className="p-3 bg-[#FAFAFA] rounded-xl border border-black/10 text-center">
          <h4 className="text-sm font-black text-[#111111]">
            {stages[stage].label}
          </h4>
          <p className="text-xs font-medium text-[#707070] mt-0.5">
            {stages[stage].desc}
          </p>
        </div>
      </BentoCard>

      {/* Order Info Summary */}
      <BentoCard padding="md" className="mb-6 border border-black/10 text-left">
        <h4 className="text-xs font-black text-[#111111] uppercase mb-2">
          Delivery Details
        </h4>
        <p className="text-xs text-[#707070] font-medium flex items-center gap-1.5 mb-1">
          <MapPin size={14} className="text-[#FFD21F]" />
          {currentOrder?.deliveryAddress || 'Home — Anna Nagar, Chennai'}
        </p>
        <p className="text-xs text-[#707070] font-medium flex items-center gap-1.5">
          <Phone size={14} className="text-[#FFD21F]" />
          Contact Partner: +91 98401 23456
        </p>
      </BentoCard>

      {/* Actions */}
      <div className="space-y-2.5">
        <BentoButton variant="primary" fullWidth onClick={() => setPage('orders')}>
          Track Order Details
        </BentoButton>

        <BentoButton variant="secondary" fullWidth onClick={() => setPage('home')}>
          <Home size={16} /> Back to Home
        </BentoButton>
      </div>
    </div>
  );
};
