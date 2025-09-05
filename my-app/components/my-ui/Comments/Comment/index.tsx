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
import { dateFormatter } from "@/helpers/dateFormatter";
import { Clock, MessageSquare } from "lucide-react";

interface CommentProps {
  user: {
    name: string;
  };
  content: string;
  createdAt: Date;
  replies?: CommentProps[];
}

export default function Comment({
  createdAt,
  content,
  user,
  replies,
}: CommentProps) {
  const hasReplies = replies && replies.length > 0;

  const date = dateFormatter(createdAt);

  return (
    <Card className="max-w-70 xs:max-w-10/12 mb-3 mx-auto">
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Clock className="hidden sm:inline h-4 w-4" />
          {date}
        </CardDescription>
        {/** todo: replay button */}
      </CardHeader>
      <CardContent>{content}</CardContent>
      {hasReplies ? (
        <CardFooter>
          <Accordion type="single" collapsible className="w-100 ">
            <AccordionItem value="replies">
              <AccordionTrigger className="justify-self-end items-end">
                ver {replies.length} respostas
              </AccordionTrigger>
              <AccordionContent>
                <div>
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
                <div className="flex items-center justify-center w-25 h-6 rounded-full bg-sea-nymph-300 hover:bg-sea-nymph-500 dark:bg-koromiko-600 dark:hover:bg-koromiko-800 gap-1">
                  <MessageSquare className="w-4 h-4 not-dark:text-white" />
                  responder
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex items-start flex-col gap-2">
                <Input
                  min={10}
                  max={200}
                  className="min-w-20 min-h-20 max-w-90"
                />
                <Button variant="outline" className=" w-20">
                  Enviar
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardFooter>
      ) : (
        <CardFooter>
          <Accordion type="single" collapsible className="w-100 ">
            <AccordionItem value="reply">
              <AccordionTrigger
                className="flex justify-end"
                showChevron={false}
              >
                <div className="flex items-center justify-center w-25 h-6 rounded-full bg-sea-nymph-300 hover:bg-sea-nymph-500 dark:bg-koromiko-600 dark:hover:bg-koromiko-800 gap-1">
                  <MessageSquare className="w-4 h-4 not-dark:text-white" />
                  responder
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex items-start flex-col gap-2">
                <Input
                  min={10}
                  max={200}
                  className="min-w-20 min-h-20 max-w-90"
                />
                <Button variant="outline" className=" w-20">
                  Enviar
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardFooter>
      )}
    </Card>
  );
}
