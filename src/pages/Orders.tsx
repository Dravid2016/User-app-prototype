import React from 'react';
import { ShoppingBag, RefreshCw, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { BentoCard } from '../components/bento/BentoCard';
import { BentoButton } from '../components/bento/BentoButton';
import { EmptyState } from '../components/common/EmptyState';

export const Orders: React.FC = () => {
  const { orders, activeOrder, reorder, setPage } = useAppStore();

  if (orders.length === 0) {
    return (
      <div className="pb-24 pt-3 px-4">
        <EmptyState
          icon={ShoppingBag}
          title="No Orders Yet"
          description="You haven't placed any food orders yet. Explore our delicious homemade regional menu."
          actionText="Order Food"
          onAction={() => setPage('explore')}
        />
      </div>
    );
  }

  return (
    <div className="pb-24 pt-3 px-4 animate-fade-in">
      <h1 className="text-xl font-black text-[#111111] uppercase tracking-tight mb-4 flex items-center gap-2">
        <ShoppingBag size={22} className="text-[#FFD21F]" />
        Your Orders
      </h1>

      {/* Active Order Card */}
      {activeOrder && (
        <div className="mb-6">
          <h2 className="text-xs font-black uppercase text-[#FFD21F] bg-[#111111] px-2.5 py-1 rounded inline-block mb-2">
            Active Order
          </h2>
          <BentoCard padding="md" variant="yellow" className="border-2 border-[#111111]">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#111111]/20">
              <span className="text-xs font-black text-[#111111]">ORDER #{activeOrder.id}</span>
              <span className="text-[10px] font-extrabold bg-[#111111] text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                <Clock size={11} className="text-[#FFD21F]" /> {activeOrder.eta}
              </span>
            </div>

            <div className="space-y-1 mb-3">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs font-bold text-[#111111]">
                  <span>{item.quantity}x {item.food.name}</span>
                  <span>₹{item.food.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <BentoButton
              variant="dark"
              size="sm"
              fullWidth
              onClick={() => setPage('order-success')}
            >
              Track Live Order →
            </BentoButton>
          </BentoCard>
        </div>
      )}

      {/* Past Orders History */}
      <div>
        <h2 className="text-xs font-black uppercase text-[#707070] tracking-wider mb-2 px-1">
          Past Orders History
        </h2>

        <div className="space-y-3">
          {orders.map((order) => (
            <BentoCard key={order.id} padding="md" className="border-2 border-black/10">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/10">
                <div>
                  <span className="text-xs font-black text-[#111111]">
                    {order.id}
                  </span>
                  <span className="text-[10px] font-medium text-[#707070] block">
                    {order.date}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-black rounded-md border border-green-200 uppercase">
                  <CheckCircle2 size={11} />
                  {order.status}
                </span>
              </div>

              <div className="space-y-1 mb-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs font-bold text-[#111111]">
                    <span>{item.quantity}x {item.food.name}</span>
                    <span>₹{item.food.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-black/10">
                <span className="text-sm font-black text-[#111111]">
                  Total: ₹{order.total}
                </span>

                <button
                  onClick={() => reorder(order)}
                  className="px-3 py-1.5 bg-[#FFD21F] text-[#111111] text-xs font-black rounded-xl border-2 border-[#111111] hover:bg-[#FFCC00] active:scale-95 transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                >
                  <RefreshCw size={13} strokeWidth={2.5} /> Reorder
                </button>
              </div>
            </BentoCard>
          ))}
        </div>
      </div>
    </div>
  );
};
