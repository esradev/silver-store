import React from 'react';
import { X, Sparkles, BookOpen } from 'lucide-react';
import { STONE_VIRTUES_INFO } from '../data/products';

interface StoneVirtuesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoneVirtuesModal: React.FC<StoneVirtuesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#111722] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 text-right max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-slate-800 bg-[#0d121a] flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-100 font-semibold text-sm">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>خواص سنگ‌های متبرک در روایات اسلامی</span>
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
          <p className="text-slate-400 leading-relaxed text-xs">
            در مکتب تشیع و روایات مستند ائمه اطهار (علیهم السلام)، دست کردن انگشتر با نگین‌های اصیل معدنی دارای برکات بی‌شماری در تزکیه روح، وسعت رزق، رفع بلا و استجابت دعا می‌باشد.
          </p>

          <div className="space-y-4 pt-2">
            {STONE_VIRTUES_INFO.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2.5 text-right"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-100 text-sm font-display flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>{item.title}</span>
                  </h3>
                  <span className="text-[11px] text-emerald-400 font-medium">{item.virtue}</span>
                </div>

                <div className="p-3 bg-[#0c1017] rounded-lg border border-slate-800/80 text-slate-200 leading-relaxed italic text-[11px]">
                  {item.quote}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-[11px] text-emerald-300 leading-relaxed">
            کلیه نگین‌های مجموعه نقره ایوب زاده تحت نظارت کارشناسان گوهرشناسی و با ضمانت معدنی بودن و عدم انجام فرآیندهای بهسازی نامتعارف عرضه می‌گردند.
          </div>
        </div>

      </div>
    </div>
  );
};
