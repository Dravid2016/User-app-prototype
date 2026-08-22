import React, { useState } from 'react';
import { ArrowLeft, MapPin, Zap, CreditCard, Wallet, ShieldCheck, ChevronRight, Check } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { FeaztoLogo } from '../components/brand/FeaztoLogo';
import { BentoCard } from '../components/bento/BentoCard';
import { BentoButton } from '../components/bento/BentoButton';

export const Checkout: React.FC = () => {
  const {
    setPage,
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    deliveryMode,
    setDeliveryMode,
    paymentMode,
    setPaymentMode,
    cartTotal,
    placeOrder,
    showToast,
  } = useAppStore();

  const [showAddressModal, setShowAddressModal] = useState(false);
  const selectedAddr = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  return (
    <div className="pb-32 pt-3 px-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage('cart')}
            className="w-9 h-9 rounded-full bg-[#FAFAFA] border border-black/10 flex items-center justify-center text-[#111111] hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <FeaztoLogo onClick={() => setPage('home')} size="sm" />
        </div>
        <span className="text-xs font-black uppercase text-[#111111] bg-[#FFD21F] px-2.5 py-1 rounded-full border border-[#111111]">
          Checkout
        </span>
      </div>

      {/* Checkout Progress Stepper Indicator */}
      <div className="flex items-center justify-between px-2 mb-6 text-xs font-black">
        <div className="flex items-center gap-1.5 text-[#111111]">
          <span className="w-6 h-6 rounded-full bg-[#FFD21F] border border-[#111111] flex items-center justify-center text-[11px]">
            1
          </span>
          <span>Address</span>
        </div>
        <div className="w-8 h-0.5 bg-black/20" />
        <div className="flex items-center gap-1.5 text-[#111111]">
          <span className="w-6 h-6 rounded-full bg-[#FFD21F] border border-[#111111] flex items-center justify-center text-[11px]">
            2
          </span>
          <span>Delivery</span>
        </div>
        <div className="w-8 h-0.5 bg-black/20" />
        <div className="flex items-center gap-1.5 text-[#111111]">
          <span className="w-6 h-6 rounded-full bg-[#FFD21F] border border-[#111111] flex items-center justify-center text-[11px]">
            3
          </span>
          <span>Payment</span>
        </div>
      </div>

      {/* 1. Address Section */}
      <div className="mb-5">
        <h3 className="text-xs font-black uppercase text-[#707070] tracking-wider mb-2 px-1">
          1. Delivery Address
        </h3>
        <BentoCard
          onClick={() => setShowAddressModal(true)}
          padding="md"
          className="border-2 border-black/10 cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD21F] text-[#111111] border border-[#111111] flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin size={20} />
            </div>
            <div>
              <span className="inline-block px-2 py-0.5 bg-[#111111] text-[#FFD21F] text-[10px] font-black rounded mb-1">
                {selectedAddr.label}
              </span>
              <p className="text-xs font-black text-[#111111]">
                {selectedAddr.line1}
              </p>
              <p className="text-[11px] font-medium text-[#707070]">
                {selectedAddr.line2}, {selectedAddr.city} - {selectedAddr.pincode}
              </p>
            </div>
          </div>
          <ChevronRight size={18} className="text-[#111111] flex-shrink-0" />
        </BentoCard>
      </div>

      {/* 2. Delivery Speed Section */}
      <div className="mb-5">
        <h3 className="text-xs font-black uppercase text-[#707070] tracking-wider mb-2 px-1">
          2. Delivery Type
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {/* Standard */}
          <BentoCard
            onClick={() => setDeliveryMode('standard')}
            variant={deliveryMode === 'standard' ? 'yellow' : 'default'}
            padding="sm"
            className={`border-2 cursor-pointer transition-all ${
              deliveryMode === 'standard' ? 'border-[#111111]' : 'border-black/10'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black text-[#111111]">Standard</span>
              {deliveryMode === 'standard' && (
                <div className="w-5 h-5 rounded-full bg-[#111111] text-[#FFD21F] flex items-center justify-center">
                  <Check size={12} strokeWidth={3} />
                </div>
              )}
            </div>
            <span className="text-[11px] font-bold text-[#707070] block">
              30–40 min
            </span>
            <span className="text-[10px] font-black text-[#111111] mt-1 block">
              ₹20 Delivery
            </span>
          </BentoCard>

          {/* Express */}
          <BentoCard
            onClick={() => setDeliveryMode('express')}
            variant={deliveryMode === 'express' ? 'yellow' : 'default'}
            padding="sm"
            className={`border-2 cursor-pointer transition-all ${
              deliveryMode === 'express' ? 'border-[#111111]' : 'border-black/10'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black text-[#111111] flex items-center gap-1">
                <Zap size={13} className="fill-[#111111]" /> Express
              </span>
              {deliveryMode === 'express' && (
                <div className="w-5 h-5 rounded-full bg-[#111111] text-[#FFD21F] flex items-center justify-center">
                  <Check size={12} strokeWidth={3} />
                </div>
              )}
            </div>
            <span className="text-[11px] font-bold text-[#707070] block">
              15–20 min
            </span>
            <span className="text-[10px] font-black text-[#111111] mt-1 block">
              ₹35 Delivery
            </span>
          </BentoCard>
        </div>
      </div>

      {/* 3. Payment Method Section */}
      <div className="mb-6">
        <h3 className="text-xs font-black uppercase text-[#707070] tracking-wider mb-2 px-1">
          3. Payment Method
        </h3>
        <div className="space-y-2.5">
          {/* UPI */}
          <BentoCard
            onClick={() => setPaymentMode('upi')}
            variant={paymentMode === 'upi' ? 'yellow' : 'default'}
            padding="sm"
            className={`border-2 cursor-pointer flex items-center justify-between ${
              paymentMode === 'upi' ? 'border-[#111111]' : 'border-black/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#111111] text-[#FFD21F] flex items-center justify-center font-black text-xs">
                <Wallet size={18} />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#111111]">UPI / Google Pay / PhonePe</h4>
                <p className="text-[10px] text-[#707070] font-bold">Instant 1-tap checkout</p>
              </div>
            </div>
            {paymentMode === 'upi' && (
              <div className="w-5 h-5 rounded-full bg-[#111111] text-[#FFD21F] flex items-center justify-center">
                <Check size={12} strokeWidth={3} />
              </div>
            )}
          </BentoCard>

          {/* Credit/Debit Card */}
          <BentoCard
            onClick={() => setPaymentMode('card')}
            variant={paymentMode === 'card' ? 'yellow' : 'default'}
            padding="sm"
            className={`border-2 cursor-pointer flex items-center justify-between ${
              paymentMode === 'card' ? 'border-[#111111]' : 'border-black/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#111111] text-[#FFD21F] flex items-center justify-center font-black text-xs">
                <CreditCard size={18} />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#111111]">Credit / Debit Card</h4>
                <p className="text-[10px] text-[#707070] font-bold">Visa, Mastercard, RuPay</p>
              </div>
            </div>
            {paymentMode === 'card' && (
              <div className="w-5 h-5 rounded-full bg-[#111111] text-[#FFD21F] flex items-center justify-center">
                <Check size={12} strokeWidth={3} />
              </div>
            )}
          </BentoCard>
        </div>
      </div>

      {/* Address Selection Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] border-2 border-[#111111] p-5 max-w-xs w-full">
            <h3 className="text-base font-black text-[#111111] mb-3">
              Select Delivery Address
            </h3>
            <div className="space-y-2.5 mb-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => {
                    setSelectedAddressId(addr.id);
                    setShowAddressModal(false);
                    showToast(`Address updated to ${addr.label}`);
                  }}
                  className={`p-3 rounded-xl border-2 cursor-pointer ${
                    selectedAddressId === addr.id
                      ? 'bg-[#FFD21F] border-[#111111]'
                      : 'bg-[#FAFAFA] border-black/10'
                  }`}
                >
                  <span className="font-black text-xs text-[#111111]">{addr.label}</span>
                  <p className="text-[11px] font-medium text-[#707070] mt-0.5">{addr.line1}</p>
                </div>
              ))}
            </div>
            <BentoButton
              variant="outline"
              fullWidth
              size="sm"
              onClick={() => setShowAddressModal(false)}
            >
              Cancel
            </BentoButton>
          </div>
        </div>
      )}

      {/* Sticky Place Order Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white/95 backdrop-blur-md border-t-2 border-black/10 p-4 z-40">
        <BentoButton
          variant="primary"
          fullWidth
          size="lg"
          onClick={placeOrder}
          className="shadow-[0_8px_24px_rgba(255,210,31,0.4)]"
        >
          Place Order • ₹{cartTotal}
        </BentoButton>
      </div>
    </div>
  );
};
