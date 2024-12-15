import { Check } from "lucide-react";

const VerifiedMark = () => {
  return (
    <div className="p-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-primary-2">
      <Check className="h-[10px] w-[10px] text-primary-1 stroke-[6px]" />
    </div>
  );
};

export default VerifiedMark;
