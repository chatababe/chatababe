import { Suspense } from "react";

import Results, { ResultsSkeleton } from "./results";
import { useCategoryNavbar } from "@/store/use-category-navbar";

const ResultsWrapper = () => {
  const {selectedCategory} = useCategoryNavbar();
  
  return (
    <div className="max-w-screen-2xl">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results category={selectedCategory} />
      </Suspense>
    </div>
  );
}

export default ResultsWrapper;
