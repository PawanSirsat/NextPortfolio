"use client";
import { useFieldArray, useFormContext } from "react-hook-form";
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
import { X } from "lucide-react";

export function TagsStep() {
  const { control } = useFormContext<ArticleFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <FormField
          key={field.id}
          control={control}
          name={`tags.${index}.value`} // Access the 'value' property
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel className={index !== 0 ? "sr-only" : undefined}>
                {index === 0 ? "Tags" : ""}
              </FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input {...formField} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => append({ id: String(Date.now()), value: "" })} // Append an object
      >
        Add Tag
      </Button>
    </div>
  );
}
