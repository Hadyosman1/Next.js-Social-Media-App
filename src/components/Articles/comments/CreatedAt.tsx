import React, { useEffect, useState } from "react";
import getTimeAgo from "@/utils/getTimeAgo";

const CreatedAt = ({ createdAt }: { createdAt: Date }) => {
  const [count, setCount] = useState(0);
  const commentCreatedAt = getTimeAgo(createdAt);

  useEffect(() => {
    const timeOut = setTimeout(
      () => {
        setCount((prev) => prev + 1);
      },
      1000 * 60 * 10,
    );

    return () => {
      clearTimeout(timeOut);
    };
  }, [count]);

  return (
    <span className="rounded bg-slate-200 p-1 text-sm text-slate-700">
      {commentCreatedAt}
    </span>
  );
};

export default CreatedAt;
