import type { Category } from "./types";

/**
 * Sydney's own details, and how she hands them out.
 *
 * Relationship management runs both ways: as much of it is about what she
 * gives people as what she keeps about them.
 */

export type CardFieldId =
  | "organization"
  | "location"
  | "email"
  | "phone"
  | "linkedin"
  | "website"
  | "booking"
  | "focus";

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
  publicLink: "asbm.example-demo.com/c/sydney",
  focus: ["Athlete marketing", "Brand development", "Community relations"],
  bio: "I build and look after the relationships around professional athletes — brands, media, teams, and the communities they come from.",
};

export const cardFields: { id: CardFieldId; label: string; value: string }[] = [
  { id: "organization", label: "Organization", value: myCard.organization },
  { id: "location", label: "Location", value: myCard.location },
  { id: "email", label: "Email", value: myCard.email },
  { id: "phone", label: "Phone", value: myCard.phone },
  { id: "linkedin", label: "LinkedIn", value: myCard.linkedin },
  { id: "website", label: "Website", value: myCard.website },
  { id: "booking", label: "Booking link", value: myCard.bookingLink },
  { id: "focus", label: "What you do", value: myCard.focus.join(" · ") },
];

/**
 * The same person, framed for the room she is in. A brand contact and a
 * reporter do not need the same six lines.
 */
export type CardVariant = {
  id: string;
  name: string;
  audience: string;
  note: string;
  fields: CardFieldId[];
};

export const cardVariants: CardVariant[] = [
  {
    id: "full",
    name: "Full card",
    audience: "People you already work with",
    note: "Everything, including the direct line.",
    fields: ["organization", "location", "email", "phone", "linkedin", "website", "booking", "focus"],
  },
  {
    id: "brand",
    name: "Brand partners",
    audience: "Brand and agency contacts",
    note: "Leads with what you do and a way to book time. No mobile.",
    fields: ["organization", "location", "email", "booking", "website", "focus"],
  },
  {
    id: "media",
    name: "Media",
    audience: "Reporters, editors, producers",
    note: "Email and site only — the way press contacts expect to reach you.",
    fields: ["organization", "location", "email", "website", "focus"],
  },
  {
    id: "conference",
    name: "Conference",
    audience: "People you've just met",
    note: "Short, scannable, and it asks for theirs back.",
    fields: ["organization", "email", "booking", "focus"],
  },
];

export type ShareMethod = "link" | "code" | "text" | "email" | "tap" | "wallet" | "signature";

export const shareMethodLabel: Record<ShareMethod, string> = {
  link: "Copy link",
  code: "Show code",
  text: "Send by text",
  email: "Send by email",
  tap: "Tap to share",
  wallet: "Add to wallet",
  signature: "Email signature",
};

/** Who has been given the card lately, and what they did with it. */
export type CardShare = {
  id: string;
  personId?: string;
  name: string;
  organization: string;
  category: Category;
  method: ShareMethod;
  date: string;
  opened: boolean;
  saved: boolean;
  /** They sent their own details back — this is how some people enter the network. */
  returned: boolean;
};

export const cardShares: CardShare[] = [
  {
    id: "cs-1",
    personId: "p-tobias",
    name: "Tobias Grant",
    organization: "Bojangles",
    category: "brand",
    method: "tap",
    date: "2026-08-12",
    opened: true,
    saved: true,
    returned: true,
  },
  {
    id: "cs-2",
    personId: "p-marcus",
    name: "Marcus Reed",
    organization: "Carolina Panthers",
    category: "team",
    method: "text",
    date: "2026-08-06",
    opened: true,
    saved: true,
    returned: false,
  },
  {
    id: "cs-3",
    personId: "p-simone",
    name: "Simone Fletcher",
    organization: "Queen City Sports Weekly",
    category: "media",
    method: "email",
    date: "2026-08-03",
    opened: true,
    saved: false,
    returned: false,
  },
  {
    id: "cs-4",
    personId: "p-priya",
    name: "Priya Raman",
    organization: "Under Armour",
    category: "brand",
    method: "code",
    date: "2026-07-24",
    opened: true,
    saved: true,
    returned: true,
  },
  {
    id: "cs-5",
    personId: "p-yara",
    name: "Yara Osman",
    organization: "Vuori",
    category: "brand",
    method: "code",
    date: "2026-06-10",
    opened: true,
    saved: true,
    returned: true,
  },
  {
    id: "cs-6",
    personId: "p-colin",
    name: "Colin Reyes",
    organization: "Charlotte Knights",
    category: "team",
    method: "code",
    date: "2026-06-11",
    opened: true,
    saved: false,
    returned: false,
  },
];

export const cardStats = {
  opened: 34,
  saved: 21,
  returned: 9,
  period: "in the last 30 days",
};
