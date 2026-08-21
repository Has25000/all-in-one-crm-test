import { ScanLine } from "lucide-react";
import { Card, PageHeader, SectionHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";
import { Avatar } from "../components/ui/Avatar";
import { EventCard } from "../features/events/EventCard";
import { useDemoState } from "../state/DemoState";
import {
  dateRangeLabel,
  eventTimingLabel,
  getPerson,
  pastEvents,
  touchStatus,
  upcomingEvents,
} from "../data/selectors";

export function EventsPage() {
  const { openModal, openDrawer, captured } = useDemoState();
  const upcoming = upcomingEvents();
  const past = pastEvents();
  const next = upcoming[0];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Events"
        meta={<span className="text-[14px] text-muted">{upcoming.length} coming up</span>}
        subtitle="Most relationships start in a room. This is who will be there, who is worth meeting, and what came out of the last one."
        action={
          next && (
            <Button
              variant="primary"
              onClick={() => openModal({ kind: "capture", eventId: next.id })}
            >
              <ScanLine size={15} aria-hidden />
              Open capture
            </Button>
          )
        }
      />

      <Card>
        <SectionHeader
          title="Coming up"
          subtitle="Decide what each room is for before you walk into it."
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {upcoming.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </Card>

      {captured.length > 0 && (
        <Card>
          <SectionHeader
            title="Captured this session"
            subtitle="Everyone added live, tagged with where you met them."
          />
          <ul className="mt-4 divide-y divide-[color:var(--asbm-border)]">
            {captured.map((contact) => (
              <li key={contact.id} className="flex flex-wrap items-center gap-3 py-3">
                <Avatar name={contact.name} category={contact.category} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-medium text-ink">
                    {contact.name}
                  </span>
                  <span className="block truncate text-[12px] text-muted">
                    {contact.title} · {contact.organization}
                  </span>
                  {contact.note && (
                    <span className="block truncate text-[12px] text-charcoal">{contact.note}</span>
                  )}
                </span>
                {contact.followUp && <Chip tone="gold">Follow-up queued</Chip>}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card>
        <SectionHeader
          title="What came out of the last one"
          subtitle="The honest test of whether an event was worth the two days."
        />
        <div className="mt-4 space-y-4">
          {past.map((event) => (
            <div key={event.id} className="rounded-[12px] border border-line bg-cream/40 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-[14.5px] font-semibold text-ink">{event.name}</h3>
                  <p className="text-[12.5px] text-muted">
                    {dateRangeLabel(event)} · {eventTimingLabel(event)}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => openModal({ kind: "network-event", eventId: event.id })}
                >
                  Open brief
                </Button>
              </div>

              <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                {event.metIds.map((id) => {
                  const person = getPerson(id);
                  if (!person) return null;
                  const touch = touchStatus(person);
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => openDrawer(id)}
                        className="flex w-full items-center gap-2.5 rounded-[10px] border border-line bg-paper px-3 py-2 text-left transition-colors duration-200 hover:bg-cream"
                      >
                        <Avatar name={person.name} category={person.category} size="xs" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[12.5px] font-medium text-ink">
                            {person.name}
                          </span>
                          <span className="block truncate text-[11px] text-muted">
                            {person.organization}
                          </span>
                        </span>
                        <Chip tone={touch.overdue ? "gold" : "warm"}>{touch.label}</Chip>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
