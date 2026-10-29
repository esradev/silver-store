import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#111722] border border-slate-800/80 rounded-xl overflow-hidden flex flex-col justify-between animate-pulse">
      {/* Image Skeleton (4:3) */}
      <div className="relative aspect-[4/3] bg-slate-800/60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        
        {/* Fake Top Tags */}
        <div className="absolute top-2.5 right-2.5 w-16 h-4 bg-slate-700/60 rounded" />
        <div className="absolute top-2.5 left-2.5 w-7 h-7 bg-slate-700/60 rounded-lg" />
      </div>

      {/* Content Skeleton */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-2">
          {/* Metadata line */}
          <div className="flex items-center gap-2">
            <div className="h-3 w-16 bg-slate-700/50 rounded" />
            <div className="h-3 w-10 bg-slate-700/50 rounded" />
            <div className="h-3 w-20 bg-slate-700/50 rounded" />
          </div>

          {/* Title lines */}
          <div className="h-4 w-4/5 bg-slate-700/70 rounded mt-1" />
          <div className="h-4 w-3/5 bg-slate-700/50 rounded" />
        </div>

        {/* Rating line */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 bg-slate-700/60 rounded-full" />
            <div className="h-3 w-8 bg-slate-700/50 rounded" />
          </div>
          <div className="h-3 w-14 bg-slate-700/50 rounded" />
        </div>

        {/* Price & Buy Action */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
          <div className="space-y-1">
            <div className="h-3 w-12 bg-slate-700/40 rounded" />
            <div className="h-5 w-24 bg-slate-700/70 rounded" />
          </div>
          <div className="h-8 w-16 bg-slate-700/70 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
};
