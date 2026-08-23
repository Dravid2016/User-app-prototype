import React, { useState, useEffect } from 'react';
import {
  Clock,
  MapPin,
  Home,
  ArrowLeft,
  Navigation,
  Bike,
  Utensils,
  ChefHat,
  PhoneCall,
  MessageSquare,
  CheckCircle2,
  Maximize2,
  RotateCcw,
  ShoppingBag,
} from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { BentoCard } from '../components/bento/BentoCard';
import { BentoButton } from '../components/bento/BentoButton';

export const OrderSuccess: React.FC = () => {
  const { setPage, activeOrder, orders, showToast } = useAppStore();
  const currentOrder = activeOrder || orders[0];
  const [stage, setStage] = useState<number>(0);
  const [isMapExpanded, setIsMapExpanded] = useState<boolean>(false);

  // Auto progression demo timer for order status stages
  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 4000); // Picked Up
    const timer2 = setTimeout(() => setStage(2), 9000); // On The Way
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const stages = [
    {
      label: 'Order Placed',
      badge: 'CONFIRMED',
      desc: 'Order received by Amma’s Regional Kitchen',
      time: 'Just now',
      icon: Utensils,
    },
    {
      label: 'Preparing Food',
      badge: 'IN KITCHEN',
      desc: 'Home chef is freshly crafting your traditional meal',
      time: 'Est. 12 mins',
      icon: ChefHat,
    },
    {
      label: 'Out for Delivery',
      badge: 'ON THE WAY',
      desc: 'Ramesh has collected your order & is riding over',
      time: 'Est. 15 mins',
      icon: Bike,
    },
    {
      label: 'Order Delivered',
      badge: 'ARRIVED',
      desc: 'Delivered hot to your doorstep. Enjoy!',
      time: 'Delivered',
      icon: CheckCircle2,
    },
  ];

  // Map driver coordinates progression along route (0 to 100%)
  const driverPositions = [
    { x: 28, y: 35, progress: '0%' }, // At Kitchen
    { x: 42, y: 48, progress: '35%' }, // Picked up
    { x: 68, y: 62, progress: '75%' }, // On the way
    { x: 82, y: 78, progress: '100%' }, // At Home
  ];

  const currentPos = driverPositions[stage] || driverPositions[0];

  return (
    <div className="pb-24 pt-2 px-4 animate-fade-in text-left">
      {/* Top Bar Header - Clean Header with Order ID & Live GPS (Smaller duplicate logo removed) */}
      <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage('home')}
            className="w-8 h-8 rounded-full bg-[#111111]/5 hover:bg-[#111111]/10 flex items-center justify-center text-[#111111] transition-all active:scale-95 cursor-pointer"
            aria-label="Back to home"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <span className="text-[10px] font-extrabold uppercase text-[#707070] block leading-none">
              Track Order
            </span>
            <span className="text-xs font-black text-[#111111]">
              #{currentOrder?.id || 'FZ-90241'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-700 text-[10px] font-black uppercase shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-3.5" />
          Live GPS Tracking
        </div>
      </div>

      {/* Main Status Header Card (Replacing awkward bouncing checkmark from Image 2) */}
      <BentoCard padding="md" variant="yellow" className="mb-4 border-2 border-[#111111] shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-block px-2.5 py-0.5 bg-[#111111] text-[#FFD21F] text-[10px] font-black rounded-full uppercase tracking-wider mb-1">
              {stages[stage].badge}
            </span>
            <h1 className="text-2xl font-black text-[#111111] tracking-tight">
              {stages[stage].label}
            </h1>
            <p className="text-xs font-bold text-[#111111]/80 mt-0.5">
              {stages[stage].desc}
            </p>
          </div>

          <div className="text-right flex-shrink-0">
            <span className="text-[10px] font-black text-[#111111]/70 block uppercase">
              Estimated Delivery
            </span>
            <span className="text-2xl font-black text-[#111111] tracking-tight">
              {stage === 3 ? 'Delivered' : '28 MINS'}
            </span>
          </div>
        </div>

        {/* Live Stage Progress Indicator */}
        <div className="mt-4 pt-3 border-t border-[#111111]/15">
          <div className="flex items-center justify-between mb-2 text-[11px] font-black text-[#111111]">
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-[#111111]" /> Stage {stage + 1} of 4
            </span>
            <span className="text-[10px] font-extrabold uppercase bg-[#111111]/10 px-2 py-0.5 rounded">
              ETA 8:45 PM
            </span>
          </div>

          {/* Stepper bar */}
          <div className="relative flex items-center justify-between px-1">
            <div className="absolute top-1/2 left-3 right-3 h-1.5 bg-[#111111]/15 -translate-y-1/2 rounded-full z-0" />
            <div
              className="absolute top-1/2 left-3 h-1.5 bg-[#111111] -translate-y-1/2 rounded-full z-0 transition-all duration-700"
              style={{ width: `${(stage / 3) * 100}%` }}
            />

            {stages.map((stg, idx) => {
              const IconComp = stg.icon;
              const isPassed = idx <= stage;
              const isCurrent = idx === stage;
              return (
                <button
                  key={stg.label}
                  onClick={() => setStage(idx)}
                  className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#111111] text-[#FFD21F] scale-110 shadow-md ring-4 ring-[#FFD21F]'
                      : isPassed
                      ? 'bg-[#111111] text-[#FFD21F]'
                      : 'bg-white/80 text-gray-400 border border-gray-300'
                  }`}
                  title={`Switch stage to ${stg.label}`}
                >
                  <IconComp size={14} />
                </button>
              );
            })}
          </div>
        </div>
      </BentoCard>

      {/* Interactive Google Map Live Tracking Card */}
      <BentoCard padding="none" className="mb-5 border-2 border-[#111111] overflow-hidden shadow-lg relative">
        {/* Map Header Toolbar */}
        <div className="bg-[#1A1C1E] text-white px-3.5 py-2.5 flex items-center justify-between border-b border-white/10 z-10 relative">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#FFD21F] flex items-center justify-center text-[#111111]">
              <Navigation size={12} className="fill-[#111111]" />
            </div>
            <div>
              <span className="text-xs font-black text-white flex items-center gap-1.5">
                Google Maps Live Route
                <span className="text-[9px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.2 rounded">
                  GPS Active
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => showToast('Map centered to driver location')}
              className="p-1.5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors cursor-pointer"
              title="Recenter Map"
            >
              <RotateCcw size={14} />
            </button>
            <button
              onClick={() => setIsMapExpanded(!isMapExpanded)}
              className="p-1.5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors cursor-pointer"
              title={isMapExpanded ? 'Collapse Map' : 'Expand Map'}
            >
              <Maximize2 size={14} />
            </button>
          </div>
        </div>

        {/* Google Map Styled Vector Container */}
        <div
          className={`relative bg-[#E5E3DF] w-full transition-all duration-500 overflow-hidden ${
            isMapExpanded ? 'h-[360px]' : 'h-[230px]'
          }`}
        >
          {/* Simulated Google Map Styling SVG (Roads, Green Parks, River, Land blocks) */}
          <svg className="w-full h-full absolute inset-0 z-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D6D2CB" strokeWidth="0.8" />
              </pattern>
            </defs>
            {/* Background Base */}
            <rect width="100%" height="100%" fill="#F4F1EA" />
            <rect width="100%" height="100%" fill="url(#gridPattern)" />

            {/* Green Parks & Water Bodies */}
            <path d="M -10 20 Q 80 40 120 -10 L 0 -10 Z" fill="#C8E6C9" />
            <path d="M 280 180 Q 340 150 440 220 L 440 380 L 250 380 Z" fill="#DCEDC8" />
            <path d="M -20 190 Q 60 160 140 230 T 260 280 L 260 380 L -20 380 Z" fill="#E8F5E9" opacity="0.6" />
            <path d="M 320 -10 C 290 80 340 140 380 200 C 410 240 430 290 450 350 L 480 350 L 480 -10 Z" fill="#B2EBF2" opacity="0.7" />

            {/* Secondary Gray City Streets */}
            <path d="M -10 120 L 450 120" stroke="#FFFFFF" strokeWidth="12" />
            <path d="M -10 120 L 450 120" stroke="#E0DDD5" strokeWidth="8" />
            <path d="M 180 -10 L 180 380" stroke="#FFFFFF" strokeWidth="10" />
            <path d="M 180 -10 L 180 380" stroke="#E0DDD5" strokeWidth="6" />
            <path d="M 310 -10 L 310 380" stroke="#FFFFFF" strokeWidth="8" />
            <path d="M 310 -10 L 310 380" stroke="#E0DDD5" strokeWidth="5" />

            {/* Primary Main Avenue (Yellow/Orange Google Map Road) */}
            <path
              id="mainAvenue"
              d="M 28 35 Q 110 90 180 115 T 300 170 T 350 250 T 330 310"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M 28 35 Q 110 90 180 115 T 300 170 T 350 250 T 330 310"
              fill="none"
              stroke="#FCE8B2"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Active Delivery Route Polyline (Bold Highlighting Path) */}
            <path
              d="M 28 35 Q 110 90 180 115 T 300 170 T 350 250 T 330 310"
              fill="none"
              stroke="#111111"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 28 35 Q 110 90 180 115 T 300 170 T 350 250 T 330 310"
              fill="none"
              stroke="#FFD21F"
              strokeWidth="3"
              strokeDasharray="6 4"
              strokeLinecap="round"
              className="animate-pulse"
            />
          </svg>

          {/* 1. Origin Marker: Home Chef Kitchen */}
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
            style={{ left: '28%', top: '35%' }}
            onClick={() => showToast("Amma's Kitchen, Anna Nagar West")}
          >
            <div className="px-2 py-0.5 bg-[#111111] text-[#FFD21F] text-[9px] font-black rounded-md shadow-md border border-[#FFD21F] whitespace-nowrap mb-1 flex items-center gap-1">
              <ChefHat size={10} /> Amma’s Kitchen
            </div>
            <div className="w-8 h-8 rounded-full bg-[#111111] border-2 border-[#FFD21F] flex items-center justify-center text-[#FFD21F] shadow-lg">
              <Utensils size={14} />
            </div>
          </div>

          {/* 2. Destination Marker: Customer Home */}
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
            style={{ left: '82%', top: '78%' }}
            onClick={() => showToast('Delivery Location: Home, Anna Nagar')}
          >
            <div className="px-2 py-0.5 bg-emerald-700 text-white text-[9px] font-black rounded-md shadow-md border border-white whitespace-nowrap mb-1 flex items-center gap-1">
              <Home size={10} /> Your Home
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white shadow-lg">
              <MapPin size={16} />
            </div>
          </div>

          {/* 3. Dynamic Moving Delivery Partner Scooter Marker */}
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out cursor-pointer"
            style={{ left: `${currentPos.x}%`, top: `${currentPos.y}%` }}
            onClick={() => showToast('Delivery Captain Ramesh is en route')}
          >
            {/* Live Pulsating Radar Wave */}
            <div className="absolute inset-0 -m-3 rounded-full bg-[#FFD21F]/40 animate-ping z-0" />
            <div className="absolute inset-0 -m-1.5 rounded-full bg-[#111111]/30 z-0" />

            {/* Rider Pin */}
            <div className="relative z-10 w-10 h-10 rounded-full bg-[#111111] border-2 border-[#FFD21F] flex items-center justify-center text-[#FFD21F] shadow-[0_4px_16px_rgba(0,0,0,0.5)] scale-110">
              <Bike size={20} className="stroke-[2.5]" />
            </div>

            {/* Driver ETA Chip */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 bg-[#111111] text-white text-[9px] font-black rounded-full whitespace-nowrap border border-[#FFD21F] shadow-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Ramesh ({stage === 3 ? 'Arrived' : '1.4 km'})
            </div>
          </div>

          {/* Floating Map Watermark / Controls Overlay */}
          <div className="absolute bottom-2 left-2 z-10 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-black/10 text-[10px] font-black text-[#111111] shadow-xs flex items-center gap-1.5">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
            <span className="text-[#707070] font-medium ml-1">Maps View</span>
          </div>
        </div>

        {/* Delivery Captain Driver Card (Embedded directly below map) */}
        <div className="bg-white p-3.5 border-t border-black/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Ramesh K."
                className="w-11 h-11 rounded-full object-cover border-2 border-[#111111]"
              />
              <span className="absolute -bottom-1 -right-1 bg-[#FFD21F] text-[#111111] text-[9px] font-black px-1 rounded border border-[#111111]">
                4.9★
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-black text-[#111111]">Ramesh Kumar</h4>
                <span className="text-[9px] font-black bg-[#111111] text-[#FFD21F] px-1.5 py-0.2 rounded">
                  VERIFIED
                </span>
              </div>
              <p className="text-[10px] text-[#707070] font-bold mt-0.5 flex items-center gap-1">
                <Bike size={11} className="text-[#111111]" /> Hero Splendor • TN-09-BZ-4821
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:+919840123456"
              className="w-9 h-9 rounded-full bg-[#FFD21F] border border-[#111111] flex items-center justify-center text-[#111111] hover:bg-[#FFCC00] active:scale-95 transition-all shadow-xs cursor-pointer"
              title="Call Delivery Partner"
            >
              <PhoneCall size={16} strokeWidth={2.5} />
            </a>
            <button
              onClick={() => showToast('Opening message chat with Ramesh...')}
              className="w-9 h-9 rounded-full bg-[#FAFAFA] border border-black/10 flex items-center justify-center text-[#111111] hover:bg-black/5 active:scale-95 transition-all shadow-xs cursor-pointer"
              title="Message Delivery Partner"
            >
              <MessageSquare size={16} />
            </button>
          </div>
        </div>
      </BentoCard>

      {/* Delivery Address & Contact Info Summary */}
      <BentoCard padding="md" className="mb-4 border-2 border-black/10 text-left">
        <h4 className="text-xs font-black text-[#111111] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <MapPin size={15} className="text-[#FFD21F] fill-[#111111]" /> Delivery Location
        </h4>
        <div className="bg-[#FAFAFA] p-3 rounded-xl border border-black/10">
          <span className="inline-block px-2 py-0.5 bg-[#111111] text-[#FFD21F] text-[10px] font-black rounded mb-1">
            HOME ADDRESS
          </span>
          <p className="text-xs font-black text-[#111111]">
            {currentOrder?.deliveryAddress || 'Plot No. 42, 2nd Main Road, Anna Nagar West, Chennai'}
          </p>
          <p className="text-[11px] font-medium text-[#707070] mt-0.5">
            Instructions: Leave at security desk / Call on arrival
          </p>
        </div>
      </BentoCard>

      {/* Order Summary & Items List */}
      <BentoCard padding="md" className="mb-6 border-2 border-black/10 text-left">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-black/10">
          <h4 className="text-xs font-black text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
            <ShoppingBag size={15} className="text-[#FFD21F]" /> Items Ordered ({currentOrder?.items?.length || 2})
          </h4>
          <span className="text-xs font-black text-[#111111]">
            Total: ₹{currentOrder?.total || 380}
          </span>
        </div>

        <div className="space-y-2 mb-2">
          {currentOrder?.items ? (
            currentOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs font-bold text-[#111111]">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[#111111]/5 flex items-center justify-center font-black text-[10px]">
                    {item.quantity}x
                  </span>
                  {item.food.name}
                </span>
                <span>₹{item.food.price * item.quantity}</span>
              </div>
            ))
          ) : (
            <>
              <div className="flex justify-between items-center text-xs font-bold text-[#111111]">
                <span>2x Chettinad Chicken Curry</span>
                <span>₹320</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-[#111111]">
                <span>4x Traditional Malabar Parotta</span>
                <span>₹60</span>
              </div>
            </>
          )}
        </div>
      </BentoCard>

      {/* Action Buttons */}
      <div className="space-y-2.5">
        <BentoButton variant="primary" fullWidth onClick={() => setPage('orders')}>
          View All Orders History
        </BentoButton>

        <BentoButton variant="secondary" fullWidth onClick={() => setPage('home')}>
          <Home size={16} /> Back to Home
        </BentoButton>
      </div>
    </div>
  );
};
