import { db } from "@/lib/db";

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      externalUserId: true,
      username: true,
      imageUrl: true,
      currentTokens:true,
      profile:{
        select:{
          bio: true,
          age:true,
          location:true,
          preference:true,
          gender:true,
          socials:true,
          photos:true,
          videos:true,
        }
      },
      stream: {
        select: {
          id: true,
          isLive: true,
          approved:true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
          name: true,
        },
      },
      _count: {
        select: {
          followedBy: true,
          following: true,
        },
      },
    },
  });

  return user;
};

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      stream: true,
      profile: true,
    },
  });

  return user;
};
