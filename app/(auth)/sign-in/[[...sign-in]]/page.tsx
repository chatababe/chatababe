import Logo from "@/components/logo";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex gap-x-44 max-md:flex-col-reverse max-md:items-center max-md:justify-center max-md:gap-x-0 max-md:gap-4">
      <div className="flex-1">
        <SignIn />
      </div>
      <div className="flex-1 flex items-center">
        <Logo/>
      </div>
    </div>
  );
}
