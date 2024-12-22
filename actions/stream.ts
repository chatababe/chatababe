"use server";

import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();
    const selfStream = await db.stream.findUnique({
      where: {
        userId: self.id,
      },
    });

    if (!selfStream) {
      throw new Error("Stream not found");
    }

    const validData = {
      thumbnailUrl: values.thumbnailUrl,
      name: values.name,
      goalText: values.goalText,
      type: values.type,
      isChatEnabled: values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
    };

    const stream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return stream;
  } catch {
    throw new Error("Internal Error");
  }
};

export const createStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();

    if (!self) {
      throw new Error("User not authenticated");
    }

    const selfStream = await db.stream.findUnique({
      where: { userId: self.id },
    });

    if (selfStream) {
      throw new Error("Stream already exists");
    }
     if (!values.name || values.name.trim() === "") {
      throw new Error("Stream name is required");
    }


    const validData = {
      thumbnailUrl: values.thumbnailUrl,
      name: values.name.trim(),
      goalText: values.goalText,
      type: values.type,
      isChatEnabled: values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
      isPublic: values.isPublic || true
    };

    const stream = await db.user.update({
      where: {
        id: self.id,
      },
      data: {
        stream: {
          create: validData,
        },
      },
    });

    // Revalidate relevant paths
    const pathsToRevalidate = [
      `/u/${self.username}/chat`,
      `/u/${self.username}`,
      `/${self.username}`,
    ];

    pathsToRevalidate.forEach((path) => revalidatePath(path));

    return stream;
  } catch {
    throw new Error("Internal Error");
  }
};
