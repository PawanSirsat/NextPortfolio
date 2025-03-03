"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BasicInfoStep } from "./project-form/basic-info-step";
import { DetailsStep } from "./project-form/details-step";
import { TechnologiesStep } from "./project-form/technologies-step";
import { FeaturesStep } from "./project-form/features-step";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ProjectFormValues,
  projectSchema,
} from "../../../../utils/validations/project";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ImageUploadStep } from "./project-form/image-upload-step";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  "Basic Info",
  "Details",
  "Technologies",
  "Features",
  "Upload Image",
];

// Define fields relevant to each step for validation
const stepFields: { [key: number]: (keyof ProjectFormValues)[] } = {
  0: ["title", "description", "longDescription"],
  1: ["status", "startDate", "endDate", "teamSize", "role"],
  2: ["technologies"],
  3: ["keyFeatures", "challenges", "lessons"],
  4: ["liveDemo", "githubRepo", "media", "tags"],
};

export function ProjectForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const tabsRef = useRef<HTMLDivElement>(null);
  const isSubmitButtonClicked = useRef(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    mode: "onChange", // Validate on change to catch errors early
    defaultValues: {
      title: "",
      description: "",
      longDescription: "",
      technologies: [],
      liveDemo: "",
      githubRepo: "",
      status: "",
      startDate: "",
      endDate: "",
      teamSize: 1,
      role: "",
      keyFeatures: [],
      challenges: [],
      lessons: [],
      tags: [],
      media: "",
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    if (!isSubmitButtonClicked.current) return;
    isSubmitButtonClicked.current = false;

    setIsSubmitting(true);
    try {
      console.log("Form Data:", data);
      const response = await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Project created successfully!");
        setTimeout(() => router.push("/profile"), 2000);
      } else {
        toast.error("Failed to create project. Please try again.");
        console.error("Error creating project:", response);
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
      console.error("Network error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (errors: any) => {
    console.error("Form errors:", errors);
    toast.error("Please fix the errors in the form.");
  };

  const nextStep = async () => {
    // Validate only the fields relevant to the current step
    const fieldsToValidate = stepFields[currentStep];
    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    } else {
      toast.error("Please fill in all required fields correctly.");
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    if (tabsRef.current) {
      const activeTab = tabsRef.current.querySelector(`[data-state="active"]`);
      if (activeTab) {
        tabsRef.current.scrollLeft =
          (activeTab as HTMLElement).offsetLeft -
          tabsRef.current.offsetWidth / 2 +
          (activeTab as HTMLElement).offsetWidth / 2;
      }
    }
  }, [currentStep]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-8"
      >
        <div className="border-b">
          <div
            className="overflow-x-auto"
            ref={tabsRef}
            style={{
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
            }}
          >
            <Tabs value={steps[currentStep]} className="w-full">
              <TabsList className="h-auto p-0 bg-transparent">
                {steps.map((step, index) => (
                  <TabsTrigger
                    key={step}
                    value={step}
                    disabled={index !== currentStep}
                    className={cn(
                      "relative h-9 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground hover:text-primary data-[state=active]:border-primary data-[state=active]:text-primary",
                      "whitespace-nowrap",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                      "disabled:pointer-events-none disabled:opacity-50"
                    )}
                  >
                    {step}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 0 && <BasicInfoStep />}
            {currentStep === 1 && <DetailsStep />}
            {currentStep === 2 && <TechnologiesStep />}
            {currentStep === 3 && <FeaturesStep />}
            {currentStep === 4 && <ImageUploadStep />}
          </motion.div>
        </AnimatePresence>

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
            <Button
              type="submit"
              disabled={isSubmitting}
              onMouseDown={(e) => {
                e.preventDefault();
                isSubmitButtonClicked.current = true;
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
