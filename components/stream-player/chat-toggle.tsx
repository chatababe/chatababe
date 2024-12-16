"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";

const ChatToggle = ({text}:{text?:string}) => {
  const { collapsed, onExpand, onCollapse } = useChatSidebar((state) => state);
  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;
  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };
  const label = collapsed ? "Expand" : "Collapse";

  return (
    <Hint label={label} side="left" asChild>
      <Button onClick={onToggle} variant={!!text ? "default" :"ghost"} className="h-auto p-2">
        <Icon className={cn("h-4 w-4",collapsed && "mr-2")} />
        {text}
      </Button>
    </Hint>
  );
};

export default ChatToggle;
