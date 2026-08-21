import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Avatar } from "../../../components/ui/Avatar";
import { categoryMeta, strengthMeta } from "../../../data/selectors";
import type { Category, Strength } from "../../../data/types";

export type PersonNodeData = {
  name: string;
  title: string;
  organization?: string;
  category: Category;
  strength: Strength;
  dimmed: boolean;
  highlighted?: boolean;
};

export function PersonNode({ data, selected }: NodeProps) {
  const d = data as unknown as PersonNodeData;
  const meta = categoryMeta[d.category];

  return (
    <div
      className="flex w-[196px] items-center gap-2.5 rounded-[12px] border bg-paper px-2.5 py-2 transition-[opacity,box-shadow,border-color] duration-200"
      style={{
        opacity: d.dimmed ? 0.22 : 1,
        borderColor: selected || d.highlighted ? "var(--asbm-gold)" : "var(--asbm-border)",
        boxShadow:
          selected || d.highlighted
            ? "0 0 0 3px var(--asbm-gold-light), var(--shadow-lift)"
            : "var(--shadow-card)",
      }}
    >
      <Handle type="target" position={Position.Left} isConnectable={false} />
      <span className="relative shrink-0">
        <Avatar name={d.name} category={d.category} size="sm" />
        <span
          aria-hidden
          className="absolute -right-0.5 -bottom-0.5 size-[8px] rounded-full ring-2 ring-[color:var(--asbm-white)]"
          style={{ background: strengthMeta[d.strength].token }}
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] leading-tight font-semibold text-ink">
          {d.name}
        </span>
        <span className="block truncate text-[11px] leading-tight text-muted">
          {d.organization ?? d.title}
        </span>
      </span>
      <span
        aria-hidden
        className="h-7 w-[3px] shrink-0 rounded-full"
        style={{ background: meta.token }}
      />
      <Handle type="source" position={Position.Right} isConnectable={false} />
    </div>
  );
}
