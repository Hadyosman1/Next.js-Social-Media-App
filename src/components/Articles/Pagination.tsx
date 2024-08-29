import React from "react";

const Pagination = () => {
  return (
    <div className="flex items-center justify-center gap-0.5 text-sky-500 *:rounded-sm">
      <button className="border border-slate-400 bg-slate-100 px-2 py-1 hover:bg-slate-200">
        prev
      </button>
      {Array.from({ length: 5 }).map((el, i) => (
        <button
          className="border border-slate-400 bg-slate-100 px-2 py-1 hover:bg-slate-200"
          key={i}
        >
          {i + 1}
        </button>
      ))}
      <button className="border border-slate-400 bg-slate-100 px-2 py-1 hover:bg-slate-200">
        next
      </button>
    </div>
  );
};

export default Pagination;
