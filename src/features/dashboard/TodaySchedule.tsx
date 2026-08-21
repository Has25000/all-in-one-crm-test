import { useNavigate } from "react-router-dom";
import { Card, SectionHeader } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useDemoState } from "../../state/DemoState";
import { DEMO_TODAY_ISO } from "../../data/today";
import { eventsOn, formatHour, getClient, getPerson } from "../../data/selectors";

/**
 * Not "meeting at 1:30" — who it is with, where they work, and which client it
 * serves.
 */
export function TodaySchedule() {
  const navigate = useNavigate();
  const { openModal } = useDemoState();
  const events = eventsOn(DEMO_TODAY_ISO);

  return (
    <Card className="flex h-full flex-col">
      <SectionHeader title="Today" subtitle="Friday, August 21" />

      <ul className="mt-4 flex-1 space-y-2">
        {events.map((event) => {
          const person = event.participantIds.map(getPerson).filter(Boolean)[0];
          const client = event.relatedClientId ? getClient(event.relatedClientId) : undefined;
          return (
            <li key={event.id}>
              <button
                type="button"
                onClick={() => openModal({ kind: "event", eventId: event.id })}
                className="flex w-full gap-3 rounded-[11px] border border-line bg-cream/40 p-3 text-left transition-[border-color,background-color] duration-200 hover:border-[color:var(--asbm-gold)]/60 hover:bg-cream"
              >
                <span className="w-[62px] shrink-0 text-[12.5px] font-semibold text-ink tabular-nums">
                  {formatHour(event.start)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-medium text-ink">
                    {event.title}
                  </span>
                  {person && (
                    <span className="block truncate text-[12.5px] text-charcoal">
                      {person.name}
                      {person.organization ? ` · ${person.organization}` : ""}
                    </span>
                  )}
                  <span className="mt-0.5 block truncate text-[11.5px] text-muted">
                    {event.location}
                    {client ? ` · ${client.name}` : ""}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-4">
        <Button size="sm" variant="secondary" onClick={() => navigate("/calendar")}>
          View Calendar
        </Button>
      </div>
    </Card>
  );
}
