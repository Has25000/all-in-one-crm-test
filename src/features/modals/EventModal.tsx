import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { Avatar } from "../../components/ui/Avatar";
import { Chip } from "../../components/ui/Chip";
import { useDemoState } from "../../state/DemoState";
import { eventCategoryLabel } from "../../data/calendar";
import {
  calendarEvents,
  formatDate,
  formatHour,
  getClient,
  getPerson,
  lastInteractionLabel,
} from "../../data/selectors";

/**
 * A meeting is never just a time slot — it comes with the relationship behind
 * it, the client it serves, and what was last discussed.
 */
export function EventModal() {
  const { modal, closeModal, openDrawer } = useDemoState();
  const open = modal.kind === "event";
  const event = open ? calendarEvents.find((e) => e.id === modal.eventId) : undefined;

  if (!event) return null;

  const participants = event.participantIds.map(getPerson).filter(Boolean);
  const client = event.relatedClientId ? getClient(event.relatedClientId) : undefined;
  const primary = participants[0];

  return (
    <Modal
      open={open}
      onOpenChange={(next) => !next && closeModal()}
      title={event.title}
      description={`${formatDate(event.date, "EEEE")} · ${formatHour(event.start)}–${formatHour(event.end)}${event.location ? ` · ${event.location}` : ""}`}
      width="500px"
      footer={
        primary ? (
          <div className="flex justify-end">
            <Button variant="primary" size="sm" onClick={() => openDrawer(primary.id)}>
              Open Relationship
            </Button>
          </div>
        ) : undefined
      }
    >
      <div className="space-y-5">
        <div>
          <Chip tone={event.category === "client" ? "forest" : "neutral"}>
            {eventCategoryLabel[event.category]}
          </Chip>
        </div>

        {participants.length > 0 && (
          <div>
            <div className="eyebrow mb-2">Participants</div>
            <ul className="space-y-1.5">
              {participants.map((person) => (
                <li key={person!.id}>
                  <button
                    type="button"
                    onClick={() => openDrawer(person!.id)}
                    className="flex w-full items-center gap-2.5 rounded-[9px] px-2 py-1.5 text-left transition-colors duration-200 hover:bg-cream"
                  >
                    <Avatar name={person!.name} category={person!.category} size="sm" />
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-medium text-ink">
                        {person!.name}
                      </span>
                      <span className="block truncate text-[11.5px] text-muted">
                        {person!.title}
                        {person!.organization ? ` · ${person!.organization}` : ""}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
              <li className="flex items-center gap-2.5 px-2 py-1.5">
                <span className="flex size-8 items-center justify-center rounded-full bg-forest text-[11px] font-semibold text-white">
                  SA
                </span>
                <span className="text-[13px] font-medium text-ink">Sydney Anderson</span>
              </li>
            </ul>
          </div>
        )}

        {client && (
          <div>
            <div className="eyebrow mb-1.5">Related client</div>
            <Chip tone="forest">
              {client.name} · {client.discipline}
            </Chip>
          </div>
        )}

        {event.preparation && (
          <div>
            <div className="eyebrow mb-1.5">Preparation</div>
            <p className="border-l-2 border-[color:var(--asbm-gold)] bg-cream/70 px-3 py-2 text-[13px] leading-relaxed text-charcoal">
              {event.preparation}
            </p>
          </div>
        )}

        {primary && (
          <div>
            <div className="eyebrow mb-1.5">Context</div>
            <p className="text-[12.5px] text-muted">
              Last conversation with {primary.name.split(" ")[0]} ·{" "}
              {lastInteractionLabel(primary.lastInteraction).toLowerCase()}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
