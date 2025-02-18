import { useFormContext } from "react-hook-form";
import { ProjectFormValues } from "../../../../../utils/validations/project";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DetailsStep() {
  const { control } = useFormContext<ProjectFormValues>();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="liveDemo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Live Demo URL</FormLabel>
            <FormControl>
              <Input {...field} type="url" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="githubRepo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>GitHub Repository</FormLabel>
            <FormControl>
              <Input {...field} type="url" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select project status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="startDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Start Date</FormLabel>
            <FormControl>
              <Input {...field} type="date" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="teamSize"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Team Size</FormLabel>
            <FormControl>
              <Input {...field} type="number" min={1} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Role</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
