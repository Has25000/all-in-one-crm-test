import { Card, SectionHeader } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Avatar } from "../../components/ui/Avatar";
import { StrengthDot } from "../../components/ui/StrengthDot";
import { PathChain } from "../../components/ui/PathChain";
import { useDemoState } from "../../state/DemoState";
import { getPerson, lastInteractionLabel } from "../../data/selectors";

/**
 * The component that makes the product feel like it is paying attention:
 * relationships worth acting on, and why, in Sydney's own terms.
 *
 * Kept deliberately compact so the network graph below it reaches the first
 * viewport on a 1440x900 laptop.
 */
export function RelationshipIntelligence() {
  const { openDrawer, openModal } = useDemoState();
  const maya = getPerson("p-maya")!;

  return (
    <Card className="flex h-full flex-col">
      <SectionHeader
        title="Relationship Intelligence"
        subtitle="Important relationships that may need your attention."
      />

      <div className="mt-3.5 flex flex-1 flex-col gap-2.5">
        {/* 1 — a strong relationship going quiet */}
        <article className="rounded-[12px] border border-line bg-cream/50 p-3.5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <Avatar name={maya.name} category="brand" size="md" />
              <div className="min-w-0">
                <h3 className="text-[14.5px] leading-snug font-semibold text-ink">
                  Reconnect with Maya Thompson
                </h3>
                <p className="text-[12.5px] text-muted">Nike · Athlete Partnerships</p>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-0.5 text-[12px] text-muted">
                  <StrengthDot strength={maya.relationshipStrength} />
                  <span>Last interaction {lastInteractionLabel(maya.lastInteraction)}</span>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button size="sm" variant="secondary" onClick={() => openDrawer("p-maya")}>
                View Relationship
              </Button>
              <Button
                size="sm"
                variant="gold"
                onClick={() => openModal({ kind: "outreach", personId: "p-maya" })}
              >
                Draft Outreach
              </Button>
            </div>
          </div>
          <p className="mt-2.5 text-[12.5px] leading-relaxed text-charcoal">
            You previously discussed athlete-brand opportunities. It may be a good time to reconnect
            before fall campaigns begin.
          </p>
        </article>

        <div className="grid flex-1 gap-2.5 sm:grid-cols-2">
          {/* 2 — a path Sydney already has */}
          <article className="flex flex-col rounded-[12px] border border-line bg-cream/50 p-3.5">
            <h3 className="text-[14px] font-semibold text-ink">Potential introduction</h3>
            <div className="mt-2">
              <PathChain nodes={["Sydney", "Marcus Reed", "Jordan Lee"]} />
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal">
              Marcus has a strong relationship with Jordan Lee at Gatorade.
            </p>
            <div className="mt-3 flex flex-1 items-end">
              <Button size="sm" variant="secondary" onClick={() => openDrawer("p-jordan-lee")}>
                Explore Introduction
              </Button>
            </div>
          </article>

          {/* 3 — a date approaching that the network can help with */}
          <article className="flex flex-col rounded-[12px] border border-line bg-cream/50 p-3.5">
            <h3 className="text-[14px] font-semibold text-ink">Upcoming opportunity</h3>
            <p className="text-[12.5px] text-muted">Dakereon Joyner</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal">
              A community event is coming up in 18 days. Three people in your network may be relevant
              partners.
            </p>
            <div className="mt-3 flex flex-1 items-end">
              <Button size="sm" variant="secondary" onClick={() => openDrawer("p-dakereon")}>
                View Connections
              </Button>
            </div>
          </article>
        </div>
      </div>
    </Card>
  );
}
