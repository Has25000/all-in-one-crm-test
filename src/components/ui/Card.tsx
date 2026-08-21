import type { ReactNode } from "react";
import { cn } from "./cn";
import { Explain } from "./Explain";

export function Card({
  children,
  className,
  padded = true,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
} & Record<`data-${string}`, string | undefined>) {
  return (
    <section
      {...rest}
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
  explain,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  /** One paragraph on what this part of the product is for. */
  explain?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        <h2 className="flex items-center gap-1.5 text-[17px] font-semibold tracking-[-0.01em] text-ink">
          {title}
          {explain && <Explain title={title}>{explain}</Explain>}
        </h2>
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
  explain,
}: {
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  action?: ReactNode;
  /** One paragraph on what this screen is for. */
  explain?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="flex items-baseline gap-3">
          <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-ink">{title}</h1>
          {meta}
          {explain && <Explain title={title}>{explain}</Explain>}
        </div>
        {subtitle && <p className="mt-1 max-w-2xl text-[13.5px] text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
