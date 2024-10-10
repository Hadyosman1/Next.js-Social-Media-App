import { Metadata } from "next";
import Link from "next/link";

import { BsArrowRight } from "react-icons/bs";

const HomePage = () => {
  return (
    <div className="relative isolate px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3c76b8] to-[#3170e6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Next.js Social Media App
          </h1>

          <p className="mt-6 text-xl font-semibold leading-8 text-gray-600">
            My First project with Next.js
          </p>

          <Link
            className="group mt-5 inline-flex items-center gap-2 rounded bg-blue-500 px-5 py-1.5 text-white hover:bg-blue-600 hover:underline"
            href={"/articles?page=1&limit=10"}
          >
            Explore Articles{" "}
            <BsArrowRight className="transition-all group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

export const metadata: Metadata = {
  title: "Home | DEVO",
  description: "Social Media App Home Page.",
};
