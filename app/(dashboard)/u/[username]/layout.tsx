import { redirect } from "next/navigation";

import { getSelfByUsername } from "@/lib/auth-service";

import Sidebar from "./_components/sidebar";
import Container from "./_components/container";
import Header from "@/components/navbar";
import Footer from "@/components/footer";

interface CreatorLayoutProps {
  params: Promise<{
    username: string;
  }>;
  children: React.ReactNode;
}
const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
  const { username } = await params; 
  const self = await getSelfByUsername(username);

  if (!self) {
    redirect("/");
  }

  return (
    <>
      <Header/>
      <div className="flex relative">
        <Sidebar />
        <Container>{children}</Container>
      </div>
      <Footer/>
    </>
  );
};

export default CreatorLayout;
