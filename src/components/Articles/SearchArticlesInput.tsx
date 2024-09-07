"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { IoMdSearch } from "react-icons/io";
import { toast } from "react-toastify";

const SearchArticlesInput = () => {
  const [searchInput, setSearchInput] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput) {
      return toast.error("You must enter at least 1 digit...!");
    }
    console.log(searchInput);

    router.push(`/articles/search?searchKey=${searchInput}`);
  };

  return (
    <form
      className={`search_input_wrapper flex w-full max-w-xl justify-self-center rounded bg-white outline outline-2 outline-blue-400`}
      onSubmit={handleSubmit}
    >
      <input
        className="flex-shrink flex-grow bg-transparent py-2 ps-2 outline-none valid:bg-transparent"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Enter keywords here"
        type="search"
        name="search"
      />

      <button
        type="submit"
        className="border-s-2 border-blue-400 bg-slate-100 px-2 text-2xl text-sky-500 hover:bg-slate-200 focus:bg-slate-200 focus:outline-none"
      >
        <IoMdSearch />
      </button>
    </form>
  );
};

export default SearchArticlesInput;
