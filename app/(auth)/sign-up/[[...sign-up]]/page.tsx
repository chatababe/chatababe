import Logo from "@/components/logo";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen gap-x-44">
      <div className="flex-1">
        <SignUp/>
      </div>
      <div 
      className="flex-1 flex items-center"
      style={{
        backgroundImage:"",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover"
      }}
      >
        <Logo/>
      </div>
    </div>
  );
}
