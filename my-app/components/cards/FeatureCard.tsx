import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type FeatureCardProps = {
    icon: LucideIcon;
    iconColor?: string;
    iconBg?: string;
    title: string;
    description: string;
}

export function FeatureCard({
    icon: Icon,
    iconColor = "text-green-600",
    iconBg = "bg-green-200",
    title,
    description,
}: FeatureCardProps) {
    return (
        <Card className="col-span-1 h-full w-full">
        <CardHeader>
          <CardTitle className="grid grid-cols-1 place-items-center gap-2">
            <div className={`flex items-center justify-center ${iconBg} p-1 rounded-3xl w-10 h-10`}>
              <Icon className={`${iconColor}`} />
            </div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{title}</h4>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-md text-muted-foreground text-center">{description}</p>
        </CardContent>
      </Card>
    )
}