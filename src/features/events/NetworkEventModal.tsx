import { CalendarPlus, MapPin, ScanLine, Users } from "lucide-react";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { Chip } from "../../components/ui/Chip";
import { Avatar } from "../../components/ui/Avatar";
import { StrengthDot } from "../../components/ui/StrengthDot";
import { PathChain } from "../../components/ui/PathChain";
import { useDemoState } from "../../state/DemoState";
import { eventKindLabel } from "../../data/events";
import {
  calendarEvents,
  dateRangeLabel,
  daysUntil,
  eventTimingLabel,
  formatHour,
  getClient,
  getEvent,
  getPerson,
  lastInteractionLabel,
  touchStatus,
} from "../../data/selectors";
import { formatDate } from "../../data/selectors";

function PersonRow({
  personId,
  trailing,
  sub,
}: {
  personId: string;
  trailing?: React.ReactNode;
  sub?: string;
}) {
  const { openDrawer } = useDemoState();
  const person = getPerson(personId);
  if (!person) return null;

  return (
    <button
      type="button"
      onClick={() => openDrawer(person.id)}
      className="flex w-full items-center gap-2.5 rounded-[9px] px-2 py-1.5 text-left transition-colors duration-200 hover:bg-cream"
    >
      <Avatar name={person.name} category={person.category} size="xs" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12.5px] font-medium text-ink">{person.name}</span>
        <span className="block truncate text-[11px] text-muted">
          {sub ?? person.organization ?? person.title}
        </span>
      </span>
      {trailing ?? <StrengthDot strength={person.relationshipStrength} showLabel={false} />}
    </button>
  );
}

/**
 * The brief for a room: who from the network will be there, who is worth
 * getting to, what is already booked, and — afterwards — what came out of it.
 */
export function NetworkEventModal() {
  const { modal, closeModal, openModal } = useDemoState();
  const open = modal.kind === "network-event";
  const event = open ? getEvent(modal.eventId) : undefined;

  if (!event) return null;

  const isPast = daysUntil(event.endDate) < 0;
  const meetings = calendarEvents.filter(
    (e) => e.date >= event.startDate && e.date <= event.endDate,
  );
  const clients = event.relatedClientIds.map(getClient).filter(Boolean);

  return (
    <Modal
      open={open}
      onOpenChange={(next) => !next && closeModal()}
      title={event.name}
      description={`${dateRangeLabel(event)} · ${event.venue ?? event.location}`}
      width="640px"
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11.5px] text-muted">Sample event data.</p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                openModal({
                  kind: "quick-action",
                  title: "Added to your calendar",
                  body: `${event.name} would be held in your calendar with the people you know attending attached to it.`,
                })
              }
            >
              <CalendarPlus size={14} aria-hidden />
              Hold the dates
            </Button>
            <Button
              size="sm"
              variant={isPast ? "secondary" : "primary"}
              onClick={() => openModal({ kind: "capture", eventId: event.id })}
            >
              <ScanLine size={14} aria-hidden />
              {isPast ? "Review capture" : "Open capture"}
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="gold">{eventTimingLabel(event)}</Chip>
          <Chip tone="warm">{eventKindLabel[event.kind]}</Chip>
          <span className="flex items-center gap-1 text-[12px] text-muted">
            <MapPin size={12} aria-hidden />
            {event.location}
          </span>
          <span className="flex items-center gap-1 text-[12px] text-muted">
            <Users size={12} aria-hidden />
            {event.attendingIds.length} people you know
          </span>
        </div>

        <p className="text-[13.5px] leading-relaxed text-charcoal">{event.summary}</p>

        {event.goals.length > 0 && (
          <section>
            <h3 className="eyebrow mb-2">What you want out of it</h3>
            <ul className="space-y-1.5">
              {event.goals.map((goal) => (
                <li key={goal} className="flex items-start gap-2 text-[13px] text-charcoal">
                  <span aria-hidden className="mt-[7px] size-[5px] shrink-0 rounded-full bg-gold" />
                  {goal}
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <section>
            <h3 className="eyebrow mb-2">Who you already know</h3>
            <ul className="space-y-0.5">
              {event.attendingIds.map((id) => (
                <li key={id}>
                  <PersonRow personId={id} />
                </li>
              ))}
            </ul>
          </section>

          {event.targetIds.length > 0 && (
            <section>
              <h3 className="eyebrow mb-2">Worth getting to</h3>
              <ul className="space-y-1.5">
                {event.targetIds.map((id) => {
                  const person = getPerson(id);
                  if (!person) return null;
                  const warmPath =
                    person.connectedThrough && person.connectedThrough !== "Direct"
                      ? person.connectedThrough
                      : undefined;
                  const alsoHere =
                    warmPath &&
                    event.attendingIds.some((a) => getPerson(a)?.name === warmPath);

                  return (
                    <li
                      key={id}
                      className="rounded-[10px] border border-line bg-cream/50 px-3 py-2.5"
                    >
                      <PersonRow
                        personId={id}
                        trailing={
                          <Chip tone={person.lastInteraction ? "warm" : "gold"}>
                            {lastInteractionLabel(person.lastInteraction)}
                          </Chip>
                        }
                      />
                      {warmPath && (
                        <div className="mt-2 px-2">
                          <PathChain nodes={["Sydney", warmPath, person.name]} />
                          {alsoHere && (
                            <p className="mt-1.5 text-[11.5px] text-charcoal">
                              {warmPath.split(" ")[0]} is going too — the introduction could happen
                              in the room.
                            </p>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>

        {meetings.length > 0 && (
          <section>
            <h3 className="eyebrow mb-2">Already booked around it</h3>
            <ul className="space-y-1">
              {meetings.map((meeting) => (
                <li key={meeting.id}>
                  <button
                    type="button"
                    onClick={() => openModal({ kind: "event", eventId: meeting.id })}
                    className="flex w-full items-baseline gap-3 rounded-[9px] px-2 py-1.5 text-left transition-colors duration-200 hover:bg-cream"
                  >
                    <span className="w-[72px] shrink-0 text-[12px] font-semibold text-ink tabular-nums">
                      {formatDate(meeting.date)}
                    </span>
                    <span className="w-[62px] shrink-0 text-[12px] text-muted tabular-nums">
                      {formatHour(meeting.start)}
                    </span>
                    <span className="text-[12.5px] text-charcoal">{meeting.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {event.metIds.length > 0 && (
          <section>
            <h3 className="eyebrow mb-2">Came out of it</h3>
            <ul className="space-y-0.5">
              {event.metIds.map((id) => {
                const person = getPerson(id);
                if (!person) return null;
                const touch = touchStatus(person);
                return (
                  <li key={id}>
                    <PersonRow
                      personId={id}
                      trailing={
                        <Chip tone={touch.overdue ? "gold" : "warm"}>{touch.label}</Chip>
                      }
                    />
                  </li>
                );
              })}
            </ul>
            <p className="mt-2 text-[11.5px] leading-relaxed text-muted">
              One of these went quiet because nothing followed the handshake. Post-event follow-up
              exists to close that gap.
            </p>
          </section>
        )}

        {clients.length > 0 && (
          <section>
            <h3 className="eyebrow mb-2">Clients this serves</h3>
            <div className="flex flex-wrap gap-1.5">
              {clients.map((client) => (
                <button key={client!.id} type="button" onClick={() => openModal({ kind: "client", clientId: client!.id })}>
                  <Chip tone="forest">{client!.name}</Chip>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </Modal>
  );
}
