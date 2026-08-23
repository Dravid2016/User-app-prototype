import React, { useState, useEffect, useRef } from 'react';
import { Bell, Heart, ShoppingBag, Music, Volume2, VolumeX } from 'lucide-react';
import { useAppStore } from '../../../store/appStore';
import './header.css';

interface HeaderProps {
  onNotificationClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNotificationClick,
}) => {
  const { page, setPage, cartCount, savedItemIds, showToast } = useAppStore();
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicIntervalRef = useRef<any>(null);

  const isSavedPage = page === 'saved';
  const isCartPage = page === 'cart';

  const handleNotificationClick = onNotificationClick || (() => {
    showToast('No new notifications');
  });

  // Soothing Indian Ambient Pentatonic Chords Synthesizer
  const playAmbientNote = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25]; // C4, D4, E4, G4, A4, C5 pentatonic scale
      const randomFreq = notes[Math.floor(Math.random() * notes.length)];

      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(randomFreq, audioCtxRef.current.currentTime);

      // Soft envelope for peaceful ambient sound
      gain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      gain.gain.linearRampToValueAtTime(0.03, audioCtxRef.current.currentTime + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 2.8);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start(audioCtxRef.current.currentTime);
      osc.stop(audioCtxRef.current.currentTime + 3.0);
    } catch (e) {
      console.error('Audio synth error', e);
    }
  };

  const toggleMusic = () => {
    if (isPlayingMusic) {
      if (musicIntervalRef.current) {
        clearInterval(musicIntervalRef.current);
        musicIntervalRef.current = null;
      }
      setIsPlayingMusic(false);
      showToast('App Background Music: Off 🔇');
    } else {
      setIsPlayingMusic(true);
      showToast('App Background Music: Playing Soothing Melodies 🎵');
      playAmbientNote();
      musicIntervalRef.current = setInterval(() => {
        playAmbientNote();
      }, 1600);
    }
  };

  // Cleanup audio timer on unmount
  useEffect(() => {
    return () => {
      if (musicIntervalRef.current) {
        clearInterval(musicIntervalRef.current);
      }
    };
  }, []);

  return (
    <header className="feazto-header select-none">
      <div className="feazto-header__inner">
        {/* Top Row: Logo & Action Icons */}
        <div className="feazto-header__top">
          <button
            onClick={() => setPage('home')}
            className="feazto-header__logo cursor-pointer border-none bg-transparent p-0 active:scale-95 transition-transform"
            aria-label="Feazto Home"
          >
            <img
              src="/brand/feazto-logo.png"
              alt="Feazto"
            />
          </button>

          {/* Action Icons Row: Music, Wishlist, Cart, Notification */}
          <div className="feazto-header__actions">
            {/* 1. App Background Music Toggle */}
            <button
              type="button"
              className={`feazto-header__icon-button relative transition-all ${
                isPlayingMusic ? 'bg-[#FFD21F] text-[#111111] ring-2 ring-[#111111]' : ''
              }`}
              aria-label="Toggle App Background Music"
              onClick={toggleMusic}
              title={isPlayingMusic ? 'Turn off background music' : 'Turn on background music'}
            >
              {isPlayingMusic ? (
                <Volume2 size={16} strokeWidth={2.5} className="animate-pulse" />
              ) : (
                <VolumeX size={16} strokeWidth={1.8} className="text-[#707070]" />
              )}
              {isPlayingMusic && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white animate-ping" />
              )}
            </button>

            {/* 2. Wishlist / Saved */}
            <button
              type="button"
              className={`feazto-header__icon-button relative transition-colors ${
                isSavedPage ? 'bg-[#FFD21F] border border-[#111111]' : ''
              }`}
              aria-label="Wishlist"
              onClick={() => setPage('saved')}
              title="Wishlist"
            >
              <Heart
                size={16}
                strokeWidth={2.2}
                className={savedItemIds.length > 0 || isSavedPage ? 'fill-[#111111] text-[#111111]' : 'text-[#111111]'}
              />
              {savedItemIds.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 rounded-full bg-[#111111] text-[#FFD21F] text-[9px] font-black flex items-center justify-center px-1 shadow-[0_1px_0_#000000]">
                  {savedItemIds.length}
                </span>
              )}
            </button>

            {/* 3. Cart */}
            <button
              type="button"
              className={`feazto-header__icon-button relative transition-all ${
                isCartPage ? 'bg-[#FFD21F] border border-[#111111]' : ''
              }`}
              aria-label="Cart"
              onClick={() => setPage('cart')}
              title="Cart"
            >
              <ShoppingBag size={16} strokeWidth={2.2} className="text-[#111111]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 rounded-full bg-[#111111] text-[#FFD21F] text-[9px] font-black flex items-center justify-center px-1 shadow-[0_1px_0_#000000]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* 4. Notification */}
            <button
              type="button"
              className="feazto-header__icon-button relative"
              aria-label="Notifications"
              onClick={handleNotificationClick}
              title="Notifications"
            >
              <Bell size={16} strokeWidth={1.8} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FFD21F] border border-[#111111]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

