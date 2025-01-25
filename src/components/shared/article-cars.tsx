import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ClockIcon } from "lucide-react"
import Image from "next/image"
import placeholder from "/assets/images/project-placeholder.svg"

interface ArticleCardProps {
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  tags: string[]
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
    <Card className="w-full">
      <CardHeader className="p-0">
        <Image
          src={placeholder}
          alt={title}
          width={400}
          height={200}
          className="w-full h-48 object-cover rounded-t-lg dark:filter dark:invert"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-2">{title}</CardTitle>
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
  )
}

export default ArticleCard
