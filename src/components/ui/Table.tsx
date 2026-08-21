import type { ReactNode } from "react";
import { cn } from "./cn";

export function Table({
  children,
  className,
  minWidth = 720,
}: {
  children: ReactNode;
  className?: string;
  /** Below this the table scrolls sideways rather than crushing its columns. */
  minWidth?: number;
}) {
  return (
    <div className={cn("scroll-slim overflow-x-auto", className)}>
      <table className="w-full border-collapse text-left" style={{ minWidth }}>
        {children}
      </table>
    </div>
  );
}

export function Th({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <th
      scope="col"
      className={cn(
        "border-b border-line px-4 py-2.5 text-[10.5px] font-semibold tracking-[0.09em] text-muted uppercase",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  className,
  colSpan,
}: {
  children: ReactNode;
  className?: string;
  colSpan?: number;
}) {
  return (
    <td colSpan={colSpan} className={cn("border-b border-line px-4 py-3 text-[13px] align-middle", className)}>
      {children}
    </td>
  );
}

export function Tr({
  children,
  onClick,
  className,
  ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}) {
  const interactive = Boolean(onClick);
  return (
    <tr
      onClick={onClick}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? "button" : undefined}
      aria-label={ariaLabel}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={cn(
        interactive && "cursor-pointer transition-colors duration-200 hover:bg-cream",
        className,
      )}
    >
      {children}
    </tr>
  );
}
