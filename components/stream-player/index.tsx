"use client";

import { LiveKitRoom } from "@livekit/components-react";

import { cn } from "@/lib/utils";
import { useViewerToken } from "@/hooks/use-viewer-token";
import useSWR from "swr"

import Chat, { ChatSkeleton } from "./chat";
import Video, { VideoSkeleton } from "./video";
import Header, { HeaderSkeleton, MinHeader } from "./header";
import { JsonValue } from "@prisma/client/runtime/library";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import NavigationComponent from "./nav-card";

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

interface StreamPlayerProps {
  user: CustomUser;
  stream: CustomStream;
  isFollowing: boolean;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};

const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);
  const { collapsed } = useChatSidebar((state) => state);
  const {data, error, isLoading} = useSWR("/api/streams?filter='' ",fetcher);

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-4 lg:gap-y-0 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-full pb-4 border-l border-b  hidden-scrollbar lg:col-span-3  lg:overflow-y-auto xl:col-span-3 2xl:col-span-5">
          <MinHeader  
          identity={identity}
           hostName={user.username}
           hostIdentity={user.id}
           live={stream.isLive}
           isFollowing={isFollowing}
          />
          <Video hostName={user.username} hostIdentity={`host-${user.id}`} />
          <Header
            hostName={user.username}
            hostIdentity={user.id}
            imageUrl={user.imageUrl}
            name={stream.name}
            live={stream.isLive}
          />
        </div>
        <div
          className={cn(
            "col-span-1 max-lg:col-span-full max-lg:hidden",
            collapsed && "hidden"
          )}
        >
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
        </div>
        <div className="col-span-full">
          <NavigationComponent
            isFollowing={isFollowing}
            user={user}
            name={name}
            stream={stream}
            hostIdentity={user.id}
            identity={identity}
            data={data}
            loading={isLoading}
            error={error}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export default StreamPlayer;

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full pb-10 border-l">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
