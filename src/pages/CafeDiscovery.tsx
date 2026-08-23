import React, { useState } from 'react';
import { Coffee, ArrowLeft, MapPin, Sparkles, Plus, Check, Heart, ShieldCheck, Zap } from 'lucide-react';
import { MOCK_CAFES } from '../data/cafes';
import { HEALTHY_CAFE_ITEMS, HealthyCafeItem } from '../data/healthyCafeData';
import { CafeCard } from '../components/cafe/CafeCard';
import { QuickActionBar } from '../components/home/QuickActionBar';
import { useAppStore } from '../store/appStore';
import { BentoCard } from '../components/bento/BentoCard';
import { BentoButton } from '../components/bento/BentoButton';

export const CafeDiscovery: React.FC = () => {
  const { setPage, addToCart, savedItemIds, toggleFavorite, showToast } = useAppStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Healthy Treats' },
    { id: 'snack', label: 'Healthy Snacks 🥨' },
    { id: 'juice', label: 'Organic Juices 🍊' },
    { id: 'shot', label: 'Immunity Shots ⚡' },
    { id: 'tea', label: 'Artisanal Teas & Coffee ☕' },
    { id: 'bake', label: 'Millet & Healthy Bakes 🍪' },
  ];

  const filteredItems = HEALTHY_CAFE_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleAddToCart = (item: HealthyCafeItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category === 'juice' ? 'Organic Juice' : 'Healthy Snack',
      kitchenId: 'cafe-kitchen-1',
      kitchenName: 'FEAZTO Healthy Cafe',
      rating: item.rating,
      reviewCount: 48,
      cuisine: 'Healthy Cafe',
      tags: [item.tag, 'Healthy'],
      prepTime: '15 min',
      description: item.description,
      isPopular: item.isPopular || false,
    });
  };

  return (
    <div className="pb-24 pt-2 px-4 animate-fade-in text-left">
      {/* 1. Mode Switcher Bar (Feazto | Book a cook | Cafe) */}
      <div className="mb-3">
        <QuickActionBar />
      </div>

      {/* Hero Banner */}
      <div className="p-4 bg-gradient-to-r from-[#111111] via-[#222222] to-[#111111] text-white rounded-[24px] border-2 border-black mb-5 shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[#FFD21F] text-xs font-black mb-1">
            <Sparkles size={14} /> FEAZTO Homemade Healthy Cafe
          </div>
          <h2 className="text-xl font-black leading-tight text-white mb-1 tracking-tight">
            Guilt-free homemade snacks, 100% organic cold-pressed juices & artisanal brews.
          </h2>
          <p className="text-xs text-gray-300 font-medium max-w-xs">
            Freshly crafted with organic millets, jaggery, fresh gooseberries & cold-pressed fruits. Zero preservatives.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all border cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#FFD21F] text-[#111111] border-[#111111] shadow-xs'
                : 'bg-[#FAFAFA] text-[#707070] border-black/10 hover:border-black'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Healthy Items Grid Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-black text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
              <Coffee size={16} className="text-[#FFD21F]" /> Healthy Cafe Menu ({filteredItems.length})
            </h3>
            <p className="text-[10px] font-bold text-[#707070]">
              Organic cold-pressed juices, sprouted snacks & immunity elixirs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredItems.map((item) => (
            <BentoCard key={item.id} padding="none" className="border-2 border-[#111111] overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="relative h-36 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-[#111111] text-[#FFD21F] text-[9px] font-black px-2 py-0.5 rounded-md border border-[#FFD21F]">
                    {item.tag}
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md text-[#111111] text-[9px] font-black px-2 py-0.5 rounded-md border border-black/10">
                    🔥 {item.calories}
                  </div>
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className={`absolute bottom-2 right-2 w-7 h-7 rounded-full flex items-center justify-center border border-[#111111] shadow-xs transition-transform active:scale-90 ${
                      savedItemIds.includes(item.id)
                        ? 'bg-[#FFD21F] text-[#111111]'
                        : 'bg-white text-[#111111]'
                    }`}
                  >
                    <Heart size={13} className={savedItemIds.includes(item.id) ? 'fill-[#111111]' : ''} />
                  </button>
                </div>

                <div className="p-3 bg-white">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-xs font-black text-[#111111] leading-snug">{item.name}</h4>
                    <span className="text-xs font-black text-[#111111] shrink-0 ml-2">₹{item.price}</span>
                  </div>
                  <p className="text-[10px] text-[#707070] font-medium leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-3 pt-0 bg-white">
                <BentoButton
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => handleAddToCart(item)}
                  className="shadow-xs"
                >
                  <Plus size={14} /> Add to Cart • ₹{item.price}
                </BentoButton>
              </div>
            </BentoCard>
          ))}
        </div>
      </div>

      {/* 3. Featured Local Cafe Spots Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-black text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={16} className="text-[#FFD21F]" /> Featured Cafe Outlets
            </h3>
            <p className="text-[10px] font-bold text-[#707070]">
              Discover Chennai's finest degree coffee & healthy cafe spots
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {MOCK_CAFES.map((cafe) => (
            <CafeCard key={cafe.id} cafe={cafe} />
          ))}
        </div>
      </div>
    </div>
  );
};

