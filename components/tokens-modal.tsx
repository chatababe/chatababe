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
import Checkout from "./checkout";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { useRef, ComponentRef } from "react";

const PRICE_PER_TOKEN = 0.1; // $0.01 per token
const MAX_TOKENS = 2000;

const TokenModal = () => {
  const [tokens, setTokens] = useState<number>(100);
  const [error, setError] = useState<string>("");
  const closeRef = useRef<ComponentRef<"button">>(null);

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    
    if (isNaN(value)) {
      setTokens(0);
      return;
    }
    
    if (value > MAX_TOKENS) {
      setTokens(MAX_TOKENS);
      setError(`Maximum ${MAX_TOKENS} tokens allowed`);
      return;
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
        <button className="bg-transparent ml-auto text-xs text-s-1 font-medium">
          {"(Get more)"}
        </button>
      </DialogTrigger>
      <DialogContent className="my-2 max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Buy Credits</DialogTitle>
          <DialogDescription>
            Enter the number of tokens you want to purchase (max {MAX_TOKENS} tokens)
          </DialogDescription>
        </DialogHeader>
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
                      onChange={handleTokenChange}
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
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default TokenModal;