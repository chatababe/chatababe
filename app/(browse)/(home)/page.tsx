import { Suspense } from "react";

import Results, { ResultsSkeleton } from "./_components/results";

export default function RootPage() {
  return (
    <div className="max-w-screen-2xl">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
