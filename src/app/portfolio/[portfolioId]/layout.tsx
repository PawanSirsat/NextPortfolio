import { onAuthenticateUser } from "@/app/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: { portfolioId: string };
  children: React.ReactNode;
};

const Layout = async ({ params: { portfolioId }, children }: Props) => {
  const auth = await onAuthenticateUser();
  if (!auth.user?.clerkUserId) redirect("/auth/sign-in");
  if (!auth.user.clerkUserId) redirect("/auth/sign-in");

  return <>{children}</>;
};

export default Layout;
