import { client } from "@/lib/prisma";
import { Metadata } from "next";
import { ProfileContent } from "./components/ProfileContent";
import { NextPage } from "next";

// Define the params type explicitly for the dynamic route
interface ProfilePageParams {
  username: string;
}

// Use NextPage with the params type
export default async function ProfilePage({
  params,
}: {
  params: ProfilePageParams;
}) {
  const { username } = params; // Destructuring works fine in async function
  const initialProfileUser = await fetchUserByUsernameServer(username);

  return (
    <ProfileContent
      username={username}
      initialProfileUser={initialProfileUser}
    />
  );
}

async function fetchUserByUsernameServer(username: string) {
  try {
    const user = await client.user.findUnique({
      where: { username },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: ProfilePageParams;
}): Promise<Metadata> {
  const { username } = params;
  const profileUser = await fetchUserByUsernameServer(username);

  if (!profileUser) {
    return {
      title: "User Not Found",
      description: "This user profile could not be found.",
    };
  }

  return {
    title: `${profileUser.username}’s Profile`,
    description: profileUser.bio || "View this user’s profile on Almanac.",
    openGraph: {
      title: `${profileUser.username}’s Profile`,
      description: profileUser.bio || "View this user’s profile on Almanac.",
      url: `https://yourwebsite.com/${profileUser.username}`, // Replace with your domain
      type: "profile",
      images: [
        {
          url:
            profileUser.profilePicture ||
            "https://yourwebsite.com/default-profile-image.jpg",
          width: 800,
          height: 600,
          alt: `${profileUser.username}’s Profile Picture`,
        },
      ],
    },
  };
}
