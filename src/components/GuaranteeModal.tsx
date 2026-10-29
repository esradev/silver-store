import React from 'react';
import { X, ShieldCheck, CheckCircle2, Award, Scale, RotateCcw } from 'lucide-react';

interface GuaranteeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuaranteeModal: React.FC<GuaranteeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#111722] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 text-right max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-slate-800 bg-[#0d121a] flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-100 font-semibold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>منشور ضمانت و اصالت نقره ایوب زاده</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 text-xs text-slate-300">
          
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <h3 className="font-bold text-slate-100 text-sm font-display flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>تضمین عیار استرلینگ ۹۲۵ و ۹۵۰ دست‌ساز</span>
            </h3>
            <p className="text-slate-300 leading-relaxed">
              تمامی آثار نقره فروشگاه ایوب‌زاده، از شمش خالص نقره با عیار ۹۹۹ سنتز شده و با مهر معتبر اتحادیه طلا و جواهر و کد ری‌گیری استاندارد علامت‌گذاری شده‌اند. در صورت اثبات هرگونه مغایرت در عیار، ۵ برابر بهای پرداختی به عنوان غرامت عودت خواهد شد.
            </p>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <h3 className="font-bold text-slate-100 text-sm font-display flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>شناسنامه و اصالت سنگ‌های متبرک</span>
            </h3>
            <p className="text-slate-300 leading-relaxed">
              سنگ‌های عقیق یمن، فیروزه شجری نیشابور، دُرّ نجف و سایر گوهرها همراه با شناسنامه معتبر اختصاصی با شماره سریال منحصر به فرد تقدیم می‌شوند که در آزمایشگاه‌های معتبر گوهرشناسی کل کشور قابل استعلام است.
            </p>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <h3 className="font-bold text-slate-100 text-sm font-display flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-emerald-400" />
              <span>۷ روز ضمانت بازگشت و تغییر سایز رایگان</span>
            </h3>
            <p className="text-slate-300 leading-relaxed">
              از لحظه تحویل مرسوله پستی تا ۷ روز، در صورت کوچک یا بزرگ بودن سایز انگشتر، یا عدم رضایت از اثر، امکان تعویض، تغییر سایز رایگان در کارگاه یا عودت کامل وجه فراهم می‌باشد.
            </p>
          </div>

          <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-xl flex items-center gap-2 text-emerald-300 text-[11px]">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>پاسخگویی مستقیم استاد ایوب‌زاده و تیم پشتیبانی در ۷ روز هفته</span>
          </div>

        </div>

      </div>
    </div>
  );
};
