import React from "react";
import LandingPageNavBar from "./components/navbar";
import Navbar from "./components/navbar";
import Footer from "@/components/layout/footer";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-8 px-6 sm:px-12">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
