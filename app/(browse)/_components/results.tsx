import { Skeleton } from "@/components/ui/skeleton";
import ResultCard, { ResultCardSkeleton } from "./result-card";
import { getStreamByTags } from "@/lib/feed-service";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type FetchFunction = (tags?: {
  type?: string;
  country?: string;
  genre?: string;
  room?: string;
  year?: string;
}) => Promise<StreamsProps[]>;

interface ResultsProps {
  tags: {
    country?: string;
    genre?: string;
    room?: string;
    year?: string;
  };
  fetchData: FetchFunction;
  page?: number;
}
const ITEMS_PER_PAGE = 6;

const Results = async ({ tags, fetchData, page = 1 }: ResultsProps) => {
  let data = await fetchData();
  const { country, genre, room, year } = tags;
  if (country || genre || room || year) {
    data = await getStreamByTags({ country, genre, room, year });
  }

  const totalCount = data.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div>
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <Logo />
          <p className="text-n-1 text-xl font-semibold">No streams found.</p>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 px-4 lg:px-8">
        {paginatedData.map((result) => (
          <ResultCard key={result.id} data={result} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <Link href={`?page=${page - 1}`}>
            <Button
              variant="outline"
              disabled={page <= 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
          </Link>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>

          <Link href={`?page=${page + 1}`}>
            <Button
              variant="outline"
              disabled={page >= totalPages}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Results;

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 mb-4 mx-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 px-8">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
