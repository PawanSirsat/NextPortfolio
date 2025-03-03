import { ArticleForm } from "../../components/article-form";

export default function NewArticlePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Create New Article</h1>
      <ArticleForm />
    </div>
  );
}
