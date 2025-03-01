import React from "react";
import Navbar from "./components/navbar";
import Footer from "@/components/layout/footer";
import BottomNavbar from "@/components/layout/BottomNavbar";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const isProfilePage = false;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 py-8 px-6 sm:px-12 pt-28">{children}</div>
      <Footer />
      {!isProfilePage && <BottomNavbar />}{" "}
    </div>
  );
};

export default Layout;
