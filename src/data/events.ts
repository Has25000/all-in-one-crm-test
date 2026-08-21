import type { EventKind, NetworkEvent } from "./types";

/**
 * Rooms Sydney will be in.
 *
 * Events are where most relationships actually start, so they get first-class
 * treatment here: who from the network is going, who is worth meeting, what
 * came out of it afterwards.
 */
export const networkEvents: NetworkEvent[] = [
  {
    id: "ev-rise-clinic",
    name: "Rise Charlotte Youth Clinic",
    kind: "community",
    startDate: "2026-08-22",
    endDate: "2026-08-22",
    location: "Charlotte, NC",
    venue: "Rise Charlotte fieldhouse",
    summary: "Larry opens the clinic. Programme partners and two local reporters will be there.",
    attendingIds: ["p-rachel", "p-elena", "p-larry", "p-simone"],
    targetIds: ["p-chris"],
    metIds: [],
    relatedClientIds: ["c-larry"],
    goals: ["Introduce Larry to Chris Danvers", "Line up coverage with Simone"],
  },
  {
    id: "ev-columbia-activation",
    name: "Joyner Community Activation",
    kind: "community",
    startDate: "2026-09-08",
    endDate: "2026-09-08",
    location: "Columbia, SC",
    venue: "Martin Luther King Jr. Park",
    summary:
      "Dakereon's hometown activation. Still needs a lead partner — three people in the network could fill it.",
    attendingIds: ["p-dakereon", "p-tasha", "p-isaiah", "p-bianca"],
    targetIds: ["p-tobias", "p-chris", "p-renee"],
    metIds: [],
    relatedClientIds: ["c-dakereon"],
    goals: ["Confirm the lead partner", "Set the local media angle with Tasha"],
  },
  {
    id: "ev-clt-summit",
    name: "Charlotte Sports Business Summit",
    kind: "conference",
    startDate: "2026-09-15",
    endDate: "2026-09-16",
    location: "Charlotte, NC",
    venue: "Charlotte Convention Center",
    summary:
      "Two days, roughly 900 attendees. Six people you already know are going — and so is Jordan Lee.",
    attendingIds: [
      "p-marcus",
      "p-nicole",
      "p-tobias",
      "p-simone",
      "p-priya",
      "p-grant",
      "p-jordan-lee",
    ],
    targetIds: ["p-jordan-lee", "p-andre", "p-kayla"],
    metIds: [],
    relatedClientIds: ["c-larry", "c-cameron"],
    goals: [
      "Get the Gatorade introduction from Marcus in person",
      "Restart the Adidas conversation with Andre",
      "Book two brand meetings before the doors open",
    ],
  },
  {
    id: "ev-panthers-night",
    name: "Panthers Community Partners Night",
    kind: "mixer",
    startDate: "2026-10-02",
    endDate: "2026-10-02",
    location: "Charlotte, NC",
    venue: "Bank of America Stadium",
    summary: "Marcus hosts. Mostly team, community, and regional brand people.",
    attendingIds: ["p-marcus", "p-terrance", "p-dana", "p-tobias"],
    targetIds: ["p-dana"],
    metIds: [],
    relatedClientIds: ["c-larry"],
    goals: ["Warm Dana Whitmore back up", "Scout regional brand partners for Q1"],
  },
  {
    id: "ev-womens-summit",
    name: "Women in Sports Business Summit",
    kind: "summit",
    startDate: "2026-11-12",
    endDate: "2026-11-13",
    location: "Atlanta, GA",
    venue: "Georgia World Congress Center",
    summary: "Further out. Worth deciding early whether a client comes along.",
    attendingIds: ["p-priya", "p-harper"],
    targetIds: ["p-harper"],
    metIds: [],
    relatedClientIds: ["c-alexis"],
    goals: ["Decide whether Alexis attends", "Lock a Lululemon meeting on site"],
  },
  {
    id: "ev-athlete-forum",
    name: "Carolina Athlete Marketing Forum",
    kind: "conference",
    startDate: "2026-06-10",
    endDate: "2026-06-11",
    location: "Raleigh, NC",
    venue: "Raleigh Convention Center",
    summary:
      "Last one you worked. Three new relationships came out of it — one of them has already gone quiet.",
    attendingIds: ["p-nicole", "p-grant", "p-omar"],
    targetIds: [],
    metIds: ["p-yara", "p-trevor", "p-colin"],
    relatedClientIds: [],
    goals: ["Follow up with everyone met inside 48 hours"],
  },
];

export const eventKindLabel: Record<EventKind, string> = {
  conference: "Conference",
  community: "Community",
  mixer: "Mixer",
  game: "Game day",
  summit: "Summit",
};

/**
 * People available to capture during a live event demo. They deliberately sit
 * outside the seeded roster — capturing them is what adds them.
 */
export const capturePool = [
  {
    name: "Whitney Cole",
    title: "VP, Partnerships",
    organization: "Truist",
    location: "Charlotte, NC",
    category: "brand" as const,
  },
  {
    name: "Deshawn Pierce",
    title: "Talent Manager",
    organization: "Elevate Athlete Group",
    location: "Atlanta, GA",
    category: "agency" as const,
  },
  {
    name: "Lena Fitzgerald",
    title: "Head of Sponsorships",
    organization: "Charlotte Knights",
    location: "Charlotte, NC",
    category: "team" as const,
  },
  {
    name: "Aaron Bhatt",
    title: "Founder",
    organization: "Sideline Studios",
    location: "Durham, NC",
    category: "media" as const,
  },
  {
    name: "Monica Vega",
    title: "Director, Brand Experience",
    organization: "Lowe's",
    location: "Mooresville, NC",
    category: "brand" as const,
  },
];
