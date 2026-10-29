import React, { useState } from 'react';
import { X, Search, PackageCheck, CheckCircle2, Clock, Truck, ShieldAlert } from 'lucide-react';
import { toPersianDigits } from '../utils/format';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode?: string;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  initialCode = '',
}) => {
  const [trackInput, setTrackInput] = useState(initialCode || 'AYB-881294');
  const [searched, setSearched] = useState(true);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#111722] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 text-right max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-slate-800 bg-[#0d121a] flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-100 font-semibold text-sm">
            <PackageCheck className="w-4 h-4 text-emerald-400" />
            <span>سامانه رهگیری مرسولات نقره ایوب زاده</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 text-xs text-slate-300">
          
          {/* Tracking Input Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="کد پیگیری سفارش (مثال: AYB-881294)"
              value={trackInput}
              onChange={(e) => setTrackInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500 uppercase font-sans"
              required
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>استعلام</span>
            </button>
          </form>

          {searched && (
            <div className="space-y-5">
              {/* Order Status Header */}
              <div className="p-4 bg-[#0d121a] border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[11px]">شناسه سفارش:</span>
                  <span className="text-emerald-400 font-bold text-sm font-sans">{trackInput}</span>
                </div>
                <div className="text-left">
                  <span className="text-slate-400 block text-[11px]">وضعیت کنونی:</span>
                  <span className="text-emerald-300 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>تحویل به باجه پست مرکزی مشهد</span>
                  </span>
                </div>
              </div>

              {/* Steps Timeline */}
              <div className="space-y-4 pr-3 border-r-2 border-slate-800">
                
                {/* Step 1 */}
                <div className="relative pr-4">
                  <div className="absolute -right-[21px] top-0 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-[#111722]" />
                  <div className="font-semibold text-slate-100 text-xs">ثبت سفارش و صدور شناسنامه</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    تأیید پرداخت شاپرک و بررسی عیار ۹۲۵ اثر در آزمایشگاه ری‌گیری ایوب‌زاده
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative pr-4">
                  <div className="absolute -right-[21px] top-0 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-[#111722]" />
                  <div className="font-semibold text-slate-100 text-xs">بسته‌بندی فاخر چوبی و ضدضربه</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    قرارگیری در جعبه مخمل معطر، پلمپ امنیتی و صدور کارت ضمانت کتبی مادام‌العمر
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative pr-4">
                  <div className="absolute -right-[21px] top-0 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-[#111722]" />
                  <div className="font-semibold text-slate-100 text-xs">ارسال از طریق پست پیشتاز بیمه‌دار</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-sans">
                    کد بارنامه ۲۴ رقمی پست: ۳۰۹۱۸۲۷۴۶۵۰۱۹۲۸۴۷۱۶۲۸۳۹۴
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative pr-4 opacity-50">
                  <div className="absolute -right-[21px] top-0 w-3 h-3 rounded-full bg-slate-700 ring-4 ring-[#111722]" />
                  <div className="font-semibold text-slate-400 text-xs">تحویل نهایی به خریدار</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    تحویل درب منزل با ارائه کارت ملی و تطابق شماره همراه
                  </div>
                </div>

              </div>

              {/* Insurance info */}
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center gap-2 text-[11px] text-slate-400">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  کلیه مرسولات نقره ایوب زاده تا سقف ۱۰۰ میلیون تومان مشمول بیمه غرامت پستی می‌باشند.
                </span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
