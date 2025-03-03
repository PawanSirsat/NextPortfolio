import { client } from "@/lib/prisma";
import { Metadata, NextPage, ResolvingMetadata } from "next";
import { ProfileContent } from "./components/ProfileContent";
import { Params } from "next/dist/server/request/params";

// Async page component with NextPage typing
const ProfilePage: NextPage<{ params: Params }> = async ({ params }) => {
  const { username } = params as { username: string };
  const initialProfileUser = await fetchUserByUsernameServer(username);

  return <ProfileContent username={username} />;
};

export default ProfilePage;

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

// Dynamic metadata generation
export async function generateMetadata(
  { params }: { params: Params },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { username } = params as { username: string };
  const profileUser = await fetchUserByUsernameServer(username);

  // Define a base URL for metadata (replace with your actual domain)
  const metadataBase = new URL("https://yourwebsite.com");

  // Access parent metadata (e.g., for inheriting Open Graph images)
  const previousImages = (await parent).openGraph?.images || [];

  if (!profileUser) {
    return {
      title: "User Not Found",
      description: "This user profile could not be found.",
      metadataBase,
      openGraph: {
        title: "User Not Found",
        description: "This user profile could not be found.",
        url: `/not-found`,
        images: previousImages, // Inherit from parent if available
      },
    };
  }

  const profileTitle = `${profileUser.username}’s Profile`;
  const profileDescription =
    profileUser.bio || "View this user’s profile on Almanac.";

  return {
    title: profileTitle,
    description: profileDescription,
    metadataBase, // Sets the base URL for all relative paths
    alternates: {
      canonical: `/${profileUser.username}`, // Relative path, resolved with metadataBase
    },
    openGraph: {
      title: profileTitle,
      description: profileDescription,
      url: `/${profileUser.username}`, // Relative path
      type: "profile",
      images: [
        {
          url: profileUser.profilePicture || "/default-profile-image.jpg", // Relative path
          width: 800,
          height: 600,
          alt: `${profileUser.username}’s Profile Picture`,
        },
        ...previousImages, // Extend parent images if any
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: profileTitle,
      description: profileDescription,
      images: [
        profileUser.profilePicture || "/default-profile-image.jpg", // Relative path
      ],
    },
  };
}
