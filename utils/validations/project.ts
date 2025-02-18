import * as z from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(1, "Project title is required")
    .max(100, "Project title must be 100 characters or less"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be 500 characters or less"),
  longDescription: z
    .string()
    .min(1, "Long description is required")
    .max(2000, "Long description must be 2000 characters or less"),
  technologies: z
    .array(z.object({ id: z.string(), value: z.string() }))
    .min(1, "At least one technology is required"),
  liveDemo: z.string().url("Invalid URL").optional().or(z.literal("")),
  githubRepo: z.string().url("Invalid URL").optional().or(z.literal("")),
  status: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  teamSize: z.number().int().positive("Team size must be a positive number"),
  role: z.string().min(1, "Role is required"),
  keyFeatures: z
    .array(z.object({ id: z.string(), value: z.string() }))
    .min(1, "At least one key feature is required"),
  challenges: z
    .array(z.object({ id: z.string(), value: z.string() }))
    .optional(),
  lessons: z.array(z.object({ id: z.string(), value: z.string() })).optional(),
  tags: z.array(z.string()).optional(),
  media: z.string().url("Invalid image URL").optional(),
  userId: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
