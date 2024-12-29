'use server'

import { revalidatePath } from "next/cache";

export async function handleRevalidatePath() {
  revalidatePath("/");
  return { success: true };
}