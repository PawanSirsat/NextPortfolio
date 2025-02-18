import { useFormContext } from "react-hook-form";
import { ArticleFormValues } from "../../../../../utils/validations/article";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export function ContentStep() {
  const { control } = useFormContext<ArticleFormValues>();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Article Content</FormLabel>
            <FormControl>
              <Textarea {...field} rows={10} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
