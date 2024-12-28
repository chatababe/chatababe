"use server";

import { Profile, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const updateUser = async (values: Partial<User>) => {
  const self = await getSelf();
  console.log("update user: ",self);

  const validData = {
    username: values.username,
    imageUrl:values.imageUrl,
  };

  const user = await db.user.update({
    where: { id: self.id },
    data: { ...validData },
  });

  revalidatePath(`/${self.username}`);
  revalidatePath(`/u/${self.username}`);

  return user;
};

export const updateUserProfile = async (values: Partial<Profile>) => {
  const self = await getSelf();

  if (!self) {
    throw new Error("User not authenticated");
  }

  const { age, gender } = values;
  if (!age || !gender) {
    throw new Error("Missing required fields: age, gender, or location");
  }

  const validData = {
    fullName:values.fullName?.trim(),
    age,
    gender,
    bio: values.bio?.trim(),
    location:values.location,
    preference: values.preference,
    interests: values.intrests,
    socials: values.socials
  };
  console.log(validData);

  const profile = await db.profile.upsert({
    where: { userId: self.id },
    create: {
      userId: self.id,
      ...validData,
    },
    update: {
      ...validData,
      updatedAt: new Date(),
    },
  });

  revalidatePath(`/${self?.username}`);
  revalidatePath(`/u/${self?.username}`);

  return profile;
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
