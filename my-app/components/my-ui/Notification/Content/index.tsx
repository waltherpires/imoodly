interface ContentProps {
  children: string;
}

export function Content({ children }: ContentProps) {
  return <div className="text-sm break-words whitespace-normal w-60 text-left hyphens-auto" lang="pt">{children}</div>;
}