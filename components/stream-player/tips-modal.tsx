/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useTransition, useRef, ComponentRef } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const TipModal = () => {
  const closeRef = useRef<ComponentRef<"button">>(null);

  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(0);

  //work on submiit functionality
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="ml-auto">
          Send a tip
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send a tip</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="mb-2 space-y-2">
            <Label>Tip amount</Label>
            <Input
              type="text"
              placeholder="Enter tip amount"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value || "0"))}
              className="resize-none bg-n-4/20 ring-offset-n-5 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <Textarea
            placeholder="Leave a message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            disabled={isPending}
            className="resize-none bg-n-4/20 ring-offset-n-5 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit" variant="default">
              Send
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TipModal;
