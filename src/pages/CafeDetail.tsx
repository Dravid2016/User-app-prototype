import React from 'react';
import { ArrowLeft, Coffee, MapPin, Star, Share2, Heart, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { FeaztoLogo } from '../components/brand/FeaztoLogo';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { BentoCard } from '../components/bento/BentoCard';
import { BentoButton } from '../components/bento/BentoButton';

export const CafeDetail: React.FC = () => {
  const { selectedCafe, setPage, showToast } = useAppStore();

  if (!selectedCafe) {
    return (
      <div className="p-6 text-center">
        <p>No café selected.</p>
        <button onClick={() => setPage('cafes')}>Back to Cafés</button>
      </div>
    );
  }

  return (
    <div className="pb-32 pt-3 px-4 animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage('cafes')}
            className="w-9 h-9 rounded-full bg-[#FAFAFA] border border-black/10 flex items-center justify-center text-[#111111] hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <FeaztoLogo onClick={() => setPage('home')} size="sm" />
        </div>
        <span className="text-xs font-black uppercase text-[#111111] bg-[#FFD21F] px-3 py-1 rounded-full border border-[#111111]">
          {selectedCafe.ambiance}
        </span>
        <button
          onClick={() => showToast('Café location saved')}
          className="w-9 h-9 rounded-full bg-[#FAFAFA] border border-black/10 flex items-center justify-center text-[#111111]"
        >
          <Share2 size={18} />
        </button>
      </div>

      {/* Hero Photo */}
      <BentoCard padding="none" className="mb-5 overflow-hidden border-2 border-black/10 shadow-md">
        <div className="relative w-full h-56">
          <ImageWithFallback src={selectedCafe.image} alt={selectedCafe.name} className="w-full h-full" />
        </div>
      </BentoCard>

      {/* Title & Info */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-black text-[#111111]">{selectedCafe.name}</h1>
          <div className="flex items-center gap-1 bg-[#FFD21F] px-2 py-0.5 rounded-lg text-xs font-black text-[#111111]">
            <Star size={13} fill="#111111" /> {selectedCafe.rating}
          </div>
        </div>
        <p className="text-xs font-bold text-[#707070] mb-2">{selectedCafe.tagline}</p>
        <p className="text-xs font-medium text-[#111111] flex items-center gap-1">
          <MapPin size={14} className="text-[#FFD21F]" /> {selectedCafe.address} ({selectedCafe.distance})
        </p>
      </div>

      {/* Popular Items Menu */}
      <div className="mb-6">
        <h3 className="text-xs font-black uppercase text-[#707070] tracking-wider mb-2 px-1">
          Popular Coffee & Snack Items
        </h3>
        <div className="space-y-2">
          {selectedCafe.popularItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#FAFAFA] border border-black/10 rounded-xl text-xs font-black text-[#111111] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Coffee size={14} className="text-[#FFD21F]" />
                {item}
              </span>
              <span className="text-[10px] font-extrabold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                Available
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white/95 backdrop-blur-md border-t-2 border-black/10 p-4 z-40">
        <BentoButton
          variant="primary"
          fullWidth
          size="lg"
          onClick={() => showToast(`Navigating to ${selectedCafe.name}`)}
        >
          <MapPin size={18} /> Get Directions to Café
        </BentoButton>
      </div>
    </div>
  );
};
