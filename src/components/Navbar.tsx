import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  Compass,
  ShieldCheck,
  Ruler,
  PackageCheck,
  ChevronDown,
  Menu,
  Sparkles,
  ArrowLeft,
  Gem,
} from 'lucide-react';
import { ProductCategory, StoneType } from '../types';
import { toPersianDigits } from '../utils/format';
import ringAgateImg from '../assets/images/ring_agate_yemen_1791111838347.jpg';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSizeGuide: () => void;
  onOpenVirtues: () => void;
  onOpenTracking: () => void;
  onOpenGuarantee: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectCategory?: (cat: ProductCategory) => void;
  onSelectStone?: (stone: StoneType) => void;
  categoryCounts?: Record<ProductCategory, number>;
  onOpenMobileMenu: () => void;
  onViewProductById?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSizeGuide,
  onOpenVirtues,
  onOpenTracking,
  onOpenGuarantee,
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onSelectStone,
  categoryCounts = { all: 9, rings: 3, wedding_bands: 2, demi_sets: 2, full_suites: 2 },
  onOpenMobileMenu,
  onViewProductById,
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (cat: ProductCategory) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    setIsMegaMenuOpen(false);
    const elem = document.getElementById('catalog');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStoneClick = (stone: StoneType) => {
    if (onSelectStone) {
      onSelectStone(stone);
    }
    setIsMegaMenuOpen(false);
    const elem = document.getElementById('catalog');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0b0f14]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Zone 1: Mobile Hamburger & Brand Wordmark */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Button */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
            title="منوی سایت"
          >
            <Menu className="w-5 h-5" />
          </button>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100 hover:text-emerald-400 transition-colors font-display"
          >
            نقره ایوب زاده
          </a>
          <span className="hidden xl:inline-block text-xs text-slate-400 font-light border-r border-slate-700/80 pr-3 mr-1">
            اصالت عیار ۹۲۵ و سنگ‌های متبرک
          </span>
        </div>

        {/* Zone 2: Desktop Navigation with Interactive Mega Menu */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          
          {/* Interactive Collections Mega-Dropdown */}
          <div className="relative" ref={megaMenuRef}>
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              className={`flex items-center gap-1.5 py-2 hover:text-emerald-300 transition-colors cursor-pointer ${
                isMegaMenuOpen ? 'text-emerald-400' : ''
              }`}
            >
              <span>مجموعه نفایس</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isMegaMenuOpen ? 'rotate-180 text-emerald-400' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Mega Menu Dropdown Container */}
            {isMegaMenuOpen && (
              <div
                onMouseLeave={() => setIsMegaMenuOpen(false)}
                className="absolute top-full right-0 w-[680px] bg-[#111722] border border-slate-800 rounded-2xl shadow-2xl p-6 mt-2 z-50 text-right grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                {/* Categories Column: 7 Cols */}
                <div className="col-span-7 space-y-4 border-l border-slate-800/80 pl-6">
                  <div className="text-xs font-bold text-slate-400">دسته‌بندی آثار نقره:</div>
                  <div className="grid grid-cols-2 gap-2.5">
                    
                    <button
                      onClick={() => handleCategoryClick('rings')}
                      className="p-3 bg-[#0d121a] hover:bg-slate-800/70 border border-slate-800 rounded-xl text-right transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-100 group-hover:text-emerald-300">
                          انگشتر نقره
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans">
                          {toPersianDigits(categoryCounts.rings || 3)} اثر
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                        عقیق، فیروزه، دُرّ نجف و شرف‌الشمس
                      </div>
                    </button>

                    <button
                      onClick={() => handleCategoryClick('wedding_bands')}
                      className="p-3 bg-[#0d121a] hover:bg-slate-800/70 border border-slate-800 rounded-xl text-right transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-100 group-hover:text-emerald-300">
                          حلقه و ست ازدواج
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans">
                          {toPersianDigits(categoryCounts.wedding_bands || 2)} اثر
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                        گره‌چینی اسلیمی و حکاکی نام
                      </div>
                    </button>

                    <button
                      onClick={() => handleCategoryClick('demi_sets')}
                      className="p-3 bg-[#0d121a] hover:bg-slate-800/70 border border-slate-800 rounded-xl text-right transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-100 group-hover:text-emerald-300">
                          نیم‌ست‌های ترنج
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans">
                          {toPersianDigits(categoryCounts.demi_sets || 2)} اثر
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                        گردنبند و گوشواره نقره ۹۲۵
                      </div>
                    </button>

                    <button
                      onClick={() => handleCategoryClick('full_suites')}
                      className="p-3 bg-[#0d121a] hover:bg-slate-800/70 border border-slate-800 rounded-xl text-right transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-100 group-hover:text-emerald-300">
                          سرویس نقره عروس
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans">
                          {toPersianDigits(categoryCounts.full_suites || 2)} اثر
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                        طرح جواهر با آبکاری رودیوم
                      </div>
                    </button>

                  </div>

                  {/* Stone Quick Filter Row */}
                  <div className="pt-2 border-t border-slate-800/60">
                    <span className="text-[11px] text-slate-400 block mb-2">
                      انتخاب بر اساس گوهر متبرک:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(['عقیق یمنی', 'فیروزه نیشابور', 'دُرّ نجف', 'زمرد و زیرکن'] as StoneType[]).map(
                        (stone) => (
                          <button
                            key={stone}
                            onClick={() => handleStoneClick(stone)}
                            className="px-2.5 py-1 bg-slate-900 hover:bg-emerald-950/80 hover:text-emerald-300 hover:border-emerald-700/60 border border-slate-700/80 rounded-lg text-[11px] text-slate-300 transition-colors cursor-pointer"
                          >
                            {stone}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Spotlight Column: 5 Cols */}
                <div className="col-span-5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>شاهکار دست‌ساز این ماه:</span>
                    </div>

                    <div
                      onClick={() => {
                        if (onViewProductById) onViewProductById('ayb-ring-01');
                        setIsMegaMenuOpen(false);
                      }}
                      className="group cursor-pointer rounded-xl overflow-hidden border border-slate-800 hover:border-emerald-700/60 transition-colors bg-[#0d121a] p-2.5"
                    >
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 mb-2">
                        <img
                          src={ringAgateImg}
                          alt="انگشتر عقیق یمنی"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute top-1.5 right-1.5 bg-black/70 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
                          عیار ۹۲۵ دست‌ساز
                        </div>
                      </div>

                      <div className="text-xs font-semibold text-slate-100 group-hover:text-emerald-300 line-clamp-1">
                        انگشتر فاخر عقیق یمنی با قلم‌زنی دستی
                      </div>
                      <div className="text-[11px] text-emerald-400 font-bold font-sans mt-1">
                        ۳,۴۵۰,۰۰۰ تومان
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCategoryClick('all')}
                    className="w-full py-2 bg-emerald-700/60 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>مشاهده همه آثار کارگاه</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )}
          </div>

          <button
            onClick={onOpenSizeGuide}
            className="hover:text-emerald-300 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            <Ruler className="w-3.5 h-3.5 text-emerald-400" />
            <span>راهنمای سایز</span>
          </button>
          
          <button
            onClick={onOpenVirtues}
            className="hover:text-emerald-300 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>خواص سنگ‌ها</span>
          </button>
          
          <button
            onClick={onOpenGuarantee}
            className="hover:text-emerald-300 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ضمانت اصالت</span>
          </button>
          
          <button
            onClick={onOpenTracking}
            className="hover:text-emerald-300 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>پیگیری سفارش</span>
          </button>
        </nav>

        {/* Zone 3: 1–2 primary actions & utility search */}
        <div className="flex items-center gap-3">
          {/* Quick Search Toggle */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 w-44 sm:w-60 transition-all">
                <Search className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
                <input
                  type="text"
                  placeholder="جستجوی انگشتر، فیروزه، عقیق..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none w-full"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="text-xs text-slate-400 hover:text-slate-200 mr-1"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-slate-300 hover:text-emerald-400 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
                title="جستجو در آثار"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-slate-300 hover:text-rose-400 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
            title="نشان‌شده‌ها و علاقه‌مندی‌ها"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {toPersianDigits(wishlistCount)}
              </span>
            )}
          </button>

          {/* Cart Primary CTA */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg transition-colors cursor-pointer text-xs font-semibold shadow-sm shadow-emerald-950/40 whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">سبد خرید</span>
            {cartCount > 0 && (
              <span className="bg-emerald-950/80 text-emerald-200 px-1.5 py-0.5 rounded text-[11px] font-bold">
                {toPersianDigits(cartCount)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
