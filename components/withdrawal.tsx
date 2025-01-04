"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { initiateWithdrawal } from "@/actions/stripe";

interface WithdrawalProps {
  amount: number;
  credits: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const Withdrawal = ({ 
  amount, 
  credits, 
  onSuccess,
  onError 
}: WithdrawalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onWithdraw = async () => {
    try {
      setIsLoading(true);

      const withdrawal = {
        amount,
        credits,
      };

      await initiateWithdrawal(withdrawal);
      
      toast.success("Withdrawal request submitted successfully");
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Failed to process withdrawal");
      onError?.(error instanceof Error ? error : new Error("Failed to process withdrawal"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form action={onWithdraw}>
      <section>
        <Button
          type="submit"
          size="lg"
          variant="default"
          className="w-full rounded-full"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Withdraw"}
        </Button>
      </section>
    </form>
  );
};

export default Withdrawal;