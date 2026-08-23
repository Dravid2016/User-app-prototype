import React, { useState } from 'react';
import { CultureHeroBanner } from '../components/home/CultureHeroBanner';
import { HomeSearchSection } from '../components/home/HomeSearchSection';
import { QuickActionBar, HomeModeTab } from '../components/home/QuickActionBar';
import { LiveStatusStrip } from '../components/home/LiveStatusStrip';
import { ChefSpotlight } from '../components/home/ChefSpotlight';
import { RakshaBandhanSection } from '../components/home/RakshaBandhanSection';
import { FestivalSpecialsSection } from '../components/home/FestivalSpecialsSection';
import { RegionalFoodSection } from '../components/home/RegionalFoodSection';
import { AmmaSamayalSection } from '../components/home/AmmaSamayalSection';
import { HomeEventsSection } from '../components/home/HomeEventsSection';
import { MOCK_COOKS } from '../data/cooks';
import { CookCard } from '../components/cook/CookCard';
import { HEALTHY_CAFE_ITEMS } from '../data/healthyCafeData';
import { BentoCard } from '../components/bento/BentoCard';
import { BentoButton } from '../components/bento/BentoButton';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { useAppStore } from '../store/appStore';

import '../styles/tokens.css';
import '../styles/home.css';

export const Home: React.FC = () => {
  const [homeTab, setHomeTab] = useState<HomeModeTab>('feazto');
  const { addToCart } = useAppStore();

  const isFeazto = homeTab === 'feazto';
  const isBookCook = homeTab === 'book-a-cook';
  const isCarefe = homeTab === 'cafes';

  // Dynamic theme background color carrying all the way down (Yellow for Feazto!)
  const activeBg = isBookCook
    ? '#4A0E0E'
    : isCarefe
    ? '#043427'
    : '#FFD21F';

  return (
    <div className="home-page pb-12">
      <div className="home-content">
        <CultureHeroBanner />
        <HomeSearchSection />

        {/* Zepto Mode Folder Tabs & Main Container that carries all the way down FULL BLEED (LEFT & RIGHT) */}
        <div
          className="mt-3 select-none text-left"
          style={{ width: 'calc(100% + 28px)', marginLeft: '-14px', marginRight: '-14px' }}
        >
          {/* 1. Folder Tabs Bar (Feazto Text Logo Font Style Across All 3 Tabs!) */}
          <div className="flex items-end gap-3.5 px-4 overflow-x-auto no-scrollbar mb-0.5">
            {/* Tab 1: feazto (Official Brand Logo Font Graphic!) */}
            <button
              type="button"
              onClick={() => setHomeTab('feazto')}
              className={`px-4.5 py-2.5 rounded-t-xl font-black transition-all cursor-pointer flex items-center justify-center relative border-0 outline-none shrink-0 ${
                isFeazto
                  ? 'bg-[#FFD21F] text-[#111111] z-10 shadow-xs'
                  : 'bg-white text-[#111111] hover:bg-white/90 rounded-xl my-0.5 shadow-xs'
              }`}
            >
              <img
                src="/brand/feazto-logo.png"
                alt="feazto"
                className="h-4.5 w-auto object-contain filter brightness-0"
              />
            </button>

            {/* Tab 2: Book a cook */}
            <button
              type="button"
              onClick={() => setHomeTab('book-a-cook')}
              className={`px-4.5 py-2.5 rounded-t-xl font-black transition-all cursor-pointer flex items-center justify-center relative border-0 outline-none shrink-0 ${
                isBookCook
                  ? 'bg-[#4A0E0E] text-[#FFD21F] z-10 shadow-xs'
                  : 'bg-white text-[#111111] hover:bg-white/90 rounded-xl my-0.5 shadow-xs'
              }`}
            >
              <span className="feazto-logo-font text-sm leading-none whitespace-nowrap">
                Book a cook
              </span>
            </button>

            {/* Tab 3: Carefe */}
            <button
              type="button"
              onClick={() => setHomeTab('cafes')}
              className={`px-4.5 py-2.5 rounded-t-xl font-black transition-all cursor-pointer flex items-center justify-center relative border-0 outline-none shrink-0 ${
                isCarefe
                  ? 'bg-[#043427] text-[#A8F5AA] z-10 shadow-xs'
                  : 'bg-white text-[#111111] hover:bg-white/90 rounded-xl my-0.5 shadow-xs'
              }`}
            >
              <span className="feazto-logo-font text-sm leading-none whitespace-nowrap">
                Carefe
              </span>
              <span className="ml-1.5 px-1.5 py-0.5 bg-[#FF3B30] text-white text-[8px] font-black not-italic rounded-full uppercase">
                NEW
              </span>
            </button>
          </div>

          {/* 2. MAIN PAGE CONTAINER CARRIED ALL THE WAY DOWN (ELEGANT SMOOTH CURVES ON BOTH SIDES!) */}
          <div
            className={`p-4 rounded-t-[28px] rounded-b-[28px] transition-all duration-300 shadow-xl min-h-[650px] space-y-4 ${
              isFeazto ? 'text-[#111111]' : 'text-white'
            }`}
            style={{ backgroundColor: activeBg }}
          >
            {/* FEAZTO SECTIONS (On Feazto Yellow canvas!) */}
            {isFeazto && (
              <div className="animate-fade-in space-y-4">
                <ChefSpotlight />
                <LiveStatusStrip />
                <RakshaBandhanSection />
                <FestivalSpecialsSection />
                <RegionalFoodSection />
                <AmmaSamayalSection />
                <HomeEventsSection />
              </div>
            )}

            {/* BOOK A COOK SECTIONS */}
            {isBookCook && (
              <div className="animate-fade-in text-left space-y-4">
                <LiveStatusStrip />
                <div className="my-2">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-white/20 text-[#FFD21F]">
                        HERITAGE CHEFS
                      </span>
                      <h2 className="text-base font-black text-white mt-1">
                        Book Professional Home Cooks
                      </h2>
                      <p className="text-[10px] font-bold text-white/80">
                        Hand-ground spices & traditional recipes prepared in your kitchen
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {MOCK_COOKS.map((cook) => (
                      <CookCard key={cook.id} cook={cook} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CAREFE SECTIONS */}
            {isCarefe && (
              <div className="animate-fade-in text-left space-y-4">
                <div className="my-2">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-white/20 text-[#A8F5AA]">
                        ORGANIC & BAKES
                      </span>
                      <h2 className="text-base font-black text-white mt-1">
                        FEAZTO Healthy Carefe Menu
                      </h2>
                      <p className="text-[10px] font-bold text-white/80">
                        100% organic cold-pressed juices, sprouted snacks & millet bakes
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {HEALTHY_CAFE_ITEMS.slice(0, 6).map((item) => (
                      <BentoCard key={item.id} padding="none" className="border-0 overflow-hidden shadow-xs flex flex-col justify-between group bg-white text-[#111111]">
                        <div>
                          <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <span className="absolute top-2 left-2 bg-[#111111] text-[#FFD21F] text-[9px] font-black px-2 py-0.5 rounded-md">
                              {item.tag}
                            </span>
                          </div>
                          <div className="p-3">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="text-xs font-black text-[#111111]">{item.name}</h4>
                              <span className="text-xs font-black text-[#111111]">₹{item.price}</span>
                            </div>
                            <p className="text-[10px] text-[#707070] font-medium line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="p-3 pt-0">
                          <BentoButton
                            variant="primary"
                            size="sm"
                            fullWidth
                            onClick={() => addToCart({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              image: item.image,
                              category: 'Healthy Carefe',
                              kitchenId: 'carefe-1',
                              kitchenName: 'Feazto Carefe',
                              rating: item.rating,
                              reviewCount: 30,
                              cuisine: 'Healthy',
                              tags: [item.tag],
                              prepTime: '15 min',
                              description: item.description,
                            })}
                          >
                            Add to Cart • ₹{item.price}
                          </BentoButton>
                        </div>
                      </BentoCard>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
