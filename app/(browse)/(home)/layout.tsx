import Footer from "@/components/footer";
import Header from "@/components/navbar";
import React from "react";
import FilterSections from "./_components/filters-sidebar";
import Container from "./_components/container";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="flex relative">
        <Container>{children}</Container>
        <FilterSections/>
      </div>
      <Footer />
    </div>
  );
};

export default BrowseLayout;
