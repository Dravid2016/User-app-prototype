import React from 'react';
import { SearchBar } from '../components/common/SearchBar';
import { FoodCard } from '../components/food/FoodCard';
import { MOCK_FOODS } from '../data/foods';
import { MOCK_CATEGORIES } from '../data/categories';
import { useAppStore } from '../store/appStore';
import { EmptyState } from '../components/common/EmptyState';
import { Search, Filter, Utensils } from 'lucide-react';

export const Explore: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  } = useAppStore();

  const filterPills = [
    { id: 'all', label: 'All Dishes' },
    ...MOCK_CATEGORIES.map((c) => ({ id: c.id, label: c.name })),
  ];

  const filteredFoods = MOCK_FOODS.filter((food) => {
    const matchesSearch =
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.kitchenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory || selectedCategory === 'all'
        ? true
        : food.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-24 pt-3 px-4">
      {/* Top Search Area */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-black text-[#111111] uppercase tracking-tight flex items-center gap-2">
            <Search size={22} className="text-[#FFD21F]" />
            Search & Explore
          </h1>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-bold text-red-500 hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search Dosa, Biryani, Pongal, Kitchen..."
        />
      </div>

      {/* Quick Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-4">
        {filterPills.map((pill) => {
          const isSelected =
            (pill.id === 'all' && (!selectedCategory || selectedCategory === 'all')) ||
            selectedCategory === pill.id;

          return (
            <button
              key={pill.id}
              onClick={() =>
                setSelectedCategory(pill.id === 'all' ? null : pill.id)
              }
              className={`px-3.5 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-[#111111] text-[#FFD21F] border-[#111111] shadow-sm'
                  : 'bg-[#FAFAFA] text-[#111111] border-black/10 hover:border-black'
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      {/* Results Section */}
      {filteredFoods.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-3 text-xs font-extrabold text-[#707070] px-1">
            <span>SHOWING {filteredFoods.length} DISHES</span>
            <span>SORT: POPULARITY</span>
          </div>
          <div className="grid grid-cols-2 gap-3.5">
            {filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          icon={Utensils}
          title="No Dishes Found"
          description={`We couldn't find any dish matching "${searchTerm}". Try searching for Dosa, Sambar Rice, or Pongal.`}
          actionText="Reset Search"
          onAction={() => {
            setSearchTerm('');
            setSelectedCategory(null);
          }}
        />
      )}
    </div>
  );
};
