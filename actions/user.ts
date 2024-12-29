"use server";

import { Profile, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const updateUser = async (values: Partial<User>) => {
  const self = await getSelf();
  console.log("update user: ", self);

  const validData = {
    username: values.username,
    imageUrl: values.imageUrl,
  };

  const user = await db.user.update({
    where: { id: self.id },
    data: { ...validData },
  });

  revalidatePath(`/${self.username}`);
  revalidatePath(`/u/${self.username}`);

  return user;
};

export const createUserProfile = async (values: Partial<Profile>) => {
  const self = await getSelf();

  if (!self) {
    throw new Error("User not authenticated");
  }

  const validData = {
    fullName: values.fullName?.trim(),
    age: values.age ?? 18,
    gender: values.gender ?? "Prefer not to say",
    bio: values.bio?.trim(),
    location: values.location,
    preference: values.preference,
    interests: values.intrests,
    socials: values.socials,
  };

  const profile = await db.user.update({
    where: { id: self.id },
    data: {
      profile: {
        create: validData,
      },
    },
  });

  revalidatePath(`/${self?.username}`);
  revalidatePath(`/u/${self?.username}`);

  return profile;
};

export const updateUserProfile = async (values: Partial<Profile>) => {
  const self = await getSelf();

  if (!self) {
    throw new Error("User not authenticated");
  }

  const userProfile = await db.profile.findUnique({
    where: {
      userId: self.id,
    },
  });

  if (!userProfile) {
    throw new Error("Profile not found, Please create one");
  }
  const validData = {
    fullName: values.fullName?.trim(),
    age: values.age || userProfile?.age,
    gender: values.gender,
    bio: values.bio?.trim(),
    location: values.location,
    preference: values.preference,
    interests: values.intrests,
    socials: values.socials,
  };

  const updatedProfile = await db.profile.update({
    where: { userId: self.id },
    data: {
      ...validData,
      updatedAt: new Date(),
    },
  });

  revalidatePath(`/${self?.username}`);
  revalidatePath(`/u/${self?.username}`);

  return updatedProfile;
};

export const updateUserCredits = async () => {
  const self = await getSelf();
  if (!self) {
    throw new Error("User not authenticated");
  }

  const updatedUserTokens = await db.$transaction(async (prisma) => {
    const totalTokens = await prisma.tokens.aggregate({
      where: { userId: self.id },
      _sum: { credits: true },
    });
    return prisma.user.update({
      where: { id: self.id },
      data: { currentTokens: totalTokens._sum.credits || 0 },
    });
  });

  if (!updatedUserTokens) throw new Error("User tokens update failed");

  return updatedUserTokens;
};
