import Footer from "@/components/footer";
import Header from "@/components/navbar";
import React from "react";
import FilterSections from "./_components/filters-sidebar";
import Container from "./_components/container";
import Categorybar from "@/components/navbar/category-bar";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
      <Header />
      <Categorybar/>
      </div>
      <div className="flex relative">
        <Container>{children}</Container>
        <FilterSections/>
      </div>
      <Footer />
    </div>
  );
};

export default BrowseLayout;
