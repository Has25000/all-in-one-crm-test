import { stageLabel, stageToken } from "../../data/opportunities";
import type { OpportunityStage } from "../../data/types";
import { cn } from "../../components/ui/cn";

/** A stage reads as a filled cell, the way a board column does. */
export function StageBadge({
  stage,
  block = false,
}: {
  stage: OpportunityStage;
  block?: boolean;
}) {
  const token = stageToken[stage];
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[7px] px-2.5 py-[3px] text-[11.5px] font-medium whitespace-nowrap",
        block && "w-full",
      )}
      style={{ background: token.bg, color: token.text }}
    >
      {stageLabel[stage]}
    </span>
  );
}
