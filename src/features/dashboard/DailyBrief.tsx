import { ArrowRight } from "lucide-react";
import { dailyBrief } from "../../data/activity";
import { useDemoState } from "../../state/DemoState";

const items = [
  { value: dailyBrief.meetings, label: "meetings" },
  { value: dailyBrief.followUps, label: "follow-ups" },
  { value: dailyBrief.cooling, label: "relationships cooling" },
  { value: dailyBrief.introductions, label: "potential introduction" },
];

/**
 * The first thing Sydney sees: not how many people she knows, but what today
 * actually asks of her.
 */
export function DailyBrief() {
  const { openDrawer } = useDemoState();

  return (
    <section className="rounded-[var(--radius-card)] border border-line bg-ink px-5 py-3.5 text-white">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <div>
          <p className="text-[10.5px] font-semibold tracking-[0.09em] text-[color:var(--asbm-gold-light)] uppercase">
            Your day at a glance
          </p>
          <ul className="mt-2 flex flex-wrap items-baseline gap-x-6 gap-y-1">
            {items.map((item) => (
              <li key={item.label} className="flex items-baseline gap-1.5">
                <span className="text-[20px] font-semibold tabular-nums">{item.value}</span>
                <span className="text-[13px] text-white/70">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => openDrawer("p-maya")}
          className="group flex max-w-[420px] items-start gap-3 rounded-[10px] border border-white/15 px-3.5 py-2.5 text-left transition-colors duration-200 hover:border-[color:var(--asbm-gold)]"
        >
          <span className="text-[13px] leading-snug">
            <span className="font-semibold text-[color:var(--asbm-gold-light)]">Priority: </span>
            <span className="text-white/85">{dailyBrief.priority}</span>
          </span>
          <ArrowRight
            size={15}
            aria-hidden
            className="mt-0.5 shrink-0 text-white/50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[color:var(--asbm-gold)]"
          />
        </button>
      </div>
    </section>
  );
}
