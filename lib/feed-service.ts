import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getStreams = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let streams = [];

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
        NOT: {
          userId: userId,
        },
      },
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
        goalText: true,
        type: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  } else {
    streams = await db.stream.findMany({
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
        goalText: true,
        type: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  return streams;
};

export const getFollowingStreams = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  if (!userId) return [];

  const followedUsers = await db.follow.findMany({
    where: {
      followerId: userId
    },
    select: {
      following: {
        select: {
          id: true,
          username: true,
          imageUrl: true,
          externalUserId: true,
          createdAt: true,
          updatedAt: true,
          stream: {
            select: {
              isLive: true,
              name: true,
              thumbnailUrl: true,
              goalText: true,
              type: true,
            }
          }
        }
      }
    }
  });

  return followedUsers
    .filter(follow => follow.following.stream)
    .map(follow => ({
      user: {
        id: follow.following.id,
        username: follow.following.username,
        imageUrl: follow.following.imageUrl,
        externalUserId: follow.following.externalUserId,
        createdAt: follow.following.createdAt,
        updatedAt: follow.following.updatedAt,
      },
      ...follow.following.stream
    }));
};

export const getPrivateStreams = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let streams = [];

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        isPublic: false, // Only get private streams
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
        NOT: {
          userId: userId, // Exclude the current user's own stream
        },
      },
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
        goalText: true,
        type: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  } else {
    streams = await db.stream.findMany({
      where: {
        isPublic: false, 
      },
      select: {
        id: true,
        user: true,
        isLive: true,
        name: true,
        thumbnailUrl: true,
        goalText: true,
        type: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  return streams;
};


export const getRandomStreams = async () => {
  let streams = [];

  streams = await db.stream.findMany({
    take: 10, // Limit to 10 random streams, adjust as needed
    orderBy: [
      {
        updatedAt: "desc", // You can adjust this to any random criteria or raw query if needed
      },
    ],
    select: {
      id: true,
      user: true,
      isLive: true,
      name: true,
      thumbnailUrl: true,
      goalText: true,
      type: true,
    },
  });

  return streams;
};
