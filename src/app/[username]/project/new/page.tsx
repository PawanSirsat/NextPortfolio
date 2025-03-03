import { ProjectForm } from "../../components/project-form";

export default function NewProjectPage() {
  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl font-bold mb-5">Create New Project</h1>
      <ProjectForm />
    </div>
  );
}
