import { useNavigate } from "react-router-dom";
import { Check, Undo2 } from "lucide-react";
import { Card, SectionHeader } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useDemoState } from "../../state/DemoState";
import { dueLabel, getPerson, isDueToday, sortedTasks } from "../../data/selectors";
import { cn } from "../../components/ui/cn";

/**
 * Completing a follow-up here actually removes it and drops the counter — the
 * one piece of state the demo lets you change.
 */
export function FollowUps({ limit = 4 }: { limit?: number }) {
  const navigate = useNavigate();
  const { openDrawer, completeTask, restoreTask, completedTaskIds } = useDemoState();

  const all = sortedTasks();
  const outstanding = all.filter((t) => !completedTaskIds.includes(t.id));
  const visible = outstanding.slice(0, limit);
  const justCompleted = all.filter((t) => completedTaskIds.includes(t.id)).slice(-1)[0];

  return (
    <Card className="flex h-full flex-col">
      <SectionHeader
        title="Follow-ups"
        subtitle={`${outstanding.length} open · ${outstanding.filter((t) => isDueToday(t.dueDate)).length} due today`}
      />

      <ul className="mt-4 flex-1 space-y-1.5">
        {visible.map((task) => {
          const person = getPerson(task.personId)!;
          const today = isDueToday(task.dueDate);
          return (
            <li
              key={task.id}
              className="flex items-start gap-3 rounded-[11px] border border-line px-3 py-2.5"
            >
              <div className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => openDrawer(person.id)}
                  className="block max-w-full truncate text-[13.5px] font-medium text-ink transition-colors duration-200 hover:text-charcoal"
                >
                  {person.name}
                </button>
                <p className="truncate text-[12px] text-muted">
                  {person.organization ?? person.title}
                </p>
                <p className="mt-1 truncate text-[12.5px] text-charcoal">{task.title}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <span
                  className={cn(
                    "rounded-full border px-2 py-[2px] text-[11px] font-medium",
                    today
                      ? "border-[color:var(--asbm-gold)]/45 bg-gold-light text-ink"
                      : "border-line bg-cream text-muted",
                  )}
                >
                  {dueLabel(task.dueDate)}
                </span>
                <button
                  type="button"
                  onClick={() => completeTask(task.id)}
                  aria-label={`Mark follow-up with ${person.name} complete`}
                  className="rounded-md p-1 text-muted transition-colors duration-200 hover:bg-cream hover:text-[color:var(--asbm-success)]"
                >
                  <Check size={15} />
                </button>
              </div>
            </li>
          );
        })}

        {visible.length === 0 && (
          <li className="rounded-[11px] border border-dashed border-line px-3 py-6 text-center text-[13px] text-muted">
            Everything is followed up. Nothing is waiting on you.
          </li>
        )}
      </ul>

      <div className="mt-4 flex items-center justify-between gap-3">
        <Button size="sm" variant="secondary" onClick={() => navigate("/outreach")}>
          View all
        </Button>
        {justCompleted && (
          <button
            type="button"
            onClick={() => restoreTask(justCompleted.id)}
            className="inline-flex items-center gap-1.5 text-[12px] text-muted transition-colors duration-200 hover:text-ink"
          >
            <Undo2 size={13} aria-hidden />
            Undo {getPerson(justCompleted.personId)?.name.split(" ")[0]}
          </button>
        )}
      </div>
    </Card>
  );
}
