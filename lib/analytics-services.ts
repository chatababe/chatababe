import { db } from "./db";

export const getStats = async () => {
    const stats = await db.$transaction([
        db.user.count(), 
        db.stream.count(),
        db.approvalImage.count({ where: { status: "pending" } }), 
        db.stream.count({ where: { isLive: true } }),
      ]);

      return stats;
}

export const getApprovalStats = async () => {
    const approvalStats = await db.approvalImage.groupBy({
        by: ["status"],
        _count: {
          status: true,
        },
      });

      return approvalStats;
}

export const getStreamGrowth = async () => {
    const streamGrowth = await db.$transaction([
        db.stream.groupBy({
            by: ["createdAt"],
            _count: {
              createdAt: true,
            },
            orderBy: {
              createdAt: "asc", // Sort by createdAt in ascending order
            },
        }),
        db.user.groupBy({
            by: ["createdAt"],
            _count: {
              createdAt: true,
            },
            orderBy: {
              createdAt: "asc", // Sort by createdAt in ascending order
            },
        }),
      ]);

      return streamGrowth;
}