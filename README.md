# ASBM Relationship Hub

A static concept demo of a relationship-management operating system built around
Sydney Anderson and Anderson Sports and Brand Management.

**Concept by Trybl.** Front-end only — no backend, no authentication, no
integrations. Every figure, date, note, file, and conversation is sample data
created for demonstration purposes.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## What it demonstrates

**Knowing your network**

- One place for every relationship — clients, brands, teams, media, community
  partners, and professional contacts.
- A relationship graph showing how those people connect to each other.
- A full relationship card for any person: history, notes, files, tasks, where
  you met them, and the clients they touch.
- Clients living in the same system as everyone else, not a separate silo.
- Documents attached to the people and work they belong to.

**Working a room**

- Events with the people you already know in them, who is worth meeting, and the
  warm path to each one.
- Live capture — badge, business card, code exchange, or typed — with the
  contact enriched, tagged to the room, and queued for follow-up on the spot.
- A digital contact card with a real vCard export and a booking link.
- What actually came out of the last event, including the relationship that went
  quiet because nothing followed the handshake.

**Keeping it up**

- Keep-in-touch windows per relationship tier, and who has slipped past theirs.
- Scheduling that reads the real gaps in the calendar rather than offering a
  canned list of times.
- Twelve background rules — cadence nudges, cooling alerts, post-event
  follow-up, enrichment, source tagging, duplicate merge, meeting prep briefs,
  introduction watch, role-change alerts, event radar — each of which can be
  switched on and off.
- Follow-ups and outreach that stay relationship-shaped rather than becoming a
  sales pipeline.

## How it is put together

```
src/
  data/        all mock data + the selectors every component reads through
  state/       the one reducer holding demo interactivity
  components/  ASBM design primitives and the app shell
  features/    graph, relationship drawer, modals, dashboard cards
  pages/       Home, Network, Clients, Calendar, Events, Outreach, Documents
  styles/      theme.css — the entire colour palette lives here
```

Data is served from local TypeScript objects behind `src/data/selectors.ts`.
That module is the seam a real backend would replace; no component reads the raw
arrays directly.

The demo runs on a pinned clock (`src/data/today.ts`) so relative phrases like
"74 days ago" and "due today" read the same every time it is opened.

## Notes on the data

Sydney Anderson, Larry Ogunjobi, Alaina Coates, and Dakereon Joyner appear by
name and public association only. Every operational detail attributed to them
here is fictional. All other people, organizations, and figures are invented.

## Brand

No official ASBM visual identity was available, so the palette is a proposal.
Every colour is defined once in `src/styles/theme.css` as an `--asbm-*` variable
and can be swapped in one place when real brand assets exist. The wordmark is
plain text for the same reason.
