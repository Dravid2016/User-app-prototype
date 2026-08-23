import React from 'react';
import { CultureHeroBanner } from '../components/home/CultureHeroBanner';
import { HomeSearchSection } from '../components/home/HomeSearchSection';
import { QuickActionBar } from '../components/home/QuickActionBar';
import { LiveStatusStrip } from '../components/home/LiveStatusStrip';
import { ChefSpotlight } from '../components/home/ChefSpotlight';
import { RakshaBandhanSection } from '../components/home/RakshaBandhanSection';
import { FestivalSpecialsSection } from '../components/home/FestivalSpecialsSection';
import { RegionalFoodSection } from '../components/home/RegionalFoodSection';
import { AmmaSamayalSection } from '../components/home/AmmaSamayalSection';
import { HomeEventsSection } from '../components/home/HomeEventsSection';

import '../styles/tokens.css';
import '../styles/home.css';

export const Home: React.FC = () => {
  return (
    <div className="home-page">
      <div className="home-content">
        <CultureHeroBanner />
        <HomeSearchSection />
        <QuickActionBar />
        <LiveStatusStrip />
        <ChefSpotlight />
        <RakshaBandhanSection />
        <FestivalSpecialsSection />
        <RegionalFoodSection />
        <AmmaSamayalSection />
        <HomeEventsSection />
      </div>
    </div>
  );
};
