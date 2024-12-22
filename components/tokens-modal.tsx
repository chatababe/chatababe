"use client";
import Image from "next/image";

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
import { plans } from "@/constants";
import Checkout from "./checkout";
import { Button } from "./ui/button";
import { useRef, ComponentRef } from "react";
const TokenModal = () => {
  const closeRef = useRef<ComponentRef<"button">>(null);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-transparent ml-auto text-xs text-s-1 font-medium">
          {"(Get more)"}
        </button>
      </DialogTrigger>
      <DialogContent className="my-2 max-h-[80vh] overflow-y-scroll hidden-scrollbar">
        <DialogHeader>
          <DialogTitle>Buy Credits </DialogTitle>
          <DialogDescription>
            Choose a credit package that suits your needs!
          </DialogDescription>
        </DialogHeader>
        <section>
          <ul className="mt-2 grid grid-cols-1 gap-5">
            {plans.map((plan) => (
              <li
                key={plan._id}
                className=" w-full rounded-[16px] border-2 border-purple-200/20 bg-white p-8 shadow-xl shadow-purple-200/20 space-y-4 lg:max-w-none"
              >
                <div className="flex-center flex-col gap-3">
                  <Image src={plan.icon} alt="check" width={50} height={50} />
                  <p className="text-lg font-semibold mt-2 text-primary-2">
                    {plan.name}
                  </p>
                  <p className="text-lg font-semibold text-n-1">
                    ${plan.price}
                  </p>
                  <p className="text-base text-n-1/80 font-medium">
                    {plan.credits} Credits
                  </p>
                </div>
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                  />
                </SignedIn>
              </li>
            ))}
          </ul>
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
