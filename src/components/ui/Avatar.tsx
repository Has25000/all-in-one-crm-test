import { initialsOf, categoryMeta } from "../../data/selectors";
import type { Category } from "../../data/types";
import { cn } from "./cn";

const sizes = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-[11px]",
  md: "size-10 text-[13px]",
  lg: "size-14 text-[17px]",
  xl: "size-16 text-[20px]",
} as const;

/**
 * Initials monogram. The demo deliberately avoids photographs of real people.
 */
export function Avatar({
  name,
  category,
  size = "md",
  className,
  ring = false,
}: {
  name: string;
  category?: Category;
  size?: keyof typeof sizes;
  className?: string;
  ring?: boolean;
}) {
  const meta = category ? categoryMeta[category] : undefined;
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold tracking-[0.02em] select-none",
        sizes[size],
        className,
      )}
      style={{
        background: meta?.token ?? "var(--asbm-cream-deep)",
        color: meta?.onToken ?? "var(--asbm-charcoal)",
        boxShadow: ring ? "0 0 0 2px var(--asbm-white), 0 0 0 3.5px var(--asbm-gold)" : undefined,
      }}
    >
      {initialsOf(name)}
    </span>
  );
}
