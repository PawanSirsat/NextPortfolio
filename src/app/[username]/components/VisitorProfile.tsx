export const VisitorProfile = ({ profileUser }: { profileUser: any }) => {
  return (
    <div className="bg-[#1a1a1a] text-gray-200 p-4">
      <div className="flex items-center gap-5 mb-10 flex-wrap">
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-800">
          {profileUser.profilePicture ? (
            <img
              src={profileUser.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}
        </div>
        <div className="flex flex-col p-2">
          <h2 className="text-2xl font-bold">
            {profileUser.firstname} {profileUser.lastname}
          </h2>
          <h2 className="text-xs">@{profileUser.username}</h2>
          <h2 className="text-sm my-2">
            {profileUser.bio || "No bio available"}
          </h2>
          {profileUser.professionTags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {profileUser.professionTags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-gray-700 text-white text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
