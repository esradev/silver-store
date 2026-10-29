import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, Gift, Truck, ShieldCheck } from 'lucide-react';

interface DiscountFeatureBannerProps {
  onCopyOrApply: (code: string) => void;
}

export const DiscountFeatureBanner: React.FC<DiscountFeatureBannerProps> = ({ onCopyOrApply }) => {
  const [copied, setCopied] = useState(false);
  const code = 'AYOOB925';

  const handleAction = () => {
    onCopyOrApply(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-emerald-800/60 bg-gradient-to-br from-[#0c1815] via-[#10221e] to-[#0d161a] p-6 sm:p-8 text-right shadow-2xl">
      {/* Decorative background element */}
      <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-10 -top-10 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Text info: 8 Cols */}
        <div className="md:col-span-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>پیشنهاد و تخفیف ویژه فروشگاه</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-display">
            ۱۰٪ تخفیف ویژه روی تمامی آثار نقره عیار ۹۲۵ + جعبه چوبی معطر
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            با وارد کردن کد تخفیف اختصاصی در سبد خرید، علاوه بر ۱۰٪ تخفیف آنی، سفارش شما در جعبه چوبی سنتی معطر به همراه کارت ضمانت کتبی و ارسال بیمه‌شده پست پیشتاز رایگان ارسال می‌گردد.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-emerald-400" />
              <span>جعبه چوبی فاخر هدیه</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>ارسال رایگان به سراسر کشور</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>کارت اصالت آزمایشگاهی</span>
            </div>
          </div>
        </div>

        {/* CTA box: 4 Cols */}
        <div className="md:col-span-4 flex flex-col items-center sm:items-end justify-center gap-3">
          <div className="w-full max-w-xs bg-slate-900/90 border border-emerald-700/60 rounded-xl p-4 text-center space-y-3 backdrop-blur-md">
            <div className="text-xs text-slate-400">کد تخفیف اختصاصی شما:</div>
            
            <div className="text-lg font-mono font-bold tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 py-2 rounded-lg">
              {code}
            </div>

            <button
              onClick={handleAction}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-950/60"
            >
              <Tag className="w-3.5 h-3.5" />
              <span>{copied ? 'کد کپی شد و ذخیره گردید!' : 'کپی و اعمال کد تخفیف'}</span>
              {copied && <Check className="w-3.5 h-3.5 text-white" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
