"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ArticleFormValues,
  articleSchema,
} from "../../../../utils/validations/article";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ContentStep } from "./article-form/content-step";
import { TagsStep } from "./article-form/tags-step";
import { ImageUploadStep } from "./article-form/image-upload-step";
import { BasicInfoStep } from "./article-form/basic-info-step";

const steps = ["Basic Info", "Content", "Tags", "Image Upload"];

export function ArticleForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
      status: "Draft",
    },
  });

  const onSubmit = async (data: ArticleFormValues) => {
    console.log(data);
    // TODO: Implement article creation logic
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {currentStep === 0 && <BasicInfoStep />}
        {currentStep === 1 && <ContentStep />}
        {currentStep === 2 && <TagsStep />}
        {currentStep === 3 && <ImageUploadStep />}

        <div className="flex justify-between">
          {currentStep > 0 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </Form>
  );
}
