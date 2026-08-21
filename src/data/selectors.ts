import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { DEMO_TODAY } from "./today";
import { people, personById, SYDNEY_ID } from "./people";
import { organizations, organizationById } from "./organizations";
import { clients, clientById, clientByPersonId } from "./clients";
import { relationships, relationshipLabel } from "./relationships";
import { interactions } from "./interactions";
import { opportunities } from "./opportunities";
import { documents } from "./documents";
import { calendarEvents } from "./calendar";
import { tasks } from "./tasks";
import type {
  Category,
  DemoDocument,
  Opportunity,
  Person,
  Relationship,
  Strength,
  Task,
} from "./types";

/* ------------------------------------------------------------------ *
 * Entity lookup
 * ------------------------------------------------------------------ */

export const getPerson = (id: string): Person | undefined => personById.get(id);
export const getOrganization = (id: string) => organizationById.get(id);
export const getClient = (id: string) => clientById.get(id);
export const getClientForPerson = (personId: string) => clientByPersonId.get(personId);

export const isOrganizationId = (id: string) => id.startsWith("org-");

/** Display name for either a person or an organization id. */
export const nameOf = (id: string): string =>
  personById.get(id)?.name ?? organizationById.get(id)?.name ?? id;

/* ------------------------------------------------------------------ *
 * Dates — every relative phrase is measured against the pinned demo day
 * ------------------------------------------------------------------ */

export const daysSince = (iso?: string): number | undefined =>
  iso ? differenceInCalendarDays(DEMO_TODAY, parseISO(iso)) : undefined;

/** "74 days ago" · "Yesterday" · "Never" */
export const lastInteractionLabel = (iso?: string): string => {
  const days = daysSince(iso);
  if (days === undefined) return "Never";
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
};

/** Compact form used inside tables: "74 days" · "Never" */
export const lastInteractionShort = (iso?: string): string => {
  const days = daysSince(iso);
  if (days === undefined) return "Never";
  if (days <= 0) return "Today";
  return `${days} day${days === 1 ? "" : "s"}`;
};

/** "Due today" · "Tomorrow" · "Aug 26" */
export const dueLabel = (iso: string): string => {
  const days = -differenceInCalendarDays(DEMO_TODAY, parseISO(iso));
  if (days === 0) return "Due today";
  if (days === 1) return "Tomorrow";
  if (days < 0) return "Overdue";
  return format(parseISO(iso), "MMM d");
};

export const isDueToday = (iso: string) =>
  differenceInCalendarDays(DEMO_TODAY, parseISO(iso)) === 0;

export const formatDate = (iso: string, pattern = "MMM d") =>
  format(parseISO(iso), pattern);

/** 13.5 -> "1:30 PM" */
export const formatHour = (value: number): string => {
  const hour24 = Math.floor(value);
  const minutes = Math.round((value - hour24) * 60);
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${suffix}`;
};

/* ------------------------------------------------------------------ *
 * Relationship vocabulary
 * ------------------------------------------------------------------ */

export const strengthMeta: Record<Strength, { label: string; token: string }> = {
  strong: { label: "Strong", token: "var(--asbm-success)" },
  active: { label: "Active", token: "var(--asbm-gold)" },
  cooling: { label: "Cooling", token: "var(--asbm-warning)" },
  dormant: { label: "Dormant", token: "var(--asbm-muted)" },
};

export const categoryMeta: Record<Category, { label: string; token: string; onToken: string }> = {
  client: { label: "Client", token: "var(--asbm-green)", onToken: "var(--asbm-white)" },
  brand: { label: "Brand", token: "var(--asbm-gold)", onToken: "var(--asbm-black)" },
  team: { label: "Team", token: "var(--asbm-charcoal)", onToken: "var(--asbm-white)" },
  media: { label: "Media", token: "var(--asbm-warm-neutral)", onToken: "var(--asbm-black)" },
  agency: { label: "Agency", token: "var(--asbm-neutral-light)", onToken: "var(--asbm-black)" },
  community: { label: "Community", token: "var(--asbm-green-light)", onToken: "var(--asbm-green)" },
  professional: { label: "Professional", token: "var(--asbm-cream-deep)", onToken: "var(--asbm-charcoal)" },
};

export { relationshipLabel };

/* ------------------------------------------------------------------ *
 * Graph joins
 * ------------------------------------------------------------------ */

export type Neighbor = {
  relationship: Relationship;
  /** The other end of the edge. */
  otherId: string;
  person?: Person;
  label: string;
};

export const relationshipsOf = (id: string): Relationship[] =>
  relationships.filter((r) => r.sourceId === id || r.targetId === id);

export const neighborsOf = (id: string): Neighbor[] =>
  relationshipsOf(id).map((relationship) => {
    const otherId =
      relationship.sourceId === id ? relationship.targetId : relationship.sourceId;
    return {
      relationship,
      otherId,
      person: personById.get(otherId),
      label: relationshipLabel[relationship.type],
    };
  });

/** People (not organizations) one hop away, excluding Sydney herself. */
export const relatedPeople = (id: string): Person[] =>
  neighborsOf(id)
    .map((n) => n.person)
    .filter((p): p is Person => Boolean(p) && p!.id !== SYDNEY_ID);

/** Clients connected to a person, either directly or through shared work. */
export const relatedClients = (personId: string) => {
  const direct = clients.filter((c) => c.keyRelationshipIds.includes(personId));
  const asClient = clientByPersonId.get(personId);
  const viaEdges = relatedPeople(personId)
    .map((p) => clientByPersonId.get(p.id))
    .filter(Boolean);
  const all = [...direct, ...viaEdges].filter(Boolean) as typeof clients;
  const seen = new Set(asClient ? [asClient.id] : []);
  return all.filter((c) => (seen.has(c.id) ? false : (seen.add(c.id), true)));
};

/* ------------------------------------------------------------------ *
 * Attachments
 * ------------------------------------------------------------------ */

export const documentsForPerson = (personId: string): DemoDocument[] =>
  documents.filter((d) => d.relatedPersonIds.includes(personId));

export const documentsForClient = (clientId: string): DemoDocument[] =>
  documents.filter((d) => d.relatedClientIds.includes(clientId));

export const opportunitiesForPerson = (personId: string): Opportunity[] =>
  opportunities.filter((o) => o.contactIds.includes(personId));

export const opportunitiesForClient = (clientId: string): Opportunity[] =>
  opportunities.filter((o) => o.clientIds.includes(clientId));

export const tasksForPerson = (personId: string): Task[] =>
  tasks.filter((t) => t.personId === personId);

export const interactionsForPerson = (personId: string) =>
  interactions
    .filter((i) => i.personId === personId)
    .sort((a, b) => b.date.localeCompare(a.date));

export const eventsForPerson = (personId: string) =>
  calendarEvents
    .filter((e) => e.participantIds.includes(personId))
    .sort((a, b) => a.date.localeCompare(b.date));

export const eventsForClient = (clientId: string) =>
  calendarEvents
    .filter((e) => e.relatedClientId === clientId)
    .sort((a, b) => a.date.localeCompare(b.date));

export const eventsOn = (iso: string) =>
  calendarEvents.filter((e) => e.date === iso).sort((a, b) => a.start - b.start);

export const upcomingEventsForClient = (clientId: string) =>
  eventsForClient(clientId).filter((e) => e.date >= "2026-08-21");

/* ------------------------------------------------------------------ *
 * Follow-ups
 * ------------------------------------------------------------------ */

export const sortedTasks = (): Task[] =>
  [...tasks].sort((a, b) => a.dueDate.localeCompare(b.dueDate));

/* ------------------------------------------------------------------ *
 * Universal search
 * ------------------------------------------------------------------ */

export type SearchResults = {
  people: Person[];
  organizations: typeof organizations;
  documents: DemoDocument[];
  opportunities: Opportunity[];
  isEmpty: boolean;
};

const matches = (haystack: (string | undefined)[], needle: string) =>
  haystack.some((h) => h?.toLowerCase().includes(needle));

export const searchEverything = (rawQuery: string): SearchResults => {
  const q = rawQuery.trim().toLowerCase();
  if (!q) {
    return { people: [], organizations: [], documents: [], opportunities: [], isEmpty: true };
  }

  const matchedPeople = people.filter(
    (p) =>
      p.id !== SYDNEY_ID &&
      matches([p.name, p.title, p.organization, p.location, ...(p.tags ?? [])], q),
  );
  const matchedOrgs = organizations.filter((o) => matches([o.name, o.context, o.location], q));
  const matchedDocs = documents.filter((d) => matches([d.title, d.type], q));
  const matchedOpps = opportunities.filter((o) =>
    matches([o.title, o.organization, o.kind, o.nextAction], q),
  );

  return {
    people: matchedPeople.slice(0, 5),
    organizations: matchedOrgs.slice(0, 4),
    documents: matchedDocs.slice(0, 4),
    opportunities: matchedOpps.slice(0, 4),
    isEmpty:
      matchedPeople.length + matchedOrgs.length + matchedDocs.length + matchedOpps.length === 0,
  };
};

/* ------------------------------------------------------------------ *
 * Misc
 * ------------------------------------------------------------------ */

export const initialsOf = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export { SYDNEY_ID, people, organizations, clients, relationships, opportunities, documents, calendarEvents, tasks, interactions };
