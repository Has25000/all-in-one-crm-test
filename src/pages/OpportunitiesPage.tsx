import { useMemo, useState } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from "recharts";
import { Check, Columns3, Download, LayoutList, Search, Waypoints } from "lucide-react";
import { Card, PageHeader, SectionHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { FilterChip } from "../components/ui/Chip";
import { OpportunityBoard } from "../features/opportunities/OpportunityBoard";
import { OpportunityTable } from "../features/opportunities/OpportunityTable";
import { OpportunityTimeline } from "../features/opportunities/OpportunityTimeline";
import { useOpportunities } from "../features/opportunities/stage";
import { priorityLabel, stageLabel, stageOrder, stageToken } from "../data/opportunities";
import {
  formatDate,
  formatMoney,
  getClient,
  stageIndex,
  toCsv,
  weightedValue,
} from "../data/selectors";
import type { Opportunity, OpportunityStage } from "../data/types";
import { cn } from "../components/ui/cn";

type View = "board" | "table" | "timeline";
type GroupBy = "none" | "stage" | "client" | "kind";
type SortBy = "stage" | "date" | "value";

const VIEWS = [
  { value: "board", label: "Board", icon: Columns3 },
  { value: "table", label: "Table", icon: LayoutList },
  { value: "timeline", label: "Timeline", icon: Waypoints },
] as const;

export function OpportunitiesPage() {
  const all = useOpportunities();

  const [view, setView] = useState<View>("board");
  const [groupBy, setGroupBy] = useState<GroupBy>("stage");
  const [sortBy, setSortBy] = useState<SortBy>("stage");
  const [stageFilter, setStageFilter] = useState<OpportunityStage | "all">("all");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all
      .filter((o) => (stageFilter === "all" ? true : o.stage === stageFilter))
      .filter((o) =>
        q
          ? [o.title, o.organization, o.kind, o.nextAction].some((field) =>
              field.toLowerCase().includes(q),
            )
          : true,
      )
      .sort((a, b) => {
        if (sortBy === "value") return (b.potentialValue ?? 0) - (a.potentialValue ?? 0);
        if (sortBy === "date")
          return (a.expectedDate ?? "9999").localeCompare(b.expectedDate ?? "9999");
        return stageIndex(a.stage) - stageIndex(b.stage);
      });
  }, [all, stageFilter, query, sortBy]);

  const groups = useMemo(() => {
    if (groupBy === "none") return [{ key: "all", label: "", items: filtered }];

    const buckets = new Map<string, { label: string; items: Opportunity[] }>();
    for (const item of filtered) {
      const [key, label] =
        groupBy === "stage"
          ? [item.stage, stageLabel[item.stage]]
          : groupBy === "client"
            ? [
                item.clientIds[0] ?? "none",
                getClient(item.clientIds[0] ?? "")?.name ?? "No client attached",
              ]
            : [item.kind, item.kind];
      const bucket = buckets.get(key) ?? { label, items: [] };
      bucket.items.push(item);
      buckets.set(key, bucket);
    }

    const entries = [...buckets.entries()].map(([key, value]) => ({ key, ...value }));
    return groupBy === "stage"
      ? entries.sort((a, b) => stageIndex(a.key as OpportunityStage) - stageIndex(b.key as OpportunityStage))
      : entries.sort((a, b) => a.label.localeCompare(b.label));
  }, [filtered, groupBy]);

  const openItems = all.filter((o) => o.stage !== "complete");
  const inPlay = openItems.reduce((sum, o) => sum + (o.potentialValue ?? 0), 0);
  const weighted = openItems.reduce((sum, o) => sum + weightedValue(o), 0);
  const decidingSoon = openItems.filter(
    (o) => o.expectedDate && o.expectedDate <= "2026-09-30",
  ).length;

  const chartData = stageOrder
    .filter((stage) => stage !== "complete")
    .map((stage) => ({
      stage: stageLabel[stage],
      value: all
        .filter((o) => o.stage === stage)
        .reduce((sum, o) => sum + (o.potentialValue ?? 0), 0),
      fill: stageToken[stage].dot,
    }));

  const exportCsv = () => {
    const csv = toCsv(
      ["Opportunity", "Organization", "Stage", "Client", "Type", "Next action", "Confidence", "Potential", "Decision expected", "Owner"],
      filtered.map((o) => [
        o.title,
        o.organization,
        stageLabel[o.stage],
        o.clientIds.map((id) => getClient(id)?.name).filter(Boolean).join(" + "),
        o.kind,
        o.nextAction,
        `${o.confidence ?? 0}%`,
        o.potentialValue ?? "",
        o.expectedDate ? formatDate(o.expectedDate, "yyyy-MM-dd") : "",
        o.owner,
      ]),
    );
    void navigator.clipboard?.writeText(csv);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Opportunities"
        meta={<span className="text-[14px] text-muted">{openItems.length} open</span>}
        subtitle="Every conversation that could turn into work, and the relationship each one rests on."
        action={
          <div className="flex rounded-[10px] border border-line bg-paper p-0.5">
            {VIEWS.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setView(value)}
                aria-pressed={view === value}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-[8px] px-3 py-1.5 text-[12.5px] font-medium transition-colors duration-200",
                  view === value ? "bg-ink text-white" : "text-muted hover:text-ink",
                )}
              >
                <Icon size={14} aria-hidden />
                {label}
              </button>
            ))}
          </div>
        }
      />

      {/* Where things stand */}
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <Card>
          <SectionHeader title="Where things stand" />
          <dl className="mt-3.5 grid grid-cols-3 gap-3">
            {[
              { label: "In play", value: formatMoney(inPlay) },
              { label: "Weighted", value: formatMoney(weighted) },
              { label: "Deciding by Sep 30", value: String(decidingSoon) },
            ].map((tile) => (
              <div key={tile.label}>
                <dt className="eyebrow">{tile.label}</dt>
                <dd className="mt-1 text-[19px] font-semibold text-ink tabular-nums">
                  {tile.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 border-t border-line pt-3 text-[12px] leading-relaxed text-muted">
            Weighted applies your own confidence to each one. The number matters less than which
            relationship is holding it up.
          </p>
        </Card>

        <Card>
          <SectionHeader title="Value by stage" subtitle="Where the open work is sitting." />
          <div className="mt-3 h-[132px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                <XAxis
                  dataKey="stage"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10.5, fill: "var(--asbm-muted)" }}
                />
                <Bar dataKey="value" radius={[5, 5, 0, 0]} isAnimationActive={false}>
                  {chartData.map((entry) => (
                    <Cell key={entry.stage} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
            {chartData.map((entry) => (
              <li key={entry.stage} className="text-[11px] text-muted tabular-nums">
                {entry.stage} · {formatMoney(entry.value)}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* The board */}
      <Card>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px] flex-1">
            <Search
              size={15}
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search opportunities"
              aria-label="Search opportunities"
              className="h-9 w-full rounded-[10px] border border-line bg-paper pr-3 pl-9 text-[13px] text-ink placeholder:text-muted focus:border-[color:var(--asbm-gold)] focus:outline-none"
            />
          </div>

          <label className="flex items-center gap-1.5 text-[12.5px] text-muted">
            Group by
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value as GroupBy)}
              className="h-9 rounded-[9px] border border-line bg-paper px-2 text-[12.5px] text-ink focus:border-[color:var(--asbm-gold)] focus:outline-none"
            >
              <option value="stage">Stage</option>
              <option value="client">Client</option>
              <option value="kind">Type</option>
              <option value="none">Nothing</option>
            </select>
          </label>

          <label className="flex items-center gap-1.5 text-[12.5px] text-muted">
            Sort
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="h-9 rounded-[9px] border border-line bg-paper px-2 text-[12.5px] text-ink focus:border-[color:var(--asbm-gold)] focus:outline-none"
            >
              <option value="stage">Stage</option>
              <option value="date">Decision date</option>
              <option value="value">Potential</option>
            </select>
          </label>

          <Button size="sm" variant="secondary" onClick={exportCsv}>
            {copied ? <Check size={14} aria-hidden /> : <Download size={14} aria-hidden />}
            {copied ? "Copied as CSV" : "Export"}
          </Button>
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          <FilterChip
            label="All"
            active={stageFilter === "all"}
            count={all.length}
            onClick={() => setStageFilter("all")}
          />
          {stageOrder.map((stage) => (
            <FilterChip
              key={stage}
              label={stageLabel[stage]}
              active={stageFilter === stage}
              count={all.filter((o) => o.stage === stage).length}
              onClick={() => setStageFilter(stage)}
            />
          ))}
        </div>

        {view === "board" && <OpportunityBoard items={filtered} />}
        {view === "table" && <OpportunityTable groups={groups} />}
        {view === "timeline" && <OpportunityTimeline items={filtered} />}

        {filtered.length === 0 && (
          <p className="py-10 text-center text-[13px] text-muted">
            Nothing matches that. Try a different stage or search.
          </p>
        )}

        {view === "board" && (
          <p className="mt-3 text-[11.5px] text-muted">
            Drag a card between columns, or focus one and use the left and right arrow keys.
            Priority is shown as a dot; {priorityLabel.high.toLowerCase()} priority is amber.
          </p>
        )}
      </Card>
    </div>
  );
}
