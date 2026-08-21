import { useNavigate } from "react-router-dom";
import { Card, SectionHeader } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Avatar } from "../../components/ui/Avatar";
import { useDemoState } from "../../state/DemoState";
import { cadenceLabel } from "../../data/automations";
import { overdueRelationships } from "../../data/selectors";

/**
 * The keep-in-touch rule made visible: who has slipped past their window, by
 * how much, and how far the gap has been allowed to open.
 */
export function StayInTouch() {
  const navigate = useNavigate();
  const { openDrawer, openModal, automationState } = useDemoState();
  const on = automationState["au-cadence"];
  const overdue = overdueRelationships();

  return (
    <Card className="flex h-full flex-col">
      <SectionHeader
        title="Past their window"
        explain="Every relationship tier has a check-in window — strong every 30 days, active every 60, cooling every 90. This is who has slipped past theirs, worst first."
        subtitle={
          on
            ? `${overdue.length} have slipped past their check-in window.`
            : "Keep-in-touch nudges are switched off."
        }
        action={
          <Button size="sm" variant="secondary" onClick={() => navigate("/outreach")}>
            Automations
          </Button>
        }
      />

      <ul className="mt-4 flex-1 space-y-1.5">
        {overdue.slice(0, 5).map(({ person, touch }) => (
          <li key={person.id}>
            <button
              type="button"
              onClick={() => openDrawer(person.id)}
              className="flex w-full items-center gap-2.5 rounded-[10px] border border-line px-3 py-2 text-left transition-colors duration-200 hover:bg-cream"
            >
              <Avatar name={person.name} category={person.category} size="sm" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium text-ink">
                  {person.name}
                </span>
                <span className="block truncate text-[11.5px] text-muted">
                  {cadenceLabel[person.relationshipStrength]} ·{" "}
                  {person.organization ?? person.title}
                </span>
              </span>
              <span className="shrink-0 text-[11.5px] font-medium text-[color:var(--asbm-warning)] tabular-nums">
                {touch.label}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <Button
          size="sm"
          variant="gold"
          onClick={() =>
            openModal({ kind: "outreach", personId: overdue[0]?.person.id ?? "p-maya" })
          }
        >
          Draft the first one
        </Button>
      </div>
    </Card>
  );
}
