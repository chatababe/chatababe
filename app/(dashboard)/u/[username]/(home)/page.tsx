import { getUserByUsername } from "@/lib/user-service";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

const Profile = async ({ params }: ProfilePageProps) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  const followedByCount = user?._count.followedBy;
  const followedByLabel = followedByCount === 1 ? "follower" : "followers";

  return (
    <div className="h-full">
      <div className="rounded-xl bg-n-5 p-4 lg:p-6 flex flex-col gap-y-3 border border-n-4/20 mx-4 my-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            Profile
          </div>
        </div>
        <div className="text-sm text-n-2">
          <span className="font-semibold text-primary">{followedByCount}</span>{" "}
          {followedByLabel}
        </div>
        <div className="flex items-center">
          <p className="text-sm capitalize font-semibold text-primary-2 mr-4">
            age:
          </p>
          <p className="text-sm text-n-2 font-semibold">
            {user?.profile?.age || 18}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-sm capitalize font-semibold text-primary-2 mr-4">
            location:
          </p>
          <p className="text-sm text-n-2 font-semibold">
            {user?.profile?.location || "UK"}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-sm capitalize font-semibold text-primary-2 mr-4">
            preference:
          </p>
          <p className="text-sm text-n-2 font-semibold">
            {user?.profile?.preference || "males"}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-sm capitalize font-semibold text-primary-2 mr-4">
            Gender:
          </p>
          <p className="text-sm text-n-2 font-semibold">
            {user?.profile?.gender || "male"}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-sm capitalize font-semibold text-primary-2 mr-4">
            bio:
          </p>
          <p className="text-sm text-n-2 font-semibold">
            {user?.profile?.bio || "this is my bio"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
