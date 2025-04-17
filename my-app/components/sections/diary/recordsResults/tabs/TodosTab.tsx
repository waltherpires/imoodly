"use client";

import { Clock, Tag } from "lucide-react";
import {  TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/hooks/usePosts";
import { Skeleton } from "@/components/ui/skeleton";
import { Post } from "@/lib/api/diaryPost";
import { dateFormatter } from "@/helpers/dateFormatter";

function getTagColor(tag: string) {
  switch (tag) {
    case "feliz":
      return "bg-green-500";
    case "motivado":
      return "bg-blue-500";
    case "triste":
      return "bg-red-500";
    case "contente":
      return "bg-yellow-500";
    case "ansioso":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
}

type Props = {
  textFilter: string
}


export default function TodosTab({ textFilter }: Props) {
    const { data, isLoading, error } = usePosts();

  if (error) return <Card className="flex flex-col gap-2 justify-center items-center">
    <h1 className="text-xl font-semibold leading-tight">Ocorrou um erro ao carregar seus Posts!</h1>
  </Card>

  const skeletonCards = Array.from({ length: 1 });

  const filterData = (data: Post[], textFilter: string) => {
    if(!textFilter) return data;

    return data.filter(item => {
      return Object.values(item).some(value => 
        typeof value === "string" && value.toLowerCase().includes(textFilter.toLowerCase())
      );
    });
  };

  const filteredData = filterData(data || [], textFilter);

    return (
        <TabsContent value="todos" className="mt-4 space-y-4">
          {isLoading
            ? skeletonCards.map((_, i) => (
              <Card key={i} className="space-y-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-1/2"/>
                    <Skeleton className="h-3 w-20"/>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Skeleton className="h-4 w-16 rounded-full" />
                    <Skeleton className="h-4 w-20 rounded-full" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4"/>
                </CardContent>
                <CardFooter className="flex justify-between">
                <Skeleton className="h-4 w-32"/>
                <Skeleton className="h-6 w-20"/>
                </CardFooter>
              </Card>
            ))
            : filteredData?.map((item) => (
              <Card key={item.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center jusitfy-between">
                  <CardTitle>{item.title}</CardTitle>
                  <div className="ml-2 flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{dateFormatter(item.date)}</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-1">
                  {item.tags.map((tag) => (
                  <div key={tag} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                    <span className={` flex h-1.5 w-1.5 rounded-full mr-1 ${getTagColor(tag)}`}></span>
                    {tag}
                  </div>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                   {item.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{item.tags.join(", ")}</span>
                </div>
                <Button variant="ghost" size="sm">
                    Ver mais
                </Button>
              </CardFooter>
            </Card>
            ))}
      </TabsContent>
    )
}