import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dateFormatter } from "@/helpers/dateFormatter";
import { getTagColor } from "@/helpers/postHelpers";
import { Post } from "@/lib/api/diaryPost";
import { Clock } from "lucide-react";

type Props = {
  post: Post;
};

export default function PostResume({ post }: Props) {
  return (
    <Card className="flex flex-col min-h-[250px]">
      <div className="flex flex-col flex-1">
        <CardHeader className="pb-2">
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between">
            <CardTitle>{post.title}</CardTitle>
            <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="hidden sm:inline h-3.5 w-3.5" />
              <span>{dateFormatter(post.date)}</span>
            </div>
          </div>
          <div className="flex space-x-2 mt-1">
            {post.tags.map((tag) => (
              <div
                key={tag}
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
              >
                <span
                  className={`flex h-1.5 w-1.5 rounded-full mr-1 ${getTagColor(
                    tag
                  )}`}
                ></span>
                {tag}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <p
            className="text-sm max-w-full whitespace-normal break-words hyphens-auto"
            lang="pt"
          >
            {post.description}
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
