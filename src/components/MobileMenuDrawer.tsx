import React from 'react';
import {
  X,
  Sparkles,
  Ruler,
  Compass,
  ShieldCheck,
  PackageCheck,
  Heart,
  Phone,
  MapPin,
  Clock,
  ArrowLeft,
  Tag,
  Copy,
  Check,
} from 'lucide-react';
import { ProductCategory, StoneType } from '../types';
import { toPersianDigits } from '../utils/format';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onSelectStone?: (stone: StoneType) => void;
  categoryCounts: Record<ProductCategory, number>;
  onOpenSizeGuide: () => void;
  onOpenVirtues: () => void;
  onOpenTracking: () => void;
  onOpenGuarantee: () => void;
  onOpenWishlist: () => void;
  wishlistCount: number;
  promoCode?: string;
  onCopyPromo?: (code: string) => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  onOpenSizeGuide,
  onOpenVirtues,
  onOpenTracking,
  onOpenGuarantee,
  onOpenWishlist,
  wishlistCount,
  promoCode = 'AYOOB925',
  onCopyPromo,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const categories: { id: ProductCategory; label: string; desc: string }[] = [
    { id: 'all', label: 'همه آثار و نفایس', desc: 'مشاهده کامل ویترین کارگاه' },
    { id: 'rings', label: 'انگشترهای فاخر نقره', desc: 'نگین‌های عقیق، فیروزه و دُرّ نجف' },
    { id: 'wedding_bands', label: 'حلقه و ست ازدواج', desc: 'طرح‌های اسلیمی و گره‌چینی' },
    { id: 'demi_sets', label: 'نیم‌ست‌های ترنج', desc: 'گردن‌آویز و گوشواره نقره ۹۲۵' },
    { id: 'full_suites', label: 'سرویس‌های مجلسی و عروس', desc: 'طرح طلا سفید با تراش برلیان' },
  ];

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      if (onCopyPromo) onCopyPromo(promoCode);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Dark backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container (RTL from right) */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-[#111722] border-l border-slate-800 shadow-2xl flex flex-col text-right">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#0d121a] flex items-center justify-between">
            <div>
              <div className="text-base font-bold text-slate-100 font-display">
                نقره ایوب زاده
              </div>
              <div className="text-[11px] text-emerald-400 mt-0.5">
                اصالت عیار ۹۲۵ · مشهد مقدس
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
            
            {/* Promo Code Box in Menu */}
            <div className="p-3 bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-800/60 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>تخفیف ۱۰٪ ویژه همراهان:</span>
                </span>
                <span className="text-[10px] text-slate-400 font-sans">کد: {promoCode}</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="w-full py-1.5 px-3 bg-emerald-800/80 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'کد کپی و فعال شد' : 'کپی کد تخفیف AYOOB925'}</span>
              </button>
            </div>

            {/* Section 1: Categories */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-400 px-1">
                دسته‌بندی آثار و نفایس
              </div>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        onClose();
                        const catElem = document.getElementById('catalog');
                        if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between text-right cursor-pointer ${
                        isActive
                          ? 'bg-emerald-950/70 border border-emerald-600/70 text-emerald-200'
                          : 'hover:bg-slate-800/60 text-slate-200 border border-transparent'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{cat.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{cat.desc}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[11px] font-sans px-1.5 py-0.5 rounded ${
                            isActive
                              ? 'bg-emerald-800 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {toPersianDigits(categoryCounts[cat.id] || 0)}
                        </span>
                        <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Services & Interactive Tools */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-400 px-1">
                خدمات و راهنماهای تخصصی
              </div>
              <div className="grid grid-cols-1 gap-1">
                <button
                  onClick={() => {
                    onOpenSizeGuide();
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center justify-between text-xs cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400">
                      <Ruler className="w-4 h-4" />
                    </div>
                    <span>محاسبه‌گر آنلاین سایز انگشت</span>
                  </div>
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
                </button>

                <button
                  onClick={() => {
                    onOpenVirtues();
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center justify-between text-xs cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400">
                      <Compass className="w-4 h-4" />
                    </div>
                    <span>دانشنامه خواص سنگ‌های متبرک</span>
                  </div>
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
                </button>

                <button
                  onClick={() => {
                    onOpenGuarantee();
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center justify-between text-xs cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span>منشور ضمانت عیار ۹۲۵ و اصالت</span>
                  </div>
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
                </button>

                <button
                  onClick={() => {
                    onOpenTracking();
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center justify-between text-xs cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400">
                      <PackageCheck className="w-4 h-4" />
                    </div>
                    <span>سامانه رهگیری مرسولات پست</span>
                  </div>
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
                </button>

                <button
                  onClick={() => {
                    onOpenWishlist();
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center justify-between text-xs cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400">
                      <Heart className="w-4 h-4" />
                    </div>
                    <span>نشان‌شده‌ها و علاقه‌مندی‌ها</span>
                  </div>
                  <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-sans">
                    {toPersianDigits(wishlistCount)}
                  </span>
                </button>
              </div>
            </div>

            {/* Section 3: Workshop Contact info */}
            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2.5 text-xs text-slate-400">
              <div className="font-semibold text-slate-200 text-xs">
                کارگاه و پشتیبانی فروش:
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-sans dir-ltr text-slate-300">۰۵۱ - ۳۲۲۵ ۸۴۱۹</span>
              </div>
              <div className="flex items-start gap-2 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>مشهد، بازار بزرگ الغدیر، پلاک ۱۱۴</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
