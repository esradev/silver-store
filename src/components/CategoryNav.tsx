import React from 'react';
import { ProductCategory } from '../types';
import { toPersianDigits } from '../utils/format';

interface CategoryNavProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  counts: Record<ProductCategory, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  counts,
}) => {
  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'همه محصولات' },
    { id: 'rings', label: 'انگشتر نقره' },
    { id: 'wedding_bands', label: 'حلقه و ست' },
    { id: 'demi_sets', label: 'نیم ست نقره' },
    { id: 'full_suites', label: 'سرویس نقره' },
  ];

  return (
    <div className="w-full border-b border-slate-800/80 bg-[#0d1219]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-950/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded font-sans ${
                    isActive ? 'bg-emerald-800/60 text-emerald-100' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {toPersianDigits(counts[cat.id] || 0)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
