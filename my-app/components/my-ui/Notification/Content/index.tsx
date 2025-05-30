interface ContentProps {
  children: string;
}

export function Content({ children }: ContentProps) {
  return <div>{children}</div>;
}