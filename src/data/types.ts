/**
 * Domain models for the ASBM Relationship Hub concept demo.
 *
 * Everything the interface renders is shaped by these types and served from
 * local objects in this folder. Swapping the modules in `src/data` for real
 * API calls should not require redesigning a single component.
 */

export type Category =
  | "client"
  | "brand"
  | "team"
  | "media"
  | "agency"
  | "community"
  | "professional";

export type Strength = "strong" | "active" | "cooling" | "dormant";

export type Person = {
  id: string;
  name: string;
  avatar?: string;
  title: string;
  organization?: string;
  organizationId?: string;
  category: Category;
  location?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  relationshipStrength: Strength;
  /** ISO date of the most recent interaction. Absent means never contacted. */
  lastInteraction?: string;
  firstInteraction?: string;
  connectedThrough?: string;
  /** Where the relationship actually started — a room, an event, a shared table. */
  metContext?: string;
  notes?: string[];
  tags?: string[];
};

export type Organization = {
  id: string;
  name: string;
  kind: Category;
  location?: string;
  /** Short line describing how ASBM works with this organization. */
  context?: string;
};

export type Client = {
  id: string;
  /** Athlete clients map to a Person; brand clients do not. */
  personId?: string;
  organizationId?: string;
  name: string;
  discipline: string;
  type: "athlete" | "brand";
  since: string;
  relationshipStrength: Strength;
  focusAreas: string[];
  priorities: string[];
  activeInitiatives: number;
  nextMilestone: string;
  keyRelationshipIds: string[];
};

export type Relationship = {
  id: string;
  sourceId: string;
  targetId: string;
  type:
    | "client"
    | "brand-partner"
    | "introduced-by"
    | "works-at"
    | "community-partner"
    | "media"
    | "team"
    | "professional"
    | "potential-introduction";
  strength?: Strength;
  lastInteraction?: string;
};

export type Interaction = {
  id: string;
  personId: string;
  type: "meeting" | "email" | "phone" | "linkedin" | "event" | "note";
  date: string;
  title: string;
  summary?: string;
};

export type OpportunityStage =
  | "identified"
  | "introduction"
  | "conversation"
  | "planning"
  | "active"
  | "complete";

export type Opportunity = {
  id: string;
  title: string;
  organization: string;
  clientIds: string[];
  contactIds: string[];
  stage: OpportunityStage;
  nextAction: string;
  kind: string;
  potentialValue?: number;
};

export type DemoDocument = {
  id: string;
  title: string;
  type: string;
  fileKind: "pdf" | "docx" | "xlsx" | "deck";
  relatedPersonIds: string[];
  relatedClientIds: string[];
  relatedOrganizationIds: string[];
  updatedAt: string;
  owner: string;
};

export type EventCategory =
  | "client"
  | "brand"
  | "media"
  | "internal"
  | "community"
  | "networking";

export type CalendarEvent = {
  id: string;
  title: string;
  /** ISO date, e.g. 2026-08-21 */
  date: string;
  /** 24h decimal hours, e.g. 13.5 for 1:30 PM */
  start: number;
  end: number;
  category: EventCategory;
  location?: string;
  participantIds: string[];
  relatedClientId?: string;
  preparation?: string;
};

export type Task = {
  id: string;
  personId: string;
  title: string;
  dueDate: string;
  /** What the follow-up is actually for, in Sydney's language. */
  nextStep: string;
};

export type ActivityEntry = {
  id: string;
  timestamp: string;
  label: string;
  detail: string;
  personId?: string;
  kind: "note" | "meeting" | "document" | "relationship" | "follow-up";
};

export type SuggestedPath = {
  id: string;
  chain: string[];
  reason: string;
  outcome: string;
};

export type EventKind = "conference" | "community" | "mixer" | "game" | "summit";

export type NetworkEvent = {
  id: string;
  name: string;
  kind: EventKind;
  /** ISO dates. Single-day events repeat the same date. */
  startDate: string;
  endDate: string;
  location: string;
  venue?: string;
  summary: string;
  /** People already in the network who will be there. */
  attendingIds: string[];
  /** People worth getting in front of while you're in the room. */
  targetIds: string[];
  /** Captured at the event — populated for events that have happened. */
  metIds: string[];
  relatedClientIds: string[];
  goals: string[];
};

export type AutomationCategory = "cadence" | "capture" | "meetings" | "signals";

export type Automation = {
  id: string;
  name: string;
  category: AutomationCategory;
  /** One line on what it does for Sydney. */
  description: string;
  /** The rule in plain terms. */
  rule: string;
  /** What it has actually done lately. */
  status: string;
  defaultOn: boolean;
};

/** A contact captured live at an event during this session. */
export type CapturedContact = {
  id: string;
  name: string;
  title: string;
  organization: string;
  location: string;
  category: Category;
  eventId: string;
  method: "badge" | "card" | "qr" | "manual";
  note?: string;
  followUp: boolean;
};

export type TimeSlot = {
  /** ISO date */
  date: string;
  start: number;
  end: number;
};
