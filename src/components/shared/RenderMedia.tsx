import Image from "next/image";
import placeholder from "@assets/images/project-placeholder.svg";
import { CldImage } from "next-cloudinary";

interface ProjectMediaProps {
  media?: string;
  alt?: string;
}

export function ProjectMedia({
  media,
  alt = "Project Image",
}: ProjectMediaProps) {
  const imageClassName = "w-full h-64 object-cover rounded-t-lg shadow-inner"; // Added shadow-inner class

  if (media) {
    if (media.includes("res.cloudinary.com")) {
      return (
        <CldImage
          src={media}
          alt={alt}
          width="1000"
          height="400"
          className={imageClassName} // Use the combined class name
        />
      );
    } else {
      return (
        <Image
          src={media}
          alt={alt}
          width={1000}
          height={400}
          className={imageClassName} // Use the combined class name
        />
      );
    }
  } else {
    return (
      <Image
        src={placeholder}
        alt="Project Placeholder"
        width={1000}
        height={400}
        className={`${imageClassName} dark:filter dark:invert`} // Combine with dark styles
      />
    );
  }
}
