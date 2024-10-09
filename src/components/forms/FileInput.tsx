import { FcAddImage } from "react-icons/fc";

type TProps = {
  setter: React.Dispatch<React.SetStateAction<File | null>>;
  label: string;
  fileName: string | undefined;
};

const FileInput = ({ setter, label, fileName }: TProps) => {
  return (
    <>
      <label className="mb-1 self-start text-slate-700" htmlFor={"file"}>
        {label}
      </label>
      <div className="relative flex h-10 cursor-pointer items-center border-b-2 border-sky-500 bg-slate-50 transition hover:bg-slate-100">
        <span className="mx-3 flex w-full items-center gap-2 text-3xl">
          <FcAddImage />
          <span className="text-lg font-medium text-sky-500 shrink-0">Upload image</span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm ">
            {fileName}
          </span>
        </span>
        <input
          id="file"
          type="file"
          accept="image/*"
          className="absolute inset-0 z-10 min-w-full max-w-xs cursor-pointer opacity-0 file:cursor-pointer "
          onChange={(e) => {
            const file = e.target.files?.[0];
            // eslint-disable-next-line no-unused-vars
            setter((_) => file ?? null);
          }}
        />
      </div>
    </>
  );
};

export default FileInput;
