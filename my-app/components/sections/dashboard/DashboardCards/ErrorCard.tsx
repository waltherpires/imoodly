import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";

export default function ErrorCard() { 
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-4 max-w-screen">
          <Card className="md:max-w-130 sm:min-w-60 md:min-w-80">
            <CardHeader>
              <CardTitle className="flex justify-between text-sm">
                Erro ao carregar dados <AlertCircle className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Não foi possível carregar as informações. Tente novamente mais tarde.
              </p>
            </CardContent>
          </Card>
        </section>
      );
}