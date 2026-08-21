/**
 * The guided walkthrough.
 *
 * It follows the demo narrative the brief lays out, extended to cover the
 * networking, board, and card sections. Each step can move the app to a route,
 * open something, and spotlight the part of the screen being talked about.
 */

export type TourAction =
  | { kind: "open-person"; personId: string }
  | { kind: "open-client"; clientId: string }
  | { kind: "open-opportunity"; opportunityId: string }
  | { kind: "open-capture"; eventId: string }
  | { kind: "open-add-contact" }
  | { kind: "open-share-card" }
  | { kind: "clear" };

export type TourStep = {
  id: string;
  /** Hash route the step happens on. */
  route: string;
  /** Short header for the step. */
  title: string;
  /** What this part of the product is and why it exists. */
  body: string;
  /** The line to say out loud when demoing it. */
  say?: string;
  /** data-tour value of the element to spotlight. */
  target?: string;
  action?: TourAction;
};

export const tourSteps: TourStep[] = [
  {
    id: "start",
    route: "/",
    title: "One place for everyone you know",
    body: "The home screen opens on what today actually asks of you rather than a wall of statistics — meetings, follow-ups, relationships going quiet, and the one thing worth doing first.",
    say: "Imagine every person you work with or know being in one place.",
    target: "daily-brief",
    action: { kind: "clear" },
  },
  {
    id: "metrics",
    title: "The numbers that matter",
    route: "/",
    body: "486 relationships, 8 clients, follow-ups outstanding, opportunities open. Each one is a door into the part of the system behind it.",
    target: "metrics",
  },
  {
    id: "intelligence",
    route: "/",
    title: "Relationships that need attention",
    body: "Rather than telling you that you know 486 people, it tells you which four need something from you — a strong relationship going quiet, an introduction you already have a path to, and an event with people who could help.",
    say: "It surfaces the relationships that need you, not just the ones you have.",
    target: "intelligence",
  },
  {
    id: "graph",
    route: "/",
    title: "How your network fits together",
    body: "You sit in the middle. Clients are green, brands gold, teams dark, media and community around the edges. Drag a node, filter by category, and hover any line to see what the relationship actually is.",
    say: "Instead of just having a contact list, you can actually see how your network fits together.",
    target: "graph",
  },
  {
    id: "drawer",
    route: "/",
    title: "Everything about one relationship",
    body: "Clicking anyone opens their full card: how you know them, where you met, your history, the clients they touch, notes, files, tasks, and when you're next due to check in.",
    say: "Everything about your relationship is here — how you know her, your history, related athletes, notes, files, meetings, and next steps.",
    action: { kind: "open-person", personId: "p-maya" },
  },
  {
    id: "introduction",
    route: "/",
    title: "Warm paths you already have",
    body: "Jordan Lee at Gatorade isn't someone you know — but Marcus is, and he's offered the introduction. The system finds these second-degree paths so you never cold-approach someone you could be introduced to.",
    say: "It recognises when someone you know could help one of your athletes or open something new.",
    action: { kind: "open-person", personId: "p-jordan-lee" },
  },
  {
    id: "client",
    route: "/clients",
    title: "Your athletes, in the same system",
    body: "Clients aren't a separate database. Open one and you get their priorities, their relationships as a sub-graph, open opportunities, documents, and history — all drawn from the same network as everyone else.",
    say: "Your athletes don't live in another system. Their relationships, documents, opportunities, and schedule are tied into the same network.",
    action: { kind: "open-client", clientId: "c-larry" },
  },
  {
    id: "opportunities",
    route: "/opportunities",
    title: "The work each relationship is holding up",
    body: "A board of every conversation that could turn into work. Drag a card between stages, or switch to the table and timeline views. Each record carries its owner, confidence, decision date, and the people it depends on.",
    say: "And when a relationship turns into work, it's tracked here — without turning any of it into a sales pipeline.",
    target: "opportunity-board",
    action: { kind: "clear" },
  },
  {
    id: "events",
    route: "/events",
    title: "Where relationships start",
    body: "Most relationships begin in a room. Each event shows who from your network is going, who's worth meeting, and the warm path to them. The summit matters because Marcus and Jordan Lee are both attending.",
    say: "Before you walk into a room, you know who's in it and who you want to meet.",
    target: "events-list",
  },
  {
    id: "capture",
    route: "/events",
    title: "Capturing someone on the spot",
    body: "Scan a badge, photograph a card, or swap codes. Their details come back filled in, tagged with the room you met in, and queued for a follow-up — so the evening of admin afterwards disappears.",
    say: "Adding someone could be as simple as scanning a badge or sharing a code.",
    action: { kind: "open-capture", eventId: "ev-clt-summit" },
  },
  {
    id: "card",
    route: "/card",
    title: "What you hand out",
    body: "It runs both ways. Pick which version of yourself a room gets, share it seven different ways, and see who opened it, who saved it, and who sent theirs back. Three people are in your network because they did.",
    say: "And this is your side of it — what you give people, not just what you keep about them.",
    target: "card-share",
    action: { kind: "clear" },
  },
  {
    id: "documents",
    route: "/documents",
    title: "Files that know who they belong to",
    body: "Documents hang off the people and work they relate to rather than sitting in folders. Select one and you see the chain — file, client, contact, organisation — each hop clickable.",
    say: "Instead of remembering what folder something lives in, documents are connected directly to the people and work they belong to.",
    target: "documents-table",
  },
  {
    id: "outreach",
    route: "/outreach",
    title: "Staying in touch, without the admin",
    body: "Follow-ups stay relationship-shaped, and the rules underneath do the remembering: check-in windows per relationship tier, cooling alerts, post-event follow-up, meeting prep briefs.",
    say: "It keeps track of who you need to stay in touch with without turning relationships into a pipeline.",
    target: "automations",
  },
  {
    id: "finish",
    route: "/",
    title: "One place that remembers",
    body: "Everything you've seen runs on the same network — the people, the work, the rooms, the files, and the card you hand out. That's the whole idea.",
    say: "The goal is for this to become one place that remembers and manages the relationship side of your business.",
    action: { kind: "clear" },
  },
];
