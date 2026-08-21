import { ArrowUpRight } from "lucide-react";
import { Avatar } from "../../components/ui/Avatar";
import { StrengthDot } from "../../components/ui/StrengthDot";
import { useDemoState } from "../../state/DemoState";
import type { Client } from "../../data/types";

export function ClientCard({ client }: { client: Client }) {
  const { openModal } = useDemoState();

  return (
    <button
      type="button"
      onClick={() => openModal({ kind: "client", clientId: client.id })}
      className="group flex w-full flex-col rounded-[12px] border border-line bg-paper p-4 text-left transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[color:var(--asbm-gold)]/60 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="flex items-start gap-3">
        <Avatar name={client.name} category="client" size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-[15px] font-semibold text-ink">{client.name}</h3>
            <ArrowUpRight
              size={15}
              aria-hidden
              className="mt-0.5 shrink-0 text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          </div>
          <p className="truncate text-[12.5px] text-muted">{client.discipline}</p>
          <div className="mt-1.5">
            <StrengthDot strength={client.relationshipStrength} />
          </div>
        </div>
      </div>

      <dl className="mt-4 space-y-2 border-t border-line pt-3">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-[12px] text-muted">Active initiatives</dt>
          <dd className="text-[13px] font-semibold text-ink tabular-nums">
            {client.activeInitiatives}
          </dd>
        </div>
        <div>
          <dt className="text-[12px] text-muted">Next</dt>
          <dd className="text-[13px] font-medium text-ink">{client.nextMilestone}</dd>
        </div>
      </dl>
    </button>
  );
}
