import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";

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
      <CardHeader>
        <CardTitle>{user}</CardTitle>
        <CardDescription>{date}</CardDescription>
        {/** todo: replay button */}
      </CardHeader>
      <CardContent>{description}</CardContent>
      {hasReplies && (
        <CardFooter>
          <Accordion
            type="single"
            collapsible
            className="w-100 "
          >
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
            <AccordionItem value="reply">
              <AccordionTrigger
                className="flex justify-end"
                showChevron={false}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-sea-nymph-500 hover:bg-sea-nymph-700 dark:bg-koromiko-600 dark:hover:bg-koromiko-800">
                  <MessageSquare className="w-4 h-4 not-dark:text-white" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex items-start flex-col gap-2">
                <Input min={10} max={200} className="min-w-20 min-h-20 max-w-90" />
                <Button variant="outline" className=" w-20">Enviar</Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardFooter>
      )}
    </Card>
  );
}
