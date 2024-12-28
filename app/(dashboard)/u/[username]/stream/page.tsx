import { getUserByUsername } from "@/lib/user-service";
import StreamPlayer from "@/components/stream-player";
import { currentUser } from "@clerk/nextjs/server";
import StreamModal from "@/components/stream-modal";

interface CreatorPageProps {
  params: Promise<{
    username: string;
  }>;
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const { username } = await params;
  const externalUser = await currentUser();
  const user = await getUserByUsername(username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    return <StreamModal stream={null}/>
  }

  return (
    <div className="h-full">
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing
      />
    </div>
  );
};

export default CreatorPage;
