import React from 'react';
import { StoreStats } from '../types';
import { ArrowUpRight, ArrowDownRight, Package } from 'lucide-react';

interface StoreListProps {
  stores: StoreStats[];
}

const StoreList: React.FC<StoreListProps> = ({ stores }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest px-1">Store Performance</h3>
      
      <div className="space-y-4">
        {stores.map((store, index) => {
          const growth = ((store.todaySales - store.yesterdaySales) / store.yesterdaySales) * 100;
          const isPositive = growth >= 0;

          return (
            <div 
              key={store.id} 
              className="group bg-white border border-stone-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-stone-300 transition-all duration-200 cursor-default animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-sm ${store.color}`} />
                  <span className="font-semibold text-[#1a1a1a] text-lg">{store.name}</span>
                </div>
                <div className={`flex items-center text-xs font-bold px-2.5 py-1 rounded-full border ${isPositive ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                  {isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-1" />}
                  {Math.abs(growth).toFixed(1)}%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-5">
                <div>
                  <p className="text-xs text-stone-500 font-medium uppercase tracking-wide mb-1">Revenue</p>
                  <p className="text-2xl font-serif font-medium text-[#1a1a1a]">
                    ${store.todaySales.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-medium uppercase tracking-wide mb-1">Orders</p>
                  <p className="text-2xl font-serif font-medium text-[#1a1a1a] flex items-baseline gap-1.5">
                     {store.todayOrders}
                     <span className="text-xs text-stone-400 font-sans font-normal">today</span>
                  </p>
                </div>
              </div>

              {/* Micro Bestseller Line */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                 <div className="flex items-center gap-2 text-stone-500">
                   <Package className="w-3.5 h-3.5" />
                   <span className="font-medium">Top Product</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="text-stone-700 truncate max-w-[140px] font-medium" title={store.topProduct}>{store.topProduct}</span>
                   <span className="text-stone-400">•</span>
                   <span className="text-[#1a1a1a] font-bold">${store.topProductSales.toLocaleString()}</span>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StoreList;
