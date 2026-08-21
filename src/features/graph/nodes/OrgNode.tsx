import { Handle, Position, type NodeProps } from "@xyflow/react";

export type OrgNodeData = { name: string; kind: string; dimmed: boolean };

export function OrgNode({ data }: NodeProps) {
  const d = data as unknown as OrgNodeData;
  return (
    <div
      className="rounded-[9px] border border-dashed border-[color:var(--asbm-gold)]/45 bg-cream px-3 py-1.5 transition-opacity duration-200"
      style={{ opacity: d.dimmed ? 0.2 : 1 }}
    >
      <Handle type="target" position={Position.Left} isConnectable={false} />
      <span className="block max-w-[150px] truncate text-[11.5px] font-medium text-charcoal">
        {d.name}
      </span>
      <span className="eyebrow block text-[9px]">{d.kind}</span>
      <Handle type="source" position={Position.Right} isConnectable={false} />
    </div>
  );
}
