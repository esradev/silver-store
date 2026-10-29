export type ProductCategory = 
  | 'all'
  | 'rings'         // انگشتر
  | 'wedding_bands' // حلقه و ست
  | 'demi_sets'     // نیم ست
  | 'full_suites';  // سرویس نقره

export type StoneType = 
  | 'عقیق یمنی'
  | 'فیروزه نیشابور'
  | 'دُرّ نجف'
  | 'زمرد و زیرکن'
  | 'یاقوت سرخ'
  | 'شرف‌الشمس'
  | 'بدون نگین / تمام نقره';

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number; // 1-5
  date: string;
  comment: string;
  verifiedBuyer: boolean;
  engravingChoice?: string;
}

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  categoryName: string;
  price: number; // in Tomans
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
  purity: 'عیار ۹۲۵ استرلینگ' | 'عیار ۹۵۰ دست‌ساز ممتاز';
  weight: number; // grams
  stone: StoneType;
  craftsmanship: 'دست‌ساز استادکار (قلم‌زنی)' | 'دست‌ساز سنتی' | 'ریخته‌گری دقیق و مخراج‌کاری';
  inStock: boolean;
  stockCount: number;
  availableSizes?: number[]; // for rings: e.g. 58, 60, 62, 64
  description: string;
  dhikrOrEngraving?: string; // e.g. "یا علی ابن ابیطالب", "حسبی الله", "آیت الکرسی"
  virtues: string; // خواص سنگ و فضیلت معنوی
  serialNumber: string; // e.g. "AYB-925-4102"
  reviews: ProductReview[];
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: number;
  customEngraving?: string;
}

export interface FilterState {
  category: ProductCategory;
  minPrice: number;
  maxPrice: number;
  selectedStones: StoneType[];
  onlyInStock: boolean;
  onlyHandmade: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
}

export interface OrderDetails {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  customerName: string;
  phone: string;
  address: string;
  postalCode: string;
  shippingMethod: 'پیشتاز بیمه‌دار' | 'تیپاکس فوری نقره';
  paymentRef: string;
  status: 'تأیید شده و در حال بسته‌بندی ایمن' | 'تحویل به پست مرکزی' | 'ارسال شده';
}
