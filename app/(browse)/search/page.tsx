import { Suspense } from "react";
import { redirect } from "next/navigation";

import Results, { ResultsSkeleton } from "./_components/results";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import Categorybar from "@/components/navbar/category-bar";

interface SearchPageProps {
  searchParams: Promise<{ term?: string }>;
}

const SearchPage = async({ searchParams }: SearchPageProps) => {
  const resolvedSearchParams = await searchParams;
  if (!resolvedSearchParams.term) {
    redirect("/");
  }

  return (
    <div className="h-full max-w-screen-2xl">
      <Header />
      <Categorybar/>
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={resolvedSearchParams.term} />
      </Suspense>
      <Footer />
    </div>
  );
};

export default SearchPage;
