"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();
  const pathname = usePathname(); 

  const handleButtonClick = () => {
    if (pathname === "/") {
      window.location.reload();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center">
      <h1 className="text-4xl text-s-1 font-semibold">404</h1>
      <p className="font-medium text-xl text-n-1">Something went wrong</p>
      <Button
        variant="default"
        size="lg"
        className="bg-primary-2"
        onClick={handleButtonClick}
      >
        <p className="text-n-5 font-medium">Go back home</p>
      </Button>
    </div>
  );
};

export default ErrorPage;
