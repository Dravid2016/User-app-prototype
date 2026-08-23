import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../../styles/tokens.css';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fadeAway, setFadeAway] = useState(false);

  useEffect(() => {
    // Hold splash screen for 2.2 seconds to complete the full funky animation sequence
    const timer = setTimeout(() => {
      setFadeAway(true);
      const finishTimer = setTimeout(() => {
        onFinish();
      }, 500);
      return () => clearTimeout(finishTimer);
    }, 2200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#111111] overflow-hidden select-none transition-opacity duration-500 ease-in-out ${
        fadeAway ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Funky Background Golden Aura Glow Pulse */}
      <motion.div
        animate={{
          scale: [0.8, 1.4, 0.9, 1.25, 1],
          opacity: [0.25, 0.65, 0.3, 0.55, 0.25],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[380px] h-[380px] rounded-full bg-[#E69D00]/25 blur-3xl pointer-events-none"
      />

      {/* FUNKY LETTER-BY-LETTER FEAZTO VECTOR LOGO ANIMATION */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex items-baseline justify-center select-none px-6"
      >
        {/* F - Drops down with a funny 3D spring bounce */}
        <motion.span
          variants={{
            hidden: { opacity: 0, y: -75, scale: 0.3, rotate: -20 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              transition: { type: 'spring', stiffness: 420, damping: 16 },
            },
          }}
          className="feazto-logo-font text-6xl sm:text-8xl text-white tracking-tighter inline-block -skew-x-6 drop-shadow-[0_4px_16px_rgba(255,255,255,0.2)]"
        >
          F
        </motion.span>

        {/* E - Pops up from below */}
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 75, scale: 0.3, rotate: 20 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              transition: { type: 'spring', stiffness: 420, damping: 16 },
            },
          }}
          className="feazto-logo-font text-6xl sm:text-8xl text-white tracking-tighter inline-block -skew-x-6 drop-shadow-[0_4px_16px_rgba(255,255,255,0.2)]"
        >
          E
        </motion.span>

        {/* A - Squeezes down wide and stretches up high */}
        <motion.span
          variants={{
            hidden: { opacity: 0, scaleY: 0.1, scaleX: 1.8 },
            visible: {
              opacity: 1,
              scaleY: [0.1, 1.45, 0.88, 1.1, 1],
              scaleX: [1.8, 0.8, 1.1, 0.95, 1],
              transition: { duration: 0.55, type: 'spring', stiffness: 400 },
            },
          }}
          className="feazto-logo-font text-6xl sm:text-8xl text-white tracking-tighter inline-block -skew-x-6 drop-shadow-[0_4px_16px_rgba(255,255,255,0.2)]"
        >
          A
        </motion.span>

        {/* Z - FUNKY HERO: 360 Spin + Giant Scale Pop + Recurring Wiggle! */}
        <motion.span
          variants={{
            hidden: { opacity: 0, scale: 0.1, rotate: -180 },
            visible: {
              opacity: 1,
              scale: [0.1, 1.55, 0.85, 1.18, 1],
              rotate: [-180, 15, -10, 5, 0],
              transition: { type: 'spring', stiffness: 360, damping: 13 },
            },
          }}
          animate={{
            rotate: [0, -8, 8, -5, 5, 0],
          }}
          transition={{
            rotate: {
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 1.6,
              ease: 'easeInOut',
            },
          }}
          className="feazto-logo-font text-7xl sm:text-9xl text-[#E69D00] tracking-tighter inline-block -skew-x-6 drop-shadow-[0_0_35px_rgba(230,157,0,0.9)] z-20 px-0.5"
        >
          Z
        </motion.span>

        {/* T - Swings down gracefully */}
        <motion.span
          variants={{
            hidden: { opacity: 0, y: -65, rotate: 25 },
            visible: {
              opacity: 1,
              y: 0,
              rotate: 0,
              transition: { type: 'spring', stiffness: 400, damping: 16 },
            },
          }}
          className="feazto-logo-font text-6xl sm:text-8xl text-white tracking-tighter inline-block -skew-x-6 drop-shadow-[0_4px_16px_rgba(255,255,255,0.2)]"
        >
          T
        </motion.span>

        {/* O - Rolls in like a bouncing bowling ball */}
        <motion.span
          variants={{
            hidden: { opacity: 0, x: 75, rotate: 180 },
            visible: {
              opacity: 1,
              x: 0,
              rotate: 0,
              transition: { type: 'spring', stiffness: 380, damping: 16 },
            },
          }}
          className="feazto-logo-font text-6xl sm:text-8xl text-white tracking-tighter inline-block -skew-x-6 drop-shadow-[0_4px_16px_rgba(255,255,255,0.2)]"
        >
          O
        </motion.span>
      </motion.div>
    </div>
  );
};
