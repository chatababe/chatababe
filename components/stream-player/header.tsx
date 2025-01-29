"use client";

import { UserIcon } from "lucide-react";
import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";

import { Skeleton } from "@/components/ui/skeleton";
import VerifiedMark from "@/components/verified-mark";
import UserAvatar, { UserAvatarSkeleton } from "@/components/user-avatar";

import Actions, { ActionsSkeleton } from "./actions";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import ChatToggle from "./chat-toggle";
import TipModal from "./tips-modal";

interface HeaderProps {
  imageUrl: string;
  hostName: string;
  hostIdentity: string;
  name: string;
  live: boolean;
}
interface MinHeaderProps {
  identity:string,
  hostName: string;
  hostIdentity: string;
  live: boolean;
  isFollowing: boolean;
}

const Header = ({ imageUrl, hostName, hostIdentity, live }: HeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(`host-${hostIdentity}`);
  const { collapsed } = useChatSidebar((state) => state);

  const isLive = !!participant && live;
  const participantCount = participants.length - 1;

  return (
    <div className="flex gap-y-4 lg:gap-y-0 items-start justify-between px-4 py-2 max-md:flex-col max-lg:hidden">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size="lg"
          isLive={isLive}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-xl font-semibold">{hostName}</h2>
            <VerifiedMark />
          </div>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-xs text-primary">
              <UserIcon className="h-4 w-4" />
              <p>
                {participantCount}{" "}
                {participantCount === 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <p className="font-semibold text-xs text-n-3">Offline</p>
          )}
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="flex flex-col gap-2 max-md:flex-row max-md:w-full max-md:justify-between">
          <TipModal />
        </div>
        {collapsed && (
          <div className="block z-50 w-full ">
            <ChatToggle text="show chat" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

export const MinHeader = ({
  identity,
  hostName,
  hostIdentity,
  live,
  isFollowing,
}: MinHeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(`host-${hostIdentity}`);
  
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = identity === hostAsViewer;

  const isLive = !!participant && live;
  const participantCount = participants.length - 1;

  return (
    <div className="flex gap-y-4 lg:gap-y-0 items-start justify-between px-4 py-1 border-b border-[#D9D9D9] lg:hidden">
      <div className="flex items-center gap-x-3">
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-sm font-medium text-n-1">{hostName}</h2>
          </div>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-[10px] text-n-3">
              <p>
                {participantCount}{" "}
                {participantCount === 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <p className="font-semibold text-[10px] text-n-3">Offline</p>
          )}
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="flex flex-col gap-2 max-md:flex-row max-md:w-full max-md:justify-between">
          <Actions
            hostIdentity={hostIdentity}
            isFollowing={isFollowing}
            isHost={isHost}
          />
        </div>
      </div>
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-2">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  );
};
