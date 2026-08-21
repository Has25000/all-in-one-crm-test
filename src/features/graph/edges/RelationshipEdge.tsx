import { useState } from "react";
import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from "@xyflow/react";

export type RelationshipEdgeData = {
  label: string;
  detail?: string;
  dimmed: boolean;
  emphasis?: boolean;
};

/**
 * Edges carry meaning, so hovering one says what the relationship actually is
 * rather than just drawing a line between two names.
 */
export function RelationshipEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) {
  const [hovered, setHovered] = useState(false);
  const d = (data ?? {}) as unknown as RelationshipEdgeData;

  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    curvature: 0.22,
  });

  const stroke = hovered
    ? "var(--asbm-gold)"
    : d.emphasis
      ? "var(--asbm-gold)"
      : "var(--asbm-border)";

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        style={{
          stroke,
          strokeWidth: hovered ? 2 : d.emphasis ? 1.75 : 1.25,
          strokeDasharray: d.emphasis ? "5 4" : undefined,
          opacity: d.dimmed ? 0.12 : 1,
        }}
      />
      {/* Invisible fat path so the thin line is still easy to hover. */}
      <path
        d={path}
        fill="none"
        strokeWidth={16}
        stroke="transparent"
        style={{ pointerEvents: d.dimmed ? "none" : "stroke" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      {hovered && !d.dimmed && (
        <EdgeLabelRenderer>
          <div
            className="pointer-events-none absolute z-10 rounded-[8px] border border-line bg-paper px-2.5 py-1.5 shadow-[var(--shadow-lift)]"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              animation: "asbm-fade-in 140ms ease",
            }}
          >
            <span className="block text-[11.5px] font-medium text-ink">{d.label}</span>
            {d.detail && <span className="block text-[10.5px] text-muted">{d.detail}</span>}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
