import { useNavigate } from "react-router-dom";
import { Card, SectionHeader } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { networkStats } from "../../data/activity";
import { strengthMeta } from "../../data/selectors";
import type { Strength } from "../../data/types";

const total = networkStats.health.reduce((sum, band) => sum + band.value, 0);

/**
 * Health as a segmented bar rather than a score. Four honest bands, and one
 * sentence about what they mean for this week.
 */
export function NetworkHealth() {
  const navigate = useNavigate();

  return (
    <Card className="flex h-full flex-col">
      <SectionHeader
        title="Network Health"
        subtitle="How your relationships are holding up."
        explain="Four honest bands rather than a score. Strong, active, cooling, dormant — and one line about the high-value relationships that have gone too long without contact."
      />

      <div
        className="mt-5 flex h-2.5 w-full overflow-hidden rounded-full"
        role="img"
        aria-label={networkStats.health
          .map((band) => `${band.label} ${band.value}`)
          .join(", ")}
      >
        {networkStats.health.map((band) => (
          <span
            key={band.key}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{
              width: `${(band.value / total) * 100}%`,
              background: strengthMeta[band.key as Strength].token,
            }}
          />
        ))}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
        {networkStats.health.map((band) => (
          <div key={band.key} className="flex items-center justify-between gap-2">
            <dt className="flex items-center gap-1.5 text-[12.5px] text-charcoal">
              <span
                aria-hidden
                className="size-[7px] rounded-full"
                style={{ background: strengthMeta[band.key as Strength].token }}
              />
              {band.label}
            </dt>
            <dd className="text-[13px] font-semibold text-ink tabular-nums">{band.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 border-l-2 border-[color:var(--asbm-warning)] bg-cream/70 px-3 py-2.5 text-[13px] leading-relaxed text-charcoal">
        <strong className="font-semibold text-ink">{networkStats.neglected} high-value relationships</strong>{" "}
        haven't been contacted in 90+ days.
      </p>

      <div className="mt-4 flex flex-1 items-end">
        <Button size="sm" variant="secondary" onClick={() => navigate("/outreach")}>
          Review relationships
        </Button>
      </div>
    </Card>
  );
}
