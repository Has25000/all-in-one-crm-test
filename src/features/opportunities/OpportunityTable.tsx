import { Fragment } from "react";
import { StageBadge } from "./StageBadge";
import { Table, Td, Th, Tr } from "../../components/ui/Table";
import { Avatar } from "../../components/ui/Avatar";
import { useDemoState } from "../../state/DemoState";
import { formatDate, formatMoney, getClient, getPerson } from "../../data/selectors";
import { priorityLabel } from "../../data/opportunities";
import type { Opportunity } from "../../data/types";

/** A confidence bar reads faster than a number on its own. */
function Confidence({ value = 0 }: { value?: number }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-1.5 w-[52px] overflow-hidden rounded-full bg-cream-deep">
        <span
          className="block h-full rounded-full bg-gold"
          style={{ width: `${value}%` }}
        />
      </span>
      <span className="text-[11.5px] text-muted tabular-nums">{value}%</span>
    </span>
  );
}

export function OpportunityTable({
  groups,
}: {
  groups: { key: string; label: string; items: Opportunity[] }[];
}) {
  const { openModal } = useDemoState();

  return (
    <Table minWidth={1080}>
      <thead>
        <tr>
          <Th>Opportunity</Th>
          <Th>Stage</Th>
          <Th>Client</Th>
          <Th>Next action</Th>
          <Th>Confidence</Th>
          <Th>Potential</Th>
          <Th>Decision</Th>
          <Th>Owner</Th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group) => (
          <Fragment key={group.key}>
            {group.label && (
              <tr>
                <Td colSpan={8} className="bg-cream/70">
                  <span className="flex items-center gap-2">
                    <span className="text-[12px] font-semibold text-ink">{group.label}</span>
                    <span className="text-[11.5px] text-muted tabular-nums">
                      {group.items.length}
                    </span>
                  </span>
                </Td>
              </tr>
            )}
            {group.items.map((opportunity) => {
              const client = opportunity.clientIds.map(getClient).filter(Boolean)[0];
              const contact = opportunity.contactIds.map(getPerson).filter(Boolean)[0];

              return (
                <Tr
                  key={opportunity.id}
                  onClick={() =>
                    openModal({ kind: "opportunity", opportunityId: opportunity.id })
                  }
                  ariaLabel={`Open ${opportunity.title}`}
                >
                  <Td>
                    <span className="flex items-center gap-2.5">
                      {contact && (
                        <Avatar name={contact.name} category={contact.category} size="sm" />
                      )}
                      <span className="min-w-0">
                        <span className="block truncate font-medium whitespace-nowrap text-ink">
                          {opportunity.title}
                        </span>
                        <span className="block truncate text-[11.5px] text-muted">
                          {opportunity.organization} · {priorityLabel[opportunity.priority]}
                        </span>
                      </span>
                    </span>
                  </Td>
                  <Td>
                    <StageBadge stage={opportunity.stage} block />
                  </Td>
                  <Td className="whitespace-nowrap text-charcoal">{client?.name ?? "—"}</Td>
                  <Td className="text-charcoal">{opportunity.nextAction}</Td>
                  <Td>
                    <Confidence value={opportunity.confidence} />
                  </Td>
                  <Td className="whitespace-nowrap text-ink tabular-nums">
                    {opportunity.potentialValue ? formatMoney(opportunity.potentialValue) : "—"}
                  </Td>
                  <Td className="whitespace-nowrap text-muted tabular-nums">
                    {opportunity.expectedDate ? formatDate(opportunity.expectedDate) : "—"}
                  </Td>
                  <Td className="whitespace-nowrap text-muted">{opportunity.owner}</Td>
                </Tr>
              );
            })}
          </Fragment>
        ))}
      </tbody>
    </Table>
  );
}
