import { Clock, Tag } from "lucide-react";
import {  TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TodosTab() {
    return (
        <TabsContent value="todos" className="mt-4 space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center jusitfy-between">
              <CardTitle>Dia Produtivo</CardTitle>
              <div className="ml-2 flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>Hoje, 10:30</span>
              </div>
            </div>
            <div className="flex space-x-2 mt-1">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                Feliz
              </div>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 mr-1"></span>
                Motivado
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
                Hoje foi um dia muito produtivo. Consegui visitar meus pais depois do trabalho e também saí com minha namorada para tomar café.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between pt-0">
            <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">trabalho, meditação</span>
            </div>
            <Button variant="ghost" size="sm">
                Ver mais
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    )
}