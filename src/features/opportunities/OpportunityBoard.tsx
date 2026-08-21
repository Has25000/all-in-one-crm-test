import { useState } from "react";
import { OpportunityCardMini } from "./OpportunityCardMini";
import { stageLabel, stageOrder, stageToken } from "../../data/opportunities";
import { formatMoney } from "../../data/selectors";
import { useDemoState } from "../../state/DemoState";
import type { Opportunity, OpportunityStage } from "../../data/types";
import { cn } from "../../components/ui/cn";

/**
 * The board. Columns are stages; a card moves by dragging it or by pressing
 * the arrow keys while it has focus.
 */
export function OpportunityBoard({ items }: { items: Opportunity[] }) {
  const { moveStage } = useDemoState();
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overStage, setOverStage] = useState<OpportunityStage | null>(null);

  return (
    <div className="scroll-slim overflow-x-auto pb-2">
      <div className="flex min-w-[1200px] gap-3">
        {stageOrder.map((stage) => {
          const column = items.filter((o) => o.stage === stage);
          const columnValue = column.reduce((sum, o) => sum + (o.potentialValue ?? 0), 0);
          const token = stageToken[stage];

          return (
            <section
              key={stage}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                setOverStage(stage);
              }}
              onDragLeave={() => setOverStage((s) => (s === stage ? null : s))}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData("text/plain");
                if (id) moveStage(id, stage);
                setOverStage(null);
                setDraggingId(null);
              }}
              className={cn(
                "flex w-[206px] shrink-0 flex-col rounded-[12px] border p-2 transition-colors duration-200",
                overStage === stage
                  ? "border-[color:var(--asbm-gold)] bg-gold-light/40"
                  : "border-line bg-cream/40",
              )}
            >
              <header className="px-1 pb-2">
                <div className="flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className="size-[8px] rounded-full"
                    style={{ background: token.dot }}
                  />
                  <h3 className="text-[12.5px] font-semibold text-ink">{stageLabel[stage]}</h3>
                  <span className="ml-auto text-[11.5px] text-muted tabular-nums">
                    {column.length}
                  </span>
                </div>
                {columnValue > 0 && (
                  <p className="mt-0.5 pl-3.5 text-[11px] text-muted tabular-nums">
                    {formatMoney(columnValue)}
                  </p>
                )}
              </header>

              <div className="flex flex-1 flex-col gap-2">
                {column.map((opportunity) => (
                  <OpportunityCardMini
                    key={opportunity.id}
                    opportunity={opportunity}
                    dragging={draggingId === opportunity.id}
                    onDragStart={() => setDraggingId(opportunity.id)}
                    onDragEnd={() => {
                      setDraggingId(null);
                      setOverStage(null);
                    }}
                  />
                ))}
                {column.length === 0 && (
                  <p className="rounded-[10px] border border-dashed border-line px-2 py-6 text-center text-[11px] text-muted">
                    Nothing here
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
