import { createUploadthing, type FileRouter } from "uploadthing/next";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const self = await getSelf();

      return { user: self };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.stream.update({
        where: {
          userId: metadata.user.id,
        },
        data: {
          thumbnailUrl: file.url,
        },
      });

      return { fileUrl: file.url };
    }),
    
  profileImageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const self = await getSelf();

      return { user: self };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.user.update({
        where: {
          id: metadata.user.id,
        },
        data: {
          imageUrl: file.url,
        },
      });

      return { fileUrl: file.url };
    }),
    IDImageUploader: f({
      image: {
        maxFileSize: "4MB",
        maxFileCount: 1,
      },
    })
      .middleware(async () => {
        const self = await getSelf();
        return { user: self };
      })
      .onUploadComplete(async ({ metadata, file }) => {
        await db.approvalImage.upsert({
          where: {
            id: metadata.user.id,
          },
          create: {
            userId: metadata.user.id, 
            idImageUrl: file.url,
          },
          update: {
            idImageUrl: file.url,
          },
        });
        return { fileUrl: file.url };
      }),
      faceImageUploader: f({
        image: {
          maxFileSize: "4MB",
          maxFileCount: 1,
        },
      })
        .middleware(async () => {
          const self = await getSelf();
          return { user: self };
        })
        .onUploadComplete(async ({ metadata, file }) => {
          await db.approvalImage.upsert({
            where: {
              id: metadata.user.id,
            },
            create: {
              userId: metadata.user.id, 
              faceImageUrl: file.url,
            },
            update: {
              faceImageUrl: file.url,
            },
          });
          return { fileUrl: file.url };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;