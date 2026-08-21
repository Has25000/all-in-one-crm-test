import { connectedSources } from "../../data/activity";
import { Card, SectionHeader } from "../ui/Card";

/**
 * Signals where the real product would pull from, without pretending any of it
 * is wired up.
 */
export function ConnectedSources() {
  return (
    <Card>
      <SectionHeader title="Connected sources" subtitle="Where this would eventually pull from." />
      <ul className="mt-4 space-y-2">
        {connectedSources.map((source) => (
          <li
            key={source}
            className="flex items-center justify-between border-b border-line pb-2 text-[13px] text-charcoal last:border-b-0 last:pb-0"
          >
            {source}
            <span className="rounded-full border border-line bg-cream px-2 py-[2px] text-[10.5px] font-medium tracking-[0.06em] text-muted uppercase">
              Demo
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
