import React, { useState } from "react";
import { LocalAudioTrack, LocalVideoTrack } from "livekit-client";
import { Button } from "../ui/button";
import { useLocalParticipant } from "@livekit/components-react";
import { Skeleton } from "../ui/skeleton";

interface props {
    hostIdentity: string;
}

const PublishButton = ({hostIdentity}:props) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const participant = useLocalParticipant();
  

  const handlePublishTracks = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      const audioTrack = new LocalAudioTrack(mediaStream.getAudioTracks()[0]);
      const videoTrack = new LocalVideoTrack(mediaStream.getVideoTracks()[0]);

      const localParticipant = participant?.localParticipant;
      if (localParticipant) {
        await localParticipant.publishTrack(audioTrack);
        await localParticipant.publishTrack(videoTrack);
        setIsPublishing(true);
        console.log("Tracks published successfully!");
        console.log("participant",participant?.localParticipant)
      } else {
        console.error("Local participant not found.");
      }
    } catch (error) {
      console.error("Error publishing tracks:", error);
    }
  };

  return (
    <Button variant="default" size="lg" onClick={handlePublishTracks} disabled={participant.localParticipant.identity !== hostIdentity || isPublishing}>
      {isPublishing ? "Starting Stream" : "Start Stream"}
    </Button>
  );
};

export default PublishButton;


export const ButtonSkeleton = () => {
    return (
      <div className="aspect-video border-y">
        <Skeleton className="h-24 w-32 rounded-none" />
      </div>
    );
  };
  