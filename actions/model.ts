"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { ApprovalImage } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateModelApprovalImage = async (
  values: Partial<ApprovalImage>
) => {
  const self = await getSelf();

  if (!self) {
    throw new Error("User not authenticated");
  }


  const validData = {
    idImageUrl: values.idImageUrl,
    faceImageUrl: values.faceImageUrl,
  };

  const approvalImage = await db.approvalImage.upsert({
    where: {
      userId: self.id
    },
    create: {
      userId: self.id,
      ...validData,
    },
    update: {
      ...validData,
    },
  });

  revalidatePath(`/${self?.username}`);
  revalidatePath(`/u/${self?.username}`);

  return approvalImage;
};
