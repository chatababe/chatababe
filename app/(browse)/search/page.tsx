import { Suspense } from "react";
import { redirect } from "next/navigation";

import Results, { ResultsSkeleton } from "./_components/results";
import Header from "@/components/navbar";
import Footer from "@/components/footer";

interface SearchPageProps {
  searchParams: {
    term?: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  if (!searchParams.term) {
    redirect("/");
  }

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Header />
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={searchParams.term} />
      </Suspense>
      <Footer />
    </div>
  );
};

export default SearchPage;
