import Image from "next/image";

interface Project {
  title: string;
  author: string;
  img: string;
  followers: string;
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="flex-shrink-0 w-64 overflow-hidden text-center  rounded-lg shadow-md">
      {/* Image section */}
      <div className="relative w-full h-40">
        <Image
          src={project.img}
          alt={project.title}
          fill
          className="object-cover w-full h-full"
          style={{ borderRadius: "inherit" }}
        />
      </div>

      {/* Information section */}
      <div className="text-left">
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        <p className="text-gray-500">By {project.author}</p>
        <p className="text-sm text-gray-400">{project.followers} Followers</p>
      </div>
    </div>
  );
};

export default ProjectCard;
