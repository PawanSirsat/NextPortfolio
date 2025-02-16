import { onAuthenticateUser } from "@/app/actions/user";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "../(website)/components/navbar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const auth = await onAuthenticateUser();
  if (!auth.user?.clerkUserId) redirect("/auth/sign-in");
  if (!auth.user.clerkUserId) redirect("/auth/sign-in");

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-8 px-6 sm:px-12">{children}</div>
    </div>
  );
};

export default Layout;
