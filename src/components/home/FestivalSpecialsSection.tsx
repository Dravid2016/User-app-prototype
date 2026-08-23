import React from 'react';
import { Sparkles, Calendar, Plus, Check, Heart, Users } from 'lucide-react';
import { FESTIVAL_SPECIALS, FestivalSpecial } from '../../data/festivalSpecials';
import { useAppStore } from '../../store/appStore';
import { FoodItem } from '../../types';

export const FestivalSpecialsSection: React.FC = () => {
  const { addToCart, cart, isFavorite, toggleFavorite, setSelectedFood, setPage } = useAppStore();

  const handleSelectFestiveItem = (item: FestivalSpecial) => {
    // Map to FoodItem schema for detail view
    const foodItem: FoodItem = {
      id: item.id,
      name: item.dishTitle,
      rating: 4.95,
      reviewCount: 312,
      price: item.price,
      description: item.description,
      kitchenId: 'k-festive',
      kitchenName: item.chefName,
      category: 'meals',
      cuisine: item.festivalName,
      image: item.image,
      tags: ['Festival Special', 'Feazto Exclusive', item.servesCount],
      isPopular: true,
      isHomemade: true,
      prepTime: 'Festival Special',
      region: 'tamilnadu',
    };
    setSelectedFood(foodItem);
    setPage('food-detail');
  };

  const handleAddFestiveToCart = (item: FestivalSpecial) => {
    const foodItem: FoodItem = {
      id: item.id,
      name: item.dishTitle,
      rating: 4.95,
      reviewCount: 312,
      price: item.price,
      description: item.description,
      kitchenId: 'k-festive',
      kitchenName: item.chefName,
      category: 'meals',
      cuisine: item.festivalName,
      image: item.image,
      tags: ['Festival Special', 'Feazto Exclusive', item.servesCount],
      isPopular: true,
      isHomemade: true,
      prepTime: 'Festival Special',
      region: 'tamilnadu',
    };
    addToCart(foodItem);
  };

  return (
    <section className="festival-specials-section select-none mt-4 text-left">
      {/* Section Header */}
      <div className="section-heading mb-2.5">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-[#111111] text-[#FFD21F] border border-[#111111] shadow-[0_1.5px_0_#111111] inline-flex items-center gap-1">
              <Sparkles size={9} className="fill-[#FFD21F]" /> Festival Celebrations
            </span>
            <span className="text-[8.5px] font-black text-[#707070]">
              பண்டிகை சிறப்பு விருந்து
            </span>
          </div>
          <h2 className="text-[16px] font-black text-[#111111] tracking-tight leading-tight">
            Festival Special Grand Feasts
          </h2>
          <p className="text-[8.5px] font-bold text-[#707070] mt-0.5">
            Authentic festive thalis, claypot pongal & traditional sweet boxes
          </p>
        </div>
      </div>

      {/* Horizontal Scroller of Branded Festival Cards */}
      <div className="festival-scroller no-scrollbar">
        {FESTIVAL_SPECIALS.map((item) => {
          const inCart = cart.find((c) => c.food.id === item.id);
          const fav = isFavorite(item.id);

          return (
            <div
              key={item.id}
              className="festival-card group"
            >
              {/* Image Container with Branded Header Overlay */}
              <div 
                className="festival-img-wrap cursor-pointer"
                onClick={() => handleSelectFestiveItem(item)}
              >
                <img
                  src={item.image}
                  alt={item.dishTitle}
                  className="festival-img group-hover:scale-105 transition-transform duration-300"
                />

                {/* Feazto Brand Card Badge */}
                <div className="festival-brand-badge">
                  <img
                    src="/brand/feazto-logo.png"
                    alt="Feazto"
                    className="h-3 w-auto object-contain filter invert"
                  />
                  <span>FESTIVE EXCLUSIVE</span>
                </div>

                {/* Festival Name Badge */}
                <div className="festival-name-pill">
                  {item.badge}
                </div>

                {/* Favorite Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  className={`festival-fav-btn ${fav ? 'festival-fav-active' : ''}`}
                  aria-label="Save Favorite"
                >
                  <Heart size={12} className={fav ? 'fill-[#111111]' : ''} />
                </button>

                {/* Pre-book / Slot Badge */}
                <div className="festival-slot-badge">
                  <Calendar size={9} />
                  <span className="truncate">{item.preBookSlot}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="festival-body text-left">
                {/* Festival Regional Title */}
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[8px] font-black text-[#855700] bg-[#fff3b8] px-1.5 py-0.5 rounded border border-[#111111]/30 truncate max-w-[70%]">
                    {item.regionalTitle}
                  </span>
                  <span className="text-[7.5px] font-bold text-[#707070] flex items-center gap-0.5">
                    <Users size={8} /> {item.servesCount}
                  </span>
                </div>

                {/* Dish Title */}
                <h3 
                  onClick={() => handleSelectFestiveItem(item)}
                  className="text-[12px] font-black text-[#111111] line-clamp-1 cursor-pointer hover:text-[#d49900] transition-colors"
                >
                  {item.dishTitle}
                </h3>

                {/* Chef / Kitchen Info */}
                <p className="text-[8.5px] text-[#707070] font-bold truncate mt-0.5">
                  By {item.chefName}
                </p>

                {/* Description */}
                <p className="text-[8px] text-[#707070] font-medium line-clamp-2 mt-1 leading-relaxed">
                  {item.description}
                </p>

                {/* Pricing & Pre-Book / Add Button */}
                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-black/10">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[13px] font-black text-[#111111]">
                        ₹{item.price}
                      </span>
                      <span className="text-[9px] text-[#888888] line-through font-bold">
                        ₹{item.originalPrice}
                      </span>
                    </div>
                    <span className="text-[7.5px] font-black text-green-700 block -mt-0.5">
                      {item.discountBadge}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddFestiveToCart(item)}
                    className={`festival-add-btn ${inCart ? 'festival-add-active' : ''}`}
                  >
                    {inCart ? (
                      <>
                        <Check size={11} strokeWidth={3} />
                        <span>({inCart.quantity}) Added</span>
                      </>
                    ) : (
                      <>
                        <Plus size={11} strokeWidth={3} />
                        <span>{item.isPreBook ? 'Pre-Book' : 'Add Feast'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
