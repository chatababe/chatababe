import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="text-center space-y-4 bg-white shadow-xl rounded-xl p-8 transform transition-all duration-300 hover:scale-105">
        <Loader2 
          className="mx-auto animate-spin text-primary-2" 
          size={64} 
          strokeWidth={2} 
        />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-n-2 tracking-tight">
            Loading
          </h2>
          <p className="text-n-3 text-sm animate-pulse">
            Please wait while we prepare everything...
          </p>
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          <div className="w-2 h-2 bg-primary-3 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary-3 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-primary-3 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;