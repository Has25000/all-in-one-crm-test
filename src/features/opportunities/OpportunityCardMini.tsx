import { GripVertical } from "lucide-react";
import { Avatar } from "../../components/ui/Avatar";
import { useDemoState } from "../../state/DemoState";
import { formatDate, formatMoney, getClient, getPerson } from "../../data/selectors";
import { stageOrder } from "../../data/opportunities";
import type { Opportunity } from "../../data/types";
import { cn } from "../../components/ui/cn";

/**
 * A board card. Drag it between columns, or move it with the arrow keys —
 * dragging should never be the only way to do something.
 */
export function OpportunityCardMini({
  opportunity,
  dragging,
  onDragStart,
  onDragEnd,
}: {
  opportunity: Opportunity;
  dragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
}) {
  const { openModal, moveStage } = useDemoState();
  const client = opportunity.clientIds.map(getClient).filter(Boolean)[0];
  const contact = opportunity.contactIds.map(getPerson).filter(Boolean)[0];

  const shift = (direction: -1 | 1) => {
    const index = stageOrder.indexOf(opportunity.stage);
    const next = stageOrder[index + direction];
    if (next) moveStage(opportunity.id, next);
  };

  return (
    <article
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", opportunity.id);
        e.dataTransfer.effectAllowed = "move";
        onDragStart();
      }}
      onDragEnd={onDragEnd}
      tabIndex={0}
      role="button"
      aria-label={`${opportunity.title}. Use left and right arrow keys to change stage, Enter to open.`}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          shift(-1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          shift(1);
        } else if (e.key === "Enter") {
          e.preventDefault();
          openModal({ kind: "opportunity", opportunityId: opportunity.id });
        }
      }}
      onClick={() => openModal({ kind: "opportunity", opportunityId: opportunity.id })}
      className={cn(
        "group cursor-pointer rounded-[11px] border border-line bg-paper p-3 transition-[border-color,box-shadow,opacity] duration-200 hover:border-[color:var(--asbm-gold)]/60 hover:shadow-[var(--shadow-lift)]",
        dragging && "opacity-40",
      )}
    >
      <div className="flex items-start gap-2">
        <GripVertical
          size={13}
          aria-hidden
          className="mt-0.5 shrink-0 text-muted/50 transition-colors duration-200 group-hover:text-muted"
        />
        <div className="min-w-0 flex-1">
          <h4 className="text-[13px] leading-snug font-semibold text-ink">{opportunity.title}</h4>
          <p className="truncate text-[11.5px] text-muted">{opportunity.organization}</p>
        </div>
        {opportunity.priority === "high" && (
          <span
            aria-label="High priority"
            title="High priority"
            className="mt-1 size-[6px] shrink-0 rounded-full bg-[color:var(--asbm-warning)]"
          />
        )}
      </div>

      <p className="mt-2 line-clamp-1 text-[11.5px] text-charcoal">{opportunity.nextAction}</p>

      <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-line pt-2">
        <span className="flex min-w-0 items-center gap-1.5">
          {contact && <Avatar name={contact.name} category={contact.category} size="xs" />}
          {client && (
            <span className="truncate text-[11px] text-muted">{client.name}</span>
          )}
        </span>
        <span className="shrink-0 text-right">
          {opportunity.potentialValue && (
            <span className="block text-[11.5px] font-semibold text-ink tabular-nums">
              {formatMoney(opportunity.potentialValue)}
            </span>
          )}
          {opportunity.expectedDate && (
            <span className="block text-[10.5px] text-muted tabular-nums">
              {formatDate(opportunity.expectedDate)}
            </span>
          )}
        </span>
      </div>
    </article>
  );
}
