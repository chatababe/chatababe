import Logo from "@/components/logo";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen gap-x-44">
      <div className="flex-1">
        <SignIn />
      </div>
      <div className="flex-1 flex items-center">
        <Logo/>
      </div>
    </div>
  );
}
