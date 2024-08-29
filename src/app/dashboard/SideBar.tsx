import Link from "next/link";

const SideBar = () => {
  return (
    <div className="flex flex-col bg-gray-200 p-3 md:w-60">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="my-5 flex flex-grow flex-col bg-red-900 text-white">
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>Home</Link>
      </div>
    </div>
  );
};

export default SideBar;
