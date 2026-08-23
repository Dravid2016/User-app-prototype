import React from 'react';
import { Sparkles, Heart, Plus, Check, Clock, Flame } from 'lucide-react';
import { AMMA_SAMAYAL_SPECIALS, AmmaSpecialItem } from '../../data/ammaSamayal';
import { useAppStore } from '../../store/appStore';

export const AmmaSamayalSection: React.FC = () => {
  const { setSelectedFood, setPage, addToCart, cart, isFavorite, toggleFavorite } = useAppStore();

  const handleSelectFood = (item: AmmaSpecialItem) => {
    setSelectedFood(item);
    setPage('food-detail');
  };

  return (
    <section className="amma-samayal-section select-none">
      {/* Section Header */}
      <div className="section-heading text-left mb-2.5">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[8px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#FFD21F] text-[#111111] border border-[#111111] shadow-[0_1.5px_0_#111111] inline-flex items-center gap-1">
              <Sparkles size={9} className="fill-[#111111]" /> Today's Special
            </span>
            <span className="text-[8.5px] font-black text-[#707070]">
              அம்மா சமையல்
            </span>
          </div>
          <h2 className="text-[16px] font-black text-[#111111] tracking-tight leading-tight">
            Amma Samayal Special Feasts
          </h2>
          <p className="text-[8.5px] font-bold text-[#707070] mt-0.5">
            Small-batch home delicacies crafted by native neighborhood mothers
          </p>
        </div>
      </div>

      {/* Horizontal Scroller of Special Dishes */}
      <div className="amma-scroller no-scrollbar">
        {AMMA_SAMAYAL_SPECIALS.map((item) => {
          const inCart = cart.find((c) => c.food.id === item.id);
          const fav = isFavorite(item.id);

          return (
            <div
              key={item.id}
              className="amma-card group"
            >
              {/* Image Container */}
              <div 
                className="amma-img-container cursor-pointer"
                onClick={() => handleSelectFood(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="amma-img group-hover:scale-105 transition-transform duration-300"
                />

                {/* Live Batch Badge */}
                <div className="amma-batch-badge">
                  <Clock size={9} />
                  <span>{item.batchTime}</span>
                </div>

                {/* Favorite Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  className={`amma-fav-btn ${fav ? 'amma-fav-active' : ''}`}
                  aria-label="Save Favorite"
                >
                  <Heart size={12} className={fav ? 'fill-[#111111]' : ''} />
                </button>

                {/* Portions Alert */}
                <div className="amma-portions-tag">
                  <Flame size={9} className="text-[#FFD21F] fill-[#FFD21F]" />
                  <span>{item.portionsLeft} left</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="amma-body text-left">
                {/* Cook Info Chip */}
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[8px] font-black bg-[#fff3b8] text-[#111111] px-1.5 py-0.5 rounded border border-[#111111]">
                    👩‍🍳 {item.ammaName} ({item.ammaCity})
                  </span>
                  <span className="text-[7.5px] font-bold text-[#707070]">
                    {item.prepTime}
                  </span>
                </div>

                {/* Dish Title */}
                <h3 
                  onClick={() => handleSelectFood(item)}
                  className="text-[12px] font-black text-[#111111] line-clamp-1 cursor-pointer hover:text-[#e0a800] transition-colors"
                >
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-[8px] text-[#707070] font-medium line-clamp-2 mt-0.5 leading-relaxed">
                  {item.description}
                </p>

                {/* Price & Action Row */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/10">
                  <div>
                    <span className="text-[13px] font-black text-[#111111]">
                      ₹{item.price}
                    </span>
                    <span className="text-[7.5px] font-bold text-[#707070] block -mt-0.5">
                      No preservatives
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className={`amma-add-btn ${inCart ? 'amma-add-active' : ''}`}
                  >
                    {inCart ? (
                      <>
                        <Check size={11} strokeWidth={3} />
                        <span>({inCart.quantity}) Added</span>
                      </>
                    ) : (
                      <>
                        <Plus size={11} strokeWidth={3} />
                        <span>Add</span>
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
