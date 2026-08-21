import { useNavigate } from "react-router-dom";
import { Card, SectionHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { DailyBrief } from "../features/dashboard/DailyBrief";
import { MetricCards } from "../features/dashboard/MetricCards";
import { RelationshipIntelligence } from "../features/dashboard/RelationshipIntelligence";
import { TodaySchedule } from "../features/dashboard/TodaySchedule";
import { FollowUps } from "../features/dashboard/FollowUps";
import { NetworkHealth } from "../features/dashboard/NetworkHealth";
import { CategoryMix } from "../features/dashboard/CategoryMix";
import { SuggestedConnections } from "../features/dashboard/SuggestedConnections";
import { RecentActivity } from "../features/dashboard/RecentActivity";
import { UpcomingEvents } from "../features/dashboard/UpcomingEvents";
import { StayInTouch } from "../features/dashboard/StayInTouch";
import { ClientCard } from "../features/clients/ClientCard";
import { OpportunityCard } from "../features/opportunities/OpportunityCard";
import { NetworkGraph } from "../features/graph/NetworkGraph";
import { TourInvite } from "../features/tour/TourInvite";
import { CORE_ORG_IDS, CORE_PERSON_IDS } from "../features/graph/graphModel";
import { clients, opportunities } from "../data/selectors";

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <TourInvite />

      <div data-tour="daily-brief">
        <DailyBrief />
      </div>

      <div data-tour="metrics">
        <MetricCards />
      </div>

      <div
        data-tour="intelligence"
        className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
      >
        <RelationshipIntelligence />
        <TodaySchedule />
      </div>

      <Card data-tour="graph">
        <SectionHeader
          title="Your Network"
          subtitle="See how clients, brands, teams, media, and partners connect."
          explain="Every person and organisation you know, drawn as one picture. You are the centre; colour tells you the kind of relationship. Drag nodes, filter by category, and hover a line to see what the connection actually is. Clicking anyone opens their full relationship card."
          action={
            <Button size="sm" variant="secondary" onClick={() => navigate("/network")}>
              Open network
            </Button>
          }
        />
        <div className="mt-4">
          <NetworkGraph personIds={CORE_PERSON_IDS} orgIds={CORE_ORG_IDS} height={480} />
        </div>
      </Card>

      <Card>
        <SectionHeader
          title="Clients"
          subtitle="Six athletes and two brands, in the same system as everyone else."
          action={
            <Button size="sm" variant="secondary" onClick={() => navigate("/clients")}>
              All clients
            </Button>
          }
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {clients.slice(0, 4).map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      </Card>

      <div className="grid gap-5 xl:grid-cols-2">
        <UpcomingEvents />
        <StayInTouch />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <FollowUps />
        <NetworkHealth />
        <CategoryMix />
      </div>

      <Card>
        <SectionHeader
          title="Opportunities"
          subtitle="Where relationships are turning into work."
          action={
            <Button size="sm" variant="secondary" onClick={() => navigate("/opportunities")}>
              Open board
            </Button>
          }
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {opportunities.slice(0, 3).map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <SuggestedConnections />
        <RecentActivity />
      </div>
    </div>
  );
}
