import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border rounded-md p-4 space-y-3">
          <div className="flex gap-3 items-center">
            <Skeleton className="w-10 h-10 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
