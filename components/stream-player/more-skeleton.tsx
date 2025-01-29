"use client";

import { ThumbnailSkeleton } from "../thumbnail";
import { Skeleton } from "../ui/skeleton";
import { UserAvatarSkeleton } from "../user-avatar";

export const MoreCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
};
export const MoreSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 mb-4 mx-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 px-8">
        {[...Array(4)].map((_, i) => (
          <MoreCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
