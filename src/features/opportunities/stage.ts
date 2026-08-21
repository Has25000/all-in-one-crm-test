import { useMemo } from "react";
import { opportunities } from "../../data/opportunities";
import { useDemoState } from "../../state/DemoState";
import type { Opportunity } from "../../data/types";

/**
 * Opportunities with any stage moves made on the board this session applied on
 * top. Every view reads through here so a card dragged on the board is in the
 * right place on the table and the timeline too.
 */
export function useOpportunities(): Opportunity[] {
  const { stageOverrides } = useDemoState();
  return useMemo(
    () =>
      opportunities.map((o) =>
        stageOverrides[o.id] ? { ...o, stage: stageOverrides[o.id] } : o,
      ),
    [stageOverrides],
  );
}
