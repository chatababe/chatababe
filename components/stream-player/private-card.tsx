"use client";

import { JsonValue } from "@prisma/client/runtime/library";
import { Filter, ImageOff } from "lucide-react";
import { Button } from "../ui/button";

type CustomProfile = {
  photos: JsonValue | null;
  videos: JsonValue | null;
};

interface PrivateCardProps {
  hostName: string;
  hostIdentity: string;
  hostProfile: CustomProfile | null;
  viewerIdentity: string;
}

const PrivateCard = ({ hostName, hostProfile }: PrivateCardProps) => {
  if (!hostProfile?.videos && !hostProfile?.photos) {
    return (
      <div className="min-h-[40vh] rounded-xl bg-n-5 p-4 lg:p-6 flex flex-col items-center justify-center gap-y-3 border border-n-4/20">
        <ImageOff className="w-24 h-24 my-4 max-lg:w-12 max-lg:h-12" color="#4d4545"/>
        <p className="text-n-2 font-medium text-sm text-center lg:text-lg">
          This user has not added any photos or videos yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="group bg-n-5 p-4 lg:p-6 flex flex-col gap-y-3 border border-n-4/20  my-2">
        {hostProfile.videos && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2 font-semibold text-sm lg:text-base">
                {hostName}&apos;s videos
              </div>
              <Button
                variant="outline"
                onClick={() => console.log("filtering")}
                className="flex items-center gap-2"
              >
                <Filter />
                <p className="text-xs text-n-2 max-lg:hidden">Filter</p>
              </Button>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-lg text-center font-semibold text-n-2">
                videos
              </p>
            </div>
          </>
        )}
        {hostProfile.photos && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2 font-semibold text-sm lg:text-base">
                {hostName}&apos;s photos
              </div>
              <Button
                variant="outline"
                onClick={() => console.log("filtering")}
                className="flex items-center gap-2"
              >
                <Filter />
                <p className="text-xs text-n-2 max-lg:hidden">Filter</p>
              </Button>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-lg text-center font-semibold text-n-2">
                photos
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PrivateCard;
