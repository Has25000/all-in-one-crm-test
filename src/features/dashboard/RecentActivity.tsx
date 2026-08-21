import { CalendarCheck, FileUp, NotebookPen, UserPlus, CheckCheck } from "lucide-react";
import { Card, SectionHeader } from "../../components/ui/Card";
import { recentActivity } from "../../data/activity";
import { useDemoState } from "../../state/DemoState";
import type { ActivityEntry } from "../../data/types";

const icons: Record<ActivityEntry["kind"], typeof NotebookPen> = {
  note: NotebookPen,
  meeting: CalendarCheck,
  document: FileUp,
  relationship: UserPlus,
  "follow-up": CheckCheck,
};

export function RecentActivity() {
  const { openDrawer } = useDemoState();

  return (
    <Card className="flex h-full flex-col">
      <SectionHeader title="Recent Activity" subtitle="What's moved across your network." />

      <ol className="mt-4 flex-1 space-y-3.5">
        {recentActivity.map((entry) => {
          const Icon = icons[entry.kind];
          const content = (
            <>
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line bg-cream text-muted">
                <Icon size={13} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] text-ink">{entry.detail}</span>
                <span className="block text-[11.5px] text-muted">{entry.label}</span>
              </span>
            </>
          );

          return (
            <li key={entry.id}>
              {entry.personId ? (
                <button
                  type="button"
                  onClick={() => openDrawer(entry.personId!)}
                  className="flex w-full items-start gap-3 rounded-[9px] px-1 py-0.5 text-left transition-colors duration-200 hover:bg-cream"
                >
                  {content}
                </button>
              ) : (
                <div className="flex items-start gap-3 px-1 py-0.5">{content}</div>
              )}
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
