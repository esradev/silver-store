import React from 'react';
import { SlidersHorizontal, RotateCcw, Check, Sparkles } from 'lucide-react';
import { FilterState, StoneType } from '../types';
import { formatToman, toPersianDigits } from '../utils/format';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

const AVAILABLE_STONES: StoneType[] = [
  'عقیق یمنی',
  'فیروزه نیشابور',
  'دُرّ نجف',
  'زمرد و زیرکن',
  'یاقوت سرخ',
  'شرف‌الشمس',
  'بدون نگین / تمام نقره',
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
}) => {
  const handleToggleStone = (stone: StoneType) => {
    const exists = filters.selectedStones.includes(stone);
    const updated = exists
      ? filters.selectedStones.filter((s) => s !== stone)
      : [...filters.selectedStones, stone];
    onFilterChange({ ...filters, selectedStones: updated });
  };

  const handlePriceChange = (val: number) => {
    onFilterChange({ ...filters, maxPrice: val });
  };

  return (
    <aside className="bg-[#111722] border border-slate-800/80 rounded-xl p-5 space-y-6 text-right">
      {/* Filter Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2 text-slate-100 font-semibold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
          <span>فیلترهای پیشرفته</span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>پاک‌سازی</span>
        </button>
      </div>

      {/* Sort Option */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-300 block">
          مرتب‌سازی نتایج:
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              sortBy: e.target.value as FilterState['sortBy'],
            })
          }
          className="w-full bg-slate-900 border border-slate-700/80 text-xs text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
        >
          <option value="featured">برگزیده کارگاه (پیشنهادی)</option>
          <option value="price-asc">ارزان‌ترین به گران‌ترین</option>
          <option value="price-desc">گران‌ترین به ارزان‌ترین</option>
          <option value="rating">بالاترین رضایت مشتریان</option>
        </select>
      </div>

      {/* Advanced Price Filter Slider */}
      <div className="space-y-3 pt-2 border-t border-slate-800/70">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-slate-300">سقف قیمت:</span>
          <span className="text-emerald-400 font-semibold tabular-nums">
            {formatToman(filters.maxPrice)}
          </span>
        </div>

        <input
          type="range"
          min={2000000}
          max={15000000}
          step={500000}
          value={filters.maxPrice}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
        />

        <div className="flex justify-between text-[11px] text-slate-500 tabular-nums">
          <span>{formatToman(2000000)}</span>
          <span>{formatToman(15000000)}</span>
        </div>
      </div>

      {/* Stone Type Filter */}
      <div className="space-y-3 pt-2 border-t border-slate-800/70">
        <label className="text-xs font-medium text-slate-300 block">
          نوع سنگ و نگین متبرک:
        </label>
        <div className="space-y-2">
          {AVAILABLE_STONES.map((stone) => {
            const isChecked = filters.selectedStones.includes(stone);
            return (
              <label
                key={stone}
                onClick={() => handleToggleStone(stone)}
                className="flex items-center justify-between text-xs text-slate-300 hover:text-white cursor-pointer select-none py-1 group"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'border-slate-700 bg-slate-900 group-hover:border-slate-500'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span>{stone}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Craftsmanship & Stock Toggles */}
      <div className="space-y-3 pt-2 border-t border-slate-800/70">
        <label className="text-xs font-medium text-slate-300 block">
          ویژگی‌های خاص:
        </label>

        {/* Handmade Only */}
        <label
          onClick={() =>
            onFilterChange({ ...filters, onlyHandmade: !filters.onlyHandmade })
          }
          className="flex items-center justify-between text-xs text-slate-300 hover:text-white cursor-pointer select-none py-1"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>فقط آثار دست‌ساز استادکار</span>
          </span>
          <div
            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
              filters.onlyHandmade
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : 'border-slate-700 bg-slate-900'
            }`}
          >
            {filters.onlyHandmade && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
        </label>

        {/* In-stock only */}
        <label
          onClick={() =>
            onFilterChange({ ...filters, onlyInStock: !filters.onlyInStock })
          }
          className="flex items-center justify-between text-xs text-slate-300 hover:text-white cursor-pointer select-none py-1"
        >
          <span>فقط کالاهای موجود و آماده ارسال</span>
          <div
            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
              filters.onlyInStock
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : 'border-slate-700 bg-slate-900'
            }`}
          >
            {filters.onlyInStock && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
        </label>
      </div>

      {/* Result Count Banner */}
      <div className="pt-2 border-t border-slate-800/70 text-center text-xs text-slate-400">
        نمایش{' '}
        <span className="text-emerald-400 font-bold font-sans">
          {toPersianDigits(totalFilteredCount)}
        </span>{' '}
        اثر نقره
      </div>
    </aside>
  );
};
