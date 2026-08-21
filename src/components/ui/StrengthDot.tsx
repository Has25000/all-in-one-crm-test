import { strengthMeta } from "../../data/selectors";
import type { Strength } from "../../data/types";
import { cn } from "./cn";

/**
 * Relationship strength is always shown as a human label, never a number.
 */
export function StrengthDot({
  strength,
  showLabel = true,
  className,
}: {
  strength: Strength;
  showLabel?: boolean;
  className?: string;
}) {
  const meta = strengthMeta[strength];
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[12.5px] text-charcoal", className)}>
      <span
        aria-hidden
        className="size-[7px] shrink-0 rounded-full"
        style={{ background: meta.token }}
      />
      {showLabel ? meta.label : <span className="sr-only">{meta.label}</span>}
    </span>
  );
}
