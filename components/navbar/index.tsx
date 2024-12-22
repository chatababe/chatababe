import Topbar from "./Topbar";
import Navbar from "./Navbar";
import Categorybar from "./category-bar";
import { currentUser } from "@clerk/nextjs/server";
import { getUserByUsername } from "@/lib/user-service";

const Header = async () => {
  const self = await currentUser();
  
  if (!self) {
    return (
      <header className="w-full bg-white z-50 mb-2">
        <Topbar username="Anonymous" currentTokens={0} />
        <Navbar />
        <Categorybar />
      </header>
    );
  }

  const username = self.username ?? "Anonymous";
  const user = await getUserByUsername(username);

  return (
    <header className="w-full bg-white z-50 mb-2">
      <Topbar username={user?.username || "Anonymous"} currentTokens={user?.currentTokens || 0} />
      <Navbar />
    </header>
  );
};

export default Header;
