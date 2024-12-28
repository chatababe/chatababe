import Topbar from "./Topbar";
import Navbar from "./Navbar";
import { currentUser } from "@clerk/nextjs/server";
import { getUserByUsername } from "@/lib/user-service";

const Header = async () => {
  const self = await currentUser();
  
  if (!self) {
    return (
      <header className="w-full bg-white z-50 mb-2">
        <Topbar stream={null} username="Anonymous" currentTokens={0} />
        <Navbar />
      </header>
    );
  }

  const username = self.username ?? "Anonymous";
  const user = await getUserByUsername(username);

  return (
    <header className="w-full bg-white z-50 mb-2">
      <Topbar stream={user?.stream} username={user?.username || "Anonymous"} currentTokens={user?.currentTokens || 0} />
      <Navbar />
    </header>
  );
};

export default Header;
