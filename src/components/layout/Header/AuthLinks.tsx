import Link from "next/link";

const linkStyle = " rounded-sm px-3 py-1.5 text-slate-100 ";

const AuthLinks = () => {
  return (
    <div className="ms-auto flex items-center justify-end gap-1.5 text-sm md:w-1/5">
      <Link
        className={`${linkStyle} bg-green-700/80 hover:bg-green-800/80`}
        href={"/login"}
      >
        Login
      </Link>
      <Link
        className={`${linkStyle} bg-blue-600 hover:bg-blue-700`}
        href={"/register"}
      >
        Register
      </Link>
    </div>
  );
};

export default AuthLinks;
