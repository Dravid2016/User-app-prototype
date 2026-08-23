import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Compass, Users, ShoppingBag, User, Search, X, ChevronRight, Sparkles, ChefHat } from 'lucide-react';
import { AppPage, FoodItem } from '../../types';
import { useAppStore } from '../../store/appStore';
import { MOCK_FOODS } from '../../data/foods';
import { chefSpotlights, ChefSpotlightItem } from '../../data/chefSpotlights';

interface MobileDockSearchProps {
  active: AppPage;
  onChange: (page: AppPage) => void;
}

export const MobileDockSearch: React.FC<MobileDockSearchProps> = ({
  active,
  onChange,
}) => {
  const { setSelectedFood, setPage } = useAppStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'food' | 'chef'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
    }
  }, [isSearchOpen]);

  // Filter foods and chefs based on query
  const filteredFoods: FoodItem[] = MOCK_FOODS.filter((food: FoodItem) => {
    if (!searchQuery.trim()) return food.isPopular;
    const q = searchQuery.toLowerCase();
    return (
      food.name.toLowerCase().includes(q) ||
      food.category.toLowerCase().includes(q) ||
      food.cuisine?.toLowerCase().includes(q) ||
      food.kitchenName?.toLowerCase().includes(q)
    );
  }).slice(0, 4);

  const filteredChefs: ChefSpotlightItem[] = chefSpotlights.filter((chef: ChefSpotlightItem) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      chef.chef.toLowerCase().includes(q) ||
      chef.title.toLowerCase().includes(q) ||
      chef.region.toLowerCase().includes(q)
    );
  }).slice(0, 2);

  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food);
    setPage('food-detail');
    setIsSearchOpen(false);
  };

  const handleSelectChef = (_chef: ChefSpotlightItem) => {
    setPage('book-a-cook');
    setIsSearchOpen(false);
  };

  const navItems = [
    { id: 'home' as AppPage, label: 'Home', icon: Home },
    { id: 'explore' as AppPage, label: 'Explore', icon: Compass },
    { id: 'community' as AppPage, label: 'Community', icon: Users },
    { id: 'orders' as AppPage, label: 'Orders', icon: ShoppingBag },
    { id: 'profile' as AppPage, label: 'You', icon: User },
  ];

  return (
    <>
      {/* Backdrop overlay when search is active */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-45 pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* Floating Results Panel above the dock */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute bottom-20 left-4 right-4 z-50 max-h-[380px] bg-[#ffffff] border-2 border-[#111111] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2),0_4px_0_#111111] overflow-hidden flex flex-col pointer-events-auto"
          >
            {/* Header & Filter Chips */}
            <div className="p-3 bg-[#fffdf5] border-b border-[#111111]/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#FFD21F] fill-[#FFD21F]" />
                <span className="text-[11px] font-black text-[#111111]">
                  {searchQuery ? 'Search Results' : 'Trending Recommendations'}
                </span>
              </div>
              <div className="flex gap-1">
                {(['all', 'food', 'chef'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    type="button"
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                      selectedFilter === filter
                        ? 'bg-[#111111] text-[#ffffff] border-[#111111]'
                        : 'bg-white text-[#707070] border-black/10 hover:border-black/30'
                    }`}
                  >
                    {filter === 'all' ? 'All' : filter === 'food' ? 'Dishes' : 'Chefs'}
                  </button>
                ))}
              </div>
            </div>

            {/* Results List */}
            <div className="p-2 overflow-y-auto no-scrollbar space-y-1.5 max-h-[310px]">
              {(selectedFilter === 'all' || selectedFilter === 'food') && filteredFoods.map((food) => (
                <button
                  key={food.id}
                  onClick={() => handleSelectFood(food)}
                  type="button"
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-[#fffdf5] hover:bg-[#fff9df] active:scale-[0.98] border border-black/5 transition-all text-left group cursor-pointer"
                >
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-11 h-11 rounded-lg object-cover border border-[#111111] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[11px] font-black text-[#111111] truncate">{food.name}</h4>
                      <span className="text-[11px] font-black text-[#111111]">₹{food.price}</span>
                    </div>
                    <p className="text-[9px] text-[#707070] font-medium truncate mt-0.5">
                      {food.kitchenName} · {food.category}
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-[#707070] group-hover:text-[#111111] transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}

              {(selectedFilter === 'all' || selectedFilter === 'chef') && filteredChefs.map((chef: ChefSpotlightItem) => (
                <button
                  key={chef.id}
                  onClick={() => handleSelectChef(chef)}
                  type="button"
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-[#fffdf5] hover:bg-[#fff9df] active:scale-[0.98] border border-black/5 transition-all text-left group cursor-pointer"
                >
                  <img
                    src={chef.image}
                    alt={chef.chef}
                    className="w-11 h-11 rounded-lg object-cover border border-[#111111] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <ChefHat size={12} className="text-[#111111]" />
                      <h4 className="text-[11px] font-black text-[#111111] truncate">{chef.chef}</h4>
                    </div>
                    <p className="text-[9px] text-[#707070] font-medium truncate mt-0.5">
                      {chef.title} · {chef.region}
                    </p>
                  </div>
                  <span className="text-[8px] font-black bg-[#FFD21F] text-[#111111] px-2 py-0.5 rounded-md border border-[#111111]">
                    Book
                  </span>
                </button>
              ))}

              {filteredFoods.length === 0 && filteredChefs.length === 0 && (
                <div className="py-8 text-center text-[#707070] text-[11px] font-bold">
                  No matching homemade dishes or chefs found.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Morphing Dock Container */}
      <div className="relative w-full z-50 pointer-events-auto">
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
          className="w-full bg-[#ffffff] border-2 border-[#111111] rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.15),0_3px_0_#111111] p-1.5 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {isSearchOpen ? (
              /* Morph: Search Input Bar */
              <motion.div
                key="search-bar"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2 px-2 h-10"
              >
                <div className="w-7 h-7 rounded-full bg-[#FFD21F] border border-[#111111] flex items-center justify-center shrink-0">
                  <Search size={14} className="text-[#111111]" strokeWidth={2.5} />
                </div>
                
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dishes, traditional chefs, kitchens..."
                  className="flex-1 bg-transparent border-0 outline-none text-[12px] font-bold text-[#111111] placeholder:text-[#888888]"
                />

                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    type="button"
                    className="p-1 rounded-full text-[#707070] hover:text-[#111111]"
                  >
                    <X size={14} strokeWidth={2.5} />
                  </button>
                )}

                <button
                  onClick={() => setIsSearchOpen(false)}
                  type="button"
                  className="px-2.5 py-1 text-[11px] font-black text-[#111111] bg-[#f4f4f4] hover:bg-[#e8e8e8] border border-[#111111] rounded-full active:scale-95 transition-transform"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              /* Default: Navigation Floating Dock */
              <motion.div
                key="nav-dock"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-between px-1"
              >
                {navItems.map((tab) => {
                  const Icon = tab.icon;
                  const isActive =
                    (tab.id === 'home' && (active === 'home' || active === 'regional-food')) ||
                    (tab.id === 'explore' && (active === 'explore' || active === 'food-detail' || active === 'cafes' || active === 'cafe-detail')) ||
                    (tab.id === 'community' && active === 'community') ||
                    (tab.id === 'orders' && (active === 'orders' || active === 'cart' || active === 'checkout' || active === 'order-success')) ||
                    (tab.id === 'saved' && active === 'saved') ||
                    (tab.id === 'profile' && active === 'profile');

                  return (
                    <button
                      key={tab.id}
                      onClick={() => onChange(tab.id)}
                      type="button"
                      className={`relative flex items-center justify-center p-2 rounded-full transition-all duration-200 cursor-pointer select-none ${
                        isActive
                          ? 'text-[#111111]'
                          : 'text-[#707070] hover:text-[#111111]'
                      }`}
                      aria-label={tab.label}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="dock-active-pill"
                          className="absolute inset-0 bg-[#FFD21F] border border-[#111111] rounded-full shadow-[0_2px_0_#111111]"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                      <Icon
                        size={18}
                        strokeWidth={isActive ? 2.5 : 2}
                        className="relative z-10"
                      />
                    </button>
                  );
                })}

                {/* Morph Search Trigger Button */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  type="button"
                  className="flex items-center gap-1.5 bg-[#111111] text-[#ffffff] px-3 py-1.5 rounded-full hover:bg-black active:scale-95 transition-all shadow-[0_2px_0_#000000]"
                  aria-label="Open Morphing Search"
                >
                  <Search size={13} strokeWidth={2.5} className="text-[#FFD21F]" />
                  <span className="text-[10px] font-black tracking-tight">Search</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};
