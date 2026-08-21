import { Card, SectionHeader } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PathChain } from "../../components/ui/PathChain";
import { suggestedPaths } from "../../data/activity";
import { useDemoState } from "../../state/DemoState";

const exploreTarget: Record<string, string> = {
  "sp-tasha": "p-tasha",
  "sp-maya": "p-maya",
  "sp-jordan": "p-jordan-lee",
};

/** Who Sydney already knows who could help someone else she knows. */
export function SuggestedConnections() {
  const { openDrawer } = useDemoState();

  return (
    <Card className="flex h-full flex-col">
      <SectionHeader
        title="Suggested Connections"
        subtitle="Paths through your network that could open something up."
        explain="Second-degree paths worth acting on. Each chain shows who you would go through and why that person is the right route."
      />

      <ul className="mt-4 flex-1 space-y-3">
        {suggestedPaths.map((path) => (
          <li key={path.id} className="rounded-[12px] border border-line bg-cream/50 p-3.5">
            <PathChain nodes={path.chain} />
            <p className="mt-2.5 text-[12.5px] leading-relaxed text-charcoal">{path.reason}</p>
            <div className="mt-3">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => openDrawer(exploreTarget[path.id] ?? "p-marcus")}
              >
                Explore
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
