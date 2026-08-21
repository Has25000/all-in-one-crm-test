import { Handle, Position, type NodeProps } from "@xyflow/react";

export type HubNodeData = { name: string; role: string };

/** Sydney — the one node everything else is measured against. */
export function HubNode({ data }: NodeProps) {
  const d = data as unknown as HubNodeData;
  return (
    <div className="flex w-[210px] items-center gap-3 rounded-[14px] border border-forest bg-forest px-3.5 py-3 shadow-[var(--shadow-lift)]">
      <Handle type="target" position={Position.Left} isConnectable={false} />
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--asbm-gold)] text-[13px] font-semibold text-[color:var(--asbm-black)]">
        SA
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13.5px] leading-tight font-semibold text-white">
          {d.name}
        </span>
        <span className="block truncate text-[10.5px] leading-tight text-[color:var(--asbm-gold-light)]">
          {d.role}
        </span>
      </span>
      <Handle type="source" position={Position.Right} isConnectable={false} />
    </div>
  );
}
