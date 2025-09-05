import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reply } from "lucide-react";

interface CommentProps {
  user: string;
  description: string;
  date: string;
  replies?: CommentProps[];
}

export default function Comment({
  date,
  description,
  user,
  replies,
}: CommentProps) {
  const hasReplies = replies && replies.length > 0;

  return (
    <Card className="min-w-50 sm:min-w-90">
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>{user}</CardTitle>
          <CardDescription>{date}</CardDescription>
        </div>

        {/** todo: replay button */}
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-sea-nymph-500 hover:bg-sea-nymph-700 dark:bg-koromiko-600 dark:hover:bg-koromiko-800" ><Reply className="w-4 h-4 not-dark:text-white"/></div>
        
      </CardHeader>
      <CardContent>{description}</CardContent>
      {hasReplies && (
        <CardFooter>
          <Accordion type="single" collapsible>
            <AccordionItem value="replies">
              <AccordionTrigger className="justify-self-end items-end">
                ver {replies.length} respostas
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {replies.map((reply, idx) => (
                    <Comment key={idx} {...reply} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardFooter>
      )}
    </Card>
  );
}
