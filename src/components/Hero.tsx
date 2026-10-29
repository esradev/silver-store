import React from 'react';
import { Sparkles, ShieldCheck, Ruler, ArrowLeft } from 'lucide-react';
import heroImg from '../assets/images/hero_silver_craft_1791111827256.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onOpenSizeGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenSizeGuide }) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-800/60 bg-[#0b0f14] bg-islamic-mesh">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Text Content: 7 Columns */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Subtle editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>کارگاه نقره و نگین‌های سنتی ایوب زاده — اصالت از ۱۳۷۴</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 font-display leading-[1.3] text-balance">
              شکوه نقره‌های دست‌ساز ایرانی و سنگ‌های متبرک اسلامی
            </h1>

            {/* Sub-paragraph */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
              آمیزه‌ای از هنر قلم‌زنی اساتید کهنه‌کار، نقره خالص عیار ۹۲۵ و نگین‌های اصیل عقیق یمنی، فیروزه نیشابور و دُرّ نجف اشرف. هر اثر همراه با شناسنامه اصالت و فاکتور رسمی تقدیم می‌گردد.
            </p>

            {/* Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm rounded-lg transition-all shadow-md shadow-emerald-950/50 flex items-center gap-2 cursor-pointer"
              >
                <span>مشاهده نفایس و انگشترها</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSizeGuide}
                className="px-5 py-3 bg-slate-800/90 hover:bg-slate-700/80 text-slate-200 border border-slate-700/70 font-medium text-sm rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Ruler className="w-4 h-4 text-emerald-400" />
                <span>راهنمای آنلاین سایز انگشت</span>
              </button>
            </div>

            {/* 3 Core Trust Badges (Anti-slop, clean unboxed text) */}
            <div className="pt-6 border-t border-slate-800/70 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>تضمین عیار ۹۲۵ با کد آزمایشگاه</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>سنگ‌های معدنی صد در صد طبیعی</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>ارسال پستی بیمه‌شده و جعبه فاخر</span>
              </div>
            </div>

          </div>

          {/* Cinematic Visual Anchor: 5 Columns */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/70 shadow-2xl shadow-black/80 bg-slate-900 group">
              <img
                src={heroImg}
                alt="انگشترهای فاخر نقره دست‌ساز ایوب زاده"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14] via-transparent to-transparent opacity-80" />
              
              {/* Overlay editorial label */}
              <div className="absolute bottom-4 right-4 left-4 p-3 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-xl text-right">
                <div className="text-[11px] text-emerald-400 font-medium">شاهکار دست‌ساز این هفته</div>
                <div className="text-sm font-semibold text-slate-100">انگشتر عقیق یمنی با قلم‌زنی و نگین دُرّ نجف</div>
                <div className="text-xs text-slate-400 mt-0.5">اثر اختصاصی استاد ایوب‌زاده · عیار ۹۵۰ دست‌ساز</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
