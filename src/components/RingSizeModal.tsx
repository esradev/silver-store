import React, { useState } from 'react';
import { X, Ruler, CheckCircle2, Info } from 'lucide-react';
import { toPersianDigits } from '../utils/format';

interface RingSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RingSizeModal: React.FC<RingSizeModalProps> = ({ isOpen, onClose }) => {
  const [measuredMm, setMeasuredMm] = useState<number>(60);

  if (!isOpen) return null;

  // Sizing chart data (Circumference mm -> Standard Ring Size)
  const sizeChart = [
    { size: 54, diameter: '۱۷.۲', circumference: 54 },
    { size: 56, diameter: '۱۷.۸', circumference: 56 },
    { size: 58, diameter: '۱۸.۵', circumference: 58 },
    { size: 60, diameter: '۱۹.۱', circumference: 60 },
    { size: 62, diameter: '۱۹.۷', circumference: 62 },
    { size: 64, diameter: '۲۰.۴', circumference: 64 },
    { size: 66, diameter: '۲۱.۰', circumference: 66 },
  ];

  const calculatedSize = sizeChart.reduce((prev, curr) =>
    Math.abs(curr.circumference - measuredMm) < Math.abs(prev.circumference - measuredMm)
      ? curr
      : prev
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#111722] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 text-right max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-slate-800 bg-[#0d121a] flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-100 font-semibold text-sm">
            <Ruler className="w-4 h-4 text-emerald-400" />
            <span>راهنمای تخصصی تعیین سایز انگشتر</span>
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
          
          {/* Method Instruction */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <Info className="w-4 h-4" />
              <span>روش ساده اندازه‌گیری در منزل (نوار کاغذی):</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-300 leading-relaxed pr-1">
              <li>یک نوار کاغذی به عرض ۱ سانتی‌متر برش دهید.</li>
              <li>نوار را دور برآمده‌ترین بند انگشت مورد نظر بپیچید (نه خیلی سفت و نه شل).</li>
              <li>محل تلاقی دو سر نوار را با خودکار علامت بزنید.</li>
              <li>طول علامت‌زده را با خط‌کش بر حسب میلی‌متر اندازه گرفته و در اسلایدر زیر وارد کنید.</li>
            </ol>
          </div>

          {/* Interactive Calculator Slider */}
          <div className="p-4 bg-[#0d121a] border border-slate-800 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200">
                محیط انگشت بر حسب میلی‌متر (mm):
              </span>
              <span className="text-emerald-400 font-bold text-base font-sans tabular-nums">
                {toPersianDigits(measuredMm)} میلی‌متر
              </span>
            </div>

            <input
              type="range"
              min={50}
              max={70}
              step={1}
              value={measuredMm}
              onChange={(e) => setMeasuredMm(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />

            <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">سایز استاندارد پیشنهادی:</span>
                <span className="text-emerald-300 font-bold text-base font-sans">
                  سایز {toPersianDigits(calculatedSize.size)}
                </span>
              </div>
              <div className="text-left text-[11px] text-slate-400 font-sans">
                قطر داخلی حلقه: {calculatedSize.diameter} میلی‌متر
              </div>
            </div>
          </div>

          {/* Sizing Reference Table */}
          <div className="space-y-2">
            <div className="font-semibold text-slate-200">جدول استاندارد سایزبندی نقره ایوب‌زاده:</div>
            <div className="border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-center text-xs">
                <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">سایز انگشتر</th>
                    <th className="py-2.5 px-3">محیط دور انگشت (mm)</th>
                    <th className="py-2.5 px-3">قطر داخل حلقه (mm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                  {sizeChart.map((row) => (
                    <tr
                      key={row.size}
                      className={
                        row.size === calculatedSize.size
                          ? 'bg-emerald-950/40 text-emerald-300 font-bold'
                          : 'hover:bg-slate-900/40'
                      }
                    >
                      <td className="py-2">{toPersianDigits(row.size)}</td>
                      <td className="py-2">{toPersianDigits(row.circumference)}</td>
                      <td className="py-2">{row.diameter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Guarantee Note */}
          <div className="p-3 bg-slate-900/60 rounded-lg flex items-start gap-2 text-slate-400 text-[11px]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              نگران سایز نباشید! کلیه انگشترهای نقره ایوب‌زاده در صورت عدم تطابق، ظرف ۷ روز به‌صورت کاملاً رایگان در کارگاه ما تغییر سایز داده می‌شوند.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
