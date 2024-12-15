import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";
import { Heart } from "lucide-react";

interface ThumbnailProps {
  src: string | null;
  fallback: string;
  isLive: boolean;
  username: string;
}

const Thumbnail = ({ src, fallback, isLive, username }: ThumbnailProps) => {
  let content;

  if (!src) {
    content = (
      <div className="bg-n-1/40 flex flex-col items-center justify-center gap-y-4 h-full w-full rounded-t-md">
        <UserAvatar
          size="default"
          showBadge
          username={username}
          imageUrl={fallback}
          isLive={isLive}
        />
      </div>
    );
  } else {
    content = (
      <Image
        src={src}
        fill
        alt="Thumbnail"
        className="object-cover rounded-md bg-n-1/40"
      />
    );
  }

  return (
    <div className="aspect-video relative rounded-t-md cursor-pointer">
      <div className="rounded-t-md absolute inset-0 bg-n-1/40 opacity-0 flex items-center justify-center" />
      {content}
      <div className="absolute top-2 right-2">
        {/* add bookmark functionality */}
        <button>
          <Heart size={22} fill="#D0C4C4" color="#D0C4C4" />
        </button>
      </div>
    </div>
  );
};

export default Thumbnail;

export const ThumbnailSkeleton = () => {
  return (
    <div className="aspect-video relative rounded-xl cursor-pointer">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
