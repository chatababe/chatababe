import { Loader } from "lucide-react";

interface LoadingVideoProps {
  label: string;
}

const LoadingVideo = ({ label }: LoadingVideoProps) => {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <Loader className="h-10 w-10 text-n-2 animate-spin" />
      <p className="text-n-3 capitalize">{label}</p>
    </div>
  );
};

export default LoadingVideo;
