"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  const self = await getSelf();
  if (!self) {
    throw new Error("User not authenticated");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const amount = Number(transaction.amount) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: transaction.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      credits: transaction.credits,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  });

  redirect(session.url!);
}

export async function createTransaction(
  transaction: Partial<CreateTransactionParams>
) {
  const self = await getSelf();
  if (!self) {
    throw new Error("User not authenticated");
  }

  const { stripeId, amount, plan, credits } = transaction;
  if (!stripeId || !amount || !credits){
    throw new Error("stripe ID, credits or amount not provided. Please try again");
  }

  const validData = {
    userId: self.id,
    stripeId,
    amount,
    plan,
    credits,
  };

  try {
    const newTransaction = await db.tokens.create({
      data: { ...validData },
    });

    return newTransaction;
  } catch (error) {
    console.log(error);
    throw new Error("Unable to create transaction");
  }
}

type WithdrawalParams = {
  amount: number;
  credits: number;
};

export async function initiateWithdrawal(withdrawal: WithdrawalParams) {
  const self = await getSelf();
  if (!self) {
    throw new Error("User not authenticated");
  }

  // 1. Check if user has enough tokens
  const userTokens = await db.tokens.findMany({
    where: {
      userId: self.id,
    },
  });

  const totalTokens = userTokens.reduce((sum, token) => sum + token.credits, 0);

  if (totalTokens < withdrawal.credits) {
    throw new Error("Insufficient tokens");
  }

  try {
    // 2. Create withdrawal record
    const withdrawalRecord = await db.tokens.create({
      data: {
        userId: self.id,
        amount: withdrawal.amount,
        credits: withdrawal.credits,
      },
    });

    // 3. Deduct tokens by creating a negative token transaction
    await db.tokens.create({
      data: {
        userId: self.id,
        credits: -withdrawal.credits,
        amount: -withdrawal.amount,
        plan: 'Withdrawal',
        stripeId: `withdrawal_${withdrawalRecord.id}`, // You might want to use a different ID system
      },
    });

    return withdrawalRecord;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to process withdrawal");
  }
}