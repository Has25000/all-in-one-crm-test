import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Tabs, TabPanel } from "../../components/ui/Tabs";
import { Avatar } from "../../components/ui/Avatar";
import { Button } from "../../components/ui/Button";
import { Chip } from "../../components/ui/Chip";
import { StrengthDot } from "../../components/ui/StrengthDot";
import { NetworkGraph } from "../graph/NetworkGraph";
import { OpportunityCard } from "../opportunities/OpportunityCard";
import { useDemoState } from "../../state/DemoState";
import { SYDNEY_ID } from "../../data/people";
import { DEMO_TODAY_ISO } from "../../data/today";
import {
  documentsForClient,
  eventsForClient,
  formatDate,
  formatHour,
  getClient,
  getPerson,
  interactionsForPerson,
  opportunitiesForClient,
} from "../../data/selectors";

const TABS = [
  { value: "overview", label: "Overview" },
  { value: "relationships", label: "Relationships" },
  { value: "opportunities", label: "Opportunities" },
  { value: "documents", label: "Documents" },
  { value: "activity", label: "Activity" },
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="eyebrow mb-2.5">{title}</h3>
      {children}
    </section>
  );
}

/**
 * A client's whole picture: priorities, the relationships around them, what's
 * open, the files, and the history — in the same system as everyone else.
 */
export function ClientDetailModal() {
  const { modal, closeModal, openDrawer } = useDemoState();
  const open = modal.kind === "client";
  const client = open ? getClient(modal.clientId) : undefined;

  if (!client) return null;

  const clientPerson = client.personId ? getPerson(client.personId) : undefined;
  const keyPeople = client.keyRelationshipIds.map(getPerson).filter(Boolean);
  const upcoming = eventsForClient(client.id).filter((e) => e.date >= DEMO_TODAY_ISO);
  const files = documentsForClient(client.id);
  const opportunities = opportunitiesForClient(client.id);
  const activity = client.personId ? interactionsForPerson(client.personId) : [];

  const graphPeople = [
    SYDNEY_ID,
    ...(client.personId ? [client.personId] : []),
    ...client.keyRelationshipIds,
  ];
  const graphOrgs = Array.from(
    new Set(keyPeople.map((p) => p!.organizationId).filter(Boolean) as string[]),
  );

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && closeModal()}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-[color:var(--asbm-black)]/35 backdrop-blur-[1px]"
          style={{ animation: "asbm-overlay-in 200ms ease" }}
        />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 z-50 flex h-[min(690px,92vh)] w-[min(960px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[16px] border border-line bg-paper shadow-[var(--shadow-overlay)] focus:outline-none"
          style={{ animation: "asbm-pop-in 220ms cubic-bezier(0.2, 0.8, 0.3, 1)" }}
        >
          <header className="flex shrink-0 items-start justify-between gap-4 px-6 pt-6 pb-5">
            <div className="flex items-center gap-4">
              <Avatar name={client.name} category="client" size="xl" />
              <div>
                <Dialog.Title className="text-[22px] font-semibold tracking-[-0.01em] text-ink">
                  {client.name}
                </Dialog.Title>
                <p className="text-[13.5px] text-muted">
                  {client.discipline} · Client since {client.since}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <StrengthDot strength={client.relationshipStrength} />
                  {client.focusAreas.map((area) => (
                    <Chip key={area} tone="warm">
                      {area}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
            <Dialog.Close
              aria-label="Close client"
              className="rounded-lg p-1.5 text-muted transition-colors duration-200 hover:bg-cream hover:text-ink"
            >
              <X size={16} />
            </Dialog.Close>
          </header>

          <Tabs tabs={TABS} defaultValue="overview">
            <div className="scroll-slim min-h-0 flex-1 overflow-y-auto px-6 py-5">
              <TabPanel value="overview" className="space-y-6 focus:outline-none">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Block title="Current priorities">
                    <ul className="space-y-1.5">
                      {client.priorities.map((priority) => (
                        <li key={priority} className="flex items-start gap-2 text-[13px] text-charcoal">
                          <span
                            aria-hidden
                            className="mt-[7px] size-[5px] shrink-0 rounded-full bg-gold"
                          />
                          {priority}
                        </li>
                      ))}
                    </ul>
                  </Block>

                  <Block title="Key relationships">
                    <ul className="space-y-1">
                      {keyPeople.map((person) => (
                        <li key={person!.id}>
                          <button
                            type="button"
                            onClick={() => openDrawer(person!.id)}
                            className="flex w-full items-center gap-2.5 rounded-[9px] px-2 py-1.5 text-left transition-colors duration-200 hover:bg-cream"
                          >
                            <Avatar name={person!.name} category={person!.category} size="xs" />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[12.5px] font-medium text-ink">
                                {person!.name}
                              </span>
                              <span className="block truncate text-[11px] text-muted">
                                {person!.organization ?? person!.title}
                              </span>
                            </span>
                            <StrengthDot strength={person!.relationshipStrength} showLabel={false} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </Block>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Block title="Upcoming">
                    {upcoming.length > 0 ? (
                      <ul className="space-y-2.5">
                        {upcoming.slice(0, 4).map((event) => (
                          <li key={event.id} className="flex gap-3">
                            <span className="w-[52px] shrink-0 text-[12px] font-semibold text-ink tabular-nums">
                              {formatDate(event.date)}
                            </span>
                            <span>
                              <span className="block text-[13px] text-ink">{event.title}</span>
                              <span className="block text-[11.5px] text-muted">
                                {formatHour(event.start)}
                                {event.location ? ` · ${event.location}` : ""}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[13px] text-muted">Nothing scheduled yet this cycle.</p>
                    )}
                  </Block>

                  <Block title="Documents">
                    <ul className="space-y-1.5">
                      {files.map((file) => (
                        <li key={file.id} className="text-[13px] text-charcoal">
                          {file.title}
                        </li>
                      ))}
                    </ul>
                  </Block>
                </div>
              </TabPanel>

              <TabPanel value="relationships" className="focus:outline-none">
                <p className="mb-3 text-[13px] text-muted">
                  How {client.name.split(" ")[0]} connects into the rest of your network.
                </p>
                <NetworkGraph
                  personIds={graphPeople}
                  orgIds={graphOrgs}
                  height={356}
                  showFilters={false}
                  highlightId={client.personId}
                />
              </TabPanel>

              <TabPanel value="opportunities" className="focus:outline-none">
                {opportunities.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {opportunities.map((opp) => (
                      <OpportunityCard key={opp.id} opportunity={opp} />
                    ))}
                  </div>
                ) : (
                  <p className="text-[13px] text-muted">
                    No open opportunities — the focus here is relationship maintenance.
                  </p>
                )}
              </TabPanel>

              <TabPanel value="documents" className="focus:outline-none">
                <ul className="divide-y divide-[color:var(--asbm-border)]">
                  {files.map((file) => (
                    <li key={file.id} className="flex items-center justify-between gap-4 py-3">
                      <div>
                        <p className="text-[13.5px] font-medium text-ink">{file.title}</p>
                        <p className="text-[12px] text-muted">
                          {file.type} · Updated {formatDate(file.updatedAt)}
                        </p>
                      </div>
                      <Chip tone="warm">{file.owner}</Chip>
                    </li>
                  ))}
                </ul>
              </TabPanel>

              <TabPanel value="activity" className="focus:outline-none">
                {activity.length > 0 ? (
                  <ol className="relative space-y-4 border-l border-line pl-5">
                    {activity.map((entry) => (
                      <li key={entry.id} className="relative">
                        <span
                          aria-hidden
                          className="absolute top-1.5 -left-[23px] size-[7px] rounded-full bg-gold ring-2 ring-[color:var(--asbm-white)]"
                        />
                        <p className="text-[11.5px] text-muted">{formatDate(entry.date, "MMMM d")}</p>
                        <p className="text-[13.5px] font-medium text-ink">{entry.title}</p>
                        {entry.summary && (
                          <p className="text-[12.5px] text-muted">{entry.summary}</p>
                        )}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-[13px] text-muted">
                    Activity for brand clients is tracked against their contacts.
                  </p>
                )}
              </TabPanel>
            </div>
          </Tabs>

          {clientPerson && (
            <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-line bg-cream/60 px-6 py-3.5">
              <p className="text-[11.5px] text-muted">
                Sample information shown for demonstration purposes only.
              </p>
              <Button size="sm" variant="secondary" onClick={() => openDrawer(clientPerson.id)}>
                Open relationship
              </Button>
            </footer>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
