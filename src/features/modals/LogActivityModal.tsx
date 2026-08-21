import { useState } from "react";
import { Mail, NotebookPen, Phone, Users } from "lucide-react";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { useDemoState } from "../../state/DemoState";
import { DEMO_TODAY_ISO } from "../../data/today";
import { getOpportunity, getPerson } from "../../data/selectors";
import type { RecordActivity } from "../../data/types";
import { cn } from "../../components/ui/cn";

const TYPES = [
  { id: "call", icon: Phone, label: "Call" },
  { id: "email", icon: Mail, label: "Email" },
  { id: "meeting", icon: Users, label: "Meeting" },
  { id: "note", icon: NotebookPen, label: "Note" },
] as const;

/**
 * Logging what just happened — the small, constant act every CRM lives or dies
 * on. Kept to one screen and four taps.
 */
export function LogActivityModal() {
  const { modal, closeModal, openModal, logActivity } = useDemoState();
  const [type, setType] = useState<RecordActivity["type"]>("call");
  const [summary, setSummary] = useState("");

  const open = modal.kind === "log-activity";
  if (!open) return null;

  const person = modal.personId ? getPerson(modal.personId) : undefined;
  const opportunity = modal.opportunityId ? getOpportunity(modal.opportunityId) : undefined;
  const subject = person?.name ?? opportunity?.title ?? "this record";

  // Logging is always something you do *from* somewhere. Go back to the record
  // it was logged against rather than dropping the user on the board.
  const close = () => {
    if (modal.opportunityId) {
      openModal({ kind: "opportunity", opportunityId: modal.opportunityId });
    } else {
      closeModal();
    }
    setSummary("");
    setType("call");
  };

  return (
    <Modal
      open={open}
      onOpenChange={(next) => !next && close()}
      title="Log activity"
      description={`Against ${subject}`}
      width="480px"
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11.5px] text-muted">Stays in this session only.</p>
          <Button
            size="sm"
            variant="primary"
            disabled={!summary.trim()}
            onClick={() => {
              logActivity({
                id: `log-${Date.now()}`,
                type,
                date: DEMO_TODAY_ISO,
                summary: summary.trim(),
                author: "Sydney",
                personId: modal.personId,
                opportunityId: modal.opportunityId,
              });
              close();
            }}
          >
            Log it
          </Button>
        </div>
      }
    >
      <div>
        <div className="eyebrow mb-2">What happened</div>
        <div className="grid grid-cols-4 gap-2">
          {TYPES.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setType(id)}
              aria-pressed={type === id}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-[10px] border px-2 py-3 text-[12px] font-medium transition-colors duration-200",
                type === id
                  ? "border-[color:var(--asbm-gold)] bg-gold-light text-ink"
                  : "border-line bg-paper text-muted hover:text-ink",
              )}
            >
              <Icon size={16} aria-hidden />
              {label}
            </button>
          ))}
        </div>

        <label className="mt-4 block">
          <span className="eyebrow">In a line</span>
          <textarea
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="What was said, and what you agreed to do next."
            className="mt-1 w-full rounded-[10px] border border-line bg-paper px-3 py-2.5 text-[13px] text-ink placeholder:text-muted focus:border-[color:var(--asbm-gold)] focus:outline-none"
          />
        </label>
      </div>
    </Modal>
  );
}
