import Footer from "@/components/footer";
import Header from "@/components/navbar";
import React from "react";

const SupportLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default SupportLayout;
