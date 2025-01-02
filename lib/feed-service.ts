import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

const filters ={
  id: true,
  user: {
    select: {
      id: true,
      username: true,
      imageUrl: true,
      profile: {
        select: {
          age: true,
        },
      },
    },
  },
  isLive: true,
  name: true,
  thumbnailUrl: true,
  goalText: true,
  type: true,
  tags: true,
}

export const getStreams = async (category:string) => {
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
      ...(category && {
        where: {
          type: {
            equals: category
          }
        }
      }),
      select: filters,
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
      select: filters,
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
          profile:{
            select:{
              age:true
            }
          },
          stream: {
            select: {
              id: true,
              isLive: true,
              name: true,
              thumbnailUrl: true,
              goalText: true,
              type: true,
              tags:true,
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
        profile:{
          age:follow.following.profile?.age
        }
      },
      ...follow.following.stream,
    }));
};

export const getPrivateStreams = async (category:string) => {
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
        isLive: true,
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
      ...(category && {
        where: {
          type: {
            equals: category
          }
        }
      }),
      select: filters,
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
      select: filters,
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

export const getRandomStreams = async (category:string) => {
  let streams = [];

  streams = await db.stream.findMany({
    take: 10,
    where: {
      isLive: true,
    },
    ...(category && {
      where: {
        type: {
          equals: category
        }
      }
    }),
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
    select: filters,
  });

  return streams;
};

export const getStreamsByStreamCategory = async (category: string, gender:string) => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let filtersCategory = {};

  switch (category) {
    // Available Private Shows
    case "6 Tokens per Minute":
      filtersCategory = { tokenRate: { equals: 6 } };
      break;
    case "12-18 Tokens per Minute":
      filtersCategory = { tokenRate: { gte: 12, lte: 18 } };
      break;
    case "30-42 Tokens per Minute":
      filtersCategory = { tokenRate: { gte: 30, lte: 42 } };
      break;
    case "60-72 Tokens per Minute":
      filtersCategory = { tokenRate: { gte: 60, lte: 72 } };
      break;
    case "90+ Tokens per Minute":
      filtersCategory = { tokenRate: { gte: 90 } };
      break;

    // Free Cams by Status
    case "Private Shows":
      filtersCategory = { isPublic: false };
      break;
    case "New Cams":
      const oneHourAgo = new Date();
      oneHourAgo.setHours(oneHourAgo.getHours() - 1);
      filtersCategory = { updatedAt: { gte: oneHourAgo } };
      break;

    default:
      throw new Error("Unknown category");
  }

  const streams = await db.stream.findMany({
    ...(category && {
      where: {
        type: {
          equals: gender
        }
      }
    }),
    where: {
      ...filtersCategory,
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
    select: filters,
    orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
  });

  return streams;
};

export const getStreamsByUserCategory = async (category: string,gender:string) => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let filtersCategory = {};

  switch (category) {
    // Free Cams by Age
    case "Teen Cams":
      filtersCategory = { age: { lte: 19 } };
      break;
    case "18 to 21 cams":
      filtersCategory = { age: { gte: 18, lte: 21 } };
      break;
    case "20 to 30 cams":
      filtersCategory = { age: { gte: 20, lte: 30 } };
      break;
    case "30 to 50 cams":
      filtersCategory = { age: { gte: 30, lte: 50 } };
      break;
    case "Mature cams":
      filtersCategory = { age: "mature" };
      break;

    // Free Cams by Region
    case "North American Cams":
      filtersCategory = { location: "North America" };
      break;
    case "South American Cams":
      filtersCategory = { location: "South America" };
      break;
    case "Euro Russian Cams":
      filtersCategory = { location: { in: ["Europe", "Russia"] } };
      break;
    case "Asian Cams":
      filtersCategory = { locationn: "Asia" };
      break;
    case "Other Regions":
      filtersCategory = {
        location: {
          notIn: ["North America", "South America", "Europe", "Russia", "Asia"],
        },
      };
      break;

    case "Female Cams":
      filtersCategory = { gender: "female" };
      break;
    case "Male Cams":
      filtersCategory = { gender: "male" };
      break;
    case "Couple Cams":
      filtersCategory = { gender: "couple" };
      break;
    case "Trans Cams":
      filtersCategory = { gender: "trans" };
      break;

    default:
      throw new Error("Unknown category");
  }

  const streams = await db.stream.findMany({
    ...(category && {
      where: {
        type: {
          equals: gender
        }
      }
    }),
    where: {
      isLive: true,
      ...(userId && {
        user: {
          profile: {
            ...filtersCategory,
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
    select: filters,
    orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
  });

  return streams;
};

export const getStreamByTags = async ({
  country,
  genre,
  room,
  year,
}: FilterTags) => {
  let userId;
  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }
  // Filter out undefined values and ensure string type
  const tags: string[] = [country, genre, room, year].filter(
    (tag): tag is string => typeof tag === "string" && tag.length > 0
  );
  let streams = [];
  if (userId) {
    streams = await db.stream.findMany({
      where: {
        ...(tags.length > 0 && {
          tags: {
            hasSome: tags,
          },
        }),
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
      select: filters,
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
      select: filters,
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
