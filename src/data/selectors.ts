import { addDays, differenceInCalendarDays, format, parseISO } from "date-fns";
import { DEMO_TODAY, DEMO_TODAY_ISO } from "./today";
import { people, personById, SYDNEY_ID } from "./people";
import { organizations, organizationById } from "./organizations";
import { clients, clientById, clientByPersonId } from "./clients";
import { relationships, relationshipLabel } from "./relationships";
import { interactions } from "./interactions";
import { opportunities, recordActivity, stageOrder } from "./opportunities";
import { documents } from "./documents";
import { calendarEvents } from "./calendar";
import { tasks } from "./tasks";
import { networkEvents } from "./events";
import { keepInTouchCadence } from "./automations";
import type {
  Category,
  DemoDocument,
  NetworkEvent,
  Opportunity,
  OpportunityStage,
  Person,
  Relationship,
  Strength,
  Task,
  TimeSlot,
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
  eventsForClient(clientId).filter((e) => e.date >= DEMO_TODAY_ISO);

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

/* ------------------------------------------------------------------ *
 * Events
 * ------------------------------------------------------------------ */

export const getEvent = (id: string) => networkEvents.find((e) => e.id === id);

export const daysUntil = (iso: string) =>
  differenceInCalendarDays(parseISO(iso), DEMO_TODAY);

/** "Tomorrow" · "In 18 days" · "Last month" */
export const eventTimingLabel = (event: NetworkEvent) => {
  const days = daysUntil(event.startDate);
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days > 1) return `In ${days} days`;
  if (days === -1) return "Yesterday";
  return `${Math.abs(days)} days ago`;
};

export const upcomingEvents = () =>
  networkEvents
    .filter((e) => e.endDate >= DEMO_TODAY_ISO)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

export const pastEvents = () =>
  networkEvents
    .filter((e) => e.endDate < DEMO_TODAY_ISO)
    .sort((a, b) => b.startDate.localeCompare(a.startDate));

/** Events a given person is going to, or came out of. */
export const eventsInvolving = (personId: string) =>
  networkEvents.filter(
    (e) =>
      e.attendingIds.includes(personId) ||
      e.targetIds.includes(personId) ||
      e.metIds.includes(personId),
  );

export const dateRangeLabel = (event: NetworkEvent) =>
  event.startDate === event.endDate
    ? format(parseISO(event.startDate), "EEEE, MMMM d")
    : `${format(parseISO(event.startDate), "MMMM d")}–${format(parseISO(event.endDate), "d, yyyy")}`;

/* ------------------------------------------------------------------ *
 * Keeping in touch
 *
 * Each relationship tier has a check-in window. These helpers answer the only
 * question that matters: is this one overdue, and by how much?
 * ------------------------------------------------------------------ */

export type TouchStatus = {
  cadenceDays: number;
  /** Negative means overdue. */
  dueInDays: number;
  overdue: boolean;
  nextTouchDate?: string;
  label: string;
};

export const touchStatus = (person: Person): TouchStatus => {
  const cadenceDays = keepInTouchCadence[person.relationshipStrength];

  if (!person.lastInteraction) {
    return {
      cadenceDays,
      dueInDays: 0,
      overdue: true,
      label: "No contact yet",
    };
  }

  const next = addDays(parseISO(person.lastInteraction), cadenceDays);
  const dueInDays = differenceInCalendarDays(next, DEMO_TODAY);

  return {
    cadenceDays,
    dueInDays,
    overdue: dueInDays < 0,
    nextTouchDate: format(next, "yyyy-MM-dd"),
    label:
      dueInDays < 0
        ? `${Math.abs(dueInDays)} days overdue`
        : dueInDays === 0
          ? "Due today"
          : `Due in ${dueInDays} days`,
  };
};

/** Everyone who has slipped past their check-in window, worst first. */
export const overdueRelationships = () =>
  people
    .filter((p) => p.id !== SYDNEY_ID)
    .map((person) => ({ person, touch: touchStatus(person) }))
    .filter((row) => row.touch.overdue)
    .sort((a, b) => a.touch.dueInDays - b.touch.dueInDays);

/* ------------------------------------------------------------------ *
 * Availability
 *
 * Free slots are read straight out of the seeded calendar, so proposing a time
 * reflects what is actually open rather than a canned list.
 * ------------------------------------------------------------------ */

const WORK_START = 9;
const WORK_END = 17;

export const availableSlots = (
  { days = 10, duration = 0.5, limit = 8 } = {},
): TimeSlot[] => {
  const slots: TimeSlot[] = [];

  for (let offset = 1; offset <= days && slots.length < limit; offset++) {
    const day = addDays(DEMO_TODAY, offset);
    const weekday = day.getDay();
    if (weekday === 0 || weekday === 6) continue;

    const iso = format(day, "yyyy-MM-dd");
    const booked = calendarEvents
      .filter((e) => e.date === iso)
      .sort((a, b) => a.start - b.start);

    for (let start = WORK_START; start + duration <= WORK_END; start += 0.5) {
      if (slots.length >= limit) break;
      const end = start + duration;
      const clashes = booked.some((e) => start < e.end && end > e.start);
      if (clashes) continue;

      slots.push({ date: iso, start, end });
      // One suggestion per morning and afternoon keeps the list readable.
      start = start < 12 ? 12.5 : WORK_END;
    }
  }

  return slots;
};

export const slotLabel = (slot: TimeSlot) =>
  `${format(parseISO(slot.date), "EEEE, MMM d")} · ${formatHour(slot.start)}`;

export { networkEvents };

/* ------------------------------------------------------------------ *
 * Opportunity records
 * ------------------------------------------------------------------ */

export const getOpportunity = (id: string) => opportunities.find((o) => o.id === id);

export const activityForOpportunity = (opportunityId: string) =>
  recordActivity
    .filter((a) => a.opportunityId === opportunityId)
    .sort((a, b) => b.date.localeCompare(a.date));

export const activityForPerson = (personId: string) =>
  recordActivity
    .filter((a) => a.personId === personId)
    .sort((a, b) => b.date.localeCompare(a.date));

/** Value adjusted for how sure Sydney actually is. */
export const weightedValue = (opportunity: Opportunity) =>
  Math.round(((opportunity.potentialValue ?? 0) * (opportunity.confidence ?? 0)) / 100);

export const formatMoney = (value: number) =>
  value >= 1000 ? `$${Math.round(value / 1000)}K` : `$${value}`;

export const stageIndex = (stage: OpportunityStage) => stageOrder.indexOf(stage);

/* ------------------------------------------------------------------ *
 * Export
 *
 * Whatever is on screen can leave as a spreadsheet — the one thing every CRM
 * is expected to do and the reason nobody feels locked in.
 * ------------------------------------------------------------------ */

export const toCsv = (headers: string[], rows: (string | number | undefined)[][]) => {
  const escape = (cell: string | number | undefined) => {
    const value = cell === undefined || cell === null ? "" : String(cell);
    return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
  };
  return [headers, ...rows].map((row) => row.map(escape).join(",")).join("\n");
};
