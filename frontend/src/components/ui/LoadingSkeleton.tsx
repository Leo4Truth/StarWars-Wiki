'use client';

interface LoadingSkeletonProps {
  type: 'timeline' | 'beyond';
  locale: string;
}

export default function LoadingSkeleton({ type, locale }: LoadingSkeletonProps) {
  return (
    <div className="w-full py-8">
      {/* Era filter tabs skeleton */}
      <div className="flex items-center justify-center mb-8 space-x-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-10 w-20 bg-starwars-blue/30 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>

      {/* Timeline rail skeleton */}
      <div className="flex overflow-x-auto pb-8 pt-6 px-4 space-x-6">
        {[...Array(type === 'timeline' ? 6 : 4)].map((_, i) => (
          <div
            key={i}
            className="shrink-0 w-64 rounded-lg overflow-hidden bg-starwars-blue/20 border border-starwars-gold/10 animate-pulse"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {/* Poster skeleton */}
            <div className="h-80 bg-gradient-to-b from-starwars-blue/40 to-starwars-black/80 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-16 h-16 text-starwars-gold/10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-2z"/>
                </svg>
              </div>
              {/* Era badge skeleton */}
              <div className="absolute top-3 left-3 h-6 w-16 bg-starwars-gold/10 rounded" />
              {/* Title skeleton */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="h-6 w-3/4 bg-starwars-gold/10 rounded mb-2" />
                <div className="h-4 w-1/2 bg-starwars-white/5 rounded" />
              </div>
            </div>

            {/* Info section skeleton */}
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <div className="h-4 w-20 bg-starwars-gray/10 rounded" />
                <div className="h-4 w-16 bg-starwars-gold/10 rounded" />
              </div>

              {/* Synopsis skeleton */}
              <div className="space-y-2">
                <div className="h-3 w-full bg-starwars-white/5 rounded" />
                <div className="h-3 w-4/5 bg-starwars-white/5 rounded" />
              </div>

              {/* Characters skeleton */}
              <div className="pt-3 border-t border-starwars-gold/10">
                <div className="h-3 w-20 bg-starwars-gold/10 rounded mb-2" />
                <div className="flex gap-1.5">
                  <div className="h-6 w-16 bg-starwars-blue/30 rounded" />
                  <div className="h-6 w-16 bg-starwars-blue/30 rounded" />
                  <div className="h-6 w-16 bg-starwars-blue/30 rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading text */}
      <div className="text-center mt-4">
        <p className="text-sm text-starwars-gray animate-pulse">
          {locale === 'zh-CN' ? '正在加载...' : 'Loading...'}
        </p>
      </div>
    </div>
  );
}