import { cn } from "./cn";

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-[22px] w-[38px] shrink-0 rounded-full border transition-colors duration-200",
        checked
          ? "border-forest bg-forest"
          : "border-line bg-cream-deep hover:border-[color:var(--asbm-gold)]/50",
      )}
    >
      <span
        aria-hidden
        className="absolute top-[2px] size-[16px] rounded-full bg-paper shadow-[var(--shadow-card)] transition-[left] duration-200"
        style={{ left: checked ? 18 : 2 }}
      />
    </button>
  );
}
