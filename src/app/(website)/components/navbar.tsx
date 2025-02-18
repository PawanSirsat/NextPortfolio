import React from "react";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "lucide-react";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";

type Props = {};

const Navbar = async () => {
  const user = await currentUser();

  return (
    <div className="sticky top-0 backdrop-blur-sm bg-transparent text-white px-4 lg:px-8 py-4 flex items-center justify-between font-semibold font-sans z-50 border-b border-dashed border-white/20">
      {/* Logo and Menu */}
      <div className="flex items-center gap-x-3">
        <Link href="/">
          <h1 className="text-xl md:text-3xl font-semibold">NxtFolio</h1>
        </Link>
      </div>

      {/* User Profile or Login */}
      <div className="flex items-center gap-x-4">
        {user ? (
          <>
            <Link href="/profile">Dashboard</Link>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>{" "}
          </>
        ) : (
          <Link href="/auth/sign-in">
            <Button className="flex gap-x-2 text-base">
              <User fill="#000" />
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
