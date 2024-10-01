"use client";
import getTimeAgo from "@/utils/getTimeAgo";
import React, { useEffect, useState } from "react";

interface IProps {
  createdAt: Date;
  updatedAt: Date;
}

const CreatedAtAndUpdatedAt = ({ createdAt, updatedAt }: IProps) => {
  const [count, setCount] = useState(0);
  const timeAgo = getTimeAgo(createdAt);
  const updatedAgo = getTimeAgo(updatedAt);
  const isUpdatedAtDisplay = !(createdAt === updatedAt);

  useEffect(() => {
    // Every 10 minutes update 
    const timeOut = setTimeout(
      () => {
        setCount(count + 1);
      },
      1000 * 60 * 10,
    );

    return () => {
      clearTimeout(timeOut);
    };
  });

  return (
    <>
      <span className="text-sm font-normal text-slate-500">{timeAgo}</span>
      {isUpdatedAtDisplay && (
        <span className="text-sm font-normal text-slate-500">
          updated at {updatedAgo}
        </span>
      )}
    </>
  );
};

export default CreatedAtAndUpdatedAt;
