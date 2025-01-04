"use client";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SignedIn } from "@clerk/nextjs";
import Checkout from "@/components/checkout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, ComponentRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Withdrawal from "@/components/withdrawal";

const PRICE_PER_TOKEN = 0.1; // $0.01 per token
const MAX_TOKENS = 2000;
const MAX_WITHDRAWAL = 1000; // Example max withdrawal limit

const ManageTokensModal = ({ availableTokens = 0 }) => {
  const [tokens, setTokens] = useState<number>(100);
  const [error, setError] = useState<string>("");
  const closeRef = useRef<ComponentRef<"button">>(null);

  const handleTokenChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    mode: "purchase" | "withdraw"
  ) => {
    const value = parseInt(e.target.value);

    if (isNaN(value)) {
      setTokens(0);
      return;
    }

    if (mode === "purchase") {
      if (value > MAX_TOKENS) {
        setTokens(MAX_TOKENS);
        setError(`Maximum ${MAX_TOKENS} tokens allowed`);
        return;
      }
    } else {
      if (value > availableTokens) {
        setTokens(availableTokens);
        setError(
          `Cannot withdraw more than available tokens (${availableTokens})`
        );
        return;
      }
      if (value > MAX_WITHDRAWAL) {
        setTokens(MAX_WITHDRAWAL);
        setError(`Maximum withdrawal limit is ${MAX_WITHDRAWAL} tokens`);
        return;
      }
    }

    if (value < 0) {
      setTokens(0);
      setError("Tokens cannot be negative");
      return;
    }

    setTokens(value);
    setError("");
  };

  const calculatePrice = (tokenCount: number) => {
    return (tokenCount * PRICE_PER_TOKEN).toFixed(2);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          Manage Tokens
        </Button>
      </DialogTrigger>
      <DialogContent className="my-2 max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Manage Tokens</DialogTitle>
          <DialogDescription>
            Purchase new tokens or withdraw existing ones
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="purchase" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="purchase">Purchase</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>

          <TabsContent value="purchase">
            <section className="space-y-6">
              <div className="flex flex-col space-y-4">
                <div className="rounded-[16px] border-2 border-purple-200/20 bg-white p-8 shadow-xl shadow-purple-200/20">
                  <div className="flex-center flex-col gap-3">
                    <div className="space-y-4 w-full">
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="tokens" className="text-sm font-medium">
                          Number of Tokens
                        </label>
                        <Input
                          id="tokens"
                          type="text"
                          value={tokens}
                          onChange={(e) => handleTokenChange(e, "purchase")}
                          min={0}
                          max={MAX_TOKENS}
                          className="w-full"
                          placeholder="Enter number of tokens"
                        />
                        {error && (
                          <p className="text-sm text-red-500">{error}</p>
                        )}
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-n-1">
                          Total: ${calculatePrice(tokens)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <SignedIn>
                    <div className="mt-6">
                      <Checkout
                        plan="Custom"
                        amount={parseFloat(calculatePrice(tokens))}
                        credits={tokens}
                      />
                    </div>
                  </SignedIn>
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="withdraw">
            <section className="space-y-6">
              <div className="flex flex-col space-y-4">
                <div className="rounded-[16px] border-2 border-purple-200/20 bg-white p-8 shadow-xl shadow-purple-200/20">
                  <div className="flex-center flex-col gap-3">
                    <div className="space-y-4 w-full">
                      <p className="text-sm text-gray-500">
                        Available Balance: {availableTokens} tokens
                      </p>
                      <div className="flex flex-col space-y-2">
                        <label
                          htmlFor="withdraw-tokens"
                          className="text-sm font-medium"
                        >
                          Amount to Withdraw
                        </label>
                        <Input
                          id="withdraw-tokens"
                          type="text"
                          value={tokens}
                          onChange={(e) => handleTokenChange(e, "withdraw")}
                          min={0}
                          max={availableTokens}
                          className="w-full"
                          placeholder="Enter amount to withdraw"
                        />
                        {error && (
                          <p className="text-sm text-red-500">{error}</p>
                        )}
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-n-1">
                          Withdrawal Amount: ${calculatePrice(tokens)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <SignedIn>
                    <div className="mt-6">
                      <Withdrawal
                        amount={parseFloat(calculatePrice(tokens))}
                        credits={tokens}
                      />
                    </div>
                  </SignedIn>
                </div>
              </div>
            </section>
          </TabsContent>

          <div className="flex justify-between mt-6">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ManageTokensModal;
