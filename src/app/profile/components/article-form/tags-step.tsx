import { useFieldArray, useFormContext } from "react-hook-form"
import type { ArticleFormValues } from "@/lib/validations/article"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function TagsStep() {
  const { control } = useFormContext<ArticleFormValues>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  })

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <FormField
          key={field.id}
          control={control}
          name={`tags.${index}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={index !== 0 ? "sr-only" : undefined}>{index === 0 ? "Tags" : ""}</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input {...field} />
                  <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append("")}>
        Add Tag
      </Button>
    </div>
  )
}

