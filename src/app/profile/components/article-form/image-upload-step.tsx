import type React from "react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ArticleFormValues } from "../../../../../utils/validations/article";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useUpload } from "@/app/actions/query/queries";
import { toast } from "sonner";

export function ImageUploadStep() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { control, setValue } = useFormContext<ArticleFormValues>();

  const [isUploading, setIsUploading] = useState(false);
  const uploadImageMutation = useUpload();

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadImageMutation.mutateAsync({
          filePath: file,
        });
        toast.success("Image uploaded successfully!");
        console.log("Uploaded Image URL:", imageUrl);

        setPreviewUrl(imageUrl);
        setValue("media", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsUploading(false);
      }
    }
  };
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="media"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Article Image (optional)</FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  <Upload className="mr-2 h-4 w-4" /> Upload Image
                </Button>
                {previewUrl && (
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded"
                  />
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
