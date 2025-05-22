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
    iconColor = "text-sea-nymph-500 dark:text-green-600",
    iconBg = "bg-sea-nymph-100 dark:bg-aqua-deep-200",
    title,
    description,
}: FeatureCardProps) {
    return (
        <Card className="border-sea-nymph-400 dark:bg-aqua-deep-800 dark:border-aqua-deep-600 col-span-1 h-60 w-full max-w-sm lg:min-w-xs lg:max-w-92">
        <CardHeader>
          <CardTitle className="grid grid-cols-1 place-items-center gap-2">
            <div className={`flex items-center justify-center ${iconBg} p-1 rounded-3xl w-10 h-10`}>
              <Icon className={`${iconColor} border-sea-nymph-500 dark:border-aqua-deep-300`} />
            </div>
            <h4 className="scroll-m-20 text-center text-xl font-semibold tracking-tight">{title}</h4>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-md text-muted-foreground text-center dark:text-teal-50">{description}</p>
        </CardContent>
      </Card>
    )
}