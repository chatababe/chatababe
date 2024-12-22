import { Suspense } from "react";

import Results, { ResultsSkeleton } from "./results";

export default function ResultsWrapper() {
  return (
    <div className="max-w-screen-2xl">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results/>
      </Suspense>
    </div>
  );
}
