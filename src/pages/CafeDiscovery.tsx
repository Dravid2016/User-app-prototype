import React, { useState } from 'react';
import { Coffee, ArrowLeft, MapPin, Sparkles } from 'lucide-react';
import { MOCK_CAFES } from '../data/cafes';
import { CafeCard } from '../components/cafe/CafeCard';
import { useAppStore } from '../store/appStore';
import { FeaztoLogo } from '../components/brand/FeaztoLogo';

export const CafeDiscovery: React.FC = () => {
  const { setPage } = useAppStore();
  const [activeTag, setActiveTag] = useState('all');

  const tags = [
    { id: 'all', label: 'All Specialty Spots' },
    { id: 'degree', label: 'Degree Coffee' },
    { id: 'work', label: 'Work-Friendly' },
    { id: 'sea-view', label: 'Sea View' },
  ];

  return (
    <div className="pb-24 pt-3 px-4 animate-fade-in">
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
        <span className="text-[10px] font-black uppercase text-[#111111] bg-[#FFD21F] px-2.5 py-1 rounded-full border border-[#111111]">
          Café Discovery
        </span>
      </div>

      {/* Hero Banner */}
      <div className="p-4 bg-gradient-to-r from-[#111111] to-[#333333] text-white rounded-[24px] border-2 border-black mb-5 shadow-sm">
        <div className="flex items-center gap-2 text-[#FFD21F] text-xs font-black mb-1">
          <Sparkles size={14} /> South Indian Coffee Culture
        </div>
        <h2 className="text-lg font-black leading-tight text-white mb-1">
          Discover traditional degree coffee & artisanal cafe spots nearby.
        </h2>
        <p className="text-xs text-gray-300 font-medium">
          Brass tumbler kaapi, fresh bakes, and peaceful work ambiances across Chennai.
        </p>
      </div>

      {/* Filter Tags */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
        {tags.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTag(t.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all border ${
              activeTag === t.id
                ? 'bg-[#FFD21F] text-[#111111] border-[#111111] shadow-sm'
                : 'bg-[#FAFAFA] text-[#707070] border-black/10 hover:border-black'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Cafe Cards */}
      <div>
        {MOCK_CAFES.map((cafe) => (
          <CafeCard key={cafe.id} cafe={cafe} />
        ))}
      </div>
    </div>
  );
};
