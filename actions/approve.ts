"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const onApprove = async (userId: string) => {
  const self = await getSelf();
  if (!self) {
    throw new Error("User not authenticated");
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await db.$transaction([
    db.user.update({
      where: { id: userId },
      data: {
        role: "model",
      },
    }),
    db.approvalImage.update({
      where: { userId: user.id },
      data: {
        status: "approved",
      },
    }),
    db.stream.update({
      where: { userId: user.id },
      data: {
        approved: true,
      },
    }),
  ]);

  revalidatePath(`/admin/${self?.username}`);
  revalidatePath(`/u/${user.username}`);

  return user;
};

export const onReject = async (userId: string) => {
  const self = await getSelf();
  if (!self) {
    throw new Error("User not authenticated");
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }
  const approval = await db.approvalImage.findUnique({
    where: { userId: userId },
  });

  if (!approval) {
    throw new Error("Approval Images not found");
  }

  await db.approvalImage.update({
    where: { userId: userId },
    data: {
      status: "rejected",
    },
  });

  revalidatePath(`/admin/${self?.username}`);
  revalidatePath(`/u/${user.username}`);

  return user;
};
