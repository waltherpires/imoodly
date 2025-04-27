import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart } from "./Chart";

export default function DashboardChart() {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Análise de humor</CardTitle>
                <CardDescription className="text-xs">Seus padrões emocionais nas últimas semanas</CardDescription>
            </CardHeader>
            <CardContent>
                <Chart />
            </CardContent>
        </Card>
    )
}