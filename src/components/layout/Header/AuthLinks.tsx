import Link from "next/link";

const linkStyle = " rounded-sm px-3 py-1.5 text-slate-100 ";

const AuthLinks = () => {
  return (
    <div className="flex items-center gap-3 ms-auto">
      <Link
        className={`${linkStyle} bg-green-700 hover:bg-green-800`}
        href={"/login"}
      >
        Login
      </Link>
      <Link
        className={`${linkStyle} bg-orange-700 hover:bg-orange-800`}
        href={"/register"}
      >
        Register
      </Link>
    </div>
  );
};

export default AuthLinks;
