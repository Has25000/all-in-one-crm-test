import { Card, PageHeader, SectionHeader } from "../components/ui/Card";
import { ClientCard } from "../features/clients/ClientCard";
import { OpportunityCard } from "../features/opportunities/OpportunityCard";
import { clients, opportunities } from "../data/selectors";

export function ClientsPage() {
  const athletes = clients.filter((c) => c.type === "athlete");
  const brands = clients.filter((c) => c.type === "brand");

  return (
    <div className="space-y-5">
      <PageHeader
        title="Clients"
        meta={<span className="text-[14px] text-muted">{clients.length} active</span>}
        subtitle="Your athletes and brand clients, with their relationships, work, and schedule in the same system as everyone else."
      />

      <Card>
        <SectionHeader title="Athletes" subtitle={`${athletes.length} clients`} />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {athletes.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader title="Brands" subtitle={`${brands.length} clients`} />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {brands.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader
          title="Opportunities across clients"
          subtitle="Every open conversation, and the relationship it depends on."
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </Card>
    </div>
  );
}
