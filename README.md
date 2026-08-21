# ASBM Relationship Hub

A static concept demo of a relationship-management operating system built around
Sydney Anderson and Anderson Sports and Brand Management.

**Concept by Trybl.** Front-end only — no backend, no authentication, no
integrations. Every figure, date, note, file, and conversation is sample data
created for demonstration purposes.

## Live demo

**https://has25000.github.io/all-in-one-crm-test/**

Open it and take the walkthrough — fourteen steps, about two minutes. Every
major screen and card also carries a small "?" that explains what it is.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Publishing

```bash
npm run deploy
```

That builds with the repository subpath as its base and pushes the result to
the `gh-pages` branch, which GitHub Pages serves. It needs no Actions minutes,
which matters because Actions is currently unavailable on this account.

`.github/workflows/deploy.yml` does the same job through GitHub Actions and is
the tidier option once Actions is available again. It is set to manual dispatch
so it does not fail on every push in the meantime.

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
- Your own card, and the ability to hand it out: a public link and code, four
  audience variants, per-field visibility, seven share routes, a real vCard and
  a real email signature — plus who opened it, who saved it, and who sent
  theirs back.
- What actually came out of the last event, including the relationship that went
  quiet because nothing followed the handshake.

**Tracking the work**

- An opportunities board with drag-and-drop stage columns, plus table and
  timeline views over the same records — arrow keys move a card too, so
  dragging is never the only way.
- Group by stage, client, or type; filter, sort, and search.
- A full record per opportunity: stage, owner, confidence, decision date,
  weighted value, the people it depends on, the clients it serves, files, and a
  complete activity log.
- Log a call, email, meeting, or note against any person or record.
- CSV export from the board and the network list — real, working, to the
  clipboard — and a CSV import path when someone arrives with a spreadsheet.

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
  pages/       Home, Network, Clients, Opportunities, Calendar, Events,
               Outreach, Documents, Card, and the public card at /c/:slug
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

## Sharing, not just storing

Relationship management runs in both directions, so the card Sydney hands out
gets the same weight as the records she keeps.

`/card` is where she manages it: pick which version of herself a room gets
(full, brand partners, media, conference), turn individual details on or off,
copy the link or the code, and see who has it. `/c/sydney` is what the other
person opens — a standalone page outside the app shell, because it lands on a
stranger's phone. It carries Save contact, Book time, and a Send yours back
field, which is the half that makes it an exchange rather than a handout.

Two things there genuinely work rather than being mocked: **Copy contact file**
emits a valid vCard built from whichever fields the chosen card shows, and
**Copy signature** produces a real, pasteable email signature. Both change when
the card does.

## A note on vocabulary

The board mechanics are the ones any CRM user expects, but the language
deliberately is not. There are no leads, prospects, funnels, or close rates
here — only people, relationships, introductions, conversations, and
opportunities. Sydney's business runs on relationships, and the wording should
never make her feel like she is working a pipeline.

## Brand

No official ASBM visual identity was available, so the palette is a proposal.
Every colour is defined once in `src/styles/theme.css` as an `--asbm-*` variable
and can be swapped in one place when real brand assets exist. The wordmark is
plain text for the same reason.
