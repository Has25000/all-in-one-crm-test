import { CalendarPlus, FileText, MessageSquare, NotebookPen, SquareCheck } from "lucide-react";
import { Drawer } from "../../components/ui/Drawer";
import { Avatar } from "../../components/ui/Avatar";
import { Button } from "../../components/ui/Button";
import { Chip } from "../../components/ui/Chip";
import { StrengthDot } from "../../components/ui/StrengthDot";
import { useDemoState } from "../../state/DemoState";
import {
  categoryMeta,
  documentsForPerson,
  dueLabel,
  formatDate,
  getClientForPerson,
  getPerson,
  interactionsForPerson,
  lastInteractionLabel,
  relatedClients,
  relatedPeople,
  tasksForPerson,
} from "../../data/selectors";
import { SYDNEY_ID } from "../../data/people";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line px-5 py-4">
      <h3 className="eyebrow mb-2.5">{title}</h3>
      {children}
    </section>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11.5px] text-muted">{label}</div>
      <div className="mt-0.5 text-[13px] font-medium text-ink">{value}</div>
    </div>
  );
}

/**
 * Everything known about one relationship, in one place: how Sydney knows
 * them, the history, who else they connect to, and what is owed next.
 */
export function RelationshipDrawer() {
  const { drawerPersonId, closeDrawer, openDrawer, openModal } = useDemoState();
  const person = drawerPersonId ? getPerson(drawerPersonId) : undefined;

  if (!person) return <Drawer open={false} onOpenChange={closeDrawer} title="Relationship"><div /></Drawer>;

  const meta = categoryMeta[person.category];
  const related = relatedPeople(person.id).slice(0, 6);
  const clients = relatedClients(person.id).slice(0, 3);
  const history = interactionsForPerson(person.id);
  const files = documentsForPerson(person.id);
  const openTasks = tasksForPerson(person.id);
  const asClient = getClientForPerson(person.id);

  const quickAction = (title: string, body: string) => openModal({ kind: "quick-action", title, body });

  return (
    <Drawer
      open
      onOpenChange={(next) => !next && closeDrawer()}
      title={person.name}
      footer={
        <div className="grid grid-cols-4 gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              quickAction("Message drafted", `A message to ${person.name} would open here. Nothing is sent in this concept demo.`)
            }
          >
            <MessageSquare size={14} aria-hidden />
            Message
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              quickAction("Scheduling", `Availability with ${person.name} would open here, pulled from your connected calendar.`)
            }
          >
            <CalendarPlus size={14} aria-hidden />
            Schedule
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              quickAction("Add a note", `Notes added here would attach to ${person.name}'s relationship history.`)
            }
          >
            <NotebookPen size={14} aria-hidden />
            Note
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              quickAction("Create a task", `A follow-up for ${person.name} would appear in your follow-ups list.`)
            }
          >
            <SquareCheck size={14} aria-hidden />
            Task
          </Button>
        </div>
      }
    >
      {/* Identity */}
      <header className="px-5 pt-6 pb-4">
        <Avatar name={person.name} category={person.category} size="xl" />
        <h2 className="mt-3 text-[21px] font-semibold tracking-[-0.01em] text-ink">{person.name}</h2>
        <p className="text-[13.5px] text-charcoal">{person.title}</p>
        {person.organization && <p className="text-[13px] text-muted">{person.organization}</p>}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <Chip tone={person.category === "client" ? "forest" : "neutral"}>{meta.label}</Chip>
          {person.location && <Chip tone="warm">{person.location}</Chip>}
        </div>
      </header>

      {/* Relationship */}
      <Section title="Relationship">
        <div className="mb-3">
          <StrengthDot strength={person.relationshipStrength} className="text-[14px] font-medium" />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <Field
            label="Last interaction"
            value={person.lastInteraction ? formatDate(person.lastInteraction, "MMMM d") : "Never"}
          />
          <Field
            label="First connected"
            value={person.firstInteraction ? formatDate(person.firstInteraction, "MMMM yyyy") : "Not yet"}
          />
          <Field label="Met through" value={person.connectedThrough ?? "Direct"} />
          <Field label="Time since contact" value={lastInteractionLabel(person.lastInteraction)} />
        </div>
      </Section>

      {/* Contact */}
      <Section title="Contact">
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <Field label="Email" value={person.email ?? "Demo contact"} />
          <Field label="Phone" value={person.phone ?? "Demo contact"} />
          <Field label="LinkedIn" value={person.linkedin ?? "Demo profile"} />
        </div>
      </Section>

      {/* Related people */}
      {related.length > 0 && (
        <Section title="Related people">
          <ul className="space-y-1">
            {related.map((other) => (
              <li key={other.id}>
                <button
                  type="button"
                  onClick={() => openDrawer(other.id)}
                  className="flex w-full items-center gap-2.5 rounded-[9px] px-2 py-1.5 text-left transition-colors duration-200 hover:bg-cream"
                >
                  <Avatar name={other.name} category={other.category} size="xs" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium text-ink">{other.name}</span>
                    <span className="block truncate text-[11.5px] text-muted">
                      {other.organization ?? other.title}
                    </span>
                  </span>
                  <StrengthDot strength={other.relationshipStrength} showLabel={false} />
                </button>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Related clients */}
      {(clients.length > 0 || asClient) && (
        <Section title={asClient ? "Client" : "Related clients"}>
          <div className="flex flex-wrap gap-1.5">
            {asClient && <Chip tone="forest">{asClient.name} · {asClient.discipline}</Chip>}
            {clients.map((client) => (
              <Chip key={client.id} tone="neutral">
                {client.name}
              </Chip>
            ))}
          </div>
        </Section>
      )}

      {/* Notes */}
      {person.notes && person.notes.length > 0 && (
        <Section title="Notes">
          <ul className="space-y-2">
            {person.notes.map((note) => (
              <li
                key={note}
                className="border-l-2 border-[color:var(--asbm-gold)] bg-cream/70 px-3 py-2 text-[12.5px] leading-relaxed text-charcoal"
              >
                {note}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Recent activity */}
      {history.length > 0 && (
        <Section title="Recent activity">
          <ul className="space-y-3">
            {history.slice(0, 4).map((entry) => (
              <li key={entry.id} className="flex gap-3">
                <span className="w-[52px] shrink-0 pt-px text-[11.5px] font-medium text-muted tabular-nums">
                  {formatDate(entry.date)}
                </span>
                <span className="min-w-0">
                  <span className="block text-[12.5px] font-medium text-ink">{entry.title}</span>
                  {entry.summary && (
                    <span className="block text-[11.5px] leading-snug text-muted">{entry.summary}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Files */}
      {files.length > 0 && (
        <Section title="Files">
          <ul className="space-y-1.5">
            {files.map((file) => (
              <li key={file.id} className="flex items-center gap-2 text-[12.5px] text-charcoal">
                <FileText size={14} className="shrink-0 text-muted" aria-hidden />
                <span className="truncate">{file.title}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Tasks */}
      {openTasks.length > 0 && (
        <Section title="Tasks">
          <ul className="space-y-2">
            {openTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between gap-3 rounded-[9px] border border-line px-3 py-2"
              >
                <span className="text-[12.5px] text-ink">{task.title}</span>
                <span className="shrink-0 text-[11.5px] font-medium text-muted">
                  {dueLabel(task.dueDate)}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {person.id !== SYDNEY_ID && (
        <Section title="Outreach">
          <Button
            variant="gold"
            size="sm"
            onClick={() => openModal({ kind: "outreach", personId: person.id })}
          >
            Draft outreach
          </Button>
        </Section>
      )}
    </Drawer>
  );
}
