import { ProfileContent } from "./components/ProfileContent";

// Dynamic metadata generation
// export async function generateMetadata(
//   { params }: { params: Params },
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const { username } = params;
//   const profileUser = await fetchUserByUsernameServer(username);

//   const metadataBase = new URL("https://yourwebsite.com");

//   const previousImages = (await parent).openGraph?.images || [];

//   if (!profileUser) {
//     return {
//       title: "User Not Found",
//       description: "This user profile could not be found.",
//       metadataBase,
//       openGraph: {
//         title: "User Not Found",
//         description: "This user profile could not be found.",
//         url: `/not-found`,
//         images: previousImages,
//       },
//     };
//   }

//   const profileTitle = `${profileUser.username}’s Profile`;
//   const profileDescription =
//     profileUser.bio || "View this user’s profile on Almanac.";

//   return {
//     title: profileTitle,
//     description: profileDescription,
//     metadataBase,
//     alternates: {
//       canonical: `/${profileUser.username}`,
//     },
//     openGraph: {
//       title: profileTitle,
//       description: profileDescription,
//       url: `/${profileUser.username}`, // Relative path
//       type: "profile",
//       images: [
//         {
//           url: profileUser.profilePicture || "/default-profile-image.jpg",
//           height: 600,
//           alt: `${profileUser.username}’s Profile Picture`,
//         },
//         ...previousImages,
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: profileTitle,
//       description: profileDescription,
//       images: [
//         profileUser.profilePicture || "/default-profile-image.jpg", // Relative path
//       ],
//     },
//   };
// }

const ProfilePage = async (params: any) => {
  const { username } = params;

  return <ProfileContent username={username} />;
};

export default ProfilePage;
