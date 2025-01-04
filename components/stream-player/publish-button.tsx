// app/components/stream-controller.tsx
"use client";

import { useState, useEffect } from "react";
import { Room, RoomEvent } from "livekit-client";
import { Button } from "@/components/ui/button";
import { Loader2, Video, VideoOff } from "lucide-react";
import { toast } from "sonner";
import { endStream, startStream } from "@/actions/stream";

interface StreamControllerProps {
  room: Room;
  hostIdentity: string;
  isHost: boolean;
}

export default function StreamController({
  room,
  isHost,
}: StreamControllerProps) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStream = async () => {
    if (!isHost) return;

    try {
      setIsLoading(true);

      if (isStreaming) {
        room.localParticipant.audioTrackPublications.forEach((publication) => {
          if (publication.track) {
            room.localParticipant.unpublishTrack(publication.track);
          }
        });

        room.localParticipant.videoTrackPublications.forEach((publication) => {
          if (publication.track) {
            room.localParticipant.unpublishTrack(publication.track);
          }
        });

        await endStream()
          .then(() => {
            toast.success("User has ended the stream");
          })
          .catch(() => {
            toast.error("Something went wrong,User is unable to start stream");
          });
        setIsStreaming(false);
      } else {

        const permissions = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // Release the test tracks
        permissions.getTracks().forEach((track) => track.stop());

        // Create actual tracks for streaming
        const tracks = await room.localParticipant.createTracks({
          audio: true,
          video: true,
        });

        // Publish all tracks
        await Promise.all(
          tracks.map((track) => room.localParticipant.publishTrack(track))
        );

        await startStream()
          .then(() => {
            toast.success("User has started their stream");
          })
          .catch(() => {
            toast.error("Something went wrong,User is unable to start stream");
          });
        setIsStreaming(true);
      }
    } catch (error) {
      console.error("Failed to toggle stream:", error);
      if (error instanceof Error) {
        if (error.name === "NotAllowedError") {
          toast.error(
            "Camera/Microphone permission denied. Please enable access and try again."
          );
        } else if (error.name === "NotFoundError") {
          toast.error(
            "Camera or microphone not found. Please check your devices."
          );
        } else if (error.name === "NotReadableError") {
          toast.error(
            "Camera or microphone is already in use by another application."
          );
        } else {
          toast.error(
            "Failed to start stream. Please check your devices and try again."
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Monitor room connection state
  useEffect(() => {
    const handleDisconnect = () => {
      setIsStreaming(false);
    };

    room.on(RoomEvent.Disconnected, handleDisconnect);
    return () => {
      room.off(RoomEvent.Disconnected, handleDisconnect);
    };
  }, [room]);
  // Monitor published tracks to sync button state
  useEffect(() => {
    const handleTrackUnpublished = () => {
      const hasPublishedTracks =
        room.localParticipant.audioTrackPublications.size > 0 ||
        room.localParticipant.videoTrackPublications.size > 0;
      setIsStreaming(hasPublishedTracks);
    };

    const handleTrackPublished = () => {
      setIsStreaming(true);
    };

    room.localParticipant.on(RoomEvent.TrackPublished, handleTrackPublished);
    room.localParticipant.on(
      RoomEvent.TrackUnpublished,
      handleTrackUnpublished
    );

    // Cleanup
    return () => {
      room.localParticipant.off(RoomEvent.TrackPublished, handleTrackPublished);
      room.localParticipant.off(
        RoomEvent.TrackUnpublished,
        handleTrackUnpublished
      );
    };
  }, [room.localParticipant]);

  // Monitor room connection state
  useEffect(() => {
    const handleDisconnect = () => {
      setIsStreaming(false);
      endStream();
    };

    room.on(RoomEvent.Disconnected, handleDisconnect);
    return () => {
      room.off(RoomEvent.Disconnected, handleDisconnect);
    };
  }, [room]);

  if (!isHost) {
    return null;
  }

  return (
    <Button
      onClick={handleStream}
      disabled={isLoading}
      variant={isStreaming ? "destructive" : "default"}
      className="flex items-center gap-x-2"
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!isLoading && (
        <>
          {isStreaming ? (
            <VideoOff className="h-4 w-4" />
          ) : (
            <Video className="h-4 w-4" />
          )}
        </>
      )}
      {isStreaming ? "End stream" : "Start stream"}
    </Button>
  );
}
