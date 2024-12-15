"use client";

import { ReceivedChatMessage } from "@livekit/components-react";

import { stringToColor } from "@/lib/utils";

interface ChatMessageProps {
  data: ReceivedChatMessage;
}

const ChatMessage = ({ data }: ChatMessageProps) => {
  const color = stringToColor(data.from?.name || "");

  const timeFormatter = new Intl.DateTimeFormat("default", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedTime = timeFormatter.format(new Date(data.timestamp));

  return (
    <div className="flex flex-col gap-1 p-2 rounded-md hover:cursor-pointer">
      <div className="flex flex-wrap items-baseline gap-1 grow">
        <p className="text-sm font-semibold whitespace-nowrap">
          <span
            className="truncate"
            style={{ color: color }}
          >
            {data.from?.name}
          </span>
          :
        </p>
        <p className="text-sm break-all">{data.message}</p>
      </div>
      <p className="text-[10px] text-n-3 lowercase">{formattedTime}</p>
    </div>
  );
};

export default ChatMessage;
