import * as z from "zod";

export const articleSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  content: z.string().min(1, "Content is required"),
  tags: z
    .array(
      z.object({
        id: z.string(),
        value: z.string(),
      })
    )
    .min(1, "At least one tag is required"),
  publishDate: z.string().optional(),
  status: z.enum(["Draft", "Published"]),
  media: z.string().url("Invalid image URL").optional(),
});

export type ArticleFormValues = z.infer<typeof articleSchema>;
