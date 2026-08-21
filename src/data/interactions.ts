import type { Interaction } from "./types";

let seq = 0;
const ix = (
  personId: string,
  type: Interaction["type"],
  date: string,
  title: string,
  summary?: string,
): Interaction => ({ id: `i-${++seq}`, personId, type, date, title, summary });

/** Relationship history. Newest first within each person. */
export const interactions: Interaction[] = [
  ix("p-maya", "email", "2026-06-08", "Email conversation", "Traded notes on how fall planning was shaping up at Nike."),
  ix("p-maya", "meeting", "2026-04-21", "Brand partnership meeting", "Walked through athlete-brand opportunities for the fall window."),
  ix("p-maya", "event", "2026-03-10", "Event interaction", "Charlotte athlete showcase — introduced her to Larry in person."),
  ix("p-maya", "note", "2023-03-15", "First connected", "Introduced by Marcus Reed at a Panthers partnership event."),

  ix("p-marcus", "meeting", "2026-08-06", "Preseason partnership catch-up", "He offered to introduce Jordan Lee at Gatorade."),
  ix("p-marcus", "phone", "2026-07-02", "Call", "Discussed which brands are actively looking at Carolina athletes."),
  ix("p-marcus", "event", "2026-05-16", "Stadium event", "Community partners night."),

  ix("p-tasha", "email", "2026-07-31", "Email conversation", "She asked for story ideas ahead of the fall features calendar."),
  ix("p-tasha", "event", "2026-06-14", "Community event", "Covered Dakereon's Columbia appearance."),
  ix("p-tasha", "note", "2024-05-12", "First connected", "Met at a Dakereon community event."),

  ix("p-larry", "meeting", "2026-08-19", "Community event run of show", "Walked the venue timings and partner slots with Bianca and Elena."),
  ix("p-larry", "phone", "2026-08-12", "Call", "Bojangles activation timing."),
  ix("p-larry", "meeting", "2026-08-04", "Planning session", "Foundation event budget and venue."),

  ix("p-alaina", "meeting", "2026-08-17", "Client check-in", "Foundation programming and fall brand priorities."),
  ix("p-alaina", "email", "2026-08-04", "Email conversation", "Shared the Lululemon athlete relations background."),

  ix("p-dakereon", "meeting", "2026-08-20", "Community activation planning", "Still needs a lead partner for the Columbia event."),
  ix("p-dakereon", "phone", "2026-08-11", "Call", "Local media availability."),

  ix("p-rachel", "meeting", "2026-08-13", "Partner planning", "Youth programming slots for the fall event."),
  ix("p-tobias", "meeting", "2026-08-12", "Regional activation conversation", "Bojangles moves fast on local activations."),
  ix("p-victor", "email", "2026-08-18", "Endorsement paperwork", "Reviewed standard terms for apparel agreements."),
  ix("p-devon", "phone", "2026-08-10", "Call", "Cameron's off-court venture introductions."),
  ix("p-harper", "email", "2026-08-04", "Email conversation", "Track and field roster interest for the indoor season."),
  ix("p-priya", "meeting", "2026-07-24", "Talent marketing meeting", "Looking for athletes with a real community record."),
  ix("p-simone", "email", "2026-08-03", "Feature planning", "Fall features calendar."),
  ix("p-renee", "meeting", "2026-08-16", "Foundation planning", "Initiative programming for the fall."),
  ix("p-elena", "email", "2026-08-07", "Programming details", "Volunteer coordination for the event."),
  ix("p-bianca", "meeting", "2026-08-09", "Event production walkthrough", "Venue options for the Columbia activation."),
  ix("p-nicole", "meeting", "2026-07-21", "Agency sync", "Shared activation calendar."),
  ix("p-terrance", "email", "2026-07-28", "Operations coordination", "Stadium access for the community night."),
  ix("p-isaiah", "phone", "2026-07-15", "Call", "Player development schedule in Columbia."),
  ix("p-cameron", "meeting", "2026-08-11", "Client check-in", "Off-court business development review."),
  ix("p-alexis", "meeting", "2026-08-14", "Client check-in", "Apparel conversations before the indoor season."),
  ix("p-jordan-ellis", "meeting", "2026-08-05", "Client check-in", "Creator business structure and partner selection."),
  ix("p-andre", "email", "2026-05-02", "Email conversation", "Conversation paused after their spring reorganisation."),
  ix("p-grant", "phone", "2026-05-27", "Call", "Shared athlete work coordination."),
  ix("p-chris", "meeting", "2026-05-08", "Community wellness discussion", "Potential health partner for community events."),
  ix("p-dana", "email", "2026-05-19", "Email conversation", "Community relations calendar."),
  ix("p-malik", "phone", "2026-04-29", "Podcast planning call", "Interested in a client feature episode."),
  ix("p-kayla", "email", "2026-04-18", "Email conversation", "Social content collaboration ideas."),
  ix("p-omar", "email", "2025-11-11", "Email conversation", "Statewide coverage of a client appearance."),
  ix("p-naomi", "event", "2025-12-02", "Shoot day", "Creative direction for client portraits."),
];

export const interactionsFor = (personId: string): Interaction[] =>
  interactions
    .filter((i) => i.personId === personId)
    .sort((a, b) => b.date.localeCompare(a.date));
