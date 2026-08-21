import { cardFields, myCard, type CardFieldId } from "../../data/card";
import { cn } from "../../components/ui/cn";

/**
 * The card itself. Deliberately restrained — it is the first thing a brand
 * executive sees of ASBM, so it should read as a business, not a widget.
 */
export function CardPreview({
  fields,
  className,
  compact = false,
}: {
  fields: CardFieldId[];
  className?: string;
  compact?: boolean;
}) {
  const shown = cardFields.filter((f) => fields.includes(f.id) && f.id !== "focus");
  const showFocus = fields.includes("focus");

  return (
    <article
      className={cn(
        "overflow-hidden rounded-[14px] border border-ink bg-ink text-white",
        className,
      )}
    >
      <div className={cn("px-5", compact ? "pt-4 pb-3.5" : "pt-5 pb-4")}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[10.5px] font-semibold tracking-[0.18em] text-[color:var(--asbm-gold-light)]">
              ASBM
            </div>
            <h2
              className={cn(
                "mt-2 font-semibold tracking-[-0.01em]",
                compact ? "text-[18px]" : "text-[22px]",
              )}
            >
              {myCard.name}
            </h2>
            <p className="text-[13px] text-white/80">{myCard.title}</p>
          </div>
          <span
            aria-hidden
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[color:var(--asbm-gold)] text-[14px] font-semibold text-[color:var(--asbm-black)]"
          >
            SA
          </span>
        </div>

        {showFocus && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {myCard.focus.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 px-2 py-[2px] text-[10.5px] text-white/70"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      <dl className="border-t border-white/10 px-5 py-3.5">
        {shown.map((field) => (
          <div
            key={field.id}
            className="flex items-baseline justify-between gap-4 border-b border-white/[0.07] py-1.5 last:border-b-0"
          >
            <dt className="shrink-0 text-[11px] text-white/45">{field.label}</dt>
            <dd className="min-w-0 text-right text-[12.5px] break-words text-white/90">
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
