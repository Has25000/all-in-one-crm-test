import type { CalendarEvent } from "./types";

let seq = 0;
const ev = (e: Omit<CalendarEvent, "id">): CalendarEvent => ({ id: `e-${++seq}`, ...e });

/**
 * A working fortnight around the demo date, plus the milestones the client
 * panels reference. Every event names the people in the room — a meeting
 * without its relationship context is just a time slot.
 */
export const calendarEvents: CalendarEvent[] = [
  /* Previous week */
  ev({ title: "Player engagement call", date: "2026-08-10", start: 11, end: 11.5, category: "networking", location: "Phone", participantIds: ["p-devon"], preparation: "Cameron's off-court introductions." }),
  ev({ title: "Client check-in", date: "2026-08-11", start: 15, end: 15.75, category: "client", location: "Video call", participantIds: ["p-cameron"], relatedClientId: "c-cameron" }),
  ev({ title: "Regional activation conversation", date: "2026-08-12", start: 10, end: 11, category: "brand", location: "Bojangles HQ", participantIds: ["p-tobias"], relatedClientId: "c-larry", preparation: "Bring the two-market activation outline." }),
  ev({ title: "Partner planning", date: "2026-08-13", start: 14, end: 15, category: "community", location: "Rise Charlotte", participantIds: ["p-rachel", "p-elena"], relatedClientId: "c-larry" }),
  ev({ title: "Client check-in", date: "2026-08-14", start: 9.5, end: 10.25, category: "client", location: "Video call", participantIds: ["p-alexis"], relatedClientId: "c-alexis" }),

  /* Demo week — Monday 17 to Sunday 23 August */
  ev({ title: "Week planning", date: "2026-08-17", start: 9, end: 9.5, category: "internal", location: "ASBM office", participantIds: [], preparation: "Set the week's relationship priorities." }),
  ev({ title: "Client check-in", date: "2026-08-17", start: 11, end: 12, category: "client", location: "Video call", participantIds: ["p-alaina"], relatedClientId: "c-alaina", preparation: "Foundation programming and fall brand priorities." }),
  ev({ title: "Foundation planning", date: "2026-08-17", start: 15, end: 16, category: "community", location: "Columbia, SC", participantIds: ["p-renee"], relatedClientId: "c-alaina" }),

  ev({ title: "Endorsement terms review", date: "2026-08-18", start: 10, end: 10.75, category: "internal", location: "Salinas & Pike", participantIds: ["p-victor"], relatedClientId: "c-alexis", preparation: "Standard apparel terms for the indoor season." }),
  ev({ title: "Roster planning session", date: "2026-08-18", start: 13, end: 14, category: "client", location: "Video call", participantIds: ["p-nicole"], relatedClientId: "c-qca" }),

  ev({ title: "Community event run of show", date: "2026-08-19", start: 10, end: 11, category: "community", location: "Uptown Event Collective", participantIds: ["p-larry", "p-bianca", "p-elena"], relatedClientId: "c-larry", preparation: "Confirm venue timings and partner slots." }),
  ev({ title: "Agency sync", date: "2026-08-19", start: 14, end: 14.5, category: "internal", location: "Video call", participantIds: ["p-nicole"] }),

  ev({ title: "Community activation planning", date: "2026-08-20", start: 9.5, end: 10.25, category: "community", location: "Columbia, SC", participantIds: ["p-dakereon", "p-isaiah"], relatedClientId: "c-dakereon", preparation: "Shortlist lead partners for the activation." }),
  ev({ title: "Lunch with Simone Fletcher", date: "2026-08-20", start: 12, end: 13, category: "networking", location: "Uptown", participantIds: ["p-simone"], preparation: "Fall features calendar." }),
  ev({ title: "Off-court venture review", date: "2026-08-20", start: 15, end: 15.5, category: "client", location: "Video call", participantIds: ["p-cameron"], relatedClientId: "c-cameron" }),

  ev({ title: "Client check-in", date: "2026-08-21", start: 10, end: 10.75, category: "client", location: "Video call", participantIds: ["p-larry"], relatedClientId: "c-larry", preparation: "Community event partner shortlist and Bojangles dates." }),
  ev({ title: "Nike Partnership Call", date: "2026-08-21", start: 13.5, end: 14, category: "brand", location: "Video call", participantIds: ["p-maya"], relatedClientId: "c-larry", preparation: "Review previous Q4 campaign discussion." }),
  ev({ title: "Community event planning", date: "2026-08-21", start: 16, end: 16.75, category: "community", location: "Columbia, SC", participantIds: ["p-dakereon", "p-tasha"], relatedClientId: "c-dakereon", preparation: "Partner options and local media angle." }),

  ev({ title: "Rise Charlotte youth clinic", date: "2026-08-22", start: 11, end: 13, category: "community", location: "Rise Charlotte", participantIds: ["p-rachel", "p-larry"], relatedClientId: "c-larry", preparation: "Larry speaks at the opening." }),

  /* Following week and beyond */
  ev({ title: "Panthers partnership check-in", date: "2026-08-24", start: 10, end: 10.5, category: "networking", location: "Bank of America Stadium", participantIds: ["p-marcus"], preparation: "Ask about the Gatorade introduction." }),
  ev({ title: "Indoor season planning", date: "2026-08-24", start: 14, end: 15, category: "client", location: "Video call", participantIds: ["p-alexis"], relatedClientId: "c-alexis" }),
  ev({ title: "Adidas reset call", date: "2026-08-25", start: 11, end: 11.5, category: "brand", location: "Video call", participantIds: ["p-andre"] }),
  ev({ title: "Story ideas — The State", date: "2026-08-26", start: 9, end: 9.5, category: "media", location: "Phone", participantIds: ["p-tasha"], relatedClientId: "c-dakereon" }),
  ev({ title: "Athlete relations conversation", date: "2026-08-27", start: 13, end: 14, category: "brand", location: "Video call", participantIds: ["p-harper"], relatedClientId: "c-alexis" }),
  ev({ title: "Brand call", date: "2026-08-28", start: 10, end: 11, category: "brand", location: "Video call", participantIds: ["p-maya", "p-larry"], relatedClientId: "c-larry", preparation: "Fall campaign scope." }),
  ev({ title: "Community planning session", date: "2026-09-04", start: 13, end: 14.5, category: "community", location: "Rise Charlotte", participantIds: ["p-rachel", "p-larry"], relatedClientId: "c-larry" }),
  ev({ title: "Partner follow-up", date: "2026-09-12", start: 11, end: 11.5, category: "community", location: "Video call", participantIds: ["p-elena", "p-larry"], relatedClientId: "c-larry" }),
];

export const eventCategoryLabel: Record<CalendarEvent["category"], string> = {
  client: "Client",
  brand: "Brand",
  media: "Media",
  internal: "Internal",
  community: "Community",
  networking: "Personal networking",
};
