import { ReactNode } from "react";

export const ModelSpecItem = ({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string | null | undefined;
}) => (
  <div className="flex items-center gap-2 p-1 border-b border-foreground/30 text-safe justify-between">
    <div className="flex gap-2">
      <span>{icon}</span>

      <span className="font-medium text-sm foreground/70 ">{title}:</span>
    </div>

    <span className="text-xs text-foreground/60 ml-auto text-end line-clamp-1  ">{value ? value : "-"}</span>
  </div>
);
