import { Suspense } from "react";

import Results, { ResultsSkeleton } from "./_components/results";
import { streamBasedRoutes } from "@/constants";

interface ParamsProps {
    params: Promise<{
        title: string;
      }>;
}

const TagsPage = async({params}:ParamsProps) => {
    const {title} = await params;
    const decodedTitle = decodeURI(title);
    let type = "";

    if(streamBasedRoutes.includes(decodedTitle)){
      type= "stream"
    } else type = "user"
    
    return (
    <div className="h-full">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results type={type} title={decodedTitle}/>
      </Suspense>
    </div>
  );
}

export default TagsPage