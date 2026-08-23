import React from 'react';

export type HomeModeTab = 'feazto' | 'book-a-cook' | 'cafes';

interface QuickActionBarProps {
  activeTab?: HomeModeTab;
  onTabChange?: (tab: HomeModeTab) => void;
}

export const QuickActionBar: React.FC<QuickActionBarProps> = ({
  activeTab = 'feazto',
  onTabChange,
}) => {
  const isFeazto = activeTab === 'feazto';
  const isBookCook = activeTab === 'book-a-cook';
  const isCarefe = activeTab === 'cafes';

  const activeBg = isBookCook
    ? '#4A0E0E'
    : isCarefe
    ? '#043427'
    : '#851212';

  const title = isFeazto
    ? 'Explore Feazto Homemade Feasts'
    : isBookCook
    ? 'Book a Professional Home Cook'
    : 'Feazto Healthy Carefe & Bakes';

  const subtitle = isBookCook
    ? 'Book veteran home cooks for private kitchen feasts, pujas & family dining'
    : isCarefe
    ? '100% organic cold-pressed juices, sprouted snacks & healthy millet bakes'
    : 'Order authentic regional recipes, festival thalis & fresh daily tiffins';

  const handleTabClick = (tab: HomeModeTab) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="w-full my-3 select-none text-left">
      {/* 1. Folder Tabs Strip - Fully Blended onto Page Surface (NO Outer Box / NO Border) */}
      <div className="flex items-end gap-2 px-1 overflow-x-auto no-scrollbar">
        {/* Tab 1: feazto */}
        <button
          type="button"
          onClick={() => handleTabClick('feazto')}
          className={`px-4 py-2 rounded-t-xl font-black transition-all cursor-pointer flex items-center justify-center relative border-0 outline-none ${
            isFeazto
              ? 'bg-[#851212] text-white z-10 text-sm'
              : 'bg-white text-[#111111] hover:bg-white/90 rounded-xl text-xs shadow-xs my-0.5'
          }`}
        >
          <span className="font-black tracking-tight leading-none">
            feazto
          </span>
        </button>

        {/* Tab 2: Book a cook */}
        <button
          type="button"
          onClick={() => handleTabClick('book-a-cook')}
          className={`px-4 py-2 rounded-t-xl font-black transition-all cursor-pointer flex items-center justify-center relative border-0 outline-none ${
            isBookCook
              ? 'bg-[#4A0E0E] text-[#FFD21F] z-10 text-sm'
              : 'bg-white text-[#111111] hover:bg-white/90 rounded-xl text-xs shadow-xs my-0.5'
          }`}
        >
          <span className="font-black tracking-tight leading-none whitespace-nowrap">
            Book a cook
          </span>
        </button>

        {/* Tab 3: Carefe */}
        <button
          type="button"
          onClick={() => handleTabClick('cafes')}
          className={`px-4 py-2 rounded-t-xl font-black transition-all cursor-pointer flex items-center justify-center relative border-0 outline-none ${
            isCarefe
              ? 'bg-[#043427] text-[#A8F5AA] z-10 text-sm'
              : 'bg-white text-[#111111] hover:bg-white/90 rounded-xl text-xs shadow-xs my-0.5'
          }`}
        >
          <span className="font-black tracking-tight leading-none whitespace-nowrap">
            Carefe
          </span>
          <span className="ml-1.5 px-1.5 py-0.5 bg-[#FF3B30] text-white text-[8px] font-black rounded-full uppercase">
            NEW
          </span>
        </button>
      </div>

      {/* 2. Banner Container Connected to Active Tab (Fully Blended) */}
      <div 
        className="p-3.5 rounded-b-2xl rounded-tr-2xl text-white transition-colors duration-300 flex items-center justify-between shadow-xs"
        style={{ backgroundColor: activeBg }}
      >
        <div>
          <div className="text-[13px] font-black tracking-tight text-white flex items-center gap-1.5">
            {title}
          </div>
          <p className="text-[9.5px] font-medium text-white/80 mt-0.5 line-clamp-1">
            {subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleTabClick(isFeazto ? 'book-a-cook' : isBookCook ? 'cafes' : 'feazto')}
          className="px-3.5 py-1.5 bg-white text-[#111111] text-[10px] font-black rounded-full shadow-xs shrink-0 active:scale-95 transition-transform cursor-pointer border-0"
        >
          {isFeazto ? 'Try Cook Booking →' : isBookCook ? 'Explore Carefe →' : 'Back to Feazto →'}
        </button>
      </div>
    </div>
  );
};
