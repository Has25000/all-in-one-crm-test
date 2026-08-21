import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { StageBadge } from "./StageBadge";
import { useDemoState } from "../../state/DemoState";
import { DEMO_TODAY, DEMO_TODAY_ISO } from "../../data/today";
import { formatMoney, getClient } from "../../data/selectors";
import type { Opportunity } from "../../data/types";

const WINDOW_DAYS = 120;

/**
 * When each decision is expected, laid out against today. The point is to see
 * what is bunching up, not to plan to the day.
 */
export function OpportunityTimeline({ items }: { items: Opportunity[] }) {
  const { openModal } = useDemoState();

  // The timeline is about decisions still ahead — anything already settled
  // belongs on the board, not here.
  const dated = items
    .filter((o) => o.expectedDate && o.expectedDate >= DEMO_TODAY_ISO)
    .sort((a, b) => a.expectedDate!.localeCompare(b.expectedDate!));

  const months = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(DEMO_TODAY.getFullYear(), DEMO_TODAY.getMonth() + i, 1);
    return format(date, "MMM");
  });

  return (
    <div className="scroll-slim overflow-x-auto">
      <div className="min-w-[820px]">
        <div className="mb-2 grid grid-cols-[220px_1fr] gap-4">
          <div />
          <div className="grid grid-cols-5 border-b border-line pb-1.5">
            {months.map((month) => (
              <span key={month} className="eyebrow">
                {month}
              </span>
            ))}
          </div>
        </div>

        <ul className="space-y-1.5">
          {dated.map((opportunity) => {
            const offset = differenceInCalendarDays(
              parseISO(opportunity.expectedDate!),
              DEMO_TODAY,
            );
            const left = Math.max(0, Math.min(96, (offset / WINDOW_DAYS) * 100));
            const client = opportunity.clientIds.map(getClient).filter(Boolean)[0];

            return (
              <li key={opportunity.id}>
                <button
                  type="button"
                  onClick={() =>
                    openModal({ kind: "opportunity", opportunityId: opportunity.id })
                  }
                  className="grid w-full grid-cols-[220px_1fr] items-center gap-4 rounded-[9px] px-1 py-1.5 text-left transition-colors duration-200 hover:bg-cream"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[12.5px] font-medium text-ink">
                      {opportunity.title}
                    </span>
                    <span className="block truncate text-[11px] text-muted">
                      {client?.name ?? opportunity.organization}
                    </span>
                  </span>

                  <span className="relative block h-7 rounded-[6px] bg-cream/70">
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-px bg-[color:var(--asbm-gold)]"
                    />
                    <span
                      className="absolute top-1/2 flex -translate-y-1/2 items-center gap-2"
                      style={{ left: `${left}%` }}
                    >
                      <StageBadge stage={opportunity.stage} />
                      <span className="text-[11px] whitespace-nowrap text-muted tabular-nums">
                        {format(parseISO(opportunity.expectedDate!), "MMM d")}
                        {opportunity.potentialValue
                          ? ` · ${formatMoney(opportunity.potentialValue)}`
                          : ""}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-3 text-[11.5px] text-muted">
          The gold line is today. Positions are indicative — dates are when a decision is expected.
          Anything already decided sits on the board rather than here.
        </p>

        {dated.length === 0 && (
          <p className="py-8 text-center text-[13px] text-muted">
            Nothing ahead in this filter.
          </p>
        )}
      </div>
    </div>
  );
}
