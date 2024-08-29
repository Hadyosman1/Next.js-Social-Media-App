import Image from "next/image";

type TProps = {
  params: {
    albumId: number;
  };
};

type TPhoto = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const Album = async ({ params }: TProps) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/photos?albumId=${params.albumId}`,
  );

  if (!res.ok) throw new Error("Failed to fetch album..!");

  const album: TPhoto[] = await res.json();

  const photosList = album.map((photo) => (
    <div
      className="flex flex-col justify-between rounded border border-sky-400"
      key={photo.id}
    >
      <p className="p-4 text-center">{photo.title}</p>
      <Image
        src={photo.thumbnailUrl}
        alt={photo.title}
        width={500}
        height={500}
        layout="responsive"
        objectFit="cover"
      />
    </div>
  ));

  return (
    <div className="main-props grid-col-1 container grid gap-5 py-12 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
      {photosList}
    </div>
  );
};

export default Album;
