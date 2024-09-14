"use client";
import { useRouter } from "next/navigation";

import { IoMdBackspace } from "react-icons/io";

const BackBtn = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center justify-center gap-1 rounded bg-slate-500 px-3 py-0.5 text-white hover:bg-slate-600"
    >
      <IoMdBackspace /> Back
    </button>
  );
};

export default BackBtn;
