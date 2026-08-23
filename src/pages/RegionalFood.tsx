import React from 'react';
import { useAppStore } from '../store/appStore';
import { MOCK_REGIONS } from '../data/regions';
import { MOCK_FOODS } from '../data/foods';
import { FoodCard } from '../components/food/FoodCard';
import { BentoCard } from '../components/bento/BentoCard';
import { BentoSection } from '../components/bento/BentoSection';
import { ArrowLeft, MapPin, Compass } from 'lucide-react';
import { FeaztoLogo } from '../components/brand/FeaztoLogo';

export const RegionalFood: React.FC = () => {
  const { selectedRegion, setPage, previousPage } = useAppStore();

  const region = MOCK_REGIONS.find((r) => r.id === selectedRegion);

  const handleBack = () => {
    // If we came from Home, return to Home. Otherwise, default fallback to Home.
    if (previousPage === 'home') {
      setPage('home');
    } else {
      setPage('home');
    }
  };

  if (!region) {
    return (
      <div className="p-6 text-center animate-fade-in">
        <FeaztoLogo onClick={() => setPage('home')} size="sm" className="mb-4" />
        <BentoCard padding="md" className="border-2 border-[#111111] shadow-[0_4px_0_#111111]">
          <h3 className="text-sm font-black text-[#111111] mb-2">Region Not Selected</h3>
          <p className="text-xs text-[#707070] mb-4">Please select a culinary region from the home page.</p>
          <button
            onClick={() => setPage('home')}
            className="px-4 py-2 bg-[#FFD21F] border border-black font-black text-xs rounded-xl shadow-[0_2px_0_#111111] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            Back to Home
          </button>
        </BentoCard>
      </div>
    );
  }

  const { theme } = region;

  // Filter recipes specific to this region
  const regionalFoods = MOCK_FOODS.filter((food) => food.region === region.id);

  // SVG Motif Renderers for 20% Cultural Accents
  const renderCulturalMotif = () => {
    switch (region.motifType) {
      case 'kolam':
        return (
          <svg className={`absolute right-3 bottom-2 w-28 h-28 opacity-12 ${theme.accentText}`} viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M50 10 L90 50 L50 90 L10 50 Z" strokeWidth="1.5" strokeDasharray="3,3" />
            <circle cx="50" cy="50" r="10" strokeWidth="1.5" />
            <circle cx="50" cy="20" r="3" fill="currentColor" />
            <circle cx="50" cy="80" r="3" fill="currentColor" />
            <circle cx="20" cy="50" r="3" fill="currentColor" />
            <circle cx="80" cy="50" r="3" fill="currentColor" />
            <path d="M50 30 C40 30 30 40 30 50 C30 60 40 70 50 70 C60 70 70 60 70 50 C70 40 60 30 50 30 Z" strokeWidth="1" />
          </svg>
        );
      case 'coconut':
        return (
          <svg className={`absolute right-3 bottom-2 w-28 h-28 opacity-12 ${theme.accentText}`} viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M0 80 Q25 72 50 80 T100 80" strokeWidth="1.5" />
            <path d="M0 90 Q25 82 50 90 T100 90" strokeWidth="1" />
            <path d="M80 20 C70 30 60 50 65 80" strokeWidth="2" />
            <path d="M65 80 C50 70 35 68 20 70" strokeWidth="1" />
            <path d="M68 60 C55 52 40 50 25 55" strokeWidth="1" />
            <path d="M72 41 C62 33 48 31 32 39" strokeWidth="1" />
          </svg>
        );
      case 'chilli':
        return (
          <svg className={`absolute right-4 bottom-2 w-24 h-24 opacity-12 ${theme.accentText}`} viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M40 20 C42 15 48 15 50 20 C53 30 55 50 50 75 C48 85 42 90 40 85 C38 80 35 55 40 20 Z" strokeWidth="1.5" fill="currentColor" />
            <path d="M45 18 C46 12 50 8 52 10" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M60 40 C61 36 65 36 67 40 C69 48 70 60 67 78 C66 84 62 88 60 85" strokeWidth="1" fill="currentColor" />
          </svg>
        );
      case 'charminar':
        return (
          <svg className={`absolute right-4 bottom-1 w-24 h-24 opacity-12 ${theme.accentText}`} viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M20 90 L20 40 L30 40 L30 90 M70 90 L70 40 L80 40 L80 90" strokeWidth="1.5" />
            <path d="M20 40 C20 30 30 20 50 20 C70 20 80 30 80 40 Z" strokeWidth="1.5" />
            <path d="M35 90 L35 65 C35 55 65 55 65 65 L65 90" strokeWidth="1" />
            <circle cx="50" cy="40" r="5" strokeWidth="1" />
          </svg>
        );
      case 'palace':
        return (
          <svg className={`absolute right-4 bottom-2 w-26 h-26 opacity-12 ${theme.accentText}`} viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M15 90 L15 50 Q50 35 85 50 L85 90" strokeWidth="1.5" />
            <path d="M30 90 L30 60 C30 50 70 50 70 60 L70 90" strokeWidth="1.5" />
            <path d="M50 35 C35 25 35 10 50 5 C65 10 65 25 50 35 Z" strokeWidth="1" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pb-32 pt-2 px-4 animate-fade-in">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between py-2 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#111111] hover:bg-black/5 active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            <ArrowLeft size={18} />
          </button>
          <FeaztoLogo onClick={() => setPage('home')} size="sm" />
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] border border-black/10 rounded-full cursor-pointer hover:bg-black/5 transition-colors">
          <MapPin size={12} className="text-[#FFD21F] fill-[#111111]" />
          <span className="text-[10px] font-black text-[#111111] uppercase tracking-wide">
            {region.name}
          </span>
        </div>
      </div>

      {/* Cultural Banner Card (80% Feazto / 20% Region) */}
      <BentoCard
        padding="md"
        className={`mb-6 border-2 ${region.theme.border} relative overflow-hidden transition-all duration-200`}
        style={{
          background: `linear-gradient(135deg, #ffffff 65%, ${region.theme.background.replace('bg-[', '').replace(']', '')} 100%)`,
          boxShadow: `0 6px 0 #111111, 0 12px 28px ${region.theme.glowColor}`
        }}
      >
        {/* SVG Motif Placement */}
        {renderCulturalMotif()}

        <div className="max-w-[80%] relative z-10">
          <span className={`inline-block mb-1.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wide border ${region.theme.badgeBorder} ${region.theme.accentBg} ${region.theme.accentText}`}>
            Traditional Heritage
          </span>
          <h2 className="text-xl font-black text-[#111111] tracking-tight leading-none mb-1">
            {region.name} Flavours
          </h2>
          <p className={`text-[10px] font-bold ${region.theme.accentText} uppercase tracking-wider mb-2 font-mono`}>
            {region.tagline}
          </p>
          <p className="text-xs font-semibold text-[#707070] leading-relaxed">
            {region.intro}
          </p>
        </div>
      </BentoCard>

      {/* Food Listings */}
      <BentoSection
        title="Traditional Recipes"
        subtitle={`Hand-curated authentic culinary creations of ${region.name}`}
      >
        {regionalFoods.length > 0 ? (
          <div className="grid grid-cols-2 gap-3.5 mt-2">
            {regionalFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        ) : (
          <BentoCard padding="lg" className="text-center border-2 border-black/10 bg-[#FAFAFA]">
            <Compass size={32} className="mx-auto text-gray-300 mb-2" />
            <h4 className="text-xs font-black text-[#111111]">No Kitchens Active Yet</h4>
            <p className="text-[10px] text-[#707070] mt-1">
              We are currently onboarding verified home chefs in {region.name} area. Stay tuned!
            </p>
          </BentoCard>
        )}
      </BentoSection>
    </div>
  );
};
