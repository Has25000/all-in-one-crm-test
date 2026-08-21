import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Card, SectionHeader } from "../../components/ui/Card";
import { networkStats } from "../../data/activity";

const SLICE_TOKENS = [
  "var(--asbm-green)",
  "var(--asbm-gold)",
  "var(--asbm-charcoal)",
  "var(--asbm-warm-neutral)",
  "var(--asbm-neutral-light)",
  "var(--asbm-green-light)",
  "var(--asbm-cream-deep)",
];

/**
 * Where Sydney's professional ecosystem actually sits. The legend carries the
 * numbers so the chart is never the only way to read it.
 */
export function CategoryMix() {
  const total = networkStats.categories.reduce((sum, slice) => sum + slice.value, 0);

  return (
    <Card className="flex h-full flex-col">
      <SectionHeader title="Who's in your network" subtitle="Across every kind of relationship." />

      <div className="mt-3 flex flex-1 items-center gap-4">
        <div className="relative size-[132px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={networkStats.categories}
                dataKey="value"
                nameKey="label"
                innerRadius={42}
                outerRadius={64}
                paddingAngle={1.5}
                stroke="var(--asbm-white)"
                strokeWidth={1.5}
                isAnimationActive={false}
              >
                {networkStats.categories.map((slice, index) => (
                  <Cell key={slice.label} fill={SLICE_TOKENS[index % SLICE_TOKENS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[17px] font-semibold text-ink tabular-nums">{total}</span>
            <span className="text-[10.5px] text-muted">people</span>
          </div>
        </div>

        <dl className="min-w-0 flex-1 space-y-1.5">
          {networkStats.categories.map((slice, index) => (
            <div key={slice.label} className="flex items-center gap-2">
              <span
                aria-hidden
                className="size-[8px] shrink-0 rounded-[2px]"
                style={{ background: SLICE_TOKENS[index % SLICE_TOKENS.length] }}
              />
              <dt className="min-w-0 flex-1 truncate text-[12.5px] text-charcoal">{slice.label}</dt>
              <dd className="text-[12.5px] font-medium text-ink tabular-nums">{slice.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Card>
  );
}
