"use client";

import { useRef, useState, useEffect } from "react";
import { Track } from "livekit-client";
import { useLocalParticipant, useTracks } from "@livekit/components-react";
import { useEventListener } from "usehooks-ts";

import VolumeControl from "./volume-control";
import FullscreenControl from "./fullscreen-control";

interface LiveVideoProps {
  hostIdentity: string;
}

const LiveVideo = ({ hostIdentity }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const localParticipant = useLocalParticipant();
  const local = localParticipant.localParticipant

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);

  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  };

  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

  const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]);
  useEffect(() => {
    // If the user is the host, attach their own video
    if (local.identity === hostIdentity) {
      const hostVideoTrack = tracks.find(
        (track) => track.participant.identity === hostIdentity && track.source === Track.Source.Camera
      );
      if (hostVideoTrack && videoRef.current) {
        hostVideoTrack.publication.track?.attach(videoRef.current);
      }
    }
    
    // If the user is not the host, subscribe to the host's tracks
    if (local.identity !== hostIdentity) {
      const hostTracks = tracks.filter((track) => track.participant.identity === hostIdentity);
      hostTracks.forEach((track) => {
        if (videoRef.current) {
          track.publication.track?.attach(videoRef.current);
        }
      });
    }
  }, [tracks, local.identity, hostIdentity]);

  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video ref={videoRef} width="100%" muted={local.identity !== hostIdentity}/>
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-10 w-full items-center justify-between bg-n-1/40 px-4">
          <VolumeControl
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMute}
          />
          <FullscreenControl
            isFullscreen={isFullscreen}
            onToggle={toggleFullscreen}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
