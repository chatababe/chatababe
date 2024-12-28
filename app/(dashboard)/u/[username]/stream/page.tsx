import { getUserByUsername } from "@/lib/user-service";
import StreamPlayer from "@/components/stream-player";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

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
      <div className="min-h-[60rem] flex flex-col items-center justify-center text-center">
        <p className="text-n-1 text-xl font-semibold mb-2">
          You are not subscribed as a model.{" "}
        </p>
        <p className="text-n-4 text-sm font-medium mb-4">
          {" "}
          Create your a profile and beging your modelling journey
        </p>
        <Button
          variant="default"
          size="lg"
          onClick={redirect("/model-profile")}
        >
          Become a model
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
