import React from "react";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { User, Star } from "lucide-react";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Exo_2 } from "next/font/google";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["400", "700"] });

const Navbar = async () => {
  const user = await currentUser();

  return (
    <>
      <div className=" top-0 left-0 right-0 backdrop-blur-md bg-transparent text-white px-4 lg:px-8 py-2 flex items-center justify-between font-semibold z-50 border-b border-dashed border-white/20 space-bg">
        {/* Logo and Menu */}
        <div className="relative flex items-center gap-x-3 z-10">
          <Link href="/">
            <div className="flex items-center gap-2 bg-black/40 rounded-lg">
              <h1
                className={`heading bg-gradient-to-r from-[#378ce6] to-[#bd60bd] text-transparent bg-clip-text  py-1 px-3 rounded-md backdrop-blur-lg ${exo2.className} animate-pulse-subtle`}
              >
                Almanac
              </h1>
            </div>
          </Link>
        </div>

        {/* User Profile or Login */}
        <div className="relative flex items-center gap-x-4 z-10">
          {user ? (
            <>
              <Link href="/profile">Dashboard</Link>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </>
          ) : (
            <Link href="/auth/sign-in">
              <Button className="flex gap-x-2 text-base bg-white/10 hover:bg-white/20 text-white">
                <User fill="#fff" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
