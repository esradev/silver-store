import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { formatToman, toPersianDigits } from '../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, qty: number, size?: number) => void;
  onRemoveItem: (productId: string, size?: number) => void;
  onProceedToCheckout: (appliedDiscount: number) => void;
  initialCouponCode?: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  initialCouponCode,
}) => {
  const [couponCode, setCouponCode] = useState(initialCouponCode || 'AYOOB925');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string>('');

  React.useEffect(() => {
    if (initialCouponCode) {
      setCouponCode(initialCouponCode);
    }
  }, [initialCouponCode]);

  React.useEffect(() => {
    if (couponCode && items.length > 0) {
      const code = couponCode.trim().toUpperCase();
      if (code === 'AYOOB925' || code === 'BARAKAT') {
        const sub = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        const discount = Math.round(sub * 0.1);
        setCouponDiscount(discount);
        setCouponMessage('کد تخفیف ۱۰٪ نقره ایوب زاده اعمال گردید.');
      }
    }
  }, [items, couponCode]);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 2000000;
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 65000;
  const totalAmount = Math.max(0, subtotal - couponDiscount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'AYOOB925' || code === 'BARAKAT') {
      const discount = Math.round(subtotal * 0.1);
      setCouponDiscount(discount);
      setCouponMessage('کد تخفیف ۱۰٪ نقره ایوب زاده با موفقیت اعمال گردید.');
    } else {
      setCouponDiscount(0);
      setCouponMessage('کد وارد شده معتبر نمی‌باشد. (کد تستی: AYOOB925)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#111722] border-r border-slate-800 shadow-2xl flex flex-col text-right">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#0c1017] flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-100 font-semibold text-sm">
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span>سبد خرید شما</span>
              <span className="text-xs text-slate-400">
                ({toPersianDigits(items.length)} قلم)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-slate-900/80 border-b border-slate-800/80 text-xs">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-slate-300">
                {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                  <span className="text-emerald-400 font-medium">
                    تبریک! سفارش شما مشمول ارسال رایگان پستی شد.
                  </span>
                ) : (
                  <span>
                    {formatToman(FREE_SHIPPING_THRESHOLD - subtotal)} تا ارسال رایگان با بیمه
                  </span>
                )}
              </span>
              <span className="text-slate-400 tabular-nums font-sans">
                {toPersianDigits(progressPercent)}٪
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-600 stroke-[1.5]" />
                <p className="text-sm">سبد خرید شما در حال حاضر خالی است.</p>
                <button
                  onClick={onClose}
                  className="text-xs text-emerald-400 hover:underline cursor-pointer"
                >
                  مشاهده مجموعه انگشتر و جواهرات
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize || 'nosize'}-${idx}`}
                  className="p-3 bg-[#0d121a] border border-slate-800/90 rounded-xl flex gap-3 text-right"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-18 h-18 rounded-lg object-cover bg-slate-900 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-semibold text-slate-100 line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                          className="text-slate-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                          title="حذف از سبد"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-400 mt-0.5 space-x-2 space-x-reverse">
                        <span>{item.product.purity}</span>
                        {item.selectedSize && (
                          <span>· سایز: {toPersianDigits(item.selectedSize)}</span>
                        )}
                      </div>

                      {item.customEngraving && (
                        <div className="text-[10px] text-emerald-400 truncate mt-0.5">
                          حکاکی: {item.customEngraving}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60">
                      <div className="text-xs font-bold text-emerald-400 tabular-nums font-sans">
                        {formatToman(item.product.price * item.quantity)}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded px-1.5 py-0.5">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedSize
                            )
                          }
                          className="text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold text-slate-200 tabular-nums min-w-[14px] text-center font-sans">
                          {toPersianDigits(item.quantity)}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedSize
                            )
                          }
                          className="text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#0c1017] space-y-4">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="کد تخفیف (مثال: AYOOB925)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 uppercase"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>اعمال</span>
                </button>
              </form>

              {couponMessage && (
                <div
                  className={`text-[11px] ${
                    couponDiscount > 0 ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {couponMessage}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">جمع کل آثار:</span>
                  <span className="tabular-nums font-sans">{formatToman(subtotal)}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>تخفیف ویژه:</span>
                    <span className="tabular-nums font-sans">- {formatToman(couponDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-slate-400">بیمه و ارسال پست پیشتاز:</span>
                  <span className="tabular-nums font-sans">
                    {shippingFee === 0 ? 'رایگان' : formatToman(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between text-sm sm:text-base font-bold text-slate-100 pt-2 border-t border-slate-800">
                  <span>مبلغ نهایی قابل پرداخت:</span>
                  <span className="text-emerald-400 tabular-nums font-sans">
                    {formatToman(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Trust Tag */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>متصل به درگاه امن شبکه پرداخت الکترونیک شاپرک</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => onProceedToCheckout(couponDiscount)}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>تکمیل سفارش و ورود به درگاه پرداخت</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
