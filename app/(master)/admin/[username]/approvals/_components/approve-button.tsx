"use client";

import { toast } from "sonner";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { onApprove } from "@/actions/approve";

interface ApproveButtonProps {
  userId: string;
}

const ApproveButton = ({ userId }: ApproveButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onApprove(userId)
        .then((result) =>
          toast.success(`User ${result.username} approved`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="default"
      size="sm"
      className="text-n-5 w-[8rem]"
    >
      Approve
    </Button>
  );
};

export default ApproveButton;
