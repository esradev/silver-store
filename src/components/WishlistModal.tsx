import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { formatToman } from '../utils/format';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onOpenDetails: (p: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onOpenDetails,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#111722] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 text-right max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-slate-800 bg-[#0d121a] flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-100 font-semibold text-sm">
            <Heart className="w-4 h-4 text-rose-400 fill-current" />
            <span>نشان‌شده‌ها و علاقه‌مندی‌ها</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4 text-xs text-slate-300">
          {wishlist.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-3">
              <Heart className="w-10 h-10 text-slate-600 mx-auto" />
              <p>هنوز اثری را به نشان‌شده‌های خود اضافه نکرده‌اید.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlist.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3"
                >
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-16 h-16 rounded-lg object-cover bg-slate-800 shrink-0 cursor-pointer"
                    onClick={() => {
                      onOpenDetails(prod);
                      onClose();
                    }}
                  />

                  <div className="flex-1">
                    <h4
                      onClick={() => {
                        onOpenDetails(prod);
                        onClose();
                      }}
                      className="font-semibold text-slate-100 hover:text-emerald-400 cursor-pointer line-clamp-1 text-xs"
                    >
                      {prod.title}
                    </h4>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {prod.stone} · {prod.purity}
                    </div>
                    <div className="text-xs font-bold text-emerald-400 tabular-nums font-sans mt-1">
                      {formatToman(prod.price)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onAddToCart(prod);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>خرید</span>
                    </button>

                    <button
                      onClick={() => onRemoveFromWishlist(prod)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
