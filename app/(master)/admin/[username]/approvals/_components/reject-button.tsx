"use client";

import { toast } from "sonner";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { onReject } from "@/actions/approve";

interface RejectButtonProps {
  userId: string;
}

const RejectButton = ({ userId }: RejectButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onReject(userId)
        .then((result) =>
          toast.success(`User ${result.username} rejected.`)
        )
        .catch((error) =>{
          console.log(error);
          toast.error("Something went wrong");
        });
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="destructive"
      size="sm"
      className="text-n-5  w-[8rem]"
    >
      Reject
    </Button>
  );
};

export default RejectButton;
