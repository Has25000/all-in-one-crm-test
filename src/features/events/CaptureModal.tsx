import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Check,
  Contact,
  CreditCard,
  PenLine,
  ScanLine,
  Share2,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Chip } from "../../components/ui/Chip";
import { Toggle } from "../../components/ui/Toggle";
import { Avatar } from "../../components/ui/Avatar";
import { StrengthDot } from "../../components/ui/StrengthDot";
import { useDemoState } from "../../state/DemoState";
import { capturePool, eventKindLabel } from "../../data/events";
import { automations } from "../../data/automations";
import { dateRangeLabel, getEvent, getPerson } from "../../data/selectors";
import type { CapturedContact } from "../../data/types";

const METHODS = [
  { id: "badge", icon: ScanLine, label: "Scan badge", hint: "Conference badge" },
  { id: "card", icon: CreditCard, label: "Business card", hint: "Photo or upload" },
  { id: "qr", icon: Contact, label: "Exchange codes", hint: "Both cards at once" },
  { id: "manual", icon: PenLine, label: "Type it in", hint: "Name and company" },
] as const;

/**
 * Live capture — what the product looks like when Sydney is standing in a room
 * rather than sitting at a desk. Capture is one tap; everything that usually
 * costs an evening of admin afterwards happens on the spot.
 */
export function CaptureModal() {
  const {
    modal,
    closeModal,
    captured,
    captureContact,
    updateCapture,
    automationState,
    openDrawer,
    openModal,
  } = useDemoState();
  const [activeId, setActiveId] = useState<string | null>(null);

  const open = modal.kind === "capture";
  const event = open ? getEvent(modal.eventId) : undefined;

  const metHere = useMemo(
    () => captured.filter((c) => event && c.eventId === event.id),
    [captured, event],
  );

  if (!event) return null;

  const enrichOn = automationState["au-enrich"];
  const tagOn = automationState["au-source-tag"];
  const followUpOn = automationState["au-postevent"];

  const capture = (method: CapturedContact["method"]) => {
    const next = capturePool[metHere.length % capturePool.length];
    const contact: CapturedContact = {
      id: `cap-${event.id}-${metHere.length}-${method}`,
      name: next.name,
      title: next.title,
      organization: next.organization,
      location: next.location,
      category: next.category,
      eventId: event.id,
      method,
      followUp: followUpOn,
    };
    captureContact(contact);
    setActiveId(contact.id);
  };

  const active = metHere.find((c) => c.id === activeId);
  const attending = event.attendingIds.map(getPerson).filter(Boolean);
  const targets = event.targetIds.map(getPerson).filter(Boolean);

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && closeModal()}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-[color:var(--asbm-black)]/40 backdrop-blur-[1px]"
          style={{ animation: "asbm-overlay-in 200ms ease" }}
        />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 z-50 flex max-h-[92vh] w-[min(880px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[16px] border border-line bg-paper shadow-[var(--shadow-overlay)] focus:outline-none"
          style={{ animation: "asbm-pop-in 220ms cubic-bezier(0.2, 0.8, 0.3, 1)" }}
        >
          <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-6 py-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-forest px-2.5 py-[3px] text-[10.5px] font-semibold tracking-[0.08em] text-white uppercase">
                  <span aria-hidden className="size-[6px] rounded-full bg-[color:var(--asbm-gold)]" />
                  Capturing
                </span>
                <Chip tone="warm">{eventKindLabel[event.kind]}</Chip>
              </div>
              <Dialog.Title className="mt-2 text-[19px] font-semibold tracking-[-0.01em] text-ink">
                {event.name}
              </Dialog.Title>
              <Dialog.Description className="text-[13px] text-muted">
                {dateRangeLabel(event)} · {event.venue ?? event.location}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close capture"
              className="rounded-lg p-1.5 text-muted transition-colors duration-200 hover:bg-cream hover:text-ink"
            >
              <X size={16} />
            </Dialog.Close>
          </header>

          <div className="scroll-slim grid min-h-0 flex-1 gap-6 overflow-y-auto px-6 py-5 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
            {/* Capture */}
            <div>
              <h3 className="eyebrow mb-2.5">Add someone</h3>
              <div className="grid grid-cols-2 gap-2">
                {METHODS.map(({ id, icon: Icon, label, hint }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => capture(id)}
                    className="flex flex-col items-start rounded-[12px] border border-line bg-cream/50 p-3.5 text-left transition-[border-color,background-color] duration-200 hover:border-[color:var(--asbm-gold)]/60 hover:bg-cream"
                  >
                    <Icon size={18} className="text-charcoal" aria-hidden />
                    <span className="mt-2 text-[13.5px] font-semibold text-ink">{label}</span>
                    <span className="text-[11.5px] text-muted">{hint}</span>
                  </button>
                ))}
              </div>

              {active ? (
                <div className="mt-4 rounded-[12px] border border-[color:var(--asbm-gold)]/45 bg-gold-light/40 p-4">
                  <div className="flex items-start gap-3">
                    <Avatar name={active.name} category={active.category} size="lg" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-semibold text-ink">{active.name}</p>
                      <p className="text-[12.5px] text-charcoal">{active.title}</p>
                      <p className="text-[12.5px] text-muted">
                        {active.organization} · {active.location}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {enrichOn && (
                      <Chip tone="forest">
                        <Sparkles size={11} aria-hidden />
                        Enriched
                      </Chip>
                    )}
                    {tagOn && <Chip tone="gold">{event.name}</Chip>}
                    {tagOn && <Chip tone="warm">{dateRangeLabel(event)}</Chip>}
                  </div>

                  <label className="mt-3 block">
                    <span className="eyebrow">What you talked about</span>
                    <textarea
                      rows={2}
                      value={active.note ?? ""}
                      onChange={(e) => updateCapture(active.id, { note: e.target.value })}
                      placeholder="Two lines now save you an hour on Monday."
                      className="mt-1 w-full rounded-[10px] border border-line bg-paper px-3 py-2 text-[13px] text-ink placeholder:text-muted focus:border-[color:var(--asbm-gold)] focus:outline-none"
                    />
                  </label>

                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3">
                    <span className="text-[12.5px] text-charcoal">
                      Follow up within two days
                    </span>
                    <Toggle
                      checked={active.followUp}
                      onChange={(next) => updateCapture(active.id, { followUp: next })}
                      label={`Follow up with ${active.name}`}
                    />
                  </div>

                  <div className="mt-3 flex justify-end">
                    <Button size="sm" variant="primary" onClick={() => setActiveId(null)}>
                      <Check size={14} aria-hidden />
                      Saved
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="mt-4 rounded-[12px] border border-dashed border-line px-4 py-5 text-[12.5px] leading-relaxed text-muted">
                  Whichever way you capture someone, their role, company, location, and profile
                  come back filled in, tagged with this event, and queued for a follow-up.
                </p>
              )}

              {metHere.length > 0 && (
                <div className="mt-5">
                  <h3 className="eyebrow mb-2">Met here · {metHere.length}</h3>
                  <ul className="space-y-1">
                    {metHere.map((contact) => (
                      <li key={contact.id}>
                        <button
                          type="button"
                          onClick={() => setActiveId(contact.id)}
                          className="flex w-full items-center gap-2.5 rounded-[9px] border border-line px-2.5 py-2 text-left transition-colors duration-200 hover:bg-cream"
                        >
                          <Avatar name={contact.name} category={contact.category} size="xs" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[12.5px] font-medium text-ink">
                              {contact.name}
                            </span>
                            <span className="block truncate text-[11px] text-muted">
                              {contact.organization}
                              {contact.note ? ` · ${contact.note}` : ""}
                            </span>
                          </span>
                          {contact.followUp && <Chip tone="gold">Follow up</Chip>}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* The room */}
            <div className="space-y-5">
              <div>
                <h3 className="eyebrow mb-2">People you already know here</h3>
                <ul className="space-y-1">
                  {attending.map((person) => (
                    <li key={person!.id}>
                      <button
                        type="button"
                        onClick={() => openDrawer(person!.id)}
                        className="flex w-full items-center gap-2.5 rounded-[9px] px-2 py-1.5 text-left transition-colors duration-200 hover:bg-cream"
                      >
                        <Avatar name={person!.name} category={person!.category} size="xs" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[12.5px] font-medium text-ink">
                            {person!.name}
                          </span>
                          <span className="block truncate text-[11px] text-muted">
                            {person!.organization ?? person!.title}
                          </span>
                        </span>
                        <StrengthDot strength={person!.relationshipStrength} showLabel={false} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {targets.length > 0 && (
                <div>
                  <h3 className="eyebrow mb-2">Worth getting to</h3>
                  <ul className="space-y-1.5">
                    {targets.map((person) => (
                      <li
                        key={person!.id}
                        className="rounded-[10px] border border-line bg-cream/50 px-3 py-2"
                      >
                        <button
                          type="button"
                          onClick={() => openDrawer(person!.id)}
                          className="block w-full text-left"
                        >
                          <span className="block text-[12.5px] font-medium text-ink">
                            {person!.name}
                          </span>
                          <span className="block text-[11px] text-muted">
                            {person!.organization ?? person!.title}
                          </span>
                          {person!.connectedThrough && person!.connectedThrough !== "Direct" && (
                            <span className="mt-1 block text-[11px] text-charcoal">
                              Warm path through {person!.connectedThrough}
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-[10px] border border-line bg-cream/40 px-3 py-2.5">
                <h3 className="eyebrow mb-1.5">Your side of it</h3>
                <p className="text-[11.5px] leading-relaxed text-charcoal">
                  Exchanging codes hands them your card at the same time, so neither of you is
                  typing the other up afterwards.
                </p>
                <Button
                  size="sm"
                  variant="secondary"
                  className="mt-2"
                  onClick={() => openModal({ kind: "share-card" })}
                >
                  <Share2 size={13} aria-hidden />
                  Share your card
                </Button>
              </div>

              <div className="rounded-[10px] border border-line bg-cream/40 px-3 py-2.5">
                <h3 className="eyebrow mb-1.5">Running while you're here</h3>
                <ul className="space-y-1">
                  {automations
                    .filter((a) => a.category === "capture" && automationState[a.id])
                    .map((a) => (
                      <li key={a.id} className="flex items-start gap-1.5 text-[11.5px] text-charcoal">
                        <Check size={12} className="mt-0.5 shrink-0 text-[color:var(--asbm-success)]" aria-hidden />
                        {a.name}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-line bg-cream/60 px-6 py-3.5">
            <p className="text-[11.5px] text-muted">
              Capture is simulated. Nothing is scanned, uploaded, or sent.
            </p>
            <Button size="sm" variant="secondary" onClick={closeModal}>
              Done for now
            </Button>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
