import Results from "./_components/results";
import { CategoryProvider } from "./_components/category-provider";
import ResultsWrapper from "./_components/Results-wrapper";

export default function RootPage() {
  return (
    <div className="h-full">
      <CategoryProvider>
        <ResultsWrapper>
          <Results />
        </ResultsWrapper>
      </CategoryProvider>
    </div>
  );
}
