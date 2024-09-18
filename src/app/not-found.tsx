import GoToHomePage from "@/components/shared/GoToHomePage";
import { Metadata } from "next";

const NotFound = () => {
  return (
    <div className="main-props container grid place-content-center place-items-center gap-3 py-12">
      <div className="text-center text-xl">
        <h1> 404 | Page Not Found</h1>
      </div>
      <GoToHomePage />
    </div>
  );
};

export default NotFound;

export const metadata: Metadata = {
  title: "Not Found Page",
  description: "Not Found page",
};
