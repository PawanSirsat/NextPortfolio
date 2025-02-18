import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ProjectCardSkeleton = () => {
  return (
    <div className="w-full flex flex-col overflow-hidden">
      <div className="w-full h-48 relative">
        <Skeleton height={200} baseColor="#2d2d2d" highlightColor="#3d3d3d" />
      </div>
      <div className="p-4 flex-grow">
        <Skeleton count={2} baseColor="#2d2d2d" highlightColor="#3d3d3d" />
        <div className="flex flex-wrap gap-2 my-2">
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
        <Skeleton
          width={100}
          height={16}
          baseColor="#2d2d2d"
          highlightColor="#3d3d3d"
        />
        <div className="flex gap-2 mt-4">
          <Skeleton
            width={80}
            height={32}
            baseColor="#2d2d2d"
            highlightColor="#3d3d3d"
          />
          <Skeleton
            width={80}
            height={32}
            baseColor="#2d2d2d"
            highlightColor="#3d3d3d"
          />
        </div>
      </div>
    </div>
  );
};
