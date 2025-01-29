"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutCard from "./about-card";
import MediaCard from "./media-card";
import MoreCard from "./more-card";
import { JsonValue } from "@prisma/client/runtime/library";
import { Button } from "../ui/button";
import Actions from "./actions";
import Chat from "./chat";
import { useEffect, useState } from "react";
import TokensCard from "./tokens-card";

type CustomStream = {
  id: string;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  isLive: boolean;
  thumbnailUrl: string | null;
  name: string;
};
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

type CustomUser = {
  id: string;
  username: string;
  profile: CustomProfile | null;
  stream: CustomStream | null;
  imageUrl: string;
  _count: { followedBy: number };
};

interface NavigationProps {
  isFollowing: boolean;
  hostIdentity: string;
  name: string;
  user: CustomUser;
  stream: CustomStream;
  identity: string;
  data: StreamsProps[];
  error?: string;
  loading: boolean;
}

const NavigationComponent = ({
  isFollowing,
  hostIdentity,
  name,
  user,
  stream,
  identity,
  data,
  error,
  loading,
}: NavigationProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = identity === hostAsViewer;
  const [activeTab, setActiveTab] = useState("chat");
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    if (windowWidth >= 1024) {
      setActiveTab("about");
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);


  return (
    <div className="w-full rounded-xl bg-n-5 border border-n-4/20  my-2">
      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="w-full flex items-center p-2 px-2 max-lg:border-b max-lg:border-[#D9D9D9] max-lg:block">
          <TabsList className="grid grid-cols-4 gap-x-1 hidden-scrollbar lg:grid-cols-3 max-lg:flex max-lg:items-center max-lg:justify-between max-lg:overflow-hidden max-lg:overflow-x-scroll">
            <TabsTrigger value="chat" className="tabsTrigger lg:hidden ">
              chat
            </TabsTrigger>
            <TabsTrigger value="about" className="tabsTrigger">
              Bio
            </TabsTrigger>
            <TabsTrigger value="tokens" className="tabsTrigger lg:hidden ">
              Tokens
            </TabsTrigger>
            <TabsTrigger value="media" className="tabsTrigger">
              Pics & Videos
            </TabsTrigger>
            <TabsTrigger value="more" className="tabsTrigger">
              More like this
            </TabsTrigger>
          </TabsList>
          <div className=" ml-auto flex items-center gap-x-2 max-lg:hidden">
            <Button variant="orange" size="sm">
              <p className="font-semibold text-sm text-n-5">Join Fan club</p>
            </Button>
            <Actions
              hostIdentity={identity}
              isFollowing={isFollowing}
              isHost={isHost}
            />
          </div>
        </div>
        <TabsContent value="chat" className="lg:hidden">
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isLive={stream.isLive}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </TabsContent>
        <TabsContent value="about">
          <AboutCard
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            hostProfile={user.profile}
            followedByCount={user._count.followedBy}
          />
        </TabsContent>
        <TabsContent value="tokens" className="lg:hidden">
          <TokensCard/>
        </TabsContent>
        <TabsContent value="media">
          <MediaCard
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            hostProfile={user.profile}
          />
        </TabsContent>
        <TabsContent value="more">
          <MoreCard data={data} loading={loading} error={error} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NavigationComponent;
