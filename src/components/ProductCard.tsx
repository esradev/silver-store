import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Gem } from 'lucide-react';
import { Product } from '../types';
import { formatToman, toPersianDigits } from '../utils/format';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onOpenDetails: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onOpenDetails,
  onAddToCart,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-[#111722] border border-slate-800/80 rounded-xl overflow-hidden hover:border-slate-700 hover:shadow-xl hover:shadow-black/50 transition-all duration-300 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Section (65%-70% height feel) */}
      <div
        onClick={() => onOpenDetails(product)}
        className="relative aspect-[4/3] bg-[#0c1017] overflow-hidden cursor-pointer"
      >
        {!imageError ? (
          <img
            src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-500 p-4 text-center">
            <Gem className="w-8 h-8 text-emerald-400 mb-2" />
            <span className="text-xs">{product.title}</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 left-2.5 p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
            isWishlisted
              ? 'bg-rose-500/90 text-white shadow-sm'
              : 'bg-slate-900/70 text-slate-300 hover:text-rose-400 hover:bg-slate-900'
          }`}
          title={isWishlisted ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Single subtle craftsmanship tag */}
        <div className="absolute top-2.5 right-2.5 text-[11px] font-medium text-emerald-300 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded border border-emerald-900/40">
          {product.purity}
        </div>

        {/* Dedicated Page Floating Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(product);
          }}
          className="absolute inset-x-3 bottom-2.5 py-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs font-medium rounded-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700/60 shadow-lg"
        >
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span>مشاهده صفحه کامل اثر</span>
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3 text-right">
        <div>
          {/* Unboxed Metadata with typographic separators (Rule 1.A) */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1.5 flex-wrap">
            <span>{product.stone}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{product.weight} گرم</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-emerald-400 font-medium">{product.craftsmanship}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onOpenDetails(product)}
            className="text-sm font-semibold text-slate-100 hover:text-emerald-300 transition-colors cursor-pointer line-clamp-2 leading-relaxed"
          >
            {product.title}
          </h3>
        </div>

        {/* Rating and Reviews count */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-sans font-medium text-slate-200 text-[11px]">
              {toPersianDigits(product.rating.toFixed(1))}
            </span>
            <span className="text-[10px] text-slate-500">
              ({toPersianDigits(product.reviewCount)} نظر)
            </span>
          </div>

          <span className="text-[11px] text-slate-400">
            {product.inStock ? 'موجود در کارگاه' : 'سفارش ساخت'}
          </span>
        </div>

        {/* Price & Buy Action */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
          <div>
            {product.originalPrice && (
              <div className="text-[11px] text-slate-500 line-through tabular-nums">
                {formatToman(product.originalPrice)}
              </div>
            )}
            <div className="text-sm sm:text-base font-bold text-emerald-400 tabular-nums font-sans">
              {formatToman(product.price)}
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="p-2 sm:px-3 sm:py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-emerald-950/40 shrink-0"
            title="افزودن به سبد خرید"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">افزودن</span>
          </button>
        </div>
      </div>
    </div>
  );
};
