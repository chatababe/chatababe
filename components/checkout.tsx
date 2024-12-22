"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import {toast} from "sonner"
import { checkoutCredits } from "@/actions/stripe";

import { Button } from "./ui/button";

const Checkout = ({
  plan,
  amount,
  credits,
}: {
  plan: string;
  amount: number;
  credits: number;
}) => {

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast.success("Ordered placed successfully");
    }

    if (query.get("canceled")) {
      toast.error("Order cancelled")
    }
  }, []);

  const onCheckout = async () => {
    const transaction = {
      plan,
      amount,
      credits,
    };

    await checkoutCredits(transaction);
  };

  return (
    <form action={onCheckout}>
      <section>
        <Button
          type="submit"
          size="lg"
          variant="default"
          className="w-full rounded-full "
        >
          Buy Credit
        </Button>
      </section>
    </form>
  );
};

export default Checkout;