import { useState } from "react";
import { CheckCircle2, Contact, CreditCard, Link, PenLine } from "lucide-react";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { useDemoState } from "../../state/DemoState";

type Method = "linkedin" | "card" | "phone" | "manual";

const methods: {
  id: Method;
  icon: typeof Link;
  title: string;
  copy: string;
  action: string;
  hint?: string;
}[] = [
  { id: "linkedin", icon: Link, title: "LinkedIn", copy: "Paste a LinkedIn profile", action: "Import", hint: "linkedin.com/in/..." },
  { id: "card", icon: CreditCard, title: "Business Card", copy: "Scan or upload a card", action: "Upload" },
  { id: "phone", icon: Contact, title: "Phone Contact", copy: "Import from contacts", action: "Connect" },
  { id: "manual", icon: PenLine, title: "Add Manually", copy: "Create a contact", action: "Add details" },
];

/**
 * Adding someone should take one gesture, not a form. Each route here resolves
 * to the same enriched result — mocked, but it makes the intent obvious.
 */
export function AddContactModal() {
  const { modal, closeModal, addContact, openModal } = useDemoState();
  const [done, setDone] = useState<Method | null>(null);

  const open = modal.kind === "add-contact";

  const handleClose = (next: boolean) => {
    if (!next) {
      closeModal();
      setDone(null);
    }
  };

  const complete = (method: Method) => {
    setDone(method);
    addContact("p-maya");
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      title="Add someone to your network"
      description="However you meet someone, they end up in the same place."
      width="620px"
    >
      {done ? (
        <div className="py-2">
          <div className="flex items-start gap-3 rounded-[12px] border border-[color:var(--asbm-success)]/25 bg-forest-light px-4 py-4">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[color:var(--asbm-success)]" aria-hidden />
            <div>
              <p className="text-[14px] font-semibold text-ink">Maya Thompson added</p>
              <p className="mt-0.5 text-[13px] text-charcoal">
                Company, role, location, and LinkedIn profile were added automatically.
              </p>
            </div>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-[13px]">
            {[
              ["Role", "Director, Athlete Partnerships"],
              ["Organization", "Nike"],
              ["Location", "Charlotte / New York"],
              ["Connected through", "Marcus Reed"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[11.5px] text-muted">{label}</dt>
                <dd className="font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[12px] text-muted">
            Enrichment is illustrated here. Nothing was imported from a real account.
          </p>
          <div className="mt-5 flex justify-end">
            <Button variant="primary" onClick={() => handleClose(false)}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <div>
        <div className="grid gap-3 sm:grid-cols-2">
          {methods.map(({ id, icon: Icon, title, copy, action, hint }) => (
            <div
              key={id}
              className="flex flex-col rounded-[12px] border border-line bg-cream/50 p-4 transition-colors duration-200 hover:border-[color:var(--asbm-gold)]/60"
            >
              <Icon size={18} className="text-charcoal" aria-hidden />
              <h3 className="mt-2.5 text-[14px] font-semibold text-ink">{title}</h3>
              <p className="mt-0.5 text-[12.5px] text-muted">{copy}</p>
              {hint && (
                <div className="mt-3 rounded-[8px] border border-line bg-paper px-2.5 py-1.5 text-[12px] text-muted">
                  {hint}
                </div>
              )}
              <div className="mt-3 flex-1" />
              <Button size="sm" variant="secondary" onClick={() => complete(id)} className="self-start">
                {action}
              </Button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => openModal({ kind: "capture", eventId: "ev-clt-summit" })}
          className="mt-4 w-full rounded-[12px] border border-dashed border-line px-4 py-3 text-left text-[12.5px] text-muted transition-colors duration-200 hover:border-[color:var(--asbm-gold)]/60 hover:text-charcoal"
        >
          Meeting people at an event? <span className="font-medium text-ink">Open live capture</span>{" "}
          — badges, cards, and codes, with everything tagged to the room you met in.
        </button>
        </div>
      )}
    </Modal>
  );
}
