import { onAuthenticateUser } from "@/app/actions/user";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "../(website)/components/navbar";
import Footer from "@/components/layout/footer";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const auth = await onAuthenticateUser();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-20 px-6 sm:px-12">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
