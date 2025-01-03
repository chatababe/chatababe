"use client"

import React, { useState, useEffect } from 'react';
import { RoomEvent, Track } from 'livekit-client';
import { 
  LiveKitRoom, 
  useRoomContext,
  VideoTrack,
  AudioTrack,
  useTracks,
  TrackReference,
} from '@livekit/components-react';
import { EyeIcon, ClockIcon } from 'lucide-react';
import { useViewerToken } from '@/hooks/use-viewer-token';
import { JsonValue } from '@prisma/client/runtime/library';

// Types remain the same
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

interface Message {
  sender: string;
  content: string;
  timestamp: number;
  type: 'chat' | 'tip';
  amount?: number;
}

type CustomUser = {
  id: string;
  username: string;
  profile: CustomProfile | null;
  stream: CustomStream | null;
  imageUrl: string;
  _count: { followedBy: number };
};

interface StreamStats {
  viewerCount: number;
  duration: string;
  startTime: number;
}

// Create a separate component for the room content
const RoomContent = ({ 
  isHost, 
  messages, 
  setMessages, 
  streamStats, 
  setStreamStats,
  messageInput,
  setMessageInput,
  tipAmount,
  setTipAmount,
}: {
  isHost: boolean;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  streamStats: StreamStats;
  setStreamStats: React.Dispatch<React.SetStateAction<StreamStats>>;
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  tipAmount: number;
  setTipAmount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const room = useRoomContext();
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: true },
    ],
    { onlySubscribed: !isHost }
  );

  // Move viewer count update to useEffect
  useEffect(() => {
    if (!room) return;

    const updateViewerCount = () => {
      setStreamStats(prev => ({
        ...prev,
        viewerCount: Math.max(0, room.numParticipants),
      }));
    };

    room.on(RoomEvent.ParticipantConnected, updateViewerCount);
    room.on(RoomEvent.ParticipantDisconnected, updateViewerCount);

    // Initial count
    updateViewerCount();

    return () => {
      room.off(RoomEvent.ParticipantConnected, updateViewerCount);
      room.off(RoomEvent.ParticipantDisconnected, updateViewerCount);
    };
  }, [room, setStreamStats]);

  // Host publishing logic
  useEffect(() => {
    if (!room || !isHost) return;

    const startStreaming = async () => {
      try {
        await room.localParticipant.enableCameraAndMicrophone();
        console.log('Camera and microphone enabled');
      } catch (error) {
        console.error('Error enabling camera and microphone:', error);
      }
    };

    startStreaming();

    return () => {
      room.localParticipant.setMicrophoneEnabled(false);
      room.localParticipant.setCameraEnabled(false);
    };
  }, [room, isHost]);

  // Message handling
  useEffect(() => {
    if (!room) return;

    const handleDataReceived = (payload: Uint8Array) => {
      try {
        const decodedMessage = JSON.parse(new TextDecoder().decode(payload));
        setMessages(prev => [...prev, decodedMessage]);
      } catch (error) {
        console.error('Error decoding message:', error);
      }
    };

    room.on(RoomEvent.DataReceived, handleDataReceived);

    return () => {
      room.off(RoomEvent.DataReceived, handleDataReceived);
    };
  }, [room, setMessages]);

  const sendMessage = async (content: string, type: 'chat' | 'tip' = 'chat') => {
    if (!room || !content.trim()) return;

    const message: Message = {
      sender: room.localParticipant.identity,
      content,
      timestamp: Date.now(),
      type,
      amount: type === 'tip' ? tipAmount : undefined,
    };

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(JSON.stringify(message));
      
      await room.localParticipant.publishData(data, {
        reliable: true,
      });
      
      setMessages(prev => [...prev, message]);
      setMessageInput('');
      setTipAmount(0);
    } catch (error) {
      console.error('Error publishing message:', error);
    }
  };

  const handleTip = async () => {
    if (tipAmount <= 0) return;
    await sendMessage(`Sent a tip of $${tipAmount}`, 'tip');
  };
  // Separate video rendering logic
  const renderVideoTracks = () => {
    return tracks
      .filter(track => track.source === Track.Source.Camera)
      .map(track => {
        if (!track.publication) {
          return (
            <div key="placeholder" className="h-full flex items-center justify-center bg-gray-900">
              <span className="text-white">Waiting for video...</span>
            </div>
          );
        }
        
        return (
          <div key={track.publication.trackSid} className="h-full">
            <VideoTrack 
              trackRef={track as TrackReference}
              className="w-full h-full object-contain" 
            />
          </div>
        );
      });
  };

  // Separate audio rendering logic
  const renderAudioTracks = () => {
    return tracks
      .filter(track => track.source === Track.Source.Microphone)
      .map(track => {
        if (!track.publication) return null;
        
        return (
          <AudioTrack 
            key={track.publication.trackSid}
            trackRef={track as TrackReference}
          />
        );
      });
  };

  return (
    <>
    <div className="h-full">
        {renderVideoTracks()}
        {!isHost && renderAudioTracks()}
      </div>
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 rounded-lg p-3 text-white space-y-2">
        <div className="flex items-center space-x-2">
          <EyeIcon size={20} />
          <span>{streamStats.viewerCount} viewers</span>
        </div>
        <div className="flex items-center space-x-2">
          <ClockIcon size={20} />
          <span>{streamStats.duration}</span>
        </div>
      </div>

      <div className="w-1/4 absolute right-0 top-0 bottom-0 bg-gray-100 p-4 flex flex-col">
        <div className="bg-white rounded-lg p-4 mb-4 shadow">
          <h2 className="text-xl font-bold mb-2">Stream Info</h2>
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <EyeIcon size={16} />
              <span>{streamStats.viewerCount} watching</span>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon size={16} />
              <span>{streamStats.duration}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded ${
                message.type === 'tip' ? 'bg-green-100' : 'bg-white'
              }`}
            >
              <div className="font-bold">{message.sender}</div>
              <div>{message.content}</div>
              {message.type === 'tip' && (
                <div className="text-green-600">Tip: ${message.amount}</div>
              )}
            </div>
          ))}
        </div>

        {!isHost && (
          <div className="mb-4">
            <input
              type="number"
              value={tipAmount}
              onChange={(e) => setTipAmount(Number(e.target.value))}
              className="w-full p-2 border rounded mb-2"
              placeholder="Tip amount ($)"
            />
            <button
              onClick={handleTip}
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Send Tip
            </button>
          </div>
        )}

        <div className="flex">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1 p-2 border rounded-l"
            placeholder="Type a message..."
          />
          <button
            onClick={() => sendMessage(messageInput)}
            className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

// Main component
const StreamPage: React.FC<{ user: CustomUser }> = ({ user }) => {
  const { token, identity } = useViewerToken(user.id);
  const isHost = identity === `host-${user.id}`;
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [streamStats, setStreamStats] = useState<StreamStats>({
    viewerCount: 0,
    duration: '00:00:00',
    startTime: Date.now(),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const seconds = Math.floor((Date.now() - streamStats.startTime) / 1000);
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      
      const duration = [hours, minutes, remainingSeconds]
        .map(val => val.toString().padStart(2, '0'))
        .join(':');
      
      setStreamStats(prev => ({ ...prev, duration }));
    }, 1000);

    return () => clearInterval(timer);
  }, [streamStats.startTime]);

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen bg-black relative">
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        connect={true}
        onConnected={() => {
          setStreamStats(prev => ({
            ...prev,
            viewerCount: 1, // Initial count
          }));
        }}
        options={{
          adaptiveStream: true,
          dynacast: true,
          publishDefaults: {
            simulcast: true,
          },
        }}

      >
        <RoomContent
          isHost={isHost}
          messages={messages}
          setMessages={setMessages}
          streamStats={streamStats}
          setStreamStats={setStreamStats}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          tipAmount={tipAmount}
          setTipAmount={setTipAmount}
        />
      </LiveKitRoom>
    </div>
  );
};

export default StreamPage;