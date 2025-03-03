// components/ProfileContent.tsx
"use client";

import React, { useMemo } from "react";
import {
  useCurrentUser,
  fetchUserByUsername,
} from "@/app/actions/query/queries";
import { Spinner } from "@/components/global/loader/spinner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { OwnerProfile } from "./OwnerProfile";
import { VisitorProfile } from "./VisitorProfile";

interface ProfileContentProps {
  username: string;
  initialProfileUser: any;
}

export const ProfileContent = ({
  username,
  initialProfileUser,
}: ProfileContentProps) => {
  const {
    data: currentUserData,
    isLoading: currentUserLoading,
    error: currentUserError,
  } = useCurrentUser();
  const {
    data: profileUserData,
    isLoading: profileLoading,
    error: profileError,
  } = fetchUserByUsername(username);

  const profileUser = profileUserData || initialProfileUser;

  // Memoize currentUserData.user with a stable dependency
  const memoizedCurrentUser = useMemo(() => {
    console.log("Memoizing currentUserData:", currentUserData?.user);
    return currentUserData?.user;
  }, [currentUserData?.user?.clerkUserId]); // Only change if clerkUserId changes

  if (currentUserLoading || profileLoading) {
    return (
      <div className="flex justify-center items-top h-screen">
        <Spinner color="#292828" />
      </div>
    );
  }

  if (currentUserError || profileError || !profileUser) {
    return (
      <div className="bg-[#1a1a1a] text-gray-200 animate-pulse p-4">
        <Skeleton
          height={256}
          baseColor="#2d2d2d"
          highlightColor="#3d3d3d"
          className="rounded-t-lg"
        />
        <div className="p-6">
          <Skeleton
            height={32}
            width="60%"
            baseColor="#2d2d2d"
            highlightColor="#3d3d3d"
            className="mb-2"
          />
          <Skeleton
            height={24}
            width="80%"
            baseColor="#2d2d2d"
            highlightColor="#3d3d3d"
          />
          <div className="flex flex-wrap gap-2 my-4">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  width={60}
                  height={24}
                  baseColor="#2d2d2d"
                  highlightColor="#3d3d3d"
                />
              ))}
          </div>
        </div>
      </div>
    );
  }

  const isOwner =
    currentUserData?.user?.clerkUserId === profileUser.clerkUserId;

  return isOwner ? (
    <OwnerProfile userData={memoizedCurrentUser} />
  ) : (
    <VisitorProfile profileUser={profileUser} />
  );
};
