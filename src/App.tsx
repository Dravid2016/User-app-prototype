import React from 'react';
import { AppProvider, useAppStore } from './store/appStore';
import { TopNavigation } from './components/navigation/TopNavigation';
import { BottomNavigation } from './components/navigation/BottomNavigation';
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

const AppContent: React.FC = () => {
  const { page, setPage, toastMessage } = useAppStore();

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
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#111111] font-sans antialiased flex items-center justify-center p-0 md:py-6 md:px-4">
      {/* Desktop Background & Presentation Container */}
      <div className="w-full max-w-[430px] min-h-screen md:min-h-[860px] md:max-h-[920px] aurora-white-bg md:rounded-[44px] md:border-[8px] md:border-[#222222] md:shadow-[0_25px_70px_rgba(0,0,0,0.4)] overflow-hidden relative flex flex-col">
        
        {/* Mobile Device Camera Notch (Desktop Preview Only) */}
        <div className="hidden md:flex justify-center pt-2 pb-1 bg-transparent z-50">
          <div className="w-28 h-4 bg-[#111111] rounded-full" />
        </div>

        {/* Global Top Header */}
        <TopNavigation />

        {/* Main Page Scrollable Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar aurora-white-bg">
          {renderPage()}
        </main>

        {/* Toast Notification */}
        <Toast message={toastMessage} />

        {/* Global Fixed Bottom Navigation */}
        <BottomNavigation active={page} onChange={setPage} />
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
