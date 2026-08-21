import { ArrowRight } from "lucide-react";
import { cn } from "./cn";

/**
 * A relationship path rendered as a chain — the visual shorthand this product
 * uses for "here is how you already reach this person".
 */
export function PathChain({
  nodes,
  vertical = false,
  className,
}: {
  nodes: string[];
  vertical?: boolean;
  className?: string;
}) {
  return (
    <ol
      className={cn(
        "flex items-center gap-1",
        vertical ? "flex-col items-start gap-1" : "flex-wrap",
        className,
      )}
    >
      {nodes.map((node, index) => (
        <li
          key={`${node}-${index}`}
          className={cn("flex items-center gap-1", vertical && "w-full")}
        >
          <span
            className={cn(
              "rounded-full border px-2 py-[3px] text-[11.5px] font-medium whitespace-nowrap",
              index === 0
                ? "border-forest/25 bg-forest-light text-forest"
                : index === nodes.length - 1
                  ? "border-[color:var(--asbm-gold)]/45 bg-gold-light text-ink"
                  : "border-line bg-paper text-charcoal",
            )}
          >
            {node}
          </span>
          {index < nodes.length - 1 && (
            <ArrowRight
              size={12}
              aria-hidden
              className={cn("shrink-0 text-muted", vertical && "rotate-90")}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
