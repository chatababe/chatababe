import Link from "next/link";

const NotFoundPage = () => {
  
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-n-5">
      <h1 className="text-4xl text-s-1">404</h1>
      <p className="text-2xl text-s-1">We couldn&apos;t find the page you were looking for.</p>
      <button
      className="px-4 py-2 bg-primary-2 text-n-5 font-semibold text-base rounded-lg"
      >
        <Link href="/">Go back home</Link>
      </button>
    </div>
  );
};

export default NotFoundPage;
