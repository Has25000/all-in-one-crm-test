import { useCallback, useEffect, useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  useStore,
  type Edge,
  type Node,
} from "@xyflow/react";
import { HubNode } from "./nodes/HubNode";
import { PersonNode } from "./nodes/PersonNode";
import { OrgNode } from "./nodes/OrgNode";
import { RelationshipEdge } from "./edges/RelationshipEdge";
import { layoutGraph } from "./graphLayout";
import { FilterChip } from "../../components/ui/Chip";
import { useDemoState, type GraphFilter } from "../../state/DemoState";
import { SYDNEY_ID } from "../../data/people";
import {
  formatDate,
  getOrganization,
  getPerson,
  relationshipLabel,
  relationships,
} from "../../data/selectors";

const nodeTypes = { hub: HubNode, person: PersonNode, org: OrgNode };
const edgeTypes = { relationship: RelationshipEdge };

/**
 * React Flow only fits the view once on mount. The graph lives inside a
 * responsive card, so refit whenever the canvas actually changes size.
 */
function RefitOnResize() {
  const { fitView } = useReactFlow();
  const width = useStore((state) => state.width);
  const height = useStore((state) => state.height);

  useEffect(() => {
    if (!width || !height) return;
    void fitView({ padding: 0.08, maxZoom: 1, duration: 0 });
  }, [width, height, fitView]);

  return null;
}

const FILTERS: { value: GraphFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "client", label: "Clients" },
  { value: "brand", label: "Brands" },
  { value: "team", label: "Teams" },
  { value: "media", label: "Media" },
  { value: "community", label: "Community" },
];

export function NetworkGraph({
  personIds,
  orgIds,
  height = 460,
  showFilters = true,
  interactive = true,
  highlightId,
}: {
  personIds: string[];
  orgIds: string[];
  height?: number;
  showFilters?: boolean;
  interactive?: boolean;
  /** Ring this node — used when a graph is about one particular person. */
  highlightId?: string;
}) {
  const { graphFilter, setGraphFilter, openDrawer } = useDemoState();
  const filter = showFilters ? graphFilter : "all";

  const positions = useMemo(() => layoutGraph(personIds, orgIds), [personIds, orgIds]);

  const isDimmed = useCallback(
    (id: string) => {
      if (filter === "all" || id === SYDNEY_ID) return false;
      const person = getPerson(id);
      if (person) return person.category !== filter;
      const org = getOrganization(id);
      return org ? org.kind !== filter : true;
    },
    [filter],
  );

  const initialNodes = useMemo<Node[]>(() => {
    const visible = new Set([...personIds, ...orgIds]);
    const personNodes = personIds.map<Node>((id) => {
      const person = getPerson(id)!;
      if (id === SYDNEY_ID) {
        return {
          id,
          type: "hub",
          position: positions[id] ?? { x: 0, y: 0 },
          data: { name: person.name, role: "Anderson Sports and Brand Management" },
        };
      }
      return {
        id,
        type: "person",
        position: positions[id] ?? { x: 0, y: 0 },
        data: {
          name: person.name,
          title: person.title,
          organization: person.organization,
          category: person.category,
          strength: person.relationshipStrength,
          dimmed: false,
          highlighted: id === highlightId,
        },
      };
    });

    const orgNodes = orgIds
      .filter((id) => visible.has(id))
      .map<Node>((id) => {
        const org = getOrganization(id)!;
        return {
          id,
          type: "org",
          position: positions[id] ?? { x: 0, y: 0 },
          data: { name: org.name, kind: org.kind, dimmed: false },
        };
      });

    return [...personNodes, ...orgNodes];
  }, [personIds, orgIds, positions, highlightId]);

  const initialEdges = useMemo<Edge[]>(() => {
    const visible = new Set([...personIds, ...orgIds]);
    return relationships
      .filter((r) => visible.has(r.sourceId) && visible.has(r.targetId))
      .map<Edge>((r) => ({
        id: r.id,
        source: r.sourceId,
        target: r.targetId,
        type: "relationship",
        data: {
          label: `${relationshipLabel[r.type]}`,
          detail: r.lastInteraction
            ? `Last interaction ${formatDate(r.lastInteraction)}`
            : r.type === "potential-introduction"
              ? "Not yet connected"
              : undefined,
          dimmed: false,
          emphasis: r.type === "potential-introduction",
        },
      }));
  }, [personIds, orgIds]);

  // Positions live in state so nodes stay draggable; the filter is layered on
  // top at render time. Dimming rather than removing keeps the shape of the
  // network from changing underneath you.
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const displayNodes = useMemo(
    () =>
      nodes.map((node) =>
        node.type === "hub"
          ? node
          : { ...node, data: { ...node.data, dimmed: isDimmed(node.id) } },
      ),
    [nodes, isDimmed],
  );

  const displayEdges = useMemo(
    () =>
      edges.map((edge) => ({
        ...edge,
        data: { ...edge.data, dimmed: isDimmed(edge.source) || isDimmed(edge.target) },
      })),
    [edges, isDimmed],
  );

  return (
    <div>
      {showFilters && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <FilterChip
              key={f.value}
              label={f.label}
              active={filter === f.value}
              onClick={() => setGraphFilter(f.value)}
            />
          ))}
        </div>
      )}
      <div
        style={{ height }}
        className="overflow-hidden rounded-[12px] border border-line bg-[color:var(--asbm-cream)]/40"
      >
        <ReactFlow
          nodes={displayNodes}
          edges={displayEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={(_, node) => {
            if (node.type !== "org") openDrawer(node.id);
          }}
          fitView
          fitViewOptions={{ padding: 0.08, maxZoom: 1 }}
          minZoom={0.3}
          maxZoom={1.6}
          nodesDraggable={interactive}
          nodesConnectable={false}
          panOnDrag={interactive}
          zoomOnScroll={false}
          zoomOnPinch={interactive}
          panOnScroll={false}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
        >
          <RefitOnResize />
          <Background
            variant={BackgroundVariant.Dots}
            gap={22}
            size={1}
            color="var(--asbm-border)"
          />
          {interactive && <Controls showInteractive={false} position="bottom-right" />}
        </ReactFlow>
      </div>
    </div>
  );
}
