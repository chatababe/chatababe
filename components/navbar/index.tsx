import Topbar from "./Topbar";
import Navbar from "./Navbar";
import Categorybar from "./category-bar";
import { currentUser } from "@clerk/nextjs/server";

const Header = async () => {
  const user = await currentUser();
  const data = {
    userName:user?.username || "Anonymous",
    tokens: 10, 
  }
  return (
    <header className="w-full bg-white z-50 mb-2">
      <Topbar user={data}/>
      <Navbar/>
      <Categorybar />
    </header>
  );
};

export default Header;
