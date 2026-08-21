import { useState } from "react";
import {
  CalendarClock,
  CircleDot,
  Mail,
  NotebookPen,
  Phone,
  Plus,
  Users,
} from "lucide-react";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { Chip } from "../../components/ui/Chip";
import { Avatar } from "../../components/ui/Avatar";
import { StageBadge } from "./StageBadge";
import { useOpportunities } from "./stage";
import { useDemoState } from "../../state/DemoState";
import { priorityLabel, stageLabel, stageOrder } from "../../data/opportunities";
import {
  activityForOpportunity,
  documentsForClient,
  formatDate,
  formatMoney,
  getClient,
  getPerson,
  weightedValue,
} from "../../data/selectors";
import type { RecordActivity } from "../../data/types";
import { cn } from "../../components/ui/cn";

const ACTIVITY_ICON: Record<RecordActivity["type"], typeof Mail> = {
  call: Phone,
  email: Mail,
  meeting: Users,
  note: NotebookPen,
  stage: CircleDot,
};

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11.5px] text-muted">{label}</dt>
      <dd className="mt-0.5 text-[13px] font-medium text-ink">{value}</dd>
    </div>
  );
}

/**
 * One record, in full: where it stands, who it depends on, and everything that
 * has happened on it.
 */
export function OpportunityDetailModal() {
  const { modal, closeModal, openDrawer, openModal, moveStage, loggedActivity } =
    useDemoState();
  const items = useOpportunities();
  const [stageOpen, setStageOpen] = useState(false);

  const open = modal.kind === "opportunity";
  const opportunity = open ? items.find((o) => o.id === modal.opportunityId) : undefined;
  if (!opportunity) return null;

  const clients = opportunity.clientIds.map(getClient).filter(Boolean);
  const contacts = opportunity.contactIds.map(getPerson).filter(Boolean);
  const files = clients.flatMap((c) => documentsForClient(c!.id)).slice(0, 4);

  const activity = [
    ...loggedActivity.filter((a) => a.opportunityId === opportunity.id),
    ...activityForOpportunity(opportunity.id),
  ];

  return (
    <Modal
      open={open}
      onOpenChange={(next) => !next && closeModal()}
      title={opportunity.title}
      description={`${opportunity.organization} · ${opportunity.kind}`}
      width="660px"
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11.5px] text-muted">Sample record.</p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                openModal({ kind: "log-activity", opportunityId: opportunity.id })
              }
            >
              <Plus size={14} aria-hidden />
              Log activity
            </Button>
            {contacts[0] && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => openDrawer(contacts[0]!.id)}
              >
                Open relationship
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Stage control */}
        <section>
          <div className="flex flex-wrap items-center gap-2">
            <StageBadge stage={opportunity.stage} />
            <button
              type="button"
              onClick={() => setStageOpen((v) => !v)}
              aria-expanded={stageOpen}
              className="text-[12px] font-medium text-muted underline decoration-[color:var(--asbm-gold)] decoration-2 underline-offset-4 transition-colors duration-200 hover:text-ink"
            >
              Change stage
            </button>
            <Chip tone={opportunity.priority === "high" ? "gold" : "warm"}>
              {priorityLabel[opportunity.priority]} priority
            </Chip>
          </div>

          {stageOpen && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {stageOrder.map((stage) => (
                <button
                  key={stage}
                  type="button"
                  onClick={() => {
                    moveStage(opportunity.id, stage);
                    setStageOpen(false);
                  }}
                  className={cn(
                    "rounded-[7px] border px-2.5 py-[3px] text-[11.5px] font-medium transition-colors duration-200",
                    stage === opportunity.stage
                      ? "border-[color:var(--asbm-gold)] bg-gold-light text-ink"
                      : "border-line bg-paper text-muted hover:text-ink",
                  )}
                >
                  {stageLabel[stage]}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Record fields */}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3.5 sm:grid-cols-4">
          <Field label="Owner" value={opportunity.owner} />
          <Field
            label="Decision expected"
            value={
              opportunity.expectedDate ? formatDate(opportunity.expectedDate, "MMM d, yyyy") : "—"
            }
          />
          <Field label="Confidence" value={`${opportunity.confidence ?? 0}%`} />
          <Field
            label="Potential"
            value={
              opportunity.potentialValue ? formatMoney(opportunity.potentialValue) : "Not valued"
            }
          />
          <Field label="Opened" value={formatDate(opportunity.openedAt, "MMM d, yyyy")} />
          <Field
            label="Last activity"
            value={opportunity.lastActivity ? formatDate(opportunity.lastActivity) : "None yet"}
          />
          <Field
            label="Weighted"
            value={
              opportunity.potentialValue ? formatMoney(weightedValue(opportunity)) : "—"
            }
          />
          <Field label="Type" value={opportunity.kind} />
        </dl>

        <section className="rounded-[11px] border border-line border-l-[3px] border-l-[color:var(--asbm-gold)] bg-cream/60 px-3.5 py-3">
          <h3 className="eyebrow mb-1">Next action</h3>
          <p className="text-[13.5px] font-medium text-ink">{opportunity.nextAction}</p>
        </section>

        <div className="grid gap-5 sm:grid-cols-2">
          <section>
            <h3 className="eyebrow mb-2">People it depends on</h3>
            <ul className="space-y-0.5">
              {contacts.map((person) => (
                <li key={person!.id}>
                  <button
                    type="button"
                    onClick={() => openDrawer(person!.id)}
                    className="flex w-full items-center gap-2.5 rounded-[9px] px-2 py-1.5 text-left transition-colors duration-200 hover:bg-cream"
                  >
                    <Avatar name={person!.name} category={person!.category} size="xs" />
                    <span className="min-w-0">
                      <span className="block truncate text-[12.5px] font-medium text-ink">
                        {person!.name}
                      </span>
                      <span className="block truncate text-[11px] text-muted">
                        {person!.organization ?? person!.title}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="eyebrow mb-2">Clients it serves</h3>
            <div className="flex flex-wrap gap-1.5">
              {clients.map((client) => (
                <button
                  key={client!.id}
                  type="button"
                  onClick={() => openModal({ kind: "client", clientId: client!.id })}
                >
                  <Chip tone="forest">{client!.name}</Chip>
                </button>
              ))}
            </div>

            {files.length > 0 && (
              <>
                <h3 className="eyebrow mt-4 mb-2">Files</h3>
                <ul className="space-y-1">
                  {files.map((file) => (
                    <li key={file.id} className="truncate text-[12.5px] text-charcoal">
                      {file.title}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>

        {/* Activity log */}
        <section>
          <h3 className="eyebrow mb-2.5">Activity</h3>
          <ol className="relative space-y-3.5 border-l border-line pl-5">
            {activity.map((entry) => {
              const Icon = ACTIVITY_ICON[entry.type];
              return (
                <li key={entry.id} className="relative">
                  <span
                    aria-hidden
                    className="absolute top-0.5 -left-[27px] flex size-[16px] items-center justify-center rounded-full border border-line bg-paper text-muted"
                  >
                    <Icon size={9} />
                  </span>
                  <p className="text-[11.5px] text-muted">
                    {formatDate(entry.date, "MMMM d")} · {entry.author}
                  </p>
                  <p className="text-[12.5px] text-ink">{entry.summary}</p>
                </li>
              );
            })}
            {activity.length === 0 && (
              <li className="text-[12.5px] text-muted">Nothing logged yet.</li>
            )}
          </ol>
        </section>

        {opportunity.expectedDate && (
          <p className="flex items-center gap-1.5 text-[11.5px] text-muted">
            <CalendarClock size={13} aria-hidden />A decision is expected around{" "}
            {formatDate(opportunity.expectedDate, "MMMM d")}.
          </p>
        )}
      </div>
    </Modal>
  );
}
