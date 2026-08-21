import { useState } from "react";
import {
  Check,
  Copy,
  Link2,
  Mail,
  MessageSquare,
  Nfc,
  QrCode,
  Signature,
  Wallet,
} from "lucide-react";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { CardCode } from "../../components/ui/CardCode";
import { CardPreview } from "./CardPreview";
import { buildSignature, buildVCard, visibleFields } from "./vcard";
import { useDemoState } from "../../state/DemoState";
import { cardVariants, myCard } from "../../data/card";
import { getPerson } from "../../data/selectors";
import { cn } from "../../components/ui/cn";

const METHODS = [
  { id: "link", icon: Link2, label: "Copy link", hint: "Works anywhere" },
  { id: "code", icon: QrCode, label: "Show code", hint: "Face to face" },
  { id: "tap", icon: Nfc, label: "Tap to share", hint: "Phone to phone" },
  { id: "text", icon: MessageSquare, label: "Send by text", hint: "Right after you meet" },
  { id: "email", icon: Mail, label: "Send by email", hint: "With a note" },
  { id: "signature", icon: Signature, label: "Email signature", hint: "Every message you send" },
  { id: "wallet", icon: Wallet, label: "Add to wallet", hint: "Always on you" },
] as const;

type MethodId = (typeof METHODS)[number]["id"];

/**
 * Handing the card over. Every route ends in the same place — they get her
 * details, and the exchange is recorded so she knows who has them.
 */
export function ShareSheet() {
  const {
    modal,
    closeModal,
    cardVariantId,
    cardFieldOverrides,
    recordShare,
    openDrawer,
  } = useDemoState();
  const [method, setMethod] = useState<MethodId>("code");
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const open = modal.kind === "share-card";
  if (!open) return null;

  const person = modal.personId ? getPerson(modal.personId) : undefined;
  const fields = visibleFields(cardVariantId, cardFieldOverrides);
  const variant = cardVariants.find((v) => v.id === cardVariantId) ?? cardVariants[0];

  const close = () => {
    closeModal();
    setSent(false);
    setCopied(false);
  };

  const copy = (value: string) => {
    void navigator.clipboard?.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const confirm = () => {
    recordShare(person?.name ?? "someone new", method);
    setSent(true);
  };

  return (
    <Modal
      open={open}
      onOpenChange={(next) => !next && close()}
      title={person ? `Share your card with ${person.name.split(" ")[0]}` : "Share your card"}
      description={sent ? undefined : `Sending the ${variant.name.toLowerCase()} — ${variant.note}`}
      width="700px"
      footer={
        sent ? (
          <div className="flex justify-end">
            <Button size="sm" variant="primary" onClick={close}>
              Done
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11.5px] text-muted">
              Nothing is sent. The card and details are sample data.
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => copy(buildVCard(fields))}>
                {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
                {copied ? "Copied" : "Copy contact file"}
              </Button>
              <Button size="sm" variant="primary" onClick={confirm}>
                Share it
              </Button>
            </div>
          </div>
        )
      }
    >
      {sent ? (
        <div>
          <div className="rounded-[12px] border border-[color:var(--asbm-success)]/25 bg-forest-light px-4 py-4">
            <p className="text-[14px] font-semibold text-ink">
              Card sent{person ? ` to ${person.name}` : ""}
            </p>
            <p className="mt-0.5 text-[13px] text-charcoal">
              You'll see when they open it, whether they save it, and if they send theirs back.
            </p>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-charcoal">
            When someone returns their details, they arrive as a full contact rather than a name to
            type up later — which is how {" "}
            <button
              type="button"
              onClick={() => {
                setSent(false);
                openDrawer("p-yara");
              }}
              className="font-medium text-ink underline decoration-[color:var(--asbm-gold)] decoration-2 underline-offset-4"
            >
              Yara Osman
            </button>{" "}
            ended up in your network after the June forum.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]">
          <div>
            <div className="eyebrow mb-2">How</div>
            <div className="grid grid-cols-2 gap-2">
              {METHODS.map(({ id, icon: Icon, label, hint }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMethod(id)}
                  aria-pressed={method === id}
                  className={cn(
                    "flex flex-col items-start rounded-[10px] border px-3 py-2.5 text-left transition-colors duration-200",
                    method === id
                      ? "border-[color:var(--asbm-gold)] bg-gold-light"
                      : "border-line bg-paper hover:bg-cream",
                  )}
                >
                  <Icon size={15} className="text-charcoal" aria-hidden />
                  <span className="mt-1.5 text-[12.5px] font-semibold text-ink">{label}</span>
                  <span className="text-[10.5px] text-muted">{hint}</span>
                </button>
              ))}
            </div>

            {method === "link" && (
              <div className="mt-3 flex items-center gap-2 rounded-[10px] border border-line bg-cream/50 px-3 py-2">
                <span className="min-w-0 flex-1 truncate text-[12px] text-charcoal">
                  {myCard.publicLink}
                </span>
                <Button size="sm" variant="ghost" onClick={() => copy(myCard.publicLink)}>
                  {copied ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
                </Button>
              </div>
            )}

            {method === "signature" && (
              <div className="mt-3">
                <pre className="scroll-slim overflow-x-auto rounded-[10px] border border-line bg-cream/50 px-3 py-2.5 font-sans text-[11.5px] leading-relaxed whitespace-pre-wrap text-charcoal">
                  {buildSignature(fields)}
                </pre>
                <Button
                  size="sm"
                  variant="secondary"
                  className="mt-2"
                  onClick={() => copy(buildSignature(fields))}
                >
                  {copied ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
                  {copied ? "Copied" : "Copy signature"}
                </Button>
              </div>
            )}

            {(method === "tap" || method === "wallet") && (
              <p className="mt-3 rounded-[10px] border border-dashed border-line px-3 py-2.5 text-[12px] leading-relaxed text-muted">
                {method === "tap"
                  ? "Holding two phones together would pass the card across — nothing to install on their side."
                  : "The card would sit in the phone's wallet, ready even with no signal in a convention hall."}
              </p>
            )}
          </div>

          <div>
            <div className="eyebrow mb-2">What they'll get</div>
            {method === "code" ? (
              <div className="flex flex-col items-center gap-2 rounded-[12px] border border-line bg-cream/40 px-4 py-5">
                <CardCode seed={myCard.publicLink} size={148} />
                <p className="text-[11.5px] text-muted">Point a camera at it</p>
                <p className="text-[10.5px] text-muted/80">Illustrative code</p>
              </div>
            ) : (
              <CardPreview fields={fields} compact />
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
