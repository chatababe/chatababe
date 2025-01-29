"use client";

import { JsonValue } from "@prisma/client/runtime/library";

type CustomProfile = {
  bio: string | null;
  age: number;
  location: string | null;
  preference: string | null;
  gender: string;
  socials: JsonValue;
  photos: JsonValue | null;
  videos: JsonValue | null;
};

interface AboutCardProps {
  hostName: string;
  hostIdentity: string;
  hostProfile: CustomProfile | null;
  viewerIdentity: string;
  followedByCount: number;
}

const AboutCard = ({
  hostName,
  hostProfile,
  followedByCount,
}: AboutCardProps) => {
  return (
    <div>
      <div className="group bg-n-5 p-4 lg:p-6 flex flex-col gap-y-3 border border-n-4/20 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-sm lg:text-base">
            {hostName}&apos;s Bio and free webcam
          </div>
        </div>
        <div className=" flex items-center">
          <p className="text-sm capitalize font-semibold text-primary-2 mr-4">
            real name:
          </p>
          <span className="font-semibold text-n-2 text-sm">name</span>
        </div>
        <div className=" flex items-center">
          <p className="text-sm capitalize font-semibold text-primary-2 mr-4">
            followers:
          </p>
          <span className="font-semibold text-n-2 text-sm">
            {followedByCount}
          </span>
        </div>
        <div className="flex items-center">
          <p className="text-sm capitalize font-semibold text-primary-2 mr-4">
            birth date:
          </p>
          <p className="text-sm text-n-2 font-semibold">12/2/2000</p>
        </div>
        <div className="flex items-center">
          <p className="text-sm capitalize font-semibold text-primary-2 mr-4">
            age:
          </p>
          <p className="text-sm text-n-2 font-semibold">
            {hostProfile?.age || 18}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-sm font-semibold text-primary-2 mr-4">I am:</p>
          <p className="text-sm text-n-2 font-semibold">
            {hostProfile?.gender || "male"}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-sm font-semibold text-primary-2 mr-4">
            I am intrested in:
          </p>
          <p className="text-sm text-n-2 font-semibold">
            {hostProfile?.preference || "males"}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-sm capitalize font-semibold text-primary-2 mr-4">
            location:
          </p>
          <p className="text-sm text-n-2 font-semibold">
            {hostProfile?.location || "UK"}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-sm capitalize font-semibold text-primary-2 mr-4">
            last broadcast:
          </p>
          <p className="text-sm text-n-2 font-semibold">1 day ago</p>
        </div>
        <div className="flex items-center">
          <p className="text-sm capitalize font-semibold text-primary-2 mr-4">
            languages:
          </p>
          <p className="text-sm text-n-2 font-semibold">
            english
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-sm capitalize font-semibold text-primary-2 mr-4">
            About me:
          </p>
          <p className="text-sm text-n-2 font-semibold">
            {hostProfile?.bio || "this is my bio"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
