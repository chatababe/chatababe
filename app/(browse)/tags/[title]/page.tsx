import { Suspense } from "react";

import { streamBasedRoutes } from "@/constants";
import { getStreamsByStreamCategory, getStreamsByUserCategory } from "@/lib/feed-service";
import Results, { ResultsSkeleton } from "../../_components/results";

interface ParamsProps {
  params: Promise<{
    title: string;
    type?: string;
    year?: string;
    room?: string;
    genre?: string;
    country?: string;
  }>;
}

const TagsPage = async ({ params }: ParamsProps) => {
  const { title,type,year,room,genre,country } = await params;
  const decodedTitle = decodeURI(title);
  let fn = getStreamsByUserCategory;
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

  if (streamBasedRoutes.includes(decodedTitle)) {
    fn = getStreamsByStreamCategory;
  }

  return (
    <div className="h-full">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results tags={{year,room,genre,country}} fetchData={()=>fn(decodedTitle,gender)}/>
      </Suspense>
    </div>
  );
};

export default TagsPage;
