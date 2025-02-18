import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, NewspaperIcon } from "lucide-react";
import Image from "next/image";
import placeholder from "@assets/images/project-placeholder.svg";
import Link from "next/link";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  tags: string[];
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  excerpt,
  image,
  date,
  readTime,
  tags,
}) => {
  return (
    <Card className="w-full relative">
      <CardHeader className="p-0 relative">
        {/* Flag Label */}

        <Link href={`/profile/article/adf`} passHref>
          <Image
            src={image || placeholder}
            alt={title}
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded-t-lg dark:filter dark:invert"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <Link href="/profile/article/sda">
          <CardTitle className="text-lg font-semibold mb-2">{title}</CardTitle>
        </Link>
        <div className="absolute top-3 left-3 bg-rose-500 text-white px-3 py-1 flex items-center gap-1 rounded-md shadow-md">
          <NewspaperIcon className="w-4 h-4" />
          <span className="text-xs font-semibold">Article</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{excerpt}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            {date}
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-1" />
            {readTime}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
