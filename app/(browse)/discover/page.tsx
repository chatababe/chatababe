import { Suspense } from "react";

import Results, { ResultsSkeleton } from "../_components/results";

export default async function RootPage(params:AsyncPageProps) {
  const {searchParams} = await params;
  return (
    <div className="h-full">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results tags={searchParams}/>
      </Suspense>
    </div>
  );
}
