import React, { useState } from 'react';
import { Gift, Copy, Check, Share2, Users, Heart } from 'lucide-react';
import { HOME_EVENT_CONFIG } from '../../data/homeEvents';
import { useAppStore } from '../../store/appStore';

export const ReferralRewardsCard: React.FC = () => {
  const { referral } = HOME_EVENT_CONFIG;
  const { showToast } = useAppStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(referral.code);
    setCopied(true);
    showToast('🎉 Referral Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = () => {
    const text = `Order fresh authentic homemade food on Feazto with code ${referral.code} and get ₹${referral.friendDiscount} OFF your first feast! https://feazto.app`;
    if (navigator.share) {
      navigator.share({ title: 'Feazto Homemade Food', text }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(text);
      showToast('🎁 Invitation message copied to share with friends!');
    }
  };

  return (
    <div className="event-feature-card bg-[#fffdf5] border-2 border-[#111111] rounded-2xl p-3.5 shadow-[0_3px_0_#111111] relative overflow-hidden text-left">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 rounded-full bg-[#111111] text-[#FFD21F] border-2 border-[#111111] flex items-center justify-center shadow-[0_1.5px_0_#111111]">
            <Gift size={16} />
          </div>
          <div>
            <span className="text-[7.5px] font-black uppercase tracking-wider bg-[#FFD21F] text-[#111111] px-1.5 py-0.5 rounded border border-[#111111]">
              Refer & Earn Gifts
            </span>
            <h3 className="text-[13px] font-black text-[#111111] leading-tight">
              Share the Taste of Homemade Food
            </h3>
          </div>
        </div>
      </div>

      <p className="text-[9px] text-[#707070] font-bold mb-2.5 leading-relaxed">
        Invite friends to try homemade meals: They get <strong className="text-[#111111]">₹{referral.friendDiscount} OFF</strong> and you unlock <strong className="text-[#111111]">authentic gift sets</strong> per referral!
      </p>

      {/* Code Box & Quick Actions */}
      <div className="flex items-center gap-2 mb-3 bg-white p-2 rounded-xl border-1.5 border-[#111111] shadow-[0_1.5px_0_#111111]">
        <div className="flex-1 min-w-0">
          <span className="text-[7px] font-extrabold uppercase text-[#707070] block">Your Referral Code</span>
          <span className="text-[12px] font-black text-[#111111] font-mono tracking-wider">{referral.code}</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="p-1.5 px-2.5 bg-[#f4f4f4] hover:bg-[#e8e8e8] border border-[#111111] rounded-lg text-[9px] font-black text-[#111111] flex items-center gap-1 active:scale-95 transition-transform"
        >
          {copied ? <Check size={11} className="text-green-600" /> : <Copy size={11} />}
          {copied ? 'Copied' : 'Copy'}
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="p-1.5 px-3 bg-[#FFD21F] hover:bg-[#e0b810] border border-[#111111] rounded-lg text-[9px] font-black text-[#111111] flex items-center gap-1 active:scale-95 transition-transform shadow-[0_1px_0_#111111]"
        >
          <Share2 size={11} /> Share
        </button>
      </div>

      {/* Gift Tiers List */}
      <div className="space-y-1.5">
        <span className="text-[8px] font-black uppercase text-[#707070] flex items-center gap-1">
          <Users size={10} /> Referral Milestone Gifts:
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {referral.tierGifts.map((tier, idx) => (
            <div
              key={idx}
              className="bg-white p-2 rounded-xl border border-[#111111] text-center shadow-[0_1px_0_#111111]"
            >
              <div className="text-[14px] mb-0.5">{tier.icon}</div>
              <div className="text-[7.5px] font-black text-[#111111] leading-tight">
                {tier.invites} {tier.invites === 1 ? 'Friend' : 'Friends'}
              </div>
              <div className="text-[6.5px] font-bold text-[#707070] mt-0.5 truncate">
                {tier.giftTitle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
