import React, { useState } from 'react';
import { User, MapPin, CreditCard, Utensils, Globe, Bell, HelpCircle, Settings, ChevronRight, X, Shield, Award } from 'lucide-react';
import { BentoCard } from '../components/bento/BentoCard';
import { BentoButton } from '../components/bento/BentoButton';
import { useAppStore } from '../store/appStore';

export const Profile: React.FC = () => {
  const { addresses, showToast } = useAppStore();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const profileMenu = [
    { id: 'addresses', label: 'Saved Addresses', sub: `${addresses.length} Addresses`, icon: MapPin },
    { id: 'payments', label: 'Payment Methods', sub: 'GPay, Cards saved', icon: CreditCard },
    { id: 'food-pref', label: 'Food Preferences', sub: 'Authentic South Indian, Pure Veg', icon: Utensils },
    { id: 'language', label: 'Language / மொழி', sub: 'English (Default)', icon: Globe },
    { id: 'notifications', label: 'Notifications', sub: 'Order updates & offers enabled', icon: Bell },
    { id: 'help', label: 'Help & Customer Support', sub: '24x7 Live chat & hotline', icon: HelpCircle },
    { id: 'settings', label: 'App Settings & Privacy', sub: 'Version 2.4.0', icon: Settings },
  ];

  return (
    <div className="pb-24 pt-3 px-4 animate-fade-in">
      {/* Profile Overview Card */}
      <BentoCard padding="md" variant="yellow" className="mb-6 border-2 border-[#111111] shadow-md">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-[#111111] text-[#FFD21F] border-2 border-[#111111] flex items-center justify-center text-xl font-black shadow-sm">
            R
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-black text-[#111111]">Ranjith Kumar</h2>
              <Award size={16} className="text-[#111111] fill-[#111111]" />
            </div>
            <p className="text-xs font-bold text-[#111111]/80">+91 98401 23456 • Gold Feazter</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-[#111111] text-[#FFD21F] text-[9px] font-black rounded-md uppercase">
              Anna Nagar, Chennai
            </span>
          </div>
        </div>
      </BentoCard>

      {/* Menu List */}
      <div className="space-y-2.5">
        {profileMenu.map((item) => {
          const Icon = item.icon;
          return (
            <BentoCard
              key={item.id}
              onClick={() => setActiveModal(item.id)}
              padding="sm"
              className="border-2 border-black/10 cursor-pointer flex items-center justify-between hover:bg-[#FAFAFA] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAFAFA] border border-black/10 flex items-center justify-center text-[#111111]">
                  <Icon size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#111111]">{item.label}</h4>
                  <p className="text-[10px] font-bold text-[#707070]">{item.sub}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#111111]" />
            </BentoCard>
          );
        })}
      </div>

      {/* Interactive Modal Handler */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] border-2 border-[#111111] p-5 max-w-xs w-full animate-scale-up">
            <div className="flex items-center justify-between pb-2 border-b border-black/10 mb-3">
              <h3 className="text-base font-black text-[#111111] capitalize">
                {activeModal.replace('-', ' ')}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full text-gray-400 hover:text-black"
              >
                <X size={18} />
              </button>
            </div>

            {activeModal === 'addresses' && (
              <div className="space-y-2 text-xs font-bold text-[#111111]">
                {addresses.map((a) => (
                  <div key={a.id} className="p-2.5 bg-[#FAFAFA] rounded-xl border border-black/10">
                    <span className="text-[10px] bg-[#FFD21F] px-1.5 py-0.5 rounded font-black">{a.label}</span>
                    <p className="mt-1">{a.line1}, {a.city}</p>
                  </div>
                ))}
              </div>
            )}

            {activeModal === 'language' && (
              <div className="space-y-2 text-xs font-bold text-[#111111]">
                <button onClick={() => { showToast('Language set to English'); setActiveModal(null); }} className="w-full p-2 bg-[#FFD21F] rounded-xl border border-black text-left font-black">
                  ✓ English (Default)
                </button>
                <button onClick={() => { showToast('மொழி தமிழ் ஆக மாற்றப்பட்டது'); setActiveModal(null); }} className="w-full p-2 bg-[#FAFAFA] rounded-xl border border-black/10 text-left">
                  தமிழ் (Tamil)
                </button>
              </div>
            )}

            {activeModal !== 'addresses' && activeModal !== 'language' && (
              <div className="text-center py-4 text-xs font-medium text-[#707070]">
                <Shield size={32} className="mx-auto text-[#FFD21F] mb-2" />
                <p>This settings module is fully configured for your Feazto account.</p>
              </div>
            )}

            <div className="mt-4">
              <BentoButton variant="primary" fullWidth size="sm" onClick={() => setActiveModal(null)}>
                Close
              </BentoButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
