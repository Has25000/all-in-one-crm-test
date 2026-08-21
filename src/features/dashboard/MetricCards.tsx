import { useNavigate } from "react-router-dom";
import { networkStats } from "../../data/activity";
import { useDemoState } from "../../state/DemoState";
import { isDueToday, sortedTasks } from "../../data/selectors";

export function MetricCards() {
  const navigate = useNavigate();
  const { completedTaskIds } = useDemoState();

  // Follow-up counts move when one is completed, so the headline stays honest.
  const open = sortedTasks().filter((t) => !completedTaskIds.includes(t.id));
  const dueToday = open.filter((t) => isDueToday(t.dueDate)).length;

  const metrics = [
    { label: "Relationships", value: networkStats.totalRelationships.toString(), sub: `+${networkStats.addedThisMonth} this month`, to: "/network" },
    { label: "Clients", value: networkStats.clients.toString(), sub: networkStats.clientBreakdown, to: "/clients" },
    { label: "Follow-ups", value: open.length.toString(), sub: `${dueToday} due today`, to: "/outreach" },
    { label: "Active Opportunities", value: networkStats.activeOpportunities.toString(), sub: networkStats.potentialLabel, to: "/clients" },
  ];

  return (
    <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <button
          key={metric.label}
          type="button"
          onClick={() => navigate(metric.to)}
          className="rounded-[var(--radius-card)] border border-line bg-paper px-4 py-3 text-left shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-200 hover:border-[color:var(--asbm-gold)]/60 hover:shadow-[var(--shadow-lift)]"
        >
          <div className="eyebrow">{metric.label}</div>
          <div className="num-lg mt-1.5 text-ink">{metric.value}</div>
          <div className="mt-0.5 text-[12.5px] text-muted">{metric.sub}</div>
        </button>
      ))}
    </div>
  );
}
