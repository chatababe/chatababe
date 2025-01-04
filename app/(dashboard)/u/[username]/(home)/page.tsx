import InfoModal from "@/components/ui/info-modal";
import { Label } from "@/components/ui/label";
import { getUserByUsername } from "@/lib/user-service";
import Image from "next/image";
import ProfileModal from "../_components/profile-modal";
import ManageTokensModal from "../_components/tokens-modal";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

const Profile = async ({ params }: ProfilePageProps) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  const followedByCount = user?._count.followedBy;
  const userProfile = {
    username: user?.username || "Anonymous",
    imageUrl: user?.imageUrl || "/assets/images/default.jpg",
    profile: {
      bio: user?.profile?.bio || "The user has no profile",
      age: user?.profile?.age || 18,
      location: user?.profile?.location || "Prefer not to say",
      preference: user?.profile?.preference || "Prefer not to say",
      gender: user?.profile?.gender || "Prefer not to say",
    },
  };

  return (
    <div className="h-full">
      <div className="rounded-xl bg-n-5 p-4 lg:p-6 flex flex-col gap-y-3 border border-n-4/20 mx-4 my-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 mb-4 font-semibold text-lg lg:text-2xl">
            Profile
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <div className="mr-4 w-[8rem] h-[8rem] rounded-full">
            <Image
              src={decodeURIComponent(
                user?.imageUrl || "/assets/images/default.jpg"
              )}
              alt="profile-image"
              width={128}
              height={128}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-2xl font-bold text-n-1 px-4">
              {username}
            </Label>
            <div className="flex items-center space-x-2">
              <InfoModal title="followers" value={followedByCount || 0} />
              <InfoModal
                title="following"
                value={user?._count.following || 0}
              />
            </div>
            <div className="flex items-center gap-4">
              <ProfileModal user={userProfile} />
              <ManageTokensModal availableTokens={user?.currentTokens}/>
            </div>
            <div></div>
          </div>
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
