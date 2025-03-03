import { Metadata, ResolvingMetadata } from "next";
import { ProfileContent } from "./components/ProfileContent";
import { fetchUserByUsernameServer } from "../actions/user";

// Define the params interface
interface ProfileParams {
  params: {
    username: any;
  };
}

// Dynamic metadata generation
export async function generateMetadata({ params }: any) {
  const { username } = await params;

  const profileUser = await fetchUserByUsernameServer(username);

  const metadataBase = new URL("https://yourwebsite.com");

  if (!profileUser) {
    return {
      title: "User Not Found",
      description: "This user profile could not be found.",
      metadataBase,
      openGraph: {
        title: "User Not Found",
        description: "This user profile could not be found.",
        url: `/not-found`,
      },
    };
  }

  const profileTitle = `${profileUser.username}’s Profile`;
  const profileDescription =
    profileUser.bio || "View this user’s profile on Almanac.";

  return {
    title: profileTitle,
    description: profileDescription,
    metadataBase,
    alternates: {
      canonical: `/${profileUser.username}`,
    },
    openGraph: {
      title: profileTitle,
      description: profileDescription,
      url: `/${profileUser.username}`,
      type: "profile",
      images: [
        {
          url: profileUser.profilePicture || "/default-profile-image.jpg",
          height: 600,
          alt: `${profileUser.username}’s Profile Picture`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: profileTitle,
      description: profileDescription,
      images: [profileUser.profilePicture || "/default-profile-image.jpg"],
    },
  };
}

// Server Component
const ProfilePage = async ({ params }: any) => {
  const { username } = params;
  return <ProfileContent username={username} />;
};

export default ProfilePage;
