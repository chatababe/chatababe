import { 
    LocalParticipant, 
    LocalTrackPublication, 
    Track, 
    createLocalTracks 
  } from 'livekit-client';
  
  interface PublishTracksOptions {
    audio?: boolean;
    video?: boolean;
    participant: LocalParticipant;
  }
  
  interface TrackPublicationResult {
    audioTrack?: LocalTrackPublication;
    videoTrack?: LocalTrackPublication;
    error?: Error;
  }
  
  export async function publishParticipantTracks({
    audio = true,
    video = true,
    participant
  }: PublishTracksOptions): Promise<TrackPublicationResult> {
    try {
      // Create local tracks
      const tracks = await createLocalTracks({
        audio: audio,
        video: video,
      });
  
      const result: TrackPublicationResult = {};
  
      // Publish each track
      for (const track of tracks) {
        const publication = await participant.publishTrack(track);
  
        if (track.kind === Track.Kind.Audio) {
          result.audioTrack = publication;
        } else if (track.kind === Track.Kind.Video) {
          result.videoTrack = publication;
        }
      }
  
      return result;
  
    } catch (error) {
      console.error('Error publishing tracks:', error);
      return {
        error: error instanceof Error ? error : new Error('Unknown error occurred')
      };
    }
  }