import { useState } from "react";
import { Check, Copy, QrCode, Share2 } from "lucide-react";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { Chip } from "../../components/ui/Chip";
import { CardCode } from "../../components/ui/CardCode";
import { useDemoState } from "../../state/DemoState";
import { myCard } from "../../data/automations";

/** A real vCard — the one thing on this screen that genuinely works. */
function buildVCard() {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${myCard.name}`,
    "N:Anderson;Sydney;;;",
    `ORG:${myCard.organization}`,
    `TITLE:${myCard.title}`,
    `EMAIL;TYPE=WORK:${myCard.email}`,
    `URL:${myCard.website}`,
    `ADR;TYPE=WORK:;;;${myCard.location};;;`,
    "NOTE:Concept demo contact card — sample details only.",
    "END:VCARD",
  ].join("\n");
}

/**
 * What Sydney hands out. The point of the screen is that giving someone your
 * details and getting theirs back should be one gesture, not a business card
 * that ends up in a drawer.
 */
export function MyCardModal() {
  const { modal, closeModal, openModal } = useDemoState();
  const [copied, setCopied] = useState<"card" | "link" | null>(null);

  const open = modal.kind === "my-card";
  if (!open) return null;

  const copy = (value: string, which: "card" | "link") => {
    void navigator.clipboard?.writeText(value);
    setCopied(which);
    window.setTimeout(() => setCopied(null), 1800);
  };

  return (
    <Modal
      open={open}
      onOpenChange={(next) => !next && closeModal()}
      title="Your card"
      description="Share it once and their details come back to you filled in."
      width="560px"
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11.5px] text-muted">
            The code is illustrative. Contact details are sample data.
          </p>
          <Button
            size="sm"
            variant="primary"
            onClick={() => openModal({ kind: "capture", eventId: "ev-clt-summit" })}
          >
            <Share2 size={14} aria-hidden />
            Exchange at an event
          </Button>
        </div>
      }
    >
      <div className="flex flex-wrap gap-6">
        <div className="min-w-[220px] flex-1">
          <div className="rounded-[12px] border border-line bg-ink px-4 py-4 text-white">
            <div className="text-[10.5px] font-semibold tracking-[0.16em] text-[color:var(--asbm-gold-light)]">
              ASBM
            </div>
            <p className="mt-2.5 text-[18px] font-semibold tracking-[-0.01em]">{myCard.name}</p>
            <p className="text-[13px] text-white/80">{myCard.title}</p>
            <p className="text-[12.5px] text-white/60">{myCard.organization}</p>
            <p className="mt-2 text-[12px] text-white/50">{myCard.location}</p>
          </div>

          <dl className="mt-4 space-y-2 text-[13px]">
            {[
              ["Email", myCard.email],
              ["Phone", myCard.phone],
              ["LinkedIn", myCard.linkedin],
              ["Booking link", myCard.bookingLink],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-3">
                <dt className="text-muted">{label}</dt>
                <dd className="truncate font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {myCard.focus.map((item) => (
              <Chip key={item} tone="warm">
                {item}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <CardCode seed={myCard.bookingLink} />
          <p className="flex items-center gap-1.5 text-[11.5px] text-muted">
            <QrCode size={13} aria-hidden />
            Scan to save
          </p>
          <div className="flex w-full flex-col gap-2">
            <Button size="sm" variant="secondary" onClick={() => copy(buildVCard(), "card")}>
              {copied === "card" ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
              {copied === "card" ? "Copied" : "Copy contact card"}
            </Button>
            <Button size="sm" variant="secondary" onClick={() => copy(myCard.bookingLink, "link")}>
              {copied === "link" ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
              {copied === "link" ? "Copied" : "Copy booking link"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
