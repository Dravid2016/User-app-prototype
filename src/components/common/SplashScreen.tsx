import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [fadeAway, setFadeAway] = useState(false);

  useEffect(() => {
    // Fill progress bar over 2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Wait for a brief moment then trigger fade-out transition
      const timeout = setTimeout(() => {
        setFadeAway(true);
        // Complete splash screen after transition duration (500ms)
        const finishTimeout = setTimeout(() => {
          onFinish();
        }, 500);
        return () => clearTimeout(finishTimeout);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [progress, onFinish]);

  return (
    <div
      className={`absolute inset-0 z-[9999] flex flex-col items-center justify-between py-16 bg-[#111111] transition-opacity duration-500 ease-in-out ${
        fadeAway ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top spacer */}
      <div />

      {/* Center Branding Block */}
      <div className="flex flex-col items-center text-center px-6 animate-fade-in">
        {/* Animated logo wrapper */}
        <div className="w-28 h-28 bg-[#FFD21F] border-4 border-white rounded-[32px] flex items-center justify-center shadow-[0_12px_36px_rgba(255,210,31,0.25)] mb-6 animate-bounce">
          <img
            src="/brand/feazto-logo.png"
            alt="FEAZTO"
            className="w-20 h-auto object-contain block filter contrast-125"
          />
        </div>
        
        <h1 className="text-3xl font-black text-white tracking-tight">FEAZTO</h1>
        <p className="text-sm font-extrabold text-[#FFD21F] mt-1.5 uppercase tracking-wider">
          Cooks • Cafes • Homemade
        </p>
      </div>

      {/* Bottom Loading Progress Block */}
      <div className="w-full max-w-[240px] px-6 text-center">
        <div className="h-3 w-full bg-[#222222] border-2 border-white rounded-full overflow-hidden mb-3 p-[2px] shadow-sm">
          <div
            className="h-full bg-[#FFD21F] rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[10px] font-black text-white/60 uppercase tracking-widest leading-none font-mono">
          Loading Feazto Ecosystem...
        </p>
      </div>
    </div>
  );
};
