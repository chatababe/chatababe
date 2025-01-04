"use client";

import { ConnectionState } from "livekit-client";
import {
  useConnectionState,
  useRemoteParticipant,
  useRoomContext,
} from "@livekit/components-react";

import { Skeleton } from "@/components/ui/skeleton";

import OfflineVideo from "./offline-video";
import LoadingVideo from "./loading-video";
import LiveVideo from "./live-video";
import StreamController from "./publish-button";

interface VideoProps {
  hostName: string;
  hostIdentity: string;
}

const Video = ({ hostName, hostIdentity }: VideoProps) => {
  const connectionState = useConnectionState();
  const room = useRoomContext();
  const isHost = room?.localParticipant.identity === hostIdentity;
  const participant = useRemoteParticipant(hostIdentity)

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostName} />;
  } else if (!participant) {
    content = <LoadingVideo label={connectionState} />;
  } else {
    content = <LiveVideo participant={participant}/>;
  }

  return (
    <div className="aspect-video group relative">
      {content}
      <div className="absolute top-4 right-4 z-50">
        <StreamController
          room={room}
          hostIdentity={hostIdentity}
          isHost={isHost}
        />
      </div>
    </div>
  );
};

export default Video;

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-y">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
};
