"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useState } from "react";


const ChatToggle= () => {

  const [collapsed, setCollapsed] = useState(false)
  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => {
    setCollapsed((prev) => !prev); // Toggle the collapsed state
  };

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <Hint
      label={label}
      side="left"
      asChild
    >
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};

export default ChatToggle;
