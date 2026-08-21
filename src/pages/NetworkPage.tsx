import { useMemo, useState } from "react";
import { LayoutList, Search, Share2 } from "lucide-react";
import { Card, PageHeader } from "../components/ui/Card";
import { Chip, FilterChip } from "../components/ui/Chip";
import { Avatar } from "../components/ui/Avatar";
import { StrengthDot } from "../components/ui/StrengthDot";
import { Table, Td, Th, Tr } from "../components/ui/Table";
import { NetworkGraph } from "../features/graph/NetworkGraph";
import { FULL_ORG_IDS, FULL_PERSON_IDS } from "../features/graph/graphModel";
import { useDemoState } from "../state/DemoState";
import { networkStats } from "../data/activity";
import { SYDNEY_ID } from "../data/people";
import { cn } from "../components/ui/cn";
import {
  daysSince,
  lastInteractionShort,
  people,
  sortedTasks,
} from "../data/selectors";
import type { Category } from "../data/types";

type Filter = Category | "all" | "follow-up";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "client", label: "Clients" },
  { value: "brand", label: "Brands" },
  { value: "team", label: "Teams" },
  { value: "media", label: "Media" },
  { value: "agency", label: "Agencies" },
  { value: "community", label: "Community" },
  { value: "professional", label: "Personal" },
  { value: "follow-up", label: "Needs Follow-up" },
];

/** Next step comes from an open follow-up when there is one. */
const nextStepFor = (personId: string, strength: string, days?: number) => {
  const task = sortedTasks().find((t) => t.personId === personId);
  if (task) return task.nextStep;
  if (strength === "dormant") return "Reconnect";
  if (days !== undefined && days > 60) return "Reconnect";
  return "Stay in touch";
};

export function NetworkPage() {
  const { openDrawer } = useDemoState();
  const [view, setView] = useState<"list" | "graph">("list");
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const followUpIds = useMemo(() => new Set(sortedTasks().map((t) => t.personId)), []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return people
      .filter((p) => p.id !== SYDNEY_ID)
      .filter((p) => {
        if (filter === "all") return true;
        if (filter === "follow-up") return followUpIds.has(p.id);
        return p.category === filter;
      })
      .filter((p) =>
        q
          ? [p.name, p.title, p.organization, p.connectedThrough]
              .filter(Boolean)
              .some((field) => field!.toLowerCase().includes(q))
          : true,
      );
  }, [filter, query, followUpIds]);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Network"
        meta={
          <span className="text-[14px] text-muted">
            {networkStats.totalRelationships} relationships
          </span>
        }
        subtitle="Everyone you know, and how each of them connects to the rest of your work."
        action={
          <div className="flex rounded-[10px] border border-line bg-paper p-0.5">
            {(
              [
                { value: "list", label: "List", icon: LayoutList },
                { value: "graph", label: "Graph", icon: Share2 },
              ] as const
            ).map(({ value, label, icon: Icon }) => (
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

      <Card>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[240px] flex-1">
            <Search
              size={15}
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your network"
              aria-label="Search your network"
              className="h-9.5 w-full rounded-[10px] border border-line bg-paper pr-3 pl-9 text-[13px] text-ink placeholder:text-muted focus:border-[color:var(--asbm-gold)] focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <FilterChip
                key={f.value}
                label={f.label}
                active={filter === f.value}
                onClick={() => setFilter(f.value)}
              />
            ))}
          </div>
        </div>

        <div className="mt-4">
          {view === "graph" ? (
            <NetworkGraph personIds={FULL_PERSON_IDS} orgIds={FULL_ORG_IDS} height={600} />
          ) : (
            <>
              <p className="mb-2 text-[12.5px] text-muted">
                Showing {rows.length} of {people.length - 1} seeded relationships.
              </p>
              <Table minWidth={980}>
                <thead>
                  <tr>
                    <Th>Person</Th>
                    <Th>Organization</Th>
                    <Th>Role</Th>
                    <Th>Relationship</Th>
                    <Th>Connected Through</Th>
                    <Th>Last Interaction</Th>
                    <Th>Next Step</Th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((person) => {
                    const days = daysSince(person.lastInteraction);
                    return (
                      <Tr
                        key={person.id}
                        onClick={() => openDrawer(person.id)}
                        ariaLabel={`Open relationship with ${person.name}`}
                      >
                        <Td>
                          <span className="flex items-center gap-2.5">
                            <Avatar name={person.name} category={person.category} size="sm" />
                            <span className="font-medium whitespace-nowrap text-ink">{person.name}</span>
                          </span>
                        </Td>
                        <Td className="whitespace-nowrap text-charcoal">{person.organization ?? "—"}</Td>
                        <Td className="text-muted">{person.title}</Td>
                        <Td>
                          <StrengthDot strength={person.relationshipStrength} />
                        </Td>
                        <Td className="text-muted">{person.connectedThrough ?? "Direct"}</Td>
                        <Td className={cn("whitespace-nowrap tabular-nums", days && days > 60 ? "text-[color:var(--asbm-warning)]" : "text-charcoal")}>
                          {lastInteractionShort(person.lastInteraction)}
                          {days !== undefined && days > 0 ? " ago" : ""}
                        </Td>
                        <Td>
                          <Chip tone={followUpIds.has(person.id) ? "gold" : "warm"}>
                            {nextStepFor(person.id, person.relationshipStrength, days)}
                          </Chip>
                        </Td>
                      </Tr>
                    );
                  })}
                  {rows.length === 0 && (
                    <Tr>
                      <Td colSpan={7} className="py-10 text-center text-muted">
                        No one matches that yet. Try a different filter or search.
                      </Td>
                    </Tr>
                  )}
                </tbody>
              </Table>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
