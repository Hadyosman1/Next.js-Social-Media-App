import Image from "next/image";
import nextImage from "../../public/next.svg";
// icons
import { MdOutlineAutoAwesome } from "react-icons/md";
import { ImPower } from "react-icons/im";
import { IoMdImages } from "react-icons/io";
import { FaFileMedical } from "react-icons/fa6";

const HomePage = () => {
  return (
    <div className="main-props container flex flex-col items-center">
      <h1 className="text-2xl font-bold capitalize text-blue-600">
        Welcome to the home page...
      </h1>
      <div className="mt-10">
        <Image src={nextImage} alt="next" />
      </div>
      <div className="grid-4-auto mt-16 grid gap-x-8 gap-y-5 self-stretch text-xl *:transition-all">
        <div className="border border-blue-300 p-5 text-center shadow shadow-slate-400 hover:bg-slate-200">
          <h2 className="flex items-center gap-2 font-bold text-blue-500">
            <MdOutlineAutoAwesome /> Awesome Framework
          </h2>
        </div>
        <div className="border border-blue-300 p-5 text-center shadow shadow-slate-400 hover:bg-slate-200">
          <h2 className="flex items-center gap-2 font-bold text-blue-500">
            <ImPower /> Very Powerful
          </h2>
        </div>
        <div className="border border-blue-300 p-5 text-center shadow shadow-slate-400 hover:bg-slate-200">
          <h2 className="flex items-center gap-2 font-bold text-blue-500">
            <IoMdImages /> Optimize Images
          </h2>
        </div>
        <div className="border border-blue-300 p-5 text-center shadow shadow-slate-400 hover:bg-slate-200">
          <h2 className="flex items-center gap-2 font-bold text-blue-500">
            <FaFileMedical /> File Based Routing
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
