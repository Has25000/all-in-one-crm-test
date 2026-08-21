import { Check, Undo2 } from "lucide-react";
import { Card, PageHeader, SectionHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Avatar } from "../components/ui/Avatar";
import { Chip } from "../components/ui/Chip";
import { StrengthDot } from "../components/ui/StrengthDot";
import { Table, Td, Th, Tr } from "../components/ui/Table";
import { useDemoState } from "../state/DemoState";
import {
  daysSince,
  dueLabel,
  formatDate,
  getPerson,
  lastInteractionShort,
  sortedTasks,
} from "../data/selectors";

/** Recently contacted — people seen in the last three weeks, most recent first. */
const RECENT_IDS = ["p-larry", "p-victor", "p-alaina", "p-renee", "p-alexis", "p-rachel"];
/** Notes already written but not yet sent. */
const DRAFT_IDS = ["p-maya", "p-tasha"];
/** Queued for the next outreach window. */
const SCHEDULED_IDS = ["p-harper", "p-andre"];

function PersonCell({ personId }: { personId: string }) {
  const person = getPerson(personId)!;
  return (
    <span className="flex items-center gap-2.5">
      <Avatar name={person.name} category={person.category} size="sm" />
      <span className="min-w-0">
        <span className="block truncate font-medium whitespace-nowrap text-ink">{person.name}</span>
        <span className="block truncate text-[11.5px] text-muted">{person.title}</span>
      </span>
    </span>
  );
}

export function OutreachPage() {
  const { openDrawer, openModal, completeTask, restoreTask, completedTaskIds } = useDemoState();

  const tasks = sortedTasks();
  const outstanding = tasks.filter((t) => !completedTaskIds.includes(t.id));
  const completed = tasks.filter((t) => completedTaskIds.includes(t.id));

  return (
    <div className="space-y-5">
      <PageHeader
        title="Outreach"
        subtitle="Keep important relationships active without losing the personal touch."
      />

      <Card>
        <SectionHeader
          title="Needs Follow-Up"
          subtitle={`${outstanding.length} open · these are people, not a pipeline.`}
        />
        <div className="mt-4">
          <Table minWidth={980}>
            <thead>
              <tr>
                <Th>Person</Th>
                <Th>Organization</Th>
                <Th>Relationship</Th>
                <Th>Last Contact</Th>
                <Th>Next Step</Th>
                <Th>Due</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {outstanding.map((task) => {
                const person = getPerson(task.personId)!;
                const days = daysSince(person.lastInteraction);
                return (
                  <Tr key={task.id}>
                    <Td>
                      <button
                        type="button"
                        onClick={() => openDrawer(person.id)}
                        className="text-left"
                      >
                        <PersonCell personId={person.id} />
                      </button>
                    </Td>
                    <Td className="whitespace-nowrap text-charcoal">{person.organization ?? "—"}</Td>
                    <Td>
                      <StrengthDot strength={person.relationshipStrength} />
                    </Td>
                    <Td className="whitespace-nowrap text-charcoal tabular-nums">
                      {lastInteractionShort(person.lastInteraction)}
                      {days !== undefined && days > 0 ? " ago" : ""}
                    </Td>
                    <Td>
                      <span className="block font-medium text-ink">{task.nextStep}</span>
                      <span className="block text-[11.5px] text-muted">{task.title}</span>
                    </Td>
                    <Td>
                      <Chip tone={dueLabel(task.dueDate) === "Due today" ? "gold" : "warm"}>
                        {dueLabel(task.dueDate)}
                      </Chip>
                    </Td>
                    <Td>
                      <span className="flex justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => openModal({ kind: "outreach", personId: person.id })}
                        >
                          Draft
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          aria-label={`Mark follow-up with ${person.name} complete`}
                          onClick={() => completeTask(task.id)}
                        >
                          <Check size={14} aria-hidden />
                        </Button>
                      </span>
                    </Td>
                  </Tr>
                );
              })}
              {outstanding.length === 0 && (
                <Tr>
                  <Td colSpan={7} className="py-10 text-center text-muted">
                    Nothing outstanding. Every relationship here has been followed up.
                  </Td>
                </Tr>
              )}
            </tbody>
          </Table>
        </div>

        {completed.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3">
            <span className="text-[12.5px] text-muted">
              Completed this session: {completed.length}
            </span>
            {completed.map((task) => (
              <button
                key={task.id}
                type="button"
                onClick={() => restoreTask(task.id)}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-[3px] text-[11.5px] text-muted transition-colors duration-200 hover:text-ink"
              >
                <Undo2 size={12} aria-hidden />
                Undo {getPerson(task.personId)?.name}
              </button>
            ))}
          </div>
        )}
      </Card>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <SectionHeader title="Drafts" subtitle="Written, not yet sent." />
          <ul className="mt-4 divide-y divide-[color:var(--asbm-border)]">
            {DRAFT_IDS.map((id) => {
              const person = getPerson(id)!;
              return (
                <li key={id} className="flex items-center justify-between gap-3 py-3">
                  <button type="button" onClick={() => openDrawer(id)} className="text-left">
                    <PersonCell personId={id} />
                  </button>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-[11.5px] text-muted">
                      {lastInteractionShort(person.lastInteraction)} ago
                    </span>
                    <Button
                      size="sm"
                      variant="gold"
                      onClick={() => openModal({ kind: "outreach", personId: id })}
                    >
                      Open draft
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card>
          <SectionHeader title="Scheduled" subtitle="Queued for the next outreach window." />
          <ul className="mt-4 divide-y divide-[color:var(--asbm-border)]">
            {SCHEDULED_IDS.map((id, index) => (
              <li key={id} className="flex items-center justify-between gap-3 py-3">
                <button type="button" onClick={() => openDrawer(id)} className="text-left">
                  <PersonCell personId={id} />
                </button>
                <Chip tone="warm">{index === 0 ? "Monday" : "Next week"}</Chip>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <SectionHeader title="Recently Contacted" subtitle="Relationships that are already warm." />
        <ul className="mt-4 grid gap-x-6 sm:grid-cols-2 xl:grid-cols-3">
          {RECENT_IDS.map((id) => {
            const person = getPerson(id)!;
            return (
              <li key={id} className="border-b border-line last:border-b-0 sm:last:border-b">
                <button
                  type="button"
                  onClick={() => openDrawer(id)}
                  className="flex w-full items-center justify-between gap-3 py-3 text-left"
                >
                  <PersonCell personId={id} />
                  <span className="shrink-0 text-[11.5px] text-muted tabular-nums">
                    {person.lastInteraction ? formatDate(person.lastInteraction) : "—"}
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
