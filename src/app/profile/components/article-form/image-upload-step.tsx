import type React from "react"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import type { ArticleFormValues } from "@/lib/validations/article"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export function ImageUploadStep() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { control, setValue } = useFormContext<ArticleFormValues>()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
        setValue("image", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Article Image (optional)</FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                <Input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("image-upload")?.click()}
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
  )
}

