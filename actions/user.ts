"use server";

import { Profile, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const updateUser = async (values: Partial<User>) => {
  const self = await getSelf();

  const validData = {
    firstName: values.firstName,
    lastName: values.lastName,
    tokens: values.tokens,
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
  console.log(self);

  const existingProfile = await db.profile.findUnique({
    where: { id: self.id },
  });

  if (!existingProfile) {
    // Redirect the user to the "Create Profile" page
    console.log("User already exists");
    return;
  }

  const validData = {
    age: values.age,
    gender: values.gender,
    bio: values.bio?.trim(),
    location: values.location,
    preference: values.preference,
  };

  const profile = await db.profile.update({
    where: { id: self.id },
    data: {
      ...validData,
      updatedAt: new Date(),
    }
  });

  revalidatePath(`/${self?.username}`);
  revalidatePath(`/u/${self?.username}`);

  return profile;
};
