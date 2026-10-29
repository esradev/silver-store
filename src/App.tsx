import React, { useState, useMemo, useEffect } from 'react';
import {
  Product,
  ProductCategory,
  CartItem,
  FilterState,
  OrderDetails,
  ProductReview,
} from './types';
import { INITIAL_PRODUCTS } from './data/products';
import { PromotionBanner } from './components/PromotionBanner';
import { Navbar } from './components/Navbar';
import { MobileMenuDrawer } from './components/MobileMenuDrawer';
import { Hero } from './components/Hero';
import { DiscountFeatureBanner } from './components/DiscountFeatureBanner';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ProductGridSkeleton } from './components/skeletons/ProductCardSkeleton';
import { ProductDetailPageSkeleton } from './components/skeletons/ProductDetailPageSkeleton';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { RingSizeModal } from './components/RingSizeModal';
import { StoneVirtuesModal } from './components/StoneVirtuesModal';
import { TrackOrderModal } from './components/TrackOrderModal';
import { WishlistModal } from './components/WishlistModal';
import { GuaranteeModal } from './components/GuaranteeModal';
import { Footer } from './components/Footer';
import { SlidersHorizontal, CheckCircle2, Gem } from 'lucide-react';
import { toPersianDigits } from './utils/format';

export default function App() {
  // Products state
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ayb_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Dedicated Product Page State (No modal!)
  const [activeProductId, setActiveProductId] = useState<string | null>(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#product/')) {
      return hash.replace('#product/', '');
    }
    return null;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ayb_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ayb_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    minPrice: 2000000,
    maxPrice: 15000000,
    selectedStones: [],
    onlyInStock: false,
    onlyHandmade: false,
    searchQuery: '',
    sortBy: 'featured',
  });

  // Modals state (For Cart, Checkout, Size Guide, Tracking, etc.)
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedCheckoutDiscount, setAppliedCheckoutDiscount] = useState(0);
  const [appliedCouponCode, setAppliedCouponCode] = useState('AYOOB925');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isVirtuesOpen, setIsVirtuesOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isGuaranteeOpen, setIsGuaranteeOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Loading Skeleton States for perceived performance
  const [isGridLoading, setIsGridLoading] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Listen to browser hash navigation (back/forward button)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product/')) {
        const pId = hash.replace('#product/', '');
        setIsDetailLoading(true);
        setActiveProductId(pId);
        setTimeout(() => setIsDetailLoading(false), 320);
      } else {
        setActiveProductId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('ayb_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ayb_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ayb_products', JSON.stringify(products));
  }, [products]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Navigate to product page with perceived performance skeleton
  const handleOpenProductPage = (product: Product) => {
    setIsDetailLoading(true);
    setActiveProductId(product.id);
    window.location.hash = `product/${product.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsDetailLoading(false);
    }, 320);
  };

  // Handle filter changes with smooth skeleton transition
  const handleUpdateFilters = (updater: React.SetStateAction<FilterState>) => {
    setIsGridLoading(true);
    setFilters(updater);
    setTimeout(() => {
      setIsGridLoading(false);
    }, 300);
  };

  // Back to catalog
  const handleBackToCatalog = () => {
    setActiveProductId(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to cart handler
  const handleAddToCart = (product: Product, size?: number, customNote?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        if (customNote) copy[existingIndex].customEngraving = customNote;
        return copy;
      } else {
        return [
          ...prev,
          {
            product,
            quantity: 1,
            selectedSize: size,
            customEngraving: customNote,
          },
        ];
      }
    });
    showToast(`«${product.title}» به سبد خرید افزوده شد.`);
  };

  // Update quantity handler
  const handleUpdateQuantity = (productId: string, quantity: number, size?: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedSize === size) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  // Remove from cart
  const handleRemoveFromCart = (productId: string, size?: number) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
  };

  // Toggle wishlist
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast('از نشان‌شده‌ها حذف شد.');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast('به نشان‌شده‌ها اضافه شد.');
        return [...prev, product];
      }
    });
  };

  // Add review handler
  const handleAddReview = (
    productId: string,
    newReview: Omit<ProductReview, 'id' | 'date'>
  ) => {
    const fullReview: ProductReview = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: 'هم‌اکنون',
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [fullReview, ...p.reviews];
          const avgRating =
            updatedReviews.reduce((acc, r) => acc + r.rating, 0) /
            updatedReviews.length;
          return {
            ...p,
            reviews: updatedReviews,
            reviewCount: updatedReviews.length,
            rating: Number(avgRating.toFixed(1)),
          };
        }
        return p;
      })
    );
  };

  // Current active product for dedicated page
  const currentProduct = useMemo(() => {
    if (!activeProductId) return null;
    return products.find((p) => p.id === activeProductId) || null;
  }, [products, activeProductId]);

  // Related products for current product
  const relatedProducts = useMemo(() => {
    if (!currentProduct) return [];
    return products.filter(
      (p) => p.id !== currentProduct.id && (p.category === currentProduct.category || p.stone === currentProduct.stone)
    );
  }, [products, currentProduct]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ProductCategory, number> = {
      all: products.length,
      rings: 0,
      wedding_bands: 0,
      demi_sets: 0,
      full_suites: 0,
    };
    products.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      }
    });
    return counts;
  }, [products]);

  // Filtered and sorted products for catalog view
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (filters.category !== 'all' && p.category !== filters.category) {
          return false;
        }
        if (p.price > filters.maxPrice) {
          return false;
        }
        if (
          filters.selectedStones.length > 0 &&
          !filters.selectedStones.includes(p.stone)
        ) {
          return false;
        }
        if (filters.onlyInStock && !p.inStock) {
          return false;
        }
        if (filters.onlyHandmade && !p.craftsmanship.includes('دست‌ساز')) {
          return false;
        }
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.trim().toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchStone = p.stone.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchDhikr = p.dhikrOrEngraving?.toLowerCase().includes(q) || false;
          if (!matchTitle && !matchStone && !matchDesc && !matchDhikr) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [products, filters]);

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      minPrice: 2000000,
      maxPrice: 15000000,
      selectedStones: [],
      onlyInStock: false,
      onlyHandmade: false,
      searchQuery: '',
      sortBy: 'featured',
    });
  };

  const totalCartCount = cart.reduce((acc, i) => acc + i.quantity, 0);
  const wishlistIds = useMemo(() => wishlist.map((w) => w.id), [wishlist]);

  return (
    <div className="min-h-screen bg-[#0b0f14] text-[#E2E8F0] flex flex-col font-sans selection:bg-emerald-900/60 selection:text-white">
      
      {/* 1. Top Promotion / Discount Banner */}
      <PromotionBanner
        onApplyCode={(code) => {
          setAppliedCouponCode(code);
          showToast(`کد تخفیف ${code} کپی و برای سبد خرید فعال شد.`);
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-emerald-900/95 border border-emerald-600/70 text-emerald-100 text-xs py-2.5 px-4 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenVirtues={() => setIsVirtuesOpen(true)}
        onOpenTracking={() => setIsTrackOrderOpen(true)}
        onOpenGuarantee={() => setIsGuaranteeOpen(true)}
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => {
          if (activeProductId) {
            setActiveProductId(null);
            window.location.hash = '';
          }
          setFilters((prev) => ({ ...prev, searchQuery: q }));
        }}
        onSelectCategory={(cat) => handleUpdateFilters((prev) => ({ ...prev, category: cat }))}
        onSelectStone={(stone) => handleUpdateFilters((prev) => ({ ...prev, selectedStones: [stone] }))}
        categoryCounts={categoryCounts}
        onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
        onViewProductById={(id) => {
          const p = products.find((x) => x.id === id);
          if (p) handleOpenProductPage(p);
        }}
      />

      {/* VIEW SWITCHER: DEDICATED PRODUCT PAGE vs HOME / CATALOG VIEW */}
      {currentProduct ? (
        /* DEDICATED PRODUCT DETAIL PAGE (NO MODAL) */
        isDetailLoading ? (
          <ProductDetailPageSkeleton />
        ) : (
          <ProductDetailPage
            product={currentProduct}
            onBack={handleBackToCatalog}
            onAddToCart={handleAddToCart}
            isWishlisted={wishlistIds.includes(currentProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            onAddReview={handleAddReview}
            relatedProducts={relatedProducts}
            onSelectProduct={handleOpenProductPage}
            wishlistIds={wishlistIds}
          />
        )
      ) : (
        /* HOME / CATALOG VIEW */
        <>
          {/* Editorial Luxury Hero */}
          <Hero
            onExploreClick={() => {
              const catalogElem = document.getElementById('catalog');
              if (catalogElem) {
                catalogElem.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          />

          {/* Main Catalog Section */}
          <main id="catalog" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            
            {/* 2. Feature Campaign Promotional Banner */}
            <DiscountFeatureBanner
              onCopyOrApply={(code) => {
                setAppliedCouponCode(code);
                showToast(`کد تخفیف ${code} کپی شد. می‌توانید در سبد خرید اعمال کنید.`);
              }}
            />

            {/* Category Navigation Tabs */}
            <CategoryNav
              selectedCategory={filters.category}
              onSelectCategory={(cat) =>
                handleUpdateFilters((prev) => ({ ...prev, category: cat }))
              }
              counts={categoryCounts}
            />

            {/* Section Title & Mobile Filter Button */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-display">
                  {filters.category === 'all' && 'تمامی نفایس و آثار نقره'}
                  {filters.category === 'rings' && 'انگشترهای فاخر نقره با سنگ‌های طبیعی'}
                  {filters.category === 'wedding_bands' && 'حلقه‌های ازدواج و ست نقره اسلامی'}
                  {filters.category === 'demi_sets' && 'نیم‌ست‌های ترنج و اسلیمی نقره'}
                  {filters.category === 'full_suites' && 'سرویس‌های مجلسی و اشرافی نقره'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  برای مشاهده جزئیات کامل، شناسنامه و نظرات، روی هر اثر کلیک نمایید.
                </p>
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 flex items-center gap-1.5 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                <span>فیلترها</span>
              </button>
            </div>

            {/* Responsive Mobile Filter Panel (Collapsible) */}
            {isMobileFilterOpen && (
              <div className="lg:hidden p-2 bg-[#111722] rounded-xl border border-slate-800">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleUpdateFilters}
                  onResetFilters={handleResetFilters}
                  totalFilteredCount={filteredProducts.length}
                />
              </div>
            )}

            {/* Grid Layout: Desktop Sidebar (3 cols) + Product Grid (9 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Desktop Filter Sidebar: 3 Columns */}
              <div className="hidden lg:block lg:col-span-3 sticky top-24">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleUpdateFilters}
                  onResetFilters={handleResetFilters}
                  totalFilteredCount={filteredProducts.length}
                />
              </div>

              {/* Product Grid: 9 Columns */}
              <div className="lg:col-span-9">
                {isGridLoading ? (
                  <ProductGridSkeleton count={6} />
                ) : filteredProducts.length === 0 ? (
                  <div className="py-20 text-center bg-[#111722] border border-slate-800/80 rounded-2xl p-8 space-y-4">
                    <Gem className="w-12 h-12 text-slate-600 mx-auto" />
                    <h3 className="text-base font-semibold text-slate-200">
                      اثری با معیارهای انتخابی شما یافت نشد
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      پیشنهاد می‌کنیم سقف قیمت را افزایش داده یا فیلتر نگین‌ها را پاک‌سازی نمایید.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      پاک‌سازی همه فیلترها
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((prod) => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        isWishlisted={wishlistIds.includes(prod.id)}
                        onToggleWishlist={handleToggleWishlist}
                        onOpenDetails={handleOpenProductPage}
                        onAddToCart={(p) => handleAddToCart(p)}
                      />
                    ))}
                  </div>
                )}
              </div>

            </div>

          </main>
        </>
      )}

      {/* Cart & Checkout Slide-overs */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        initialCouponCode={appliedCouponCode}
        onProceedToCheckout={(discount) => {
          setAppliedCheckoutDiscount(discount);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        appliedDiscount={appliedCheckoutDiscount}
        onOrderComplete={(order) => {
          setCart([]);
        }}
      />

      {/* Utility Modals */}
      <RingSizeModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <StoneVirtuesModal
        isOpen={isVirtuesOpen}
        onClose={() => setIsVirtuesOpen(false)}
      />

      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p)}
        onOpenDetails={handleOpenProductPage}
      />

      <GuaranteeModal
        isOpen={isGuaranteeOpen}
        onClose={() => setIsGuaranteeOpen(false)}
      />

      {/* Mobile Slide-Over Menu Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        selectedCategory={filters.category}
        onSelectCategory={(cat) => handleUpdateFilters((prev) => ({ ...prev, category: cat }))}
        categoryCounts={categoryCounts}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenVirtues={() => setIsVirtuesOpen(true)}
        onOpenTracking={() => setIsTrackOrderOpen(true)}
        onOpenGuarantee={() => setIsGuaranteeOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlist.length}
        promoCode={appliedCouponCode}
        onCopyPromo={(code) => {
          setAppliedCouponCode(code);
          showToast(`کد تخفیف ${code} کپی شد.`);
        }}
      />

      {/* Clean Editorial Footer */}
      <Footer
        onOpenGuarantee={() => setIsGuaranteeOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenVirtues={() => setIsVirtuesOpen(true)}
        onOpenTracking={() => setIsTrackOrderOpen(true)}
      />
    </div>
  );
}
