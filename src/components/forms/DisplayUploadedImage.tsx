import Image from "next/image";

const DisplayUploadedImage = ({ image }: { image: File | null }) => {
  if (!image) return null;

  return (
    <div className="my-2">
      <Image
        src={URL.createObjectURL(image)}
        alt={image.name}
        width={800}
        height={600}
        className="h-auto max-h-[600px] w-full rounded bg-slate-100/50 object-contain"
      />
    </div>
  );
};

export default DisplayUploadedImage;
