import Home from "@/components/home/Home";
import { Metadata } from "next";

const HomePage = () => {
  return <Home />;
};

export default HomePage;

export const metadata: Metadata = {
  title: "Home | DEVO",
  description: "Social Media App Home Page.",
};
