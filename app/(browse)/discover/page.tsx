import { Suspense } from "react";

import Results, { ResultsSkeleton } from "../_components/results";
import { getRandomStreams } from "@/lib/feed-service";

export default async function DiscoverPage({ searchParams }: PageProps) {
  const {type,year,room,genre,country} = await searchParams;
  let gender = ""
  
  if(type === "men"){
    gender = "male"
  }else if(type === "women"){
    gender = "female"
  }else if(type === "couple"){
    gender = "others"
  }else if(type === "trans"){
    gender = "trans"
  }
  return (
    <div className="h-full">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results tags={{year,room,genre,country}} fetchData={()=>getRandomStreams(gender)}/>
      </Suspense>
    </div>
  );
}
