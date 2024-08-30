"use client";

import GoToHomePage from "@/components/shared/GoToHomePage";

type TErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: TErrorProps) => {
  return (
    <div className="main-props container grid py-12 place-content-center place-items-center gap-3">
      <div className="text-center text-xl">
        <h1> 400 | Bad Request </h1>
        <p>{error.message}</p>
      </div>

      <button
        onClick={() => reset()}
        className="rounded-md bg-blue-700 px-6 py-1 text-center text-white hover:bg-blue-800"
      >
        Try again
      </button>
      <GoToHomePage />
    </div>
  );
};

export default Error;