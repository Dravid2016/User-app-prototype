import React, { useState } from 'react';
import { Sparkles, Flame, Gift, Bike } from 'lucide-react';
import { DailyStreakCard } from './DailyStreakCard';
import { ReferralRewardsCard } from './ReferralRewardsCard';
import { DeliveryPerksCard } from './DeliveryPerksCard';

export const HomeEventsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'streak' | 'referral' | 'delivery'>('streak');

  const tabs = [
    { id: 'streak' as const, label: 'Daily Streak', icon: Flame },
    { id: 'referral' as const, label: 'Refer & Gifts', icon: Gift },
    { id: 'delivery' as const, label: 'Free Delivery', icon: Bike },
  ];

  return (
    <section className="home-events-section select-none mt-4 text-left">
      {/* Section Header */}
      <div className="section-heading mb-2">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-[#111111] text-[#FFD21F] border border-[#111111] inline-flex items-center gap-1">
              <Sparkles size={9} /> Feazto Community Events
            </span>
          </div>
          <h2 className="text-[15px] font-black text-[#111111] tracking-tight">
            Rewards & Community Perks
          </h2>
          <p className="text-[8.5px] font-bold text-[#707070] mt-0.5">
            Daily order streaks, homemade gift sets & fair rider support
          </p>
        </div>
      </div>

      {/* Event Selection Tabs */}
      <div className="flex items-center gap-1.5 mb-3 overflow-x-auto no-scrollbar py-0.5">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black border transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#FFD21F] text-[#111111] border-[#111111] shadow-[0_2px_0_#111111] scale-[1.02]'
                  : 'bg-white text-[#707070] border-black/15 hover:border-black/40'
              }`}
            >
              <Icon size={12} className={isActive ? 'text-[#111111] fill-[#111111]' : ''} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Event Card Display */}
      <div className="transition-all duration-200">
        {activeTab === 'streak' && <DailyStreakCard />}
        {activeTab === 'referral' && <ReferralRewardsCard />}
        {activeTab === 'delivery' && <DeliveryPerksCard />}
      </div>
    </section>
  );
};
