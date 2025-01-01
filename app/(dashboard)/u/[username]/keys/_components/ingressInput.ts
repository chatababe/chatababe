"use server"

import { IngressInput } from "livekit-server-sdk";

export const getIngressInput = async () => {
  return {
    rtmp: String(IngressInput.RTMP_INPUT),
    whip: String(IngressInput.WHIP_INPUT)
  } as const;
};