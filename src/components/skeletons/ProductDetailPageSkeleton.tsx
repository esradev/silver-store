import React from 'react';
import { ProductCardSkeleton } from './ProductCardSkeleton';

export const ProductDetailPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0f14] text-[#E2E8F0] pb-16 animate-pulse">
      
      {/* Breadcrumb Skeleton */}
      <div className="border-b border-slate-800/80 bg-[#0d121a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-14 bg-slate-700/60 rounded" />
            <div className="h-3 w-2 bg-slate-700/40 rounded" />
            <div className="h-3 w-16 bg-slate-700/60 rounded" />
            <div className="h-3 w-2 bg-slate-700/40 rounded" />
            <div className="h-3 w-32 bg-slate-700/60 rounded" />
          </div>
          <div className="h-4 w-24 bg-slate-700/50 rounded" />
        </div>
      </div>

      {/* Main PDP Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        
        {/* Contiguous Purchase Module & Gallery (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Gallery Skeleton: 6 Columns */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Image Box */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-800/70 border border-slate-800 shadow-2xl">
              <div className="absolute top-4 right-4 h-6 w-24 bg-slate-700/80 rounded-lg" />
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="w-9 h-9 bg-slate-700/80 rounded-xl" />
                <div className="w-9 h-9 bg-slate-700/80 rounded-xl" />
              </div>
              <div className="absolute bottom-4 right-4 h-5 w-36 bg-slate-700/80 rounded" />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              <div className="w-20 h-20 rounded-xl bg-slate-800/70 border border-slate-700/60" />
              <div className="w-20 h-20 rounded-xl bg-slate-800/50 border border-slate-800" />
            </div>

            {/* Trust Assurances */}
            <div className="p-4 bg-[#111722] border border-slate-800/80 rounded-xl grid grid-cols-2 gap-3">
              <div className="h-4 bg-slate-700/50 rounded w-32" />
              <div className="h-4 bg-slate-700/50 rounded w-36" />
              <div className="h-4 bg-slate-700/50 rounded w-36" />
              <div className="h-4 bg-slate-700/50 rounded w-32" />
            </div>

          </div>

          {/* Purchase Module Skeleton: 6 Columns */}
          <div className="lg:col-span-6 space-y-6 text-right">
            
            {/* Title & Metadata */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-16 bg-slate-700/50 rounded" />
                <div className="h-3.5 w-20 bg-slate-700/50 rounded" />
                <div className="h-3.5 w-28 bg-slate-700/50 rounded" />
              </div>

              <div className="h-7 w-4/5 bg-slate-700/80 rounded-lg" />
              <div className="h-7 w-3/5 bg-slate-700/60 rounded-lg" />

              <div className="flex items-center gap-2 pt-1">
                <div className="h-4 w-12 bg-slate-700/60 rounded" />
                <div className="h-4 w-28 bg-slate-700/50 rounded" />
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-[#111722] border border-slate-800 rounded-2xl flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-3 w-16 bg-slate-700/40 rounded" />
                <div className="h-8 w-36 bg-slate-700/80 rounded-lg" />
              </div>
              <div className="space-y-1">
                <div className="h-4 w-20 bg-slate-700/50 rounded" />
                <div className="h-5 w-24 bg-slate-700/40 rounded" />
              </div>
            </div>

            {/* Sizes Box */}
            <div className="p-4 bg-[#111722] border border-slate-800 rounded-2xl space-y-3">
              <div className="flex justify-between">
                <div className="h-4 w-28 bg-slate-700/60 rounded" />
                <div className="h-4 w-20 bg-slate-700/50 rounded" />
              </div>
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-10 w-12 bg-slate-800/80 border border-slate-700/50 rounded-xl" />
                ))}
              </div>
            </div>

            {/* Custom Engraving Skeleton */}
            <div className="p-4 bg-[#111722] border border-slate-800 rounded-2xl space-y-2">
              <div className="h-4 w-40 bg-slate-700/60 rounded" />
              <div className="h-10 w-full bg-slate-900 border border-slate-800 rounded-xl" />
            </div>

            {/* Specs Highlight */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-[#111722] border border-slate-800 rounded-xl space-y-2">
                <div className="h-3 w-14 bg-slate-700/40 rounded" />
                <div className="h-4 w-16 bg-slate-700/70 rounded" />
              </div>
              <div className="p-3 bg-[#111722] border border-slate-800 rounded-xl space-y-2">
                <div className="h-3 w-14 bg-slate-700/40 rounded" />
                <div className="h-4 w-16 bg-slate-700/70 rounded" />
              </div>
              <div className="p-3 bg-[#111722] border border-slate-800 rounded-xl space-y-2">
                <div className="h-3 w-14 bg-slate-700/40 rounded" />
                <div className="h-4 w-16 bg-slate-700/70 rounded" />
              </div>
            </div>

            {/* Buy CTA Button */}
            <div className="h-14 w-full bg-emerald-800/50 rounded-xl" />

          </div>

        </div>

        {/* Tabs Bar Skeleton */}
        <div className="pt-8 border-t border-slate-800/80 space-y-6">
          <div className="flex border-b border-slate-800 gap-6 pb-3">
            <div className="h-5 w-36 bg-slate-700/70 rounded" />
            <div className="h-5 w-32 bg-slate-700/40 rounded" />
            <div className="h-5 w-28 bg-slate-700/40 rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="h-5 w-44 bg-slate-700/60 rounded" />
              <div className="h-4 w-full bg-slate-700/40 rounded" />
              <div className="h-4 w-5/6 bg-slate-700/40 rounded" />
              <div className="h-4 w-4/6 bg-slate-700/40 rounded" />
            </div>

            <div className="p-5 bg-[#111722] border border-slate-800 rounded-2xl space-y-3">
              <div className="h-4 w-32 bg-slate-700/60 rounded" />
              <div className="space-y-2 pt-2">
                <div className="h-4 w-full bg-slate-700/30 rounded" />
                <div className="h-4 w-full bg-slate-700/30 rounded" />
                <div className="h-4 w-full bg-slate-700/30 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="pt-8 border-t border-slate-800/80 space-y-6">
          <div className="h-6 w-44 bg-slate-700/60 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        </div>

      </div>

    </div>
  );
};
