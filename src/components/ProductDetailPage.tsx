import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Ruler,
  MessageSquare,
  CheckCircle2,
  Send,
  Heart,
  Star,
  Truck,
  RotateCcw,
  Award,
  Gem,
  Share2,
  Check,
} from 'lucide-react';
import { Product, ProductReview } from '../types';
import { formatToman, toPersianDigits } from '../utils/format';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (p: Product, size?: number, customNote?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onOpenSizeGuide: () => void;
  onAddReview: (productId: string, review: Omit<ProductReview, 'id' | 'date'>) => void;
  relatedProducts: Product[];
  onSelectProduct: (p: Product) => void;
  wishlistIds: string[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenSizeGuide,
  onAddReview,
  relatedProducts,
  onSelectProduct,
  wishlistIds,
}) => {
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<number | undefined>(
    product.availableSizes && product.availableSizes.length > 0
      ? product.availableSizes[0]
      : undefined
  );
  const [customEngravingNote, setCustomEngravingNote] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'virtues' | 'specs' | 'reviews'>('details');

  // Review Form State
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCity, setReviewerCity] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize(
      product.availableSizes && product.availableSizes.length > 0
        ? product.availableSizes[0]
        : undefined
    );
    setReviewSuccess(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    onAddReview(product.id, {
      author: reviewerName.trim(),
      city: reviewerCity.trim() || 'تهران',
      rating,
      comment: reviewComment.trim(),
      verifiedBuyer: true,
      engravingChoice: customEngravingNote || undefined,
    });

    setReviewSuccess(true);
    setReviewerName('');
    setReviewerCity('');
    setReviewComment('');
    setTimeout(() => setReviewSuccess(false), 4000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const images = [product.image, product.secondaryImage].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-[#0b0f14] text-[#E2E8F0] pb-16">
      
      {/* Breadcrumb Navigation Bar */}
      <div className="border-b border-slate-800/80 bg-[#0d121a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={onBack}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              صفحه اصلی
            </button>
            <span className="text-slate-600">/</span>
            <span>{product.categoryName}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200 font-medium truncate max-w-[200px] sm:max-w-md">
              {product.title}
            </span>
          </nav>

          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            <span>بازگشت به لیست آثار</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main PDP Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        
        {/* Contiguous Purchase Module & Gallery (Desktop: 2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Gallery Column: 6 Columns */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24">
            
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#111722] border border-slate-800 shadow-2xl">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute top-4 right-4 text-xs font-semibold text-emerald-300 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-lg border border-emerald-800/40">
                {product.purity}
              </div>

              <div className="absolute top-4 left-4 flex gap-2">
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-2.5 rounded-xl backdrop-blur-md transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'bg-slate-900/80 text-slate-300 hover:text-rose-400 hover:bg-slate-900'
                  }`}
                  title="افزودن به علاقه‌مندی‌ها"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl bg-slate-900/80 text-slate-300 hover:text-emerald-400 hover:bg-slate-900 backdrop-blur-md transition-colors cursor-pointer"
                  title="اشتراک‌گذاری این اثر"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>

              <div className="absolute bottom-4 right-4 text-[11px] text-slate-400 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded font-sans">
                شناسنامه اختصاصی: {product.serialNumber}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border cursor-pointer transition-all ${
                      activeImage === img
                        ? 'border-emerald-500 ring-2 ring-emerald-500/30 scale-102'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`نمای ${toPersianDigits(idx + 1)}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Assurances */}
            <div className="p-4 bg-[#111722] border border-slate-800/80 rounded-xl grid grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ضمانت اصالت و عیار ۹۲۵</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>بسته‌بندی چوبی و بیمه پستی</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>۷ روز ضمانت بازگشت و تغییر سایز</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>شناسنامه کتبی با مهر ایوب‌زاده</span>
              </div>
            </div>

          </div>

          {/* Contiguous Purchase Module: 6 Columns */}
          <div className="lg:col-span-6 space-y-6 text-right">
            
            {/* Header / Title */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
                <span>{product.categoryName}</span>
                <span className="text-slate-600">·</span>
                <span>{product.stone}</span>
                <span className="text-slate-600">·</span>
                <span className="text-emerald-400 font-medium">{product.craftsmanship}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-display leading-snug">
                {product.title}
              </h1>

              {/* Rating summary */}
              <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-slate-200 text-sm font-sans">
                    {toPersianDigits(product.rating.toFixed(1))}
                  </span>
                </div>
                <span className="text-slate-600">·</span>
                <button
                  onClick={() => {
                    setActiveTab('reviews');
                    const tabElem = document.getElementById('product-tabs');
                    if (tabElem) tabElem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors underline cursor-pointer"
                >
                  {toPersianDigits(product.reviewCount)} دیدگاه ثبت‌شده مشتریان
                </button>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-[#111722] border border-slate-800 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block mb-1">بهای نهایی اثر:</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tabular-nums font-sans">
                  {formatToman(product.price)}
                </div>
              </div>

              {product.originalPrice && (
                <div className="text-left">
                  <span className="text-xs text-slate-500 block mb-0.5">قیمت پیشین:</span>
                  <div className="text-sm text-slate-500 line-through tabular-nums font-sans">
                    {formatToman(product.originalPrice)}
                  </div>
                  <span className="inline-block mt-1 text-[11px] text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded font-sans">
                    تخفیف ویژه جشنواره
                  </span>
                </div>
              )}
            </div>

            {/* Ring Size Selector (if applicable) */}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div className="p-4 bg-[#111722] border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-200 font-semibold">
                    انتخاب سایز انگشت: (سایز انتخابی: {selectedSize ? toPersianDigits(selectedSize) : '—'})
                  </span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer text-xs"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>راهنمای اندازه‌گیری سایز</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-12 h-10 px-3 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950 scale-105'
                          : 'bg-slate-900 border border-slate-700/80 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      سایز {toPersianDigits(sz)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Engraving / Free Service */}
            <div className="p-4 bg-[#111722] border border-slate-800 rounded-2xl space-y-2">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>حکاکی رایگان اذکار، نام یا تاریخ درخواستی:</span>
              </label>
              <input
                type="text"
                placeholder="مثال: یا علی مدد، حسبی الله، یا تاریخ عقد..."
                value={customEngravingNote}
                onChange={(e) => setCustomEngravingNote(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl p-3 focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[11px] text-slate-400 block">
                توسط خطاطان مجرب کارگاه ایوب‌زاده با قلم فولادی انجام می‌شود.
              </span>
            </div>

            {/* Quick Specs Highlight */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#111722] border border-slate-800 rounded-xl">
                <span className="text-slate-500 block text-[11px]">وزن خالص نقره:</span>
                <span className="text-slate-200 font-bold font-sans mt-0.5 block">
                  {toPersianDigits(product.weight)} گرم
                </span>
              </div>
              <div className="p-3 bg-[#111722] border border-slate-800 rounded-xl">
                <span className="text-slate-500 block text-[11px]">نوع سنگ:</span>
                <span className="text-slate-200 font-bold mt-0.5 block truncate">
                  {product.stone}
                </span>
              </div>
              <div className="p-3 bg-[#111722] border border-slate-800 rounded-xl col-span-2 sm:col-span-1">
                <span className="text-slate-500 block text-[11px]">وضعیت موجودی:</span>
                <span className="text-emerald-400 font-bold mt-0.5 block">
                  {product.inStock ? 'آماده ارسال فوری' : 'سفارش ساخت'}
                </span>
              </div>
            </div>

            {/* Primary Buy CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => onAddToCart(product, selectedSize, customEngravingNote)}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>افزودن به سبد خرید و شروع پرداخت امن</span>
              </button>
            </div>

          </div>

        </div>

        {/* Detailed Tabs Section */}
        <div id="product-tabs" className="pt-8 border-t border-slate-800/80">
          
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-800 gap-3 sm:gap-6 overflow-x-auto scrollbar-none mb-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === 'details'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              داستان ساخت و مشخصات کامل
            </button>
            <button
              onClick={() => setActiveTab('virtues')}
              className={`pb-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'virtues'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>فضایل و خواص روایی سنگ</span>
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'reviews'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>نظرات و تجربیات خریداران ({toPersianDigits(product.reviews.length)})</span>
            </button>
          </div>

          {/* Tab 1: Details */}
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-100 font-display">
                  درباره ساخت و هنر قلم‌زنی این اثر
                </h3>
                <p className="text-slate-300">{product.description}</p>
                {product.dhikrOrEngraving && (
                  <div className="p-4 bg-[#111722] border-r-4 border-emerald-500 rounded-xl space-y-1">
                    <span className="font-bold text-slate-100 text-xs">ذکر و نگارش متبرک روی اثر:</span>
                    <p className="text-emerald-300 text-xs">{product.dhikrOrEngraving}</p>
                  </div>
                )}
              </div>

              <div className="p-5 bg-[#111722] border border-slate-800 rounded-2xl space-y-3">
                <h4 className="font-bold text-slate-200 text-xs">جدول شناسنامه فنی اثر:</h4>
                <div className="divide-y divide-slate-800 text-xs">
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-500">شماره سریال شناسنامه:</span>
                    <span className="text-slate-200 font-sans">{product.serialNumber}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-500">عیار نقره:</span>
                    <span className="text-slate-200">{product.purity}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-500">وزن کل:</span>
                    <span className="text-slate-200 font-sans">{toPersianDigits(product.weight)} گرم</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-500">هنر و شیوه ساخت:</span>
                    <span className="text-slate-200">{product.craftsmanship}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-500">نوع گوهر:</span>
                    <span className="text-slate-200">{product.stone}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Virtues */}
          {activeTab === 'virtues' && (
            <div className="p-6 bg-[#111722] border border-slate-800 rounded-2xl space-y-4 max-w-3xl">
              <h3 className="text-base font-bold text-slate-100 font-display flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>فضیلت معنوی سنگ {product.stone}</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{product.virtues}</p>
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
                کلیه نگین‌های مجموعه نقره ایوب‌زاده، از معادن کهن استخراج شده و به روش طبیعی بدون اشعه یا رنگ‌آمیزی صنعتی توسط گوهرتراشان باتجربه تراش داده شده‌اند.
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              
              {/* Existing Reviews */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 bg-[#111722] border border-slate-800 rounded-2xl space-y-3 text-right"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-200 text-sm">{rev.author}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          از {rev.city} · {rev.date}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-current' : 'text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{rev.comment}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px]">
                      {rev.verifiedBuyer && (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>خریدار تأیید شده</span>
                        </span>
                      )}
                      {rev.engravingChoice && (
                        <span className="text-slate-400">
                          حک درخواستی: <span className="text-emerald-300">{rev.engravingChoice}</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Review Submission Form */}
              <form
                onSubmit={handleReviewSubmit}
                className="max-w-2xl p-6 bg-[#111722] border border-slate-800 rounded-2xl space-y-4 text-right"
              >
                <h4 className="text-sm font-bold text-slate-100">
                  ثبت نظر و تجربه شما درباره این اثر
                </h4>

                {reviewSuccess && (
                  <div className="p-3 bg-emerald-950/90 border border-emerald-700 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>دیدگاه شما با موفقیت ثبت شد و در صفحه محصول به نمایش درآمد.</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="نام و نام خانوادگی"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl p-3 focus:outline-none focus:border-emerald-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="شهر سکونت (مثال: مشهد مقدس)"
                    value={reviewerCity}
                    onChange={(e) => setReviewerCity(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl p-3 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <span>امتیاز شما به این اثر:</span>
                  <div className="flex gap-1 text-amber-400 cursor-pointer">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="hover:scale-115 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= rating ? 'fill-current text-amber-400' : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  placeholder="کیفیت نقره، درخشش نگین، دقت قلم‌زنی و بسته‌بندی را بنویسید..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl p-3 focus:outline-none focus:border-emerald-500 leading-relaxed"
                  required
                />

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>ثبت و انتشار نظر</span>
                </button>
              </form>

            </div>
          )}

        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-slate-800/80 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-100 font-display">
                سایر نفایس پیشنهادی این مجموعه
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                آثاری با عیار مشابه و گوهرشناسی هم‌تراز
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.slice(0, 3).map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  isWishlisted={wishlistIds.includes(rel.id)}
                  onToggleWishlist={onToggleWishlist}
                  onOpenDetails={onSelectProduct}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
