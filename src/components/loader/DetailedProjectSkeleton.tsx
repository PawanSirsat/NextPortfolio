// components/shared/DetailedProjectSkeleton.tsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const DetailedProjectSkeleton = () => {
  return (
    <div className="bg-[#1a1a1a] text-gray-200 animate-pulse">
      <div className="w-full overflow-hidden">
        {/* Image Skeleton */}
        <div className="w-full h-64 relative">
          <Skeleton
            height={256}
            baseColor="#2d2d2d"
            highlightColor="#3d3d3d"
            className="rounded-t-lg"
          />
        </div>

        {/* Content Skeleton */}
        <div className="p-6">
          {/* Title and Description */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="w-full md:w-2/3">
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
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Skeleton
                width={100}
                height={36}
                baseColor="#2d2d2d"
                highlightColor="#3d3d3d"
              />
              <Skeleton
                width={100}
                height={36}
                baseColor="#2d2d2d"
                highlightColor="#3d3d3d"
              />
            </div>
          </div>

          {/* Metadata Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex items-center">
                  <Skeleton
                    circle
                    width={20}
                    height={20}
                    baseColor="#2d2d2d"
                    highlightColor="#3d3d3d"
                    className="mr-2"
                  />
                  <Skeleton
                    width={100}
                    height={20}
                    baseColor="#2d2d2d"
                    highlightColor="#3d3d3d"
                  />
                </div>
              ))}
          </div>

          <Skeleton
            height={1}
            baseColor="#2d2d2d"
            highlightColor="#3d3d3d"
            className="my-6"
          />

          {/* Technologies Skeleton */}
          <div className="mb-6">
            <Skeleton
              height={24}
              width="30%"
              baseColor="#2d2d2d"
              highlightColor="#3d3d3d"
              className="mb-2"
            />
            <div className="flex flex-wrap gap-2">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    width={80}
                    height={32}
                    baseColor="#2d2d2d"
                    highlightColor="#3d3d3d"
                  />
                ))}
            </div>
          </div>

          {/* Project Details Skeleton */}
          <div className="mb-6">
            <Skeleton
              height={24}
              width="30%"
              baseColor="#2d2d2d"
              highlightColor="#3d3d3d"
              className="mb-2"
            />
            <Skeleton count={4} baseColor="#2d2d2d" highlightColor="#3d3d3d" />
          </div>

          {/* Key Features and Challenges Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Skeleton
                height={24}
                width="30%"
                baseColor="#2d2d2d"
                highlightColor="#3d3d3d"
                className="mb-2"
              />
              <Skeleton
                count={3}
                baseColor="#2d2d2d"
                highlightColor="#3d3d3d"
              />
            </div>
            <div>
              <Skeleton
                height={24}
                width="30%"
                baseColor="#2d2d2d"
                highlightColor="#3d3d3d"
                className="mb-2"
              />
              <Skeleton
                count={3}
                baseColor="#2d2d2d"
                highlightColor="#3d3d3d"
              />
            </div>
          </div>

          {/* Lessons Learned Skeleton */}
          <div className="mb-6">
            <Skeleton
              height={24}
              width="30%"
              baseColor="#2d2d2d"
              highlightColor="#3d3d3d"
              className="mb-2"
            />
            <Skeleton count={3} baseColor="#2d2d2d" highlightColor="#3d3d3d" />
          </div>

          {/* GitHub Stats Skeleton */}
          <div className="bg-[#252525] p-4 rounded-lg">
            <Skeleton
              height={24}
              width="30%"
              baseColor="#2d2d2d"
              highlightColor="#3d3d3d"
              className="mb-2"
            />
            <div className="flex gap-4 text-sm">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Skeleton
                      circle
                      width={16}
                      height={16}
                      baseColor="#2d2d2d"
                      highlightColor="#3d3d3d"
                    />
                    <Skeleton
                      width={60}
                      height={16}
                      baseColor="#2d2d2d"
                      highlightColor="#3d3d3d"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
