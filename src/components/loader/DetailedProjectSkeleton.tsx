// components/shared/DetailedProjectSkeleton.tsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const DetailedProjectSkeleton = () => {
  return (
    <div className="">
      <div className="w-full overflow-hidden">
        {/* Image Skeleton */}
        <div className="w-full h-64 relative">
          <Skeleton height={256} className="rounded-t-lg" />
        </div>

        {/* Content Skeleton */}
        <div className="p-6">
          {/* Title and Description */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="w-full md:w-2/3">
              <Skeleton height={32} width="60%" className="mb-2" />
              <Skeleton height={24} width="80%" />
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Skeleton width={100} height={36} />
              <Skeleton width={100} height={36} />
            </div>
          </div>

          {/* Metadata Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex items-center">
                  <Skeleton circle width={20} height={20} className="mr-2" />
                  <Skeleton width={100} height={20} />
                </div>
              ))}
          </div>

          <Skeleton height={1} className="my-6" />

          {/* Technologies Skeleton */}
          <div className="mb-6">
            <Skeleton height={24} width="30%" className="mb-2" />
            <div className="flex flex-wrap gap-2">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} width={80} height={32} />
                ))}
            </div>
          </div>

          {/* Project Details Skeleton */}
          <div className="mb-6">
            <Skeleton height={24} width="30%" className="mb-2" />
            <Skeleton count={4} />
          </div>

          {/* Key Features and Challenges Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Skeleton height={24} width="30%" className="mb-2" />
              <Skeleton count={3} />
            </div>
            <div>
              <Skeleton height={24} width="30%" className="mb-2" />
              <Skeleton count={3} />
            </div>
          </div>

          {/* Lessons Learned Skeleton */}
          <div className="mb-6">
            <Skeleton height={24} width="30%" className="mb-2" />
            <Skeleton count={3} />
          </div>

          {/* GitHub Stats Skeleton */}
          <div className="bg-secondary p-4 rounded-lg">
            <Skeleton height={24} width="30%" className="mb-2" />
            <div className="flex gap-4 text-sm">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Skeleton circle width={16} height={16} />
                    <Skeleton width={60} height={16} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
