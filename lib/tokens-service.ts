import { getSelf } from "./auth-service";
import { db } from "./db";


export const useTokens = async (amountToDeduct: number) => {
    const self = await getSelf();
    if (!self) {
      throw new Error("User not authenticated");
    }
  
    const user = await db.user.findUnique({
      where: { id: self.id },
      select: { currentTokens: true },
    });
  
    if (!user || user.currentTokens === null) {
      throw new Error("Unable to retrieve user token balance");
    }
  
    if (user.currentTokens < amountToDeduct) {
      throw new Error("Insufficient tokens");
    }
  
    try {
      const updatedUser = await db.$transaction(async (prisma) => {
        await prisma.tokens.create({
          data: {
            userId: self.id,
            credits: -amountToDeduct,
          },
        });
  
        return prisma.user.update({
          where: { id: self.id },
          data: {
            currentTokens: user.currentTokens - amountToDeduct,
          },
        });
      });
  
      return updatedUser;
    } catch (error) {
      console.error("Error deducting tokens:", error);
      throw new Error("Token deduction failed");
    }
  };
  