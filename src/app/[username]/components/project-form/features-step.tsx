"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { ProjectFormValues } from "../../../../../utils/validations/project";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function FeaturesStep() {
  const { control } = useFormContext<ProjectFormValues>();
  const {
    fields: keyFeatures,
    append: appendKeyFeature,
    remove: removeKeyFeature,
  } = useFieldArray({
    control,
    name: "keyFeatures",
  });
  const {
    fields: challenges,
    append: appendChallenge,
    remove: removeChallenge,
  } = useFieldArray({
    control,
    name: "challenges",
  });
  const {
    fields: lessons,
    append: appendLesson,
    remove: removeLesson,
  } = useFieldArray({
    control,
    name: "lessons",
  });

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Key Features</h3>
        {keyFeatures.map((field, index) => (
          <FormField
            key={field.id}
            control={control}
            name={`keyFeatures.${index}.value`}
            render={({ field: formField }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input {...formField} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeKeyFeature(index)}
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
          onClick={() =>
            appendKeyFeature({ id: String(Date.now()), value: "" })
          }
        >
          Add Key Feature
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Challenges</h3>
        {challenges.map((field, index) => (
          <FormField
            key={field.id}
            control={control}
            name={`challenges.${index}.value`}
            render={({ field: formField }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input {...formField} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeChallenge(index)}
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
          onClick={() => appendChallenge({ id: String(Date.now()), value: "" })}
        >
          Add Challenge
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Lessons Learned</h3>
        {lessons.map((field, index) => (
          <FormField
            key={field.id}
            control={control}
            name={`lessons.${index}.value`}
            render={({ field: formField }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input {...formField} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLesson(index)}
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
          onClick={() => appendLesson({ id: String(Date.now()), value: "" })}
        >
          Add Lesson
        </Button>
      </div>
    </div>
  );
}
