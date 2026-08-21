import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { useDemoState } from "../../state/DemoState";
import { getPerson, lastInteractionLabel } from "../../data/selectors";

/**
 * A drafting aid, not a send button. The assistant proposes language in
 * Sydney's voice; nothing leaves the prototype.
 */
function draftFor(personId: string): { prompt: string; message: string } {
  const person = getPerson(personId);
  if (!person) return { prompt: "", message: "" };

  if (personId === "p-maya") {
    return {
      prompt: "Reconnect with Maya about potential fall brand opportunities.",
      message:
        "Hi Maya, hope you've been doing well. I wanted to circle back as fall planning starts picking up. I have a couple of things happening with clients that made me think of our previous conversation. Would love to catch up when you have some time.",
    };
  }

  if (person.relationshipStrength === "dormant" && !person.lastInteraction) {
    return {
      prompt: `Ask ${person.connectedThrough ?? "a mutual contact"} for an introduction to ${person.name}.`,
      message: `Hi ${person.name.split(" ")[0]}, ${person.connectedThrough ?? "a mutual contact"} mentioned you'd be a good person to know. I work with a small group of athletes and brands out of Charlotte, and a couple of the things we have coming up feel relevant to what you're building. Would you be open to a short introduction call?`,
    };
  }

  const firstName = person.name.split(" ")[0];
  const org = person.organization ? ` at ${person.organization}` : "";
  return {
    prompt: `Reconnect with ${firstName} — last contact was ${lastInteractionLabel(person.lastInteraction).toLowerCase()}.`,
    message: `Hi ${firstName}, hope things have been good${org}. It's been a little while and I wanted to check in as we head into the fall. A few things are moving on my side that made me think of our last conversation — would be good to catch up when the timing works for you.`,
  };
}

export function OutreachModal() {
  const { modal, closeModal, openModal } = useDemoState();
  const open = modal.kind === "outreach";
  const personId = modal.kind === "outreach" ? modal.personId : "";
  const person = personId ? getPerson(personId) : undefined;

  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open && personId) {
      setMessage(draftFor(personId).message);
      setEditing(false);
      setCopied(false);
    }
  }, [open, personId]);

  if (!person) return null;
  const { prompt } = draftFor(personId);

  return (
    <Modal
      open={open}
      onOpenChange={(next) => !next && closeModal()}
      title="Relationship Assistant"
      description={`Drafting a note to ${person.name}${person.organization ? ` · ${person.organization}` : ""}`}
      width="600px"
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11.5px] text-muted">Nothing is sent from this concept demo.</p>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => setEditing((v) => !v)}>
              {editing ? "Done editing" : "Edit"}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                void navigator.clipboard?.writeText(message);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1800);
              }}
            >
              {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() =>
                openModal({
                  kind: "quick-action",
                  title: "Scheduled",
                  body: `This note to ${person.name} would go out on your next outreach window. In the concept demo nothing is sent.`,
                })
              }
            >
              Schedule
            </Button>
          </div>
        </div>
      }
    >
      <div>
        <div className="eyebrow">Prompt</div>
        <p className="mt-1 rounded-[10px] border border-line bg-cream/60 px-3.5 py-2.5 text-[13px] text-charcoal">
          {prompt}
        </p>

        <div className="eyebrow mt-5">Suggested message</div>
        {editing ? (
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={7}
            aria-label="Suggested message"
            className="mt-1 w-full rounded-[10px] border border-line bg-paper px-3.5 py-3 text-[13.5px] leading-relaxed text-ink focus:border-[color:var(--asbm-gold)] focus:outline-none"
          />
        ) : (
          <p className="mt-1 rounded-[10px] border border-line border-l-[3px] border-l-[color:var(--asbm-gold)] bg-paper px-3.5 py-3 text-[13.5px] leading-relaxed whitespace-pre-wrap text-ink">
            {message}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[12px] text-muted">
          <span>Last interaction · {lastInteractionLabel(person.lastInteraction)}</span>
          {person.connectedThrough && <span>Met through · {person.connectedThrough}</span>}
        </div>
      </div>
    </Modal>
  );
}
