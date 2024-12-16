"use client";

import { JsonValue } from "@prisma/client/runtime/library";

type CustomProfile = {
  bio: string | null;
  age: number;
  location: string;
  preference: string | null;
  gender: string;
  socials: JsonValue;
  photos: JsonValue | null;
  videos: JsonValue | null;
};

interface AboutCardProps {
  hostIdentity: string;
  hostProfile: CustomProfile | null;
  viewerIdentity: string;
  followedByCount: number;
}

const AboutCard = ({
  hostIdentity,
  hostProfile,
  viewerIdentity,
  followedByCount,
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followedByLabel = followedByCount === 1 ? "follower" : "followers";

  return (
    <div className="">
      <div className="group rounded-xl bg-n-5 p-4 lg:p-6 flex flex-col gap-y-3 border border-n-4/20 mx-4 my-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About
          </div>
        </div>
        <div className="text-sm text-n-2">
          <span className="font-semibold text-primary">{followedByCount}</span>{" "}
          {followedByLabel}
        </div>
        <div className="flex items-center">
          <p className="text-sm capitalize font-semibold text-primary-2 mr-4">age:</p>
          <p className="text-sm text-n-2 font-semibold">{hostProfile?.age || 18}</p>
        </div>
        <div className="flex items-center">
          <p className="text-sm capitalize font-semibold text-primary-2 mr-4">location:</p>
          <p className="text-sm text-n-2 font-semibold">{hostProfile?.location || "UK"}</p>
        </div>
        <div className="flex items-center">
          <p className="text-sm capitalize font-semibold text-primary-2 mr-4">preference:</p>
          <p className="text-sm text-n-2 font-semibold">{hostProfile?.preference || "males"}</p>
        </div>
        <div className="flex items-center">
          <p className="text-sm capitalize font-semibold text-primary-2 mr-4">Gender:</p>
          <p className="text-sm text-n-2 font-semibold">{hostProfile?.gender || "male"}</p>
        </div>
        <div className="flex items-center">
          <p className="text-sm capitalize font-semibold text-primary-2 mr-4">bio:</p>
          <p className="text-sm text-n-2 font-semibold">{hostProfile?.bio || 'this is my bio'}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
