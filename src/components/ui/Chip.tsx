import type { ReactNode } from "react";
import { cn } from "./cn";

export function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "gold" | "forest" | "warm";
  className?: string;
}) {
  const tones = {
    neutral: "bg-cream-deep text-charcoal border-line",
    gold: "bg-gold-light text-ink border-[color:var(--asbm-gold)]/40",
    forest: "bg-forest-light text-forest border-forest/15",
    warm: "bg-cream text-muted border-line",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-[3px] text-[11.5px] font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function FilterChip({
  label,
  active,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-[5px] text-[12.5px] font-medium transition-colors duration-200",
        active
          ? "border-[color:var(--asbm-gold)] bg-gold-light text-ink"
          : "border-line bg-paper text-muted hover:border-[color:var(--asbm-gold)]/50 hover:text-ink",
      )}
    >
      {label}
      {count !== undefined && (
        <span className={cn("text-[11px]", active ? "text-ink/60" : "text-muted/70")}>{count}</span>
      )}
    </button>
  );
}
