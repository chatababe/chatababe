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
      followerId: userId,
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
            },
          },
        },
      },
    },
  });

  return followedUsers
    .filter((follow) => follow.following.stream)
    .map((follow) => ({
      user: {
        id: follow.following.id,
        username: follow.following.username,
        imageUrl: follow.following.imageUrl,
        externalUserId: follow.following.externalUserId,
        createdAt: follow.following.createdAt,
        updatedAt: follow.following.updatedAt,
      },
      ...follow.following.stream,
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
        isPublic: false,
        isLive:true,
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
    take: 10,
    where:{
      isLive:true,
    },
    orderBy: [
      {
        updatedAt: "desc", 
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

export const getStreamsByStreamCategory = async (category: string) => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let filters = {};

  switch (category) {
    // Available Private Shows
    case "6 Tokens per Minute":
      filters = { tokenRate: { equals: 6 } };
      break;
    case "12-18 Tokens per Minute":
      filters = { tokenRate: { gte: 12, lte: 18 } };
      break;
    case "30-42 Tokens per Minute":
      filters = { tokenRate: { gte: 30, lte: 42 } };
      break;
    case "60-72 Tokens per Minute":
      filters = { tokenRate: { gte: 60, lte: 72 } };
      break;
    case "90+ Tokens per Minute":
      filters = { tokenRate: { gte: 90 } };
      break;

    // Free Cams by Status
    case "Private Shows":
      filters = { isPublic: false };
      break;
    case "New Cams":
      const oneHourAgo = new Date();
      oneHourAgo.setHours(oneHourAgo.getHours() - 1);
      filters = { updatedAt: { gte: oneHourAgo } };
      break;

    default:
      throw new Error("Unknown category");
  }

  const streams = await db.stream.findMany({
    where: {
      ...filters,
      isLive: true,
      ...(userId && {
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
      }),
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
    orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
  });

  return streams;
};

export const getStreamsByUserCategory = async (category: string) => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let filters = {};

  switch (category) {
    // Free Cams by Age
    case "Teen Cams":
      filters = { age: { lte: 19 } };
      break;
    case "18 to 21 cams":
      filters = { age: { gte: 18, lte: 21 } };
      break;
    case "20 to 30 cams":
      filters = { age: { gte: 20, lte: 30 } };
      break;
    case "30 to 50 cams":
      filters = { age: { gte: 30, lte: 50 } };
      break;
    case "Mature cams":
      filters = { age: "mature" };
      break;

    // Free Cams by Region
    case "North American Cams":
      filters = { location: "North America" };
      break;
    case "South American Cams":
      filters = { location: "South America" };
      break;
    case "Euro Russian Cams":
      filters = { location: { in: ["Europe", "Russia"] } };
      break;
    case "Asian Cams":
      filters = { locationn: "Asia" };
      break;
    case "Other Regions":
      filters = {
        location: {
          notIn: ["North America", "South America", "Europe", "Russia", "Asia"],
        },
      };
      break;

    case "Female Cams":
      filters = { gender: "female" };
      break;
    case "Male Cams":
      filters = { gender: "male" };
      break;
    case "Couple Cams":
      filters = { gender: "couple" };
      break;
    case "Trans Cams":
      filters = { gender: "trans" };
      break;

    default:
      throw new Error("Unknown category");
  }

  const streams = await db.stream.findMany({
    where: {
      isLive:true,
      ...(userId && {
        user: {
          profile: {
            ...filters,
          },
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
      }),
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
    orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
  });

  return streams;
};
