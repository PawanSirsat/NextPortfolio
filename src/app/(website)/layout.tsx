import React from "react";
import Navbar from "./components/navbar";
import Footer from "@/components/layout/footer";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-8 px-6 sm:px-12 pt-24">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
