import type { ReactNode } from "react";
import { cn } from "./cn";

export function Card({
  children,
  className,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section
      className={cn(
        // min-w-0 so a wide table inside can scroll rather than stretching the
        // card past its grid or flex parent on narrow screens.
        "min-w-0 rounded-[var(--radius-card)] border border-line bg-paper shadow-[var(--shadow-card)]",
        padded && "p-5",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">{title}</h2>
        {subtitle && <p className="mt-0.5 text-[13px] text-muted">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  meta,
  action,
}: {
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="flex items-baseline gap-3">
          <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-ink">{title}</h1>
          {meta}
        </div>
        {subtitle && <p className="mt-1 max-w-2xl text-[13.5px] text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
