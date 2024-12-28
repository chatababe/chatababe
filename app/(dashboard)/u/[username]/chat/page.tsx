import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";

import ToggleCard from "./_components/toggle-card";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const ChatPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    return (
      <div className="min-h-[60rem] flex flex-col items-center justify-center text-center">
        <p className="text-n-1 text-xl font-semibold mb-2">
          You are not subscribed as a model.{" "}
        </p>
        <p className="text-n-4 text-sm font-medium mb-4">
          {" "}
          Create your a profile and beging your modelling journey
        </p>
        <Button
          variant="default"
          size="lg"
          onClick={()=>redirect("/model-profile")}
        >
          Become a model
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable chat"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Delay chat"
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Must be following to chat"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
};

export default ChatPage;
