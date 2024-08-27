import Link from "next/link";

const GoToHomePage = () => {
  return (
    <Link
      className="rounded-md bg-blue-700 px-6 py-1 text-center text-white hover:bg-blue-800"
      href="/"
    >
      Go To Home
    </Link>
  );
};

export default GoToHomePage;
