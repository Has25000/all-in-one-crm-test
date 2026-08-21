import { Chip } from "../../components/ui/Chip";
import { useDemoState } from "../../state/DemoState";
import { stageLabel } from "../../data/opportunities";
import { getClient, getPerson } from "../../data/selectors";
import type { Opportunity } from "../../data/types";

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const { openDrawer, openModal } = useDemoState();
  const client = opportunity.clientIds.map(getClient).filter(Boolean)[0];
  const contact = opportunity.contactIds.map(getPerson).filter(Boolean)[0];

  return (
    <article className="flex flex-col rounded-[12px] border border-line bg-paper p-4">
      <div className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={() => openModal({ kind: "opportunity", opportunityId: opportunity.id })}
          className="min-w-0 text-left"
        >
          <h3 className="truncate text-[14px] font-semibold text-ink">{opportunity.title}</h3>
          <p className="truncate text-[12.5px] text-muted">{opportunity.organization}</p>
        </button>
        <Chip tone="gold">{stageLabel[opportunity.stage]}</Chip>
      </div>

      <dl className="mt-3.5 space-y-1.5 text-[12.5px]">
        {client && (
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Related client</dt>
            <dd className="truncate font-medium text-ink">{client.name}</dd>
          </div>
        )}
        <div className="flex justify-between gap-3">
          <dt className="text-muted">Type</dt>
          <dd className="truncate text-charcoal">{opportunity.kind}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted">Next action</dt>
          <dd className="truncate font-medium text-ink">{opportunity.nextAction}</dd>
        </div>
      </dl>

      {contact && (
        <button
          type="button"
          onClick={() => openDrawer(contact.id)}
          className="mt-3.5 self-start text-[12.5px] font-medium text-charcoal underline decoration-[color:var(--asbm-gold)] decoration-2 underline-offset-4 transition-colors duration-200 hover:text-ink"
        >
          {contact.name}
        </button>
      )}
    </article>
  );
}
