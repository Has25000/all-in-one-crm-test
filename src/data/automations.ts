import type { Automation, AutomationCategory, Strength } from "./types";

/**
 * How often each tier of relationship should hear from Sydney.
 *
 * This is the rule the keep-in-touch nudges run on. Numbers are days.
 */
export const keepInTouchCadence: Record<Strength, number> = {
  strong: 30,
  active: 60,
  cooling: 90,
  dormant: 180,
};

export const cadenceLabel: Record<Strength, string> = {
  strong: "Every 30 days",
  active: "Every 60 days",
  cooling: "Every 90 days",
  dormant: "Quarterly review",
};

export const automationCategoryLabel: Record<AutomationCategory, string> = {
  cadence: "Staying in touch",
  capture: "Capturing people",
  meetings: "Meetings",
  signals: "Signals worth knowing",
};

/**
 * The work the system does between conversations.
 *
 * Nothing here runs in the prototype — each one describes a rule the real
 * product would own so Sydney doesn't have to hold it in her head.
 */
export const automations: Automation[] = [
  {
    id: "au-cadence",
    name: "Keep-in-touch nudges",
    category: "cadence",
    description: "Tell you when a relationship has gone past its check-in window.",
    rule: "Strong every 30 days · Active every 60 · Cooling every 90",
    status: "4 relationships are past their window today.",
    defaultOn: true,
  },
  {
    id: "au-cooling",
    name: "Cooling alerts",
    category: "cadence",
    description: "Flag a strong relationship the moment it starts going quiet.",
    rule: "A strong relationship with no contact for 60 days",
    status: "2 flagged this week — Andre Williams and Dana Whitmore.",
    defaultOn: true,
  },
  {
    id: "au-milestones",
    name: "Milestone nudges",
    category: "cadence",
    description: "Client anniversaries, signing dates, and personal milestones.",
    rule: "Seven days before any date you've marked",
    status: "Next — Alaina Coates, four years with ASBM in September.",
    defaultOn: false,
  },
  {
    id: "au-postevent",
    name: "Post-event follow-up",
    category: "capture",
    description: "Draft a note to everyone you met before the event goes cold.",
    rule: "Within 24 hours of an event ending",
    status: "Last run after the Carolina Athlete Marketing Forum · 3 drafts.",
    defaultOn: true,
  },
  {
    id: "au-enrich",
    name: "Enrich on capture",
    category: "capture",
    description: "Fill in role, company, location, and profile the moment someone is added.",
    rule: "Every new contact, however they're captured",
    status: "14 contacts completed this month.",
    defaultOn: true,
  },
  {
    id: "au-source-tag",
    name: "Source tagging",
    category: "capture",
    description: "Tag everyone with where and when you actually met them.",
    rule: "Event name and date applied at capture",
    status: "Applied to 27 contacts across 4 events.",
    defaultOn: true,
  },
  {
    id: "au-dedupe",
    name: "Duplicate merge",
    category: "capture",
    description: "Merge obvious duplicates on import instead of asking you.",
    rule: "Same name and organization, or same email",
    status: "2 merged after the last card scan.",
    defaultOn: true,
  },
  {
    id: "au-prep",
    name: "Meeting prep briefs",
    category: "meetings",
    description: "A one-screen brief on who you're seeing, the morning of.",
    rule: "8:00 AM for every meeting that day",
    status: "3 briefs queued for today.",
    defaultOn: true,
  },
  {
    id: "au-booking",
    name: "Booking link",
    category: "meetings",
    description: "Let people take a slot from your calendar without the back and forth.",
    rule: "Weekdays, 9:00 AM – 5:00 PM, 30-minute slots",
    status: "6 meetings booked this month.",
    defaultOn: true,
  },
  {
    id: "au-intro-watch",
    name: "Introduction watch",
    category: "signals",
    description: "Surface a warm path whenever a company you care about appears in your network.",
    rule: "Any second-degree path into a target organization",
    status: "1 path open — Jordan Lee at Gatorade, through Marcus Reed.",
    defaultOn: true,
  },
  {
    id: "au-role-change",
    name: "Role change alerts",
    category: "signals",
    description: "Tell you when someone in your network moves to a new job.",
    rule: "Any change to a contact's title or company",
    status: "No changes detected in the last 30 days.",
    defaultOn: false,
  },
  {
    id: "au-event-radar",
    name: "Event radar",
    category: "signals",
    description: "Show who from your network is going before you decide to attend.",
    rule: "Any event with three or more people you know",
    status: "6 people you know are going to the Charlotte Sports Business Summit.",
    defaultOn: true,
  },
];

/** Sydney's own card — what she hands out. */
export const myCard = {
  name: "Sydney Anderson",
  title: "Founder",
  organization: "Anderson Sports and Brand Management",
  location: "Charlotte, NC",
  email: "sydney@example-demo.com",
  phone: "Demo contact",
  linkedin: "Demo profile",
  website: "andersonsbm.example-demo.com",
  bookingLink: "meet.example-demo.com/sydney",
  focus: ["Athlete marketing", "Brand development", "Community relations"],
};
