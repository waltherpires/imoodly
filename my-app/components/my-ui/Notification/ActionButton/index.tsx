import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type ActionButtonProps = React.ComponentProps<typeof Button> & {
  children: ReactNode;
}

export function ActionButton({ children, ...rest }: ActionButtonProps) {
  return (
    <Button {...rest}>
      {children}
    </Button>
  );
}