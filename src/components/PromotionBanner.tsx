import React, { useState } from 'react';
import { Tag, Copy, Check, X, Sparkles } from 'lucide-react';

interface PromotionBannerProps {
  onApplyCode?: (code: string) => void;
}

export const PromotionBanner: React.FC<PromotionBannerProps> = ({ onApplyCode }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [copied, setCopied] = useState(false);
  const promoCode = 'AYOOB925';

  if (isDismissed) return null;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      if (onApplyCode) {
        onApplyCode(promoCode);
      }
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-950 text-slate-100 border-b border-emerald-800/60 text-xs py-2 px-3 sm:px-6 transition-all z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Banner Message */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">جشنواره تخفیف برکت نقره ایوب زاده:</span>
          </div>
          <span className="text-slate-200">
            ۱۰٪ تخفیف روی تمامی آثار نقره و سنگ‌های متبرک + ارسال رایگان پستی بیمه‌دار
          </span>
        </div>

        {/* Action & Code Copy */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-emerald-800/90 hover:bg-emerald-700 text-emerald-100 px-2.5 py-1 rounded-md text-[11px] font-sans font-medium border border-emerald-600/50 transition-colors cursor-pointer"
            title="کپی کد تخفیف"
          >
            <Tag className="w-3 h-3 text-amber-300" />
            <span>کد: {promoCode}</span>
            {copied ? (
              <Check className="w-3 h-3 text-emerald-300" />
            ) : (
              <Copy className="w-3 h-3 text-slate-300" />
            )}
          </button>

          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
            title="بستن بنر"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
