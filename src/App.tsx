import React from 'react';
import { AppProvider, useAppStore } from './store/appStore';
import { Header } from './components/layout/header/Header';
import { MobileDockSearch } from './components/navigation/MobileDockSearch';
import { Toast } from './components/common/Toast';

import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { FoodDetail } from './pages/FoodDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { Orders } from './pages/Orders';
import { Saved } from './pages/Saved';
import { Profile } from './pages/Profile';
import { BookACook } from './pages/BookACook';
import { CookDetail } from './pages/CookDetail';
import { CafeDiscovery } from './pages/CafeDiscovery';
import { CafeDetail } from './pages/CafeDetail';
import { Auth } from './pages/Auth';
import { SplashScreen } from './components/common/SplashScreen';
import { RegionalFood } from './pages/RegionalFood';

const AppContent: React.FC = () => {
  const { page, setPage, user, toastMessage } = useAppStore();
  const [showSplash, setShowSplash] = React.useState(true);
  const [hasOnboarded, setHasOnboarded] = React.useState(false);

  const renderPage = () => {
    switch (page) {
      case 'explore':
        return <Explore />;
      case 'food-detail':
        return <FoodDetail />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'order-success':
        return <OrderSuccess />;
      case 'orders':
        return <Orders />;
      case 'saved':
        return <Saved />;
      case 'profile':
        return <Profile />;
      case 'book-a-cook':
        return <BookACook />;
      case 'cook-detail':
        return <CookDetail />;
      case 'cafes':
        return <CafeDiscovery />;
      case 'cafe-detail':
        return <CafeDetail />;
      case 'auth':
        return <Auth onFinish={() => setPage('home')} />;
      case 'regional-food':
        return <RegionalFood />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <div className="h-screen h-[100dvh] w-full bg-[#111111] text-[#111111] font-sans antialiased flex items-center justify-center p-0 md:py-6 md:px-4 overflow-hidden fixed inset-0">
      {/* Desktop Background & Presentation Container */}
      <div className="w-full max-w-[430px] h-full h-[100dvh] md:h-[860px] md:max-h-[920px] aurora-white-bg md:rounded-[44px] md:border-[8px] md:border-[#222222] md:shadow-[0_25px_70px_rgba(0,0,0,0.4)] overflow-hidden relative flex flex-col">
        
        {/* 1. Splash Screen Overlay */}
        {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
        
        {/* Mobile Device Camera Notch (Desktop Preview Only) */}
        <div className="hidden md:flex justify-center pt-2 pb-1 bg-transparent z-50 shrink-0">
          <div className="w-28 h-4 bg-[#111111] rounded-full" />
        </div>

        {/* 2. Pre-App Sign In / Onboarding Screen (Placed BEFORE app starts) */}
        {!showSplash && !hasOnboarded && !user ? (
          <div className="flex-1 overflow-y-auto no-scrollbar bg-[#fdfaeb] relative z-40 flex flex-col">
            <Auth onFinish={() => setHasOnboarded(true)} />
          </div>
        ) : (
          /* 3. Main App (Fixed Header + Pages + Pinned Mobile Bottom Dock) */
          <>
            {/* Global Top Header (Fixed Still at Top) */}
            <Header />

            {/* Main Page Scrollable Area */}
            <main className="flex-1 overflow-y-auto no-scrollbar aurora-white-bg pb-24">
              {renderPage()}
            </main>

            {/* Global Bottom Navigation Dock (Fixed Still at Screen Bottom at All Times) */}
            <div className="fixed bottom-3 left-0 right-0 max-w-[430px] mx-auto z-50 px-4 pointer-events-none">
              <MobileDockSearch active={page} onChange={setPage} />
            </div>
          </>
        )}

        {/* Toast Notification */}
        <Toast message={toastMessage} />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
