import { Skeleton } from "@/components/ui/skeleton";
import ResultCard, { ResultCardSkeleton } from "./result-card";
import { getStreamByTags} from "@/lib/feed-service";
import Logo from "@/components/logo";

type FetchFunction = (tags?: {
  type?:string,
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
}
const Results = async ({tags,fetchData }: ResultsProps) => {
  let data = await fetchData();
  const {country,genre,room,year} = tags
  if(country || genre || room || year){
    data = await getStreamByTags({country, genre, room, year});
  }

  return (
    <div className="min-h-screen">
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <Logo />
          <p className="text-n-1 text-xl font-semibold">No streams found.</p>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 px-4 lg:px-8">
        {data.map((result) => (
          <ResultCard key={result.id} data={result} />
        ))}
      </div>
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
