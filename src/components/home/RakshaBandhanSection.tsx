import React, { useState } from 'react';
import { Sparkles, Gift, Tag, Clock, Check, Plus, Heart, Copy, ShieldCheck } from 'lucide-react';
import { RAKSHA_BANDHAN_CONFIG, RakhiFestiveItem } from '../../data/rakshaBandhanData';
import { useAppStore } from '../../store/appStore';
import { FoodItem } from '../../types';

export const RakshaBandhanSection: React.FC = () => {
  const { addToCart, cart, isFavorite, toggleFavorite, setSelectedFood, setPage, showToast } = useAppStore();
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const handleCopyCoupon = () => {
    navigator.clipboard?.writeText(RAKSHA_BANDHAN_CONFIG.couponCode);
    setCopiedCoupon(true);
    showToast(`Coupon "${RAKSHA_BANDHAN_CONFIG.couponCode}" Copied! ₹100 OFF unlocked on festive orders!`);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const handleSelectItem = (item: RakhiFestiveItem) => {
    const foodItem: FoodItem = {
      id: item.id,
      name: item.title,
      rating: 4.96,
      reviewCount: 184,
      price: item.price,
      description: item.description,
      kitchenId: 'k-rakhi-special',
      kitchenName: 'Raksha Bandhan Heritage Kitchens',
      category: 'meals',
      cuisine: 'Rakhi Special',
      image: item.image,
      tags: ['Raksha Bandhan', 'Aug 28 Special', item.discount],
      isPopular: true,
      isHomemade: true,
      prepTime: 'Aug 28 Festive Batch',
      region: 'tamilnadu',
    };
    setSelectedFood(foodItem);
    setPage('food-detail');
  };

  const handleAddToCart = (item: RakhiFestiveItem) => {
    const foodItem: FoodItem = {
      id: item.id,
      name: item.title,
      rating: 4.96,
      reviewCount: 184,
      price: item.price,
      description: item.description,
      kitchenId: 'k-rakhi-special',
      kitchenName: 'Raksha Bandhan Heritage Kitchens',
      category: 'meals',
      cuisine: 'Rakhi Special',
      image: item.image,
      tags: ['Raksha Bandhan', 'Aug 28 Special', item.discount],
      isPopular: true,
      isHomemade: true,
      prepTime: 'Aug 28 Festive Batch',
      region: 'tamilnadu',
    };
    addToCart(foodItem);
  };

  return (
    <section className="rakhi-festival-section select-none mt-4 text-left">
      {/* 1. Standalone Raksha Bandhan Food Festival Hero Card (Contains ONLY Image & Badges) */}
      <div className="rakhi-hero-banner-card mb-2.5 border-2 border-[#111111] rounded-2xl bg-black shadow-[0_4px_0_#111111] overflow-hidden relative h-44 cursor-pointer" onClick={() => handleSelectItem(RAKSHA_BANDHAN_CONFIG.items[0])}>
        <img
          src="/festivals/raksha-bandhan/rakhi-food-festival-banner.jpg"
          alt="Raksha Bandhan Food Festival"
          className="w-full h-full object-cover"
        />

        {/* Top Overlays */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-1 bg-[#111111] text-[#FFD21F] px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider shadow-[0_1.5px_0_#000000]">
            <Clock size={10} /> AUG 28 · RAKSHA BANDHAN
          </div>
          <span className="text-[8px] font-black text-[#111111] bg-white/95 px-2 py-0.5 rounded-md border border-[#111111] shadow-[0_1px_0_#111111]">
            5 Days Left
          </span>
        </div>

        {/* Bottom Feazto Badge Overlay */}
        <div className="absolute bottom-2 left-2.5 bg-[#111111]/90 backdrop-blur-xs text-[#FFD21F] border border-[#FFD21F]/40 px-2 py-0.5 rounded-md text-[7.5px] font-black uppercase tracking-wider flex items-center gap-1">
          <Sparkles size={9} /> FEAZTO FESTIVAL EXCLUSIVE
        </div>
      </div>

      {/* 2. Festival Card Details & Coupon Strip (Rendered BELOW the Card Box) */}
      <div className="rakhi-banner-details text-left mb-3.5 px-0.5">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h2 className="text-[14.5px] font-black text-[#111111] leading-tight">
              Raksha Bandhan Food Festival
            </h2>
            <p className="text-[9px] font-bold text-[#707070] mt-0.5">
              Handmade Sweets, Sibling Feasts & Free Silk Rakhi with Every Box!
            </p>
          </div>
        </div>

        {/* Coupon Discount Banner Strip */}
        <div className="bg-white border-1.5 border-[#111111] rounded-xl p-2 flex items-center justify-between gap-2 shadow-[0_2px_0_#111111] mt-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#FFD21F] border border-[#111111] flex items-center justify-center text-[#111111] shrink-0">
              <Tag size={14} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black text-[#111111] bg-[#fff3b8] px-1.5 py-0.2 rounded border border-[#111111]">
                  CODE: {RAKSHA_BANDHAN_CONFIG.couponCode}
                </span>
                <span className="text-[9px] font-black text-green-700">FLAT ₹100 OFF</span>
              </div>
              <p className="text-[7.5px] font-bold text-[#707070] truncate mt-0.5">
                {RAKSHA_BANDHAN_CONFIG.freeGiftText}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyCoupon}
            className="px-2.5 py-1 bg-[#111111] hover:bg-black text-[#FFD21F] text-[8.5px] font-black rounded-lg active:scale-95 transition-transform flex items-center gap-1 shrink-0 cursor-pointer"
          >
            {copiedCoupon ? <Check size={10} /> : <Copy size={10} />}
            {copiedCoupon ? 'Applied' : 'Apply'}
          </button>
        </div>
      </div>

      {/* 2. Horizontal Scroller of Raksha Bandhan Cards */}
      <div className="rakhi-scroller no-scrollbar">
        {RAKSHA_BANDHAN_CONFIG.items.map((item) => {
          const inCart = cart.find((c) => c.food.id === item.id);
          const fav = isFavorite(item.id);

          return (
            <div
              key={item.id}
              className="rakhi-card group"
            >
              {/* Image with Fest Badges */}
              <div
                className="rakhi-img-wrap cursor-pointer"
                onClick={() => handleSelectItem(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="rakhi-img group-hover:scale-105 transition-transform duration-300"
                />

                {/* Free Gift Badge Overlay */}
                <div className="rakhi-gift-badge">
                  <Gift size={9} />
                  <span>{item.giftTag}</span>
                </div>

                {/* Discount Badge */}
                <div className="rakhi-discount-tag">
                  {item.discount}
                </div>

                {/* Favorite Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  className={`rakhi-fav-btn ${fav ? 'rakhi-fav-active' : ''}`}
                  aria-label="Save Favorite"
                >
                  <Heart size={12} className={fav ? 'fill-[#111111]' : ''} />
                </button>
              </div>

              {/* Card Body */}
              <div className="rakhi-body text-left">
                {/* Serves / Tag */}
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[7.5px] font-black bg-[#fff3b8] text-[#111111] px-1.5 py-0.5 rounded border border-[#111111]/20">
                    {item.serves}
                  </span>
                  <span className="text-[7.5px] font-black text-[#111111] flex items-center gap-0.5">
                    <ShieldCheck size={9} className="text-green-700" /> Pure Ghee
                  </span>
                </div>

                {/* Title */}
                <h3
                  onClick={() => handleSelectItem(item)}
                  className="text-[11.5px] font-black text-[#111111] line-clamp-1 cursor-pointer hover:text-[#d49900] transition-colors"
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[8px] text-[#707070] font-medium line-clamp-2 mt-0.5 leading-relaxed">
                  {item.description}
                </p>

                {/* Price & Pre-Book / Add Button */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/10">
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
                      Aug 28 Delivery
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(item)}
                    className={`rakhi-add-btn ${inCart ? 'rakhi-add-active' : ''}`}
                  >
                    {inCart ? (
                      <>
                        <Check size={11} strokeWidth={3} />
                        <span>({inCart.quantity}) Added</span>
                      </>
                    ) : (
                      <>
                        <Plus size={11} strokeWidth={3} />
                        <span>Pre-Book</span>
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
