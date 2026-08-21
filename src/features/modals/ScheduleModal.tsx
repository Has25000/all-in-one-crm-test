import { useState } from "react";
import { CalendarCheck, Check, Copy, Link2 } from "lucide-react";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { useDemoState } from "../../state/DemoState";
import { myCard } from "../../data/automations";
import { availableSlots, formatHour, getPerson, slotLabel } from "../../data/selectors";
import { format, parseISO } from "date-fns";
import type { TimeSlot } from "../../data/types";
import { cn } from "../../components/ui/cn";

/**
 * Proposing a time reads real gaps out of the seeded calendar, so the slots
 * offered are genuinely the ones that are free.
 */
export function ScheduleModal() {
  const { modal, closeModal, proposeMeeting } = useDemoState();
  const [chosen, setChosen] = useState<TimeSlot | null>(null);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const open = modal.kind === "schedule";
  const person = open ? getPerson(modal.personId) : undefined;
  if (!person) return null;

  const slots = availableSlots({ limit: 6 });

  const close = () => {
    closeModal();
    setChosen(null);
    setSent(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={(next) => !next && close()}
      title={`Find time with ${person.name.split(" ")[0]}`}
      description={
        sent
          ? undefined
          : "These are the gaps actually open in your calendar over the next two weeks."
      }
      width="520px"
      footer={
        sent ? (
          <div className="flex justify-end">
            <Button size="sm" variant="primary" onClick={close}>
              Done
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11.5px] text-muted">Nothing is sent from this concept demo.</p>
            <Button
              size="sm"
              variant="primary"
              disabled={!chosen}
              onClick={() => {
                if (!chosen) return;
                proposeMeeting({ personId: person.id, slot: chosen });
                setSent(true);
              }}
            >
              <CalendarCheck size={14} aria-hidden />
              Propose this time
            </Button>
          </div>
        )
      }
    >
      {sent && chosen ? (
        <div>
          <div className="rounded-[12px] border border-[color:var(--asbm-success)]/25 bg-forest-light px-4 py-4">
            <p className="text-[14px] font-semibold text-ink">
              Proposed to {person.name}
            </p>
            <p className="mt-0.5 text-[13px] text-charcoal">{slotLabel(chosen)}</p>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-charcoal">
            The invitation would carry the context with it — {person.organization ?? person.title},
            what you last spoke about, and the client it relates to — so neither of you arrives cold.
          </p>
        </div>
      ) : (
        <div>
          <ul className="space-y-1.5">
            {slots.map((slot) => {
              const active =
                chosen?.date === slot.date && chosen?.start === slot.start;
              return (
                <li key={`${slot.date}-${slot.start}`}>
                  <button
                    type="button"
                    onClick={() => setChosen(slot)}
                    aria-pressed={active}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-[10px] border px-3.5 py-2.5 text-left transition-colors duration-200",
                      active
                        ? "border-[color:var(--asbm-gold)] bg-gold-light"
                        : "border-line bg-paper hover:bg-cream",
                    )}
                  >
                    <span className="text-[13px] font-medium text-ink">
                      {format(parseISO(slot.date), "EEEE, MMMM d")}
                    </span>
                    <span className="text-[12.5px] text-muted tabular-nums">
                      {formatHour(slot.start)} – {formatHour(slot.end)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <div className="flex items-center gap-2 text-[12.5px] text-muted">
              <Link2 size={14} aria-hidden />
              Or let them pick — {myCard.bookingLink}
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                void navigator.clipboard?.writeText(myCard.bookingLink);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1800);
              }}
            >
              {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
              {copied ? "Copied" : "Copy link"}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
