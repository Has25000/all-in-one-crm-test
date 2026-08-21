import { useNavigate } from "react-router-dom";
import { ScanLine, Users } from "lucide-react";
import { Card, SectionHeader } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Chip } from "../../components/ui/Chip";
import { Avatar } from "../../components/ui/Avatar";
import { useDemoState } from "../../state/DemoState";
import {
  dateRangeLabel,
  eventTimingLabel,
  getPerson,
  upcomingEvents,
} from "../../data/selectors";

/**
 * Rooms Sydney is walking into next — and, more usefully, who is going to be
 * in them.
 */
export function UpcomingEvents() {
  const navigate = useNavigate();
  const { openModal } = useDemoState();
  const events = upcomingEvents().slice(0, 3);

  return (
    <Card className="flex h-full flex-col">
      <SectionHeader
        title="Where you'll be"
        subtitle="Who you know in each room, before you get there."
        action={
          <Button size="sm" variant="secondary" onClick={() => navigate("/events")}>
            All events
          </Button>
        }
      />

      <ul className="mt-4 flex-1 space-y-2.5">
        {events.map((event) => {
          const attending = event.attendingIds.map(getPerson).filter(Boolean);
          return (
            <li key={event.id}>
              <button
                type="button"
                onClick={() => openModal({ kind: "network-event", eventId: event.id })}
                className="w-full rounded-[11px] border border-line bg-cream/40 p-3.5 text-left transition-[border-color,background-color] duration-200 hover:border-[color:var(--asbm-gold)]/60 hover:bg-cream"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] font-semibold text-ink">{event.name}</p>
                    <p className="text-[12px] text-muted">
                      {dateRangeLabel(event)} · {event.location}
                    </p>
                  </div>
                  <Chip tone="gold">{eventTimingLabel(event)}</Chip>
                </div>

                <div className="mt-2.5 flex items-center justify-between gap-3">
                  <span className="flex -space-x-1.5">
                    {attending.slice(0, 5).map((person) => (
                      <Avatar
                        key={person!.id}
                        name={person!.name}
                        category={person!.category}
                        size="xs"
                        className="ring-2 ring-[color:var(--asbm-white)]"
                      />
                    ))}
                  </span>
                  <span className="flex items-center gap-1 text-[11.5px] text-muted">
                    <Users size={12} aria-hidden />
                    {event.attendingIds.length} you know
                    {event.targetIds.length > 0 && ` · ${event.targetIds.length} to meet`}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-4">
        <Button
          size="sm"
          variant="gold"
          onClick={() => openModal({ kind: "capture", eventId: events[0].id })}
        >
          <ScanLine size={14} aria-hidden />
          Capture someone now
        </Button>
      </div>
    </Card>
  );
}
