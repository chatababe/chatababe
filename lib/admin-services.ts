
import { db } from "./db";

export const getUsers = async () => {
  const users = await db.user.findMany({
    include: {
      profile: {
        select: {
          fullName: true,
          gender: true,
          age: true,
        },
      },
      stream: {
        select: {
          approved: true,
        },
      },
    },
  });
  return users;
};

export const getUserApprovals = async () => {
  const approvals = await db.approvalImage.findMany({
    where: {
      status: "pending",
    },
    include: {
      user: {
        select: {
          username: true,
          imageUrl: true,
        },
      },
    },
  });
  return approvals;
};
