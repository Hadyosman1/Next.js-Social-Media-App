import GoToHomePage from "@/components/shared/GoToHomePage";
import React from "react";

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
