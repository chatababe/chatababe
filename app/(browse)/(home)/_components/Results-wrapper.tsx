import React, { Suspense } from 'react';
import { ResultsSkeleton } from './results';

type ResultsWrapperProps = {
  category?: string;
  children: React.ReactNode;
}


const ResultsWrapper = ({ category, children }: ResultsWrapperProps) => {
  return (
    <Suspense fallback={<ResultsSkeleton />}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ category?: string }>, { 
            category 
          });
        }
        return child;
      })}
    </Suspense>
  );
};

export default ResultsWrapper;