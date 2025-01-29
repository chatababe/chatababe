"use client";

import { Suspense } from "react";
import ResultCard from "@/app/(browse)/_components/result-card";
import { MoreSkeleton } from "./more-skeleton";

interface MoreCardProps {
  data: StreamsProps[];
  error?: string;
  loading: boolean;
}

export default function MoreCard({ data, error, loading }: MoreCardProps) {
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <div className="min-h-[40vh] rounded-xl bg-n-5 p-4 lg:p-6 flex flex-col items-center justify-center gap-y-3 border border-n-4/20">
          <p className="text-n-2 font-medium text-sm text-center lg:text-lg">
            There are no similar streams.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-n-5 p-2 lg:p-4 border border-n-4/20">
        <Suspense fallback={<MoreSkeleton />}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {data.map((result) => (
              <ResultCard key={result.id} data={result} />
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
