// bookmark-manager/app/(dashboard)/bookmarks/loading.tsx

// Next.js automatically shows this file while the page is loading.
// It replaces the page content with skeleton placeholders — better UX than a blank screen.
import { Skeleton } from '@/components/ui/skeleton';

const BookmarkLoading = () => {
  return (
    <div className="space-y-6">
      {/* Page title skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 bg-white/10" />
        <Skeleton className="h-4 w-24 bg-white/5" />
      </div>

      {/* Bookmark card skeletons — same grid as the real page */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 p-4 rounded-xl border border-white/10 bg-white/5"
          >
            {/* Top row: favicon + title + link icon */}
            <div className="flex items-start gap-3">
              {/* Favicon placeholder */}
              <Skeleton className="w-9 h-9 rounded-lg bg-white/10 shrink-0" />

              {/* Title + URL placeholders */}
              <div className="flex-1 space-y-2 pt-0.5">
                <Skeleton className="h-3.5 w-3/4 bg-white/10" />
                <Skeleton className="h-3 w-1/2 bg-white/5" />
              </div>

              {/* External link icon placeholder */}
              <Skeleton className="w-4 h-4 rounded bg-white/5 shrink-0" />
            </div>

            {/* Bottom delete button placeholder */}
            <div className="flex justify-end">
              <Skeleton className="h-3 w-16 bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkLoading;
