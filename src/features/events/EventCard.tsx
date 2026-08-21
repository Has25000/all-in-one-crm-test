import { MapPin, Users } from "lucide-react";
import { Chip } from "../../components/ui/Chip";
import { Avatar } from "../../components/ui/Avatar";
import { useDemoState } from "../../state/DemoState";
import { eventKindLabel } from "../../data/events";
import { dateRangeLabel, eventTimingLabel, getPerson } from "../../data/selectors";
import type { NetworkEvent } from "../../data/types";

export function EventCard({ event }: { event: NetworkEvent }) {
  const { openModal } = useDemoState();
  const attending = event.attendingIds.map(getPerson).filter(Boolean);

  return (
    <button
      type="button"
      onClick={() => openModal({ kind: "network-event", eventId: event.id })}
      className="flex w-full flex-col rounded-[12px] border border-line bg-paper p-4 text-left transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[color:var(--asbm-gold)]/60 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <Chip tone="gold">{eventTimingLabel(event)}</Chip>
        <Chip tone="warm">{eventKindLabel[event.kind]}</Chip>
      </div>

      <h3 className="mt-2.5 text-[15px] leading-snug font-semibold text-ink">{event.name}</h3>
      <p className="text-[12.5px] text-muted">{dateRangeLabel(event)}</p>

      <p className="mt-2 flex items-center gap-1 text-[12px] text-muted">
        <MapPin size={12} aria-hidden />
        {event.venue ?? event.location}
      </p>

      <p className="mt-2.5 line-clamp-2 text-[12.5px] leading-relaxed text-charcoal">
        {event.summary}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-3.5">
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
  );
}
