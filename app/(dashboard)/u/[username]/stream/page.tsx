import { getUserByUsername } from "@/lib/user-service";
import StreamPlayer from "@/components/stream-player";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
    return (
      <div className="min-h-[20rem] flex flex-col items-center justify-center text-center">
        <p className="text-n-1 text-xl font-semibold mb-2">
          You are not subscribed as a model.{" "}
        </p>
        <p className="text-n-3 text-sm font-medium mb-4">
          {" "}
          Create your a profile and begin your modelling journey
        </p>
        <Button variant="default" size="lg">
          <Link
            href="/model-profile"
            className="text-n-5 font-semibold text-base"
          >
            Become a model
          </Link>
        </Button>
      </div>
    );
  }
  if (!user.stream.approved) {
    return (
      <div className="min-h-[20rem] flex flex-col items-center justify-center text-center">
        <p className="text-n-1 text-xl font-semibold mb-2">
          Your stream is awaiting approval
        </p>
        <p className="text-n-3 text-sm font-medium mb-4">
          Thank you for your patience.
        </p>
        <Button variant="default" size="lg">
          <Link href="/" className="text-n-5 font-semibold text-base">
            Explore
          </Link>
        </Button>
      </div>
    );
  }
  if (!user.stream.name || !user.stream.thumbnailUrl || !user.stream.goalText || !user.stream.tags) {
    return (
      <div className="min-h-[20rem] flex flex-col items-center justify-center text-center">
        <p className="text-n-1 text-xl font-semibold mb-2">
          Create your stream before starting
        </p>
        <p className="text-n-3 text-sm font-medium mb-4">
          Thank you for your patience.
        </p>
        <Button variant="default" size="lg">
          <StreamModal stream={user.stream} title="Create Stream"/>
        </Button>
      </div>
    );
  }
  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
};

export default CreatorPage;
