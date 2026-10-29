import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  Printer,
  FileText,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { formatToman, toPersianDigits } from '../utils/format';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedDiscount: number;
  onOrderComplete: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedDiscount,
  onOrderComplete,
}) => {
  // Checkout Steps: 1: Information, 2: Bank Gateway (Shaparak), 3: Success Invoice
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 Form
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('تهران');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'پیشتاز بیمه‌دار' | 'تیپاکس فوری نقره'>('پیشتاز بیمه‌دار');

  // Step 2 Bank Gateway Simulation
  const [card1, setCard1] = useState('');
  const [card2, setCard2] = useState('');
  const [card3, setCard3] = useState('');
  const [card4, setCard4] = useState('');
  const [cvv2, setCvv2] = useState('');
  const [expMonth, setExpMonth] = useState('۰۶');
  const [expYear, setExpYear] = useState('۰۵');
  const [dynamicOtp, setDynamicOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(120);
  const [otpSent, setOtpSent] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('۷۴۹۲');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  // Step 3 Invoice Data
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 2000000;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 65000;
  const totalAmount = Math.max(0, subtotal - appliedDiscount + shippingFee);

  // OTP Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 2 && otpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpSent, otpTimer]);

  if (!isOpen) return null;

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address || !postalCode) {
      alert('لطفاً کلیه فیلدهای ضروری آدرس و مشخصات را تکمیل نمایید.');
      return;
    }
    setStep(2);
  };

  const handleRequestOtp = () => {
    setOtpSent(true);
    setOtpTimer(120);
    setDynamicOtp('۸۳۹۵۱۲'); // mock dynamic password
  };

  const handleProcessPayment = () => {
    if (!card1 || !card2 || !card3 || !card4) {
      setPaymentError('لطفاً شماره کارت ۱۶ رقمی بانکی را وارد فرمایید.');
      return;
    }
    if (!cvv2 || cvv2.length < 3) {
      setPaymentError('کد CVV2 کارت الزامی است.');
      return;
    }
    if (!dynamicOtp) {
      setPaymentError('رمز دوم پویا را وارد کنید یا دکمه دریافت رمز را بزنید.');
      return;
    }

    setPaymentError('');
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const generatedOrderId = `AYB-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: OrderDetails = {
        orderId: generatedOrderId,
        date: new Date().toLocaleDateString('fa-IR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        items,
        subtotal,
        discount: appliedDiscount,
        shippingFee,
        total: totalAmount,
        customerName,
        phone,
        address: `${province}، ${city}، ${address}`,
        postalCode,
        shippingMethod,
        paymentRef: `SHP-${Math.floor(100000000 + Math.random() * 900000000)}`,
        status: 'تأیید شده و در حال بسته‌بندی ایمن',
      };

      setCompletedOrder(order);
      onOrderComplete(order);
      setStep(3);
    }, 1800);
  };

  const refreshCaptcha = () => {
    const randoms = ['۵۹۳۱', '۲۴۸۰', '۷۱۶۳', '۹۵۴۲'];
    const chosen = randoms[Math.floor(Math.random() * randoms.length)];
    setCaptchaCode(chosen);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#111722] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 text-right max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="p-4 sm:px-6 border-b border-slate-800 bg-[#0d121a] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-slate-100">
              {step === 1 && 'اطلاعات گیرنده و روش ارسال'}
              {step === 2 && 'درگاه پرداخت امن الکترونیک شاپرک'}
              {step === 3 && 'رسید و فاکتور نهایی سفارش'}
            </span>
          </div>
          {step !== 2 && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1">
          {/* STEP 1: CUSTOMER DETAILS & SHIPPING */}
          {step === 1 && (
            <form onSubmit={handleInfoSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">
                    نام و نام خانوادگی تحویل‌گیرنده: *
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: سید امیر طباطبایی"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">
                    شماره تماس همراه (جهت پیامک رهگیری): *
                  </label>
                  <input
                    type="tel"
                    placeholder="۰۹۱۲xxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500 text-left font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">استان: *</label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="تهران">تهران</option>
                    <option value="خراسان رضوی">خراسان رضوی</option>
                    <option value="اصفهان">اصفهان</option>
                    <option value="فارس">فارس</option>
                    <option value="قم">قم</option>
                    <option value="آذربایجان شرقی">آذربایجان شرقی</option>
                    <option value="یزد">یزد</option>
                    <option value="سایر استان‌ها">سایر استان‌ها</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">شهر: *</label>
                  <input
                    type="text"
                    placeholder="مثال: مشهد مقدس"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">کد پستی ده‌رقمی: *</label>
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="مثال: ۱۲۳۴۵۶۷۸۹۰"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500 text-left font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  نشانی دقیق پستی تحویل: *
                </label>
                <textarea
                  rows={2}
                  placeholder="خیابان، کوچه، پلاک، واحد..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Shipping Method Selector */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>شیوه ارسال بیمه‌شده نقره و جواهر:</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setShippingMethod('پیشتاز بیمه‌دار')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'پیشتاز بیمه‌دار'
                        ? 'border-emerald-500 bg-emerald-950/20'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-semibold text-slate-200">
                      پست پیشتاز ویژه نقره‌جات
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      بیمه کامل بار + جعبه چوبی ضدضربه (۲ الی ۳ روز کاری)
                    </div>
                  </div>

                  <div
                    onClick={() => setShippingMethod('تیپاکس فوری نقره')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'تیپاکس فوری نقره'
                        ? 'border-emerald-500 bg-emerald-950/20'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-semibold text-slate-200">
                      تیپاکس اختصاصی اکسپرس
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      تحویل درب منزل با اعلام پیامکی و کد امنیتی (۲۴ الی ۴۸ ساعت)
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Summary */}
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400">مبلغ نهایی قابل پرداخت:</span>
                  <div className="text-base font-bold text-emerald-400 tabular-nums font-sans">
                    {formatToman(totalAmount)}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400">
                  شامل {toPersianDigits(items.length)} اثر نقره
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>اتصال به درگاه پرداخت امن الکترونیک</span>
              </button>
            </form>
          )}

          {/* STEP 2: SHAPARAK ELECTRONIC PAYMENT GATEWAY SIMULATION */}
          {step === 2 && (
            <div className="bg-[#f8fafc] text-slate-900 rounded-xl p-4 sm:p-6 shadow-inner space-y-5">
              
              {/* Shaparak Official Header */}
              <div className="flex items-center justify-between border-b border-slate-300 pb-3">
                <div className="text-right">
                  <div className="text-xs font-bold text-blue-900">
                    سامانه پرداخت الکترونیک شاپرک (به‌پرداخت ملت)
                  </div>
                  <div className="text-[11px] text-slate-600">
                    پذیرنده: فروشگاه صنایع نقره ایوب زاده (کد: ۸۸۴۲۹۱۰۵)
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-xs">
                    AYB
                  </div>
                </div>
              </div>

              {/* Payment Amount Display */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-600">مبلغ قابل کسر از کارت:</span>
                  <div className="text-base font-extrabold text-blue-950 tabular-nums font-sans">
                    {formatToman(totalAmount)}
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 font-sans">
                  معادل {toPersianDigits((totalAmount * 10).toLocaleString('en-US'))} ریال
                </div>
              </div>

              {paymentError && (
                <div className="p-2.5 bg-rose-50 border border-rose-300 text-rose-700 text-xs rounded-lg flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{paymentError}</span>
                </div>
              )}

              {/* Card Inputs */}
              <div className="space-y-4 text-xs">
                
                {/* 16 Digit Card */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">
                    شماره کارت بانکی (عضو شبکه شتاب):
                  </label>
                  <div className="grid grid-cols-4 gap-2 dir-ltr text-center font-sans font-bold">
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="۶۰۳۷"
                      value={card1}
                      onChange={(e) => setCard1(e.target.value)}
                      className="bg-white border border-slate-300 text-slate-800 rounded p-2 text-center text-sm focus:border-blue-600 focus:outline-none"
                    />
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="۹۹۱۸"
                      value={card2}
                      onChange={(e) => setCard2(e.target.value)}
                      className="bg-white border border-slate-300 text-slate-800 rounded p-2 text-center text-sm focus:border-blue-600 focus:outline-none"
                    />
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="۲۳۴۱"
                      value={card3}
                      onChange={(e) => setCard3(e.target.value)}
                      className="bg-white border border-slate-300 text-slate-800 rounded p-2 text-center text-sm focus:border-blue-600 focus:outline-none"
                    />
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="۸۹۵۰"
                      value={card4}
                      onChange={(e) => setCard4(e.target.value)}
                      className="bg-white border border-slate-300 text-slate-800 rounded p-2 text-center text-sm focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* CVV2 and Expiry */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">کد CVV2:</label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="•••"
                      value={cvv2}
                      onChange={(e) => setCvv2(e.target.value)}
                      className="w-full bg-white border border-slate-300 text-slate-800 rounded p-2 text-center text-sm font-sans focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">تاریخ انقضا:</label>
                    <div className="flex gap-2 font-sans">
                      <input
                        type="text"
                        maxLength={2}
                        placeholder="ماه"
                        value={expMonth}
                        onChange={(e) => setExpMonth(e.target.value)}
                        className="w-1/2 bg-white border border-slate-300 text-slate-800 rounded p-2 text-center text-sm focus:border-blue-600 focus:outline-none"
                      />
                      <input
                        type="text"
                        maxLength={2}
                        placeholder="سال"
                        value={expYear}
                        onChange={(e) => setExpYear(e.target.value)}
                        className="w-1/2 bg-white border border-slate-300 text-slate-800 rounded p-2 text-center text-sm focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Dynamic Password (OTP) */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 flex justify-between items-center">
                    <span>رمز دوم پویا:</span>
                    {otpSent && (
                      <span className="text-[11px] text-amber-700 font-sans flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>زمان اعتبار: {toPersianDigits(otpTimer)} ثانیه</span>
                      </span>
                    )}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      maxLength={8}
                      placeholder="رمز اینترنتی کارت"
                      value={dynamicOtp}
                      onChange={(e) => setDynamicOtp(e.target.value)}
                      className="flex-1 bg-white border border-slate-300 text-slate-800 rounded p-2 text-center text-sm font-sans focus:border-blue-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleRequestOtp}
                      className="px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-semibold cursor-pointer whitespace-nowrap"
                    >
                      {otpSent ? 'ارسال مجدد' : 'دریافت رمز پویا'}
                    </button>
                  </div>
                </div>

                {/* Captcha */}
                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="text"
                    placeholder="کد امنیتی"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="w-32 bg-white border border-slate-300 text-slate-800 rounded p-2 text-center text-sm font-sans focus:border-blue-600 focus:outline-none"
                  />
                  <div className="flex items-center gap-2 bg-slate-200 px-3 py-1.5 rounded border border-slate-300 font-sans tracking-widest font-black text-slate-800 select-none">
                    <span>{captchaCode}</span>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-3 border-t border-slate-300">
                <button
                  type="button"
                  onClick={handleProcessPayment}
                  disabled={isProcessingPayment}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {isProcessingPayment ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>در حال اعتبارسنجی تراکنش بانکی...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>پرداخت و تأیید نهایی خرید</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  انصراف
                </button>
              </div>

              <div className="text-[10px] text-center text-slate-500">
                اتصال مستقیم از طریق پروتکل رمزنگاری امن SSL 256-bit به درگاه مرکزی شاپرک
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESSFUL INVOICE & ORDER CERTIFICATE */}
          {step === 3 && completedOrder && (
            <div className="space-y-6">
              
              {/* Success Badge */}
              <div className="p-4 bg-emerald-950/70 border border-emerald-600/60 rounded-xl text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-100 font-display">
                  پرداخت با موفقیت انجام شد و سفارش ثبت گردید
                </h3>
                <p className="text-xs text-slate-300">
                  بسته‌بندی فاخر چوبی با کارت ضمانت عیار ۹۲۵ ایوب‌زاده در حال آماده‌سازی است.
                </p>
              </div>

              {/* Printable Invoice Container */}
              <div
                id="digital-invoice"
                className="p-5 bg-slate-900 border border-slate-700 rounded-xl space-y-4 text-xs text-slate-300"
              >
                {/* Invoice Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <div className="text-sm font-bold text-slate-100 font-display">
                      فاکتور رسمی فروشگاه نقره ایوب زاده
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      شناسنامه شماره: {completedOrder.orderId} · شماره تراکنش:{' '}
                      {completedOrder.paymentRef}
                    </div>
                  </div>
                  <div className="text-left text-[11px] text-slate-400 font-sans">
                    {completedOrder.date}
                  </div>
                </div>

                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#0c1017] p-3 rounded-lg border border-slate-800/80">
                  <div>
                    <span className="text-slate-500">خریدار محترم: </span>
                    <span className="text-slate-200 font-semibold">
                      {completedOrder.customerName}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">شماره تماس: </span>
                    <span className="text-slate-200 font-sans">{completedOrder.phone}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500">نشانی تحویل: </span>
                    <span className="text-slate-300">{completedOrder.address}</span>
                  </div>
                </div>

                {/* Itemized list */}
                <div className="space-y-2">
                  <div className="text-slate-400 font-semibold text-[11px]">اقلام فاکتور شده:</div>
                  {completedOrder.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded bg-slate-800/50 text-[11px]"
                    >
                      <div>
                        <span className="font-semibold text-slate-200">
                          {it.product.title}
                        </span>
                        <span className="text-slate-400 mr-2">
                          ({it.product.purity} · {toPersianDigits(it.quantity)} عدد)
                        </span>
                        {it.selectedSize && (
                          <span className="text-slate-400 mr-1 font-sans">
                            · سایز: {toPersianDigits(it.selectedSize)}
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-emerald-400 tabular-nums font-sans">
                        {formatToman(it.product.price * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Invoice Footer Breakdown */}
                <div className="border-t border-slate-800 pt-2 space-y-1 text-right">
                  <div className="flex justify-between text-slate-400">
                    <span>جمع کل:</span>
                    <span className="tabular-nums font-sans">
                      {formatToman(completedOrder.subtotal)}
                    </span>
                  </div>
                  {completedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>تخفیف ویژه:</span>
                      <span className="tabular-nums font-sans">
                        - {formatToman(completedOrder.discount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>بیمه و ارسال:</span>
                    <span className="tabular-nums font-sans">
                      {completedOrder.shippingFee === 0
                        ? 'رایگان'
                        : formatToman(completedOrder.shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-100 text-sm pt-1 border-t border-slate-800">
                    <span>مبلغ پرداخت شده:</span>
                    <span className="text-emerald-400 tabular-nums font-sans">
                      {formatToman(completedOrder.total)}
                    </span>
                  </div>
                </div>

                {/* Official Guarantee Hallmark Stamp */}
                <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-emerald-300">
                        مهر ضمانت مادام‌العمر نقره ایوب زاده
                      </div>
                      <div className="text-[10px] text-slate-400">
                        تضمین کتبی عیار ۹۲۵ و اصالت گوهر همراه با بسته بندی تقدیم می‌گردد.
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-emerald-400 border border-emerald-600 px-2 py-1 rounded font-bold">
                    تأیید شد
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>چاپ یا ذخیره فاکتور رسمی</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  بازگشت به فروشگاه
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
