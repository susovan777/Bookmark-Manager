// bookmark-manager/app/(dashboard)/bookmarks/loading.tsx

// Next.js automatically shows this file while the page is loading.
import { Skeleton } from '@/components/ui/skeleton';

const BookmarkLoading = () => {
  return (
    <div className="space-y-6">
      {/* Title skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 bg-white/10" />
        <Skeleton className="h-4 w-20 bg-white/5" />
      </div>

      {/* Card skeletons — match the new card structure exactly */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-sm border border-white/10 bg-[#111111] overflow-hidden"
          >
            {/* Header row */}
            <div className="flex items-start gap-3 p-4 pb-3">
              {/* Favicon */}
              <Skeleton className="w-7 h-7 rounded-md bg-white/10 shrink-0" />
              {/* Title + domain */}
              <div className="flex-1 space-y-2 pt-0.5">
                <Skeleton className="h-3.5 w-3/4 bg-white/10" />
                <Skeleton className="h-3 w-1/2 bg-white/5" />
              </div>
              {/* Icon buttons */}
              <Skeleton className="w-5 h-5 rounded bg-white/5" />
            </div>

            {/* TODO: Uncomment >> Description — only some cards have it */}
            {/* {i % 3 === 0 && (
              <div className="px-4 pb-3 space-y-1.5">
                <Skeleton className="h-3 w-full bg-white/5" />
                <Skeleton className="h-3 w-4/5 bg-white/5" />
              </div>
            )} */}

            {/* Footer */}
            <div className="mt-auto border-t border-white/5 px-4 py-2.5 flex items-center justify-between">
              <Skeleton className="h-3 w-16 bg-white/5" />
              <Skeleton className="w-4 h-4 rounded bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkLoading;
