import React from 'react';
import { ShieldCheck, Phone, MapPin, Clock, Award, Heart } from 'lucide-react';
import { toPersianDigits } from '../utils/format';

interface FooterProps {
  onOpenGuarantee: () => void;
  onOpenSizeGuide: () => void;
  onOpenVirtues: () => void;
  onOpenTracking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGuarantee,
  onOpenSizeGuide,
  onOpenVirtues,
  onOpenTracking,
}) => {
  return (
    <footer className="bg-[#080b0f] border-t border-slate-800/80 text-right text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand story */}
          <div className="space-y-3 md:col-span-1">
            <span className="text-lg font-bold text-slate-100 font-display block">
              نقره ایوب زاده
            </span>
            <p className="text-slate-400 text-xs leading-relaxed">
              کارگاه سنتی طراحی و ساخت نقره‌جات فاخر، انگشترهای دست‌ساز و نیم‌ست‌های اصیل با سنگ‌های متبرک از سال ۱۳۷۴ شمسی. تعهد ما پایبندی به عیار دقیق و اصالت گوهرهای طبیعی است.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-[11px] pt-1">
              <Award className="w-4 h-4" />
              <span>دارای نشان استاندارد عیار نقره ایران</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200">دسترسی و خدمات مشتریان</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  راهنمای تعیین دقیق سایز انگشت
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenVirtues}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  فضایل و خواص روایی سنگ‌ها
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  پیگیری مرسولات پست پیشتاز
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGuarantee}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  ضمانت‌نامه و شرایط بازگشت ۷ روزه
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Workshop Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200">کارگاه و دفتر مرکزی</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>مشهد مقدس، خیابان شیرازی، بازار بزرگ الغدیر، پلاک ۱۱۴</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-sans dir-ltr">۰۵۱ - ۳۲۲۵ ۸۴۱۹</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>شنبه تا پنج‌شنبه: ۹ صبح الی ۲۱ شب</span>
              </div>
            </div>
          </div>

          {/* Col 4: Trust & Islamic Craftsmanship Assurance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200">اعتماد و اصالت</h4>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>پرداخت در بستر شبکه شاپرک</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                کلیه تراکنش‌ها از طریق درگاه رسمی بانک مرکزی و شاپرک صورت پذیرفته و مرسولات با بیمه ارزش طلا و نقره ارسال می‌گردد.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Editorial Line */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            تمامی حقوق مادی و معنوی محفوظ و متعلق به فروشگاه صنایع دستی «نقره ایوب زاده» می‌باشد ({toPersianDigits('1404')}).
          </div>
          <div className="flex items-center gap-1">
            <span>ساخته شده با هنر و ارادت به فرهنگ اصیل ایرانی-اسلامی</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
