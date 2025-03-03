// utils/generateRandomAvatar.ts
import { toast } from "sonner";

// Existing function for single random avatar
export const generateRandomAvatar = async (
  seed: string,
  uploadImageMutation: any,
  userId: string
): Promise<string | null> => {
  const styles = ["bottts", "avataaars", "pixel-art", "micah", "adventurer"];
  const randomStyle = styles[Math.floor(Math.random() * styles.length)];
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

  const avatarUrl = `https://api.dicebear.com/9.x/${randomStyle}/svg?seed=${encodeURIComponent(
    seed
  )}&size=128&backgroundColor=${randomColor}&radius=50`;

  try {
    const response = await fetch(avatarUrl);
    const blob = await response.blob();
    const file = new File([blob], "random-avatar.svg", {
      type: "image/svg+xml",
    });
    const imageUrl = await uploadImageMutation.mutateAsync({
      filePath: file,
      userId,
    });
    toast.success("Random avatar generated and uploaded!");
    return imageUrl;
  } catch (error) {
    toast.error("Failed to generate random avatar.");
    return null;
  }
};

// New function for generating random avatar options
export const generateRandomAvatarOptions = (
  seed: string,
  count: number = 3
): string[] => {
  const styles = ["bottts", "avataaars", "pixel-art", "micah", "adventurer"];
  const options: string[] = [];

  for (let i = 0; i < count; i++) {
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    const avatarUrl = `https://api.dicebear.com/9.x/${randomStyle}/svg?seed=${encodeURIComponent(
      seed
    )}&size=128&backgroundColor=${randomColor}&radius=50`;
    options.push(avatarUrl);
  }

  return options;
};
