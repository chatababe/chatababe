import Link from "next/link";
import { navigation } from "@/constants";
import { cn } from "@/lib/utils";
import StreamModal from "../stream-modal";
import { Button } from "../ui/button";
import { AppWindowIcon } from "lucide-react";
import { SignUpButton} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <div className="bg-primary-2 max-lg:hidden">
      <div className="flex gap-4 justify-between items-center py-4 max-h-[3rem]">
        <nav className="px-12 flex items-center gap-8 overflow-hidden">
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className={cn(
                "text-n-5 text-xs font-medium font-poppins uppercase hover:underline",
                item.isMobileOnly ? "hidden" : "block"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="h-[3rem] relative flex items-center text-n-5">
          <div className="mr-3">
            <StreamModal />
          </div>
          {!!user ? (
            <div className="flex items-center gap-x-4">
              <Button
                size="sm"
                variant="ghost"
                className="text-n-5/90 hover:text-n-5"
                asChild
              >
                <Link href={`/u/${user.username}`}>
                  <AppWindowIcon className="h-5 w-5 lg:mr-2" />
                  <span className="hidden lg:block uppercase">Dashboard</span>
                </Link>
              </Button>
            </div>
          ) : (
            <SignUpButton>
              <div className="h-full px-4 bg-s-2 rounded-md flex flex-col items-center justify-center">
                <Link
                  href="/"
                  className="text-center text-white-100 text-sm font-poppins uppercase hover:underline px-5"
                >
                  sign up
                </Link>
              </div>
            </SignUpButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
