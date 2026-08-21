import { useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, PageHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { cn } from "../components/ui/cn";
import { useDemoState } from "../state/DemoState";
import { DEMO_TODAY } from "../data/today";
import { eventCategoryLabel } from "../data/calendar";
import { calendarEvents, formatHour, getClient, getPerson } from "../data/selectors";
import type { CalendarEvent, EventCategory } from "../data/types";

type View = "day" | "week" | "month";

const CATEGORY_STYLE: Record<EventCategory, { bg: string; bar: string; text: string }> = {
  client: { bg: "var(--asbm-green-light)", bar: "var(--asbm-green)", text: "var(--asbm-green)" },
  brand: { bg: "var(--asbm-gold-light)", bar: "var(--asbm-gold)", text: "var(--asbm-black)" },
  media: { bg: "var(--asbm-cream-deep)", bar: "var(--asbm-warm-neutral)", text: "var(--asbm-charcoal)" },
  internal: { bg: "var(--asbm-cream)", bar: "var(--asbm-muted)", text: "var(--asbm-charcoal)" },
  community: { bg: "var(--asbm-green-light)", bar: "var(--asbm-success)", text: "var(--asbm-green)" },
  networking: { bg: "var(--asbm-cream-deep)", bar: "var(--asbm-charcoal)", text: "var(--asbm-charcoal)" },
};

const DAY_START = 8;
const DAY_END = 18;
const HOUR_HEIGHT = 52;

const eventsOnDay = (day: Date) =>
  calendarEvents
    .filter((e) => isSameDay(parseISO(e.date), day))
    .sort((a, b) => a.start - b.start);

/** Compact label for a meeting: who it's with matters more than the title. */
function EventChip({
  event,
  onOpen,
  dense = false,
}: {
  event: CalendarEvent;
  onOpen: () => void;
  dense?: boolean;
}) {
  const style = CATEGORY_STYLE[event.category];
  const person = event.participantIds.map(getPerson).filter(Boolean)[0];
  const short = event.end - event.start <= 0.5;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-start gap-1.5 overflow-hidden rounded-[7px] px-1.5 py-1 text-left transition-[filter] duration-200 hover:brightness-[0.97]"
      style={{ background: style.bg }}
    >
      <span aria-hidden className="mt-0.5 h-full w-[3px] shrink-0 self-stretch rounded-full" style={{ background: style.bar }} />
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block text-[11px] leading-tight font-semibold",
            dense || short ? "truncate" : "line-clamp-2",
          )}
          style={{ color: style.text }}
        >
          {event.title}
        </span>
        {!dense && person && (
          <span className="block truncate text-[10px] leading-tight text-charcoal/75">
            {person.name}
          </span>
        )}
        {!dense && (
          <span className="block truncate text-[9.5px] leading-tight text-muted">
            {formatHour(event.start)}
          </span>
        )}
      </span>
    </button>
  );
}

function TimeGrid({ days, onOpen }: { days: Date[]; onOpen: (id: string) => void }) {
  const hours = Array.from({ length: DAY_END - DAY_START }, (_, i) => DAY_START + i);

  return (
    <div className="scroll-slim overflow-x-auto">
      <div className="min-w-[680px]">
        <div
          className="grid border-b border-line"
          style={{ gridTemplateColumns: `70px repeat(${days.length}, minmax(0, 1fr))` }}
        >
          <div />
          {days.map((day) => {
            const isToday = isSameDay(day, DEMO_TODAY);
            return (
              <div key={day.toISOString()} className="px-2 pb-2 text-center">
                <div className="eyebrow">{format(day, "EEE")}</div>
                <div
                  className={cn(
                    "mx-auto mt-1 flex size-7 items-center justify-center rounded-full text-[13px] font-semibold tabular-nums",
                    isToday ? "bg-ink text-white" : "text-charcoal",
                  )}
                >
                  {format(day, "d")}
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="relative grid"
          style={{ gridTemplateColumns: `70px repeat(${days.length}, minmax(0, 1fr))` }}
        >
          <div>
            {hours.map((hour) => (
              <div
                key={hour}
                className="relative border-b border-line pr-2 text-right"
                style={{ height: HOUR_HEIGHT }}
              >
                <span className="absolute -top-1.5 right-2 text-[10.5px] whitespace-nowrap text-muted tabular-nums">
                  {formatHour(hour)}
                </span>
              </div>
            ))}
          </div>

          {days.map((day) => (
            <div key={day.toISOString()} className="relative border-l border-line">
              {hours.map((hour) => (
                <div key={hour} className="border-b border-line" style={{ height: HOUR_HEIGHT }} />
              ))}
              {eventsOnDay(day).map((event) => (
                <div
                  key={event.id}
                  className="absolute right-1 left-1"
                  style={{
                    top: (event.start - DAY_START) * HOUR_HEIGHT + 1,
                    height: Math.max((event.end - event.start) * HOUR_HEIGHT - 3, 34),
                  }}
                >
                  <EventChip event={event} onOpen={() => onOpen(event.id)} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MonthGrid({ anchor, onOpen }: { anchor: Date; onOpen: (id: string) => void }) {
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(anchor), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(anchor), { weekStartsOn: 1 }),
  });

  return (
    <div className="scroll-slim overflow-x-auto">
      <div className="min-w-[680px]">
        <div className="grid grid-cols-7 border-b border-line pb-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((label) => (
            <div key={label} className="eyebrow text-center">
              {label}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day) => {
            const events = eventsOnDay(day);
            const isToday = isSameDay(day, DEMO_TODAY);
            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "min-h-[104px] border-r border-b border-line p-1.5",
                  !isSameMonth(day, anchor) && "bg-cream/50",
                )}
              >
                <div
                  className={cn(
                    "mb-1 flex size-6 items-center justify-center rounded-full text-[12px] font-semibold tabular-nums",
                    isToday ? "bg-ink text-white" : "text-charcoal",
                    !isSameMonth(day, anchor) && !isToday && "text-muted",
                  )}
                >
                  {format(day, "d")}
                </div>
                <div className="space-y-1">
                  {events.slice(0, 2).map((event) => (
                    <EventChip key={event.id} event={event} onOpen={() => onOpen(event.id)} dense />
                  ))}
                  {events.length > 2 && (
                    <p className="pl-1.5 text-[10px] text-muted">+{events.length - 2} more</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function CalendarPage() {
  const { openModal } = useDemoState();
  const [view, setView] = useState<View>("week");
  const [anchor, setAnchor] = useState<Date>(DEMO_TODAY);

  const days = useMemo(() => {
    if (view === "day") return [anchor];
    if (view === "week") {
      const start = startOfWeek(anchor, { weekStartsOn: 1 });
      return Array.from({ length: 7 }, (_, i) => addDays(start, i));
    }
    return [];
  }, [view, anchor]);

  const step = (direction: 1 | -1) =>
    setAnchor((current) =>
      view === "month"
        ? addMonths(current, direction)
        : addDays(current, direction * (view === "week" ? 7 : 1)),
    );

  const rangeLabel =
    view === "month"
      ? format(anchor, "MMMM yyyy")
      : view === "day"
        ? format(anchor, "EEEE, MMMM d")
        : `${format(days[0], "MMM d")} – ${format(days[6], "MMM d, yyyy")}`;

  const openEvent = (eventId: string) => openModal({ kind: "event", eventId });

  return (
    <div className="space-y-5">
      <PageHeader
        title="Calendar"
        subtitle="Every meeting carries the relationship behind it — who you're seeing, which client it serves, and what was last discussed."
        action={
          <div className="flex rounded-[10px] border border-line bg-paper p-0.5">
            {(["day", "week", "month"] as View[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setView(value)}
                aria-pressed={view === value}
                className={cn(
                  "rounded-[8px] px-3.5 py-1.5 text-[12.5px] font-medium capitalize transition-colors duration-200",
                  view === value ? "bg-ink text-white" : "text-muted hover:text-ink",
                )}
              >
                {value}
              </button>
            ))}
          </div>
        }
      />

      <Card>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous"
              className="rounded-lg border border-line p-1.5 text-charcoal transition-colors duration-200 hover:bg-cream"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next"
              className="rounded-lg border border-line p-1.5 text-charcoal transition-colors duration-200 hover:bg-cream"
            >
              <ChevronRight size={15} />
            </button>
            <h2 className="ml-1 text-[15px] font-semibold text-ink">{rangeLabel}</h2>
            <Button size="sm" variant="ghost" onClick={() => setAnchor(DEMO_TODAY)}>
              Today
            </Button>
          </div>

          <ul className="flex flex-wrap gap-x-3.5 gap-y-1">
            {(Object.keys(eventCategoryLabel) as EventCategory[]).map((category) => (
              <li key={category} className="flex items-center gap-1.5 text-[11.5px] text-muted">
                <span
                  aria-hidden
                  className="size-[8px] rounded-[2px]"
                  style={{ background: CATEGORY_STYLE[category].bar }}
                />
                {eventCategoryLabel[category]}
              </li>
            ))}
          </ul>
        </div>

        {view === "month" ? (
          <MonthGrid anchor={anchor} onOpen={openEvent} />
        ) : (
          <TimeGrid days={days} onOpen={openEvent} />
        )}
      </Card>

      <Card>
        <h2 className="text-[15px] font-semibold text-ink">Coming up next</h2>
        <ul className="mt-3 divide-y divide-[color:var(--asbm-border)]">
          {calendarEvents
            .filter((e) => e.date >= "2026-08-21")
            .slice(0, 5)
            .map((event) => {
              const person = event.participantIds.map(getPerson).filter(Boolean)[0];
              const client = event.relatedClientId ? getClient(event.relatedClientId) : undefined;
              return (
                <li key={event.id}>
                  <button
                    type="button"
                    onClick={() => openEvent(event.id)}
                    className="flex w-full flex-wrap items-baseline gap-x-4 gap-y-0.5 py-2.5 text-left transition-colors duration-200 hover:bg-cream"
                  >
                    <span className="w-[92px] shrink-0 text-[12.5px] font-semibold text-ink tabular-nums">
                      {format(parseISO(event.date), "EEE, MMM d")}
                    </span>
                    <span className="w-[72px] shrink-0 text-[12.5px] text-muted tabular-nums">
                      {formatHour(event.start)}
                    </span>
                    <span className="text-[13px] font-medium text-ink">{event.title}</span>
                    <span className="text-[12.5px] text-muted">
                      {person?.name}
                      {client ? ` · ${client.name}` : ""}
                    </span>
                  </button>
                </li>
              );
            })}
        </ul>
      </Card>
    </div>
  );
}
