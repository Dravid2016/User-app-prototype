import React, { useState } from 'react';
import { Flame, Trophy, Gift, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { HOME_EVENT_CONFIG } from '../../data/homeEvents';
import { useAppStore } from '../../store/appStore';

export const DailyStreakCard: React.FC = () => {
  const { streak: userStreak } = { streak: HOME_EVENT_CONFIG.userStreak };
  const { showToast, setPage } = useAppStore();
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    if (claimed) {
      showToast('Daily Streak already active for today! 🔥');
    } else {
      setClaimed(true);
      showToast('🎉 Daily Streak Verified! 1 Day closer to the Monthly Mega Feast!');
    }
  };

  const progressPercent = Math.min(100, (userStreak.currentDays / userStreak.targetDays) * 100);

  return (
    <div className="event-feature-card bg-[#fffdf5] border-2 border-[#111111] rounded-2xl p-3.5 shadow-[0_3px_0_#111111] relative overflow-hidden">
      {/* Top Banner Row */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 rounded-full bg-[#FFD21F] border-2 border-[#111111] flex items-center justify-center shadow-[0_1.5px_0_#111111]">
            <Flame size={16} className="text-[#111111] fill-[#FFD21F] animate-pulse" />
          </div>
          <div className="text-left">
            <span className="text-[7.5px] font-black uppercase tracking-wider bg-[#111111] text-white px-1.5 py-0.5 rounded">
              Monthly Streak Challenge
            </span>
            <h3 className="text-[13px] font-black text-[#111111] leading-tight">
              {userStreak.currentDays}-Day Daily Feast Streak
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClaim}
          className="text-[9px] font-black bg-[#FFD21F] text-[#111111] border-1.5 border-[#111111] px-2.5 py-1 rounded-full shadow-[0_1.5px_0_#111111] active:translate-y-0.5 transition-all flex items-center gap-1"
        >
          {claimed ? (
            <>
              <CheckCircle2 size={10} /> Active
            </>
          ) : (
            <>
              <Flame size={10} className="fill-[#111111]" /> Check-in
            </>
          )}
        </button>
      </div>

      {/* Streak Info Text */}
      <p className="text-[9px] text-[#707070] font-bold text-left mb-2.5 leading-relaxed">
        Order homemade food daily on Feazto to maintain your streak and win the <strong className="text-[#111111]">Monthly Mega Winner Feast (₹{userStreak.monthlyPrizeWorth} value)</strong>!
      </p>

      {/* Progress Bar Container */}
      <div className="mb-3 bg-white p-2.5 rounded-xl border-1.5 border-[#111111] shadow-[0_1.5px_0_#111111]">
        <div className="flex justify-between items-center text-[8.5px] font-extrabold mb-1">
          <span className="text-[#707070]">
            Goal: <strong className="text-[#111111]">{userStreak.currentDays} / {userStreak.targetDays} Days</strong> in {userStreak.monthName}
          </span>
          <span className="text-[#111111] bg-[#fff3b8] px-1.5 py-0.5 rounded border border-black/20">
            {Math.round(progressPercent)}% Completed
          </span>
        </div>

        {/* Bar */}
        <div className="w-full h-2.5 bg-[#f0f0f0] border border-[#111111] rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-[#FFD21F] border-r border-[#111111] rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Milestone Badges */}
        <div className="grid grid-cols-3 gap-1.5 mt-2 pt-2 border-t border-black/5">
          {userStreak.milestones.map((m, idx) => (
            <div
              key={idx}
              className={`p-1.5 rounded-lg border text-center text-[7.5px] font-black ${
                userStreak.currentDays >= m.day
                  ? 'bg-[#FFD21F] border-[#111111] text-[#111111]'
                  : 'bg-[#fafafa] border-black/15 text-[#888888]'
              }`}
            >
              <div className="font-extrabold flex items-center justify-center gap-0.5">
                {idx === 2 ? <Trophy size={8} /> : <Gift size={8} />}
                Day {m.day}
              </div>
              <div className="truncate font-semibold text-[7px] mt-0.5">{m.reward}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Winner Spotlight Footer */}
      <div 
        onClick={() => {
          showToast('Viewing Monthly Streak Hall of Fame');
          setPage('explore');
        }}
        className="bg-[#111111] text-white p-2 rounded-xl flex items-center justify-between cursor-pointer hover:bg-black/90 active:scale-[0.99] transition-all"
      >
        <div className="flex items-center gap-1.5">
          <Award size={13} className="text-[#FFD21F]" />
          <span className="text-[8.5px] font-black tracking-tight">
            Last Month Winner: Priya S. (30-Day Golden Tiffin Award)
          </span>
        </div>
        <ChevronRight size={12} className="text-[#FFD21F]" />
      </div>
    </div>
  );
};
