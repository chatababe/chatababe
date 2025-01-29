"use client";

import { Button } from "../ui/button";
import TipModal from "./tips-modal";

const TokensCard = () => {
  return (
    <>
      <div className="my-4">
        <div className="max-w-[16rem] p-2 my-4 mx-auto">
          <div className="bg-blue-100/40 flex items-center gap-x-4">
            <p className="text-sm text-primary-2 font-medium">
              Tips recieved/goal
            </p>
            <p className="text-sm text-n-1 font-medium">600/1000</p>
          </div>
          <div className="bg-blue-100 flex items-center gap-x-4">
            <p className="text-sm text-primary-2 font-medium">Highest tip</p>
            <p className="text-sm text-n-1 font-medium">name</p>
          </div>
          <div className="bg-blue-100/40 flex items-center gap-x-4">
            <p className="text-sm text-primary-2 font-medium">
              Last Tip recieved
            </p>
            <p className="text-sm text-n-1 font-medium">another name</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-8 px-4">
          <Button variant="orange" size="sm">
            Join fan club
          </Button>
          <Button variant="green" size="sm">
            Upgrade to supporter
          </Button>
        </div>
      </div>
      <div className="w-full border-t border-[#D9D9D9] p-2 mt-8">
        <div className="w-full flex items-center justify-between py-2 mb-2">
          <div className="flex gap-x-1">
            <p className="font-semibold text-sm text-n-2 mr-2">You have:</p>
            <span className="font-semibold text-sm text-n-1">0 tokens</span>
          </div>
          <Button variant="link">
            <span className="text-primary-2 text-xs">Buy more tokens</span>
          </Button>
        </div>
        <div className="flex-1 flex items-center justify-center">
            <TipModal/>
        </div>
      </div>
    </>
  );
};

export default TokensCard;
