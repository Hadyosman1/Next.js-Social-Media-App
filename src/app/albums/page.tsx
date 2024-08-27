import Link from "next/link";
import React from "react";

type TAlbum = {
  id: number;
  userId: number;
  title: string;
};

const Albums = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/albums");

  if (!res.ok) throw new Error("Failed to fetch albums..!");
  const albums: TAlbum[] = await res.json();

  return (
    <div className="main-props albums container gap-3">
      {albums.map((album) => (
        <div
          className="grid content-between justify-center justify-items-center gap-2 rounded border border-slate-500 p-4 text-center shadow-md"
          key={album.id}
        >
          <p>{album.title}</p>
          <Link
            className="rounded bg-blue-400 px-6 py-1 text-white hover:bg-blue-500"
            href={`/albums/${album.id}`}
          >
            See album...
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Albums;
