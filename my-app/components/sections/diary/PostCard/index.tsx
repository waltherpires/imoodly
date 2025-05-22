import { Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Post } from "@/lib/api/diaryPost";
import { dateFormatter } from "@/helpers/dateFormatter";
import { getTagColor } from "@/helpers/postHelpers";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{post.title}</CardTitle>
          <div className="ml-2 flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
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
                className={`flex h-1.5 w-1.5 rounded-full mr-1 ${getTagColor(tag)}`}
              ></span>
              {tag}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{post.description}</p>
      </CardContent>
      <CardFooter className="flex justify-end pt-0">
        <Button variant="ghost" size="sm" className="cursor-pointer">
          Ver mais
        </Button>
      </CardFooter>
    </Card>
  );
}
