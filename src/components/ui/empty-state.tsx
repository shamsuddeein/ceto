import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="my-10 flex flex-col items-center justify-center text-center">
      <div className="grid h-24 w-24 place-items-center rounded-2xl border-[4px] border-border bg-tint-lilac shadow-vibe-sm">
        {icon}
      </div>
      <h3 className="mt-6 font-display text-2xl font-black text-foreground">{title}</h3>
      <p className="mt-4 max-w-sm text-lg font-bold text-foreground/70">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
