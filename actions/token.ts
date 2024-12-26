"use server";

import { v4 } from "uuid";
import crypto from "crypto";
import { AccessToken } from "livekit-server-sdk";

import { getSelf } from "@/lib/auth-service";
import { getUserById } from "@/lib/user-service";
import { isBlockedByUser } from "@/lib/block-service";

export const createViewerToken = async (hostIdentity: string) => {
  let self;

  try {
    self = await getSelf();
  } catch {
    const id = v4();
    const username = `guest#${crypto.randomBytes(4).readUInt32BE(0)}`;
    self = { id, username };
  }

  const host = await getUserById(hostIdentity);

  if (!host) {
    throw new Error("User not found");
  }

  const isBlocked = await isBlockedByUser(host.id);

  if (isBlocked) {
    throw new Error("User is blocked");
  }

  const isHost = self.id === host.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: self.id,
      name: isHost ? "host" : self.username,
    }
  );

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: isHost,
    canPublishData: false,
  });

  return await Promise.resolve(token.toJwt());
};
