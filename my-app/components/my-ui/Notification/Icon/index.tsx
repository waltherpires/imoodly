import { ElementType, ComponentProps } from "react";

type IconProps = {
  icon: ElementType;
} & ComponentProps<"svg">;

export function Icon({ icon: Icon, ...props }: IconProps) {
  return <Icon {...props} />;
}
