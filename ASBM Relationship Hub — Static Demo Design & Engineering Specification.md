# ASBM Relationship Hub
## Static Concept Demo for Sydney Anderson / Anderson Sports and Brand Management

**Prototype status:** Concept demo only  
**Primary user:** Sydney Anderson, Founder, Anderson Sports and Brand Management  
**Prototype creator:** Trybl  
**Build type:** Static front-end website with mock data  
**Primary purpose:** Demonstrate what a unified relationship-management operating system could look like specifically for an athlete/brand manager.

---

# 1. Product concept

Build a polished static web application demonstrating a hypothetical relationship-management platform customized for **Sydney Anderson and Anderson Sports and Brand Management (ASBM).**

This is not supposed to look like a generic sales CRM.

The experience should communicate:

> **One place to understand, maintain, and activate every important relationship around Sydney, her clients, brands, media, partners, events, and opportunities.**

The prototype should combine concepts normally split among:

- CRMs
- personal relationship managers
- athlete management software
- calendars
- Google Drive
- task managers
- outreach tools
- relationship graphs
- contact books

The site should feel immediately tailored to someone whose business is built around relationships.

---

# 2. Product positioning

### Working product name

**ASBM Relationship Hub**

Small secondary label:

**Powered by Trybl**

Do not heavily brand the demo as Trybl.

The goal is for Sydney to imagine:

> "This could be my system."

rather than:

> "Hakeem is showing me his existing product."

A small "Concept by Trybl" or "Powered by Trybl" treatment is sufficient.

---

# 3. What the demo needs to prove

After 2–3 minutes with the prototype, Sydney should understand that this concept could eventually give her:

1. One place for everyone she knows.
2. A visual understanding of how everyone is connected.
3. Complete contact cards.
4. Her athletes and clients in the same system.
5. Brands, media, agencies, team contacts, and other relationships.
6. Her relationship history with each person.
7. Relevant documents attached to people and clients.
8. Upcoming meetings and important dates.
9. Follow-up reminders.
10. Outreach management.
11. Brand/deal opportunities.
12. Quick contact capture.
13. Intelligence about neglected relationships.
14. Warm introduction paths.
15. Suggestions about who she should contact and why.

The prototype does **not** need a backend.

It should make the future product believable.

---

# 4. Public information used to personalize the prototype

The visual and information architecture should reflect the publicly described work of Sydney Anderson and ASBM.

### Sydney

- Founder of Anderson Sports and Brand Management
- Charlotte-area sports professional
- Former Indiana University track and field athlete
- Sports management/marketing background
- Relationship-driven approach to sports
- Works around professional athletes and athlete brands

### ASBM's publicly described service areas

Use these throughout the product:

- Athlete marketing
- Public relations
- Brand development
- Business development
- Community relations
- Social media
- Events
- Endorsements
- Foundations/community initiatives
- Concierge services

### Publicly associated athletes that may appear in the demo

- Larry Ogunjobi
- Alaina Coates
- Dakereon Joyner

**Important:** Their names may be used for personalization, but all CRM-specific information such as meetings, contracts, values, tasks, documents, conversations, relationship scores, and upcoming deals must be clearly treated as **fictional demo data**.

Never imply that private operational information about Sydney or her clients was obtained.

Place a subtle footer somewhere in the app:

> **Concept Demo · Sample information shown for demonstration only.**

---

# 5. Brand direction

## Important brand rule

An official current ASBM visual identity could not be reliably verified during prototype research.

Therefore:

- Do not claim these colors are official ASBM colors.
- Build the theme using CSS variables.
- Make every major color easy to replace later.
- Do not recreate or invent an ASBM logo and imply it is official.

Use a simple textual **ASBM** mark until an official asset is supplied.

---

# 6. Proposed visual identity

The interface should feel:

**Premium**
**Professional**
**Sport-adjacent**
**Relationship-driven**
**Warm**
**Confident**
**Organized**
**Modern**

It should NOT feel like:

- Salesforce
- a generic SaaS dashboard
- a crypto dashboard
- a sports betting application
- an ESPN statistics page
- a neon AI product
- a childish social network

Sydney's work involves professional athletes, brands, executives, community partners, media, and business opportunities.

The visual design should communicate that level of professionalism.

---

# 7. Proposed color system

Use variables rather than hardcoded colors everywhere.

```css
--asbm-black: #121212;
--asbm-charcoal: #242424;
--asbm-cream: #F7F5F0;
--asbm-white: #FFFFFF;
--asbm-gold: #B89A60;
--asbm-gold-light: #E9DFC9;
--asbm-green: #183C36;
--asbm-muted: #737373;
--asbm-border: #E8E5DF;
--asbm-success: #3D775D;
--asbm-warning: #B77A32;
--asbm-danger: #A95656;
```

### Usage

Black/charcoal:
Primary navigation and typography.

Cream:
Main application background.

White:
Cards.

Gold:
Premium accent, highlights, important relationships, selected elements.

Deep green:
Relationship health, clients, and secondary brand accent.

Do not overuse gold.

Gold should feel like a subtle premium detail, not a luxury-brand parody.

---

# 8. Typography

Preferred:

**Inter**
or
**Geist**

Use:

- large clean headings
- medium-weight navigation
- comfortable line height
- strong numerical hierarchy
- small uppercase labels sparingly

Avoid decorative sports fonts.

---

# 9. Desktop layout

Design for approximately:

**1440 × 900**

Primary structure:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ SIDEBAR │               MAIN APPLICATION                               │
│         │                                                               │
│ ASBM    │ Good morning, Sydney                       Search      Avatar │
│         │                                                               │
│ Home    │ ------------------------------------------------------------ │
│ Network │                                                               │
│ Clients │                 DASHBOARD                                    │
│ Calendar│                                                               │
│ Outreach│                                                               │
│ Files   │                                                               │
│         │                                                               │
│         │                                                               │
│ Trybl   │                                                               │
└─────────────────────────────────────────────────────────────────────────┘
```

Sidebar approximately 220–240px.

Main application gets remaining width.

---

# 10. Sidebar

Top:

### ASBM

Small label underneath:

**Relationship Hub**

Navigation:

- Home
- Network
- Clients
- Calendar
- Outreach
- Documents

Bottom:

**Powered by Trybl**

Use Lucide icons.

Selected navigation should use a subtle cream/gold highlight rather than a bright SaaS blue.

---

# 11. Dashboard header

### Greeting

**Good morning, Sydney**

Subtitle:

> Here's what needs your attention across your network today.

Right side:

Search field:

**Search people, clients, brands...**

Buttons:

**+ Add Contact**

Avatar:
Use initials **SA** if an image asset is not available.

---

# 12. Dashboard — first row

Four compact metric cards.

### Relationships

**486**

Subtitle:

**+14 this month**

---

### Clients

**8**

Subtitle:

**6 athletes · 2 brands**

---

### Follow-ups

**12**

Subtitle:

**4 due today**

---

### Active Opportunities

**7**

Subtitle:

**$185K potential**

All numbers are mock.

Do not make financial numbers excessively prominent. This is primarily a relationship product.

---

# 13. Main hero component: Relationship Intelligence

This should be the most distinctive component on the dashboard.

Title:

## Relationship Intelligence

Subtitle:

> Important relationships that may need your attention.

Show 3 intelligent suggestions.

---

### Suggestion 1

**Reconnect with Maya Thompson**

`Nike · Athlete Partnerships`

**Relationship:** Strong  
**Last interaction:** 74 days ago

Description:

> You previously discussed athlete-brand opportunities. It may be a good time to reconnect before fall campaigns begin.

Buttons:

**View Relationship**

**Draft Outreach**

---

### Suggestion 2

**Potential introduction**

Visual:

```text
Sydney → Marcus Reed → Jordan Lee
```

Subtitle:

> Marcus has a strong relationship with Jordan Lee at Gatorade.

Button:

**Explore Introduction**

---

### Suggestion 3

**Upcoming opportunity**

**Dakereon Joyner**

> A community event is coming up in 18 days. Three people in your network may be relevant partners.

Button:

**View Connections**

---

# 14. Relationship graph

This is the centerpiece of the prototype.

The visualization should answer:

> **Who is connected to whom?**

Title:

## Your Network

Subtitle:

> See how clients, brands, teams, media, and partners connect.

---

## Graph structure

Sydney should appear as the central node.

### Node categories

**Sydney**
Large central node.

**Clients**
Deep green.

**Brands**
Gold.

**Sports organizations / teams**
Neutral dark.

**Media**
Warm neutral.

**Community organizations**
Muted green.

**Professional contacts**
Light neutral.

---

## Example graph

```text
                         Nike
                          │
                    Maya Thompson
                          │
                          │
        Larry ─────── Sydney ─────── Alaina
       Ogunjobi          │            Coates
          │              │
          │          Dakereon
      NFL contact        Joyner
          │              │
       Panthers        The State
                          │
                   Community Partner
```

This should actually be rendered with nodes and edges, not ASCII.

Recommended libraries:

**React Flow**
or
**Cytoscape.js**

React Flow is preferred for speed.

---

# 15. Graph interaction

Even though the application is static, the graph should feel real.

Support:

- drag nodes
- hover nodes
- zoom
- pan
- click node
- filter by category

Clicking a node opens a right-side **Relationship Drawer**.

Graph filter chips:

**All**

**Clients**

**Brands**

**Teams**

**Media**

**Community**

---

# 16. Relationship edge types

Edges should carry meaning.

Possible relationships:

- Client
- Works at
- Brand partner
- Introduced by
- Met through
- Collaborated with
- Media contact
- Community partner
- Former colleague
- Team connection
- Strong relationship
- Potential introduction

On hover, display the relationship.

Example:

**Sydney Anderson → Maya Thompson**

`Professional relationship · Last interaction Jun 8`

---

# 17. Relationship strength

Give each relationship a score:

### Strong

Green dot

### Active

Gold dot

### Cooling

Orange dot

### Dormant

Gray dot

Avoid displaying something like:

**Relationship Score: 84.327**

The system should feel human rather than algorithmically creepy.

Use understandable labels.

---

# 18. Relationship Drawer / Contact Card

Clicking any person should open a right drawer approximately 420px wide.

This may be the second-most-important visualization after the graph.

Example:

# Maya Thompson

**Director, Athlete Partnerships**

Nike

Charlotte / New York

---

### Relationship

**Strong**

Last interaction  
**June 8**

First connected  
**March 2023**

Met through  
**Marcus Reed**

---

### Contact

Email  
maya@example-demo.com

Phone  
Demo contact

LinkedIn  
View Profile

---

### Related people

**Marcus Reed**

**Larry Ogunjobi**

**Jordan Lee**

---

### Related clients

**Larry Ogunjobi**

---

### Notes

> Interested in community-oriented athlete campaigns.

> Prefers early planning for Q4 activations.

---

### Recent activity

**Jun 8**

Email conversation

**Apr 21**

Brand partnership meeting

**Mar 10**

Event interaction

---

### Files

**Nike Partnership Overview.pdf**

**Fall Campaign Notes.docx**

---

### Tasks

**Follow up about Q4 campaigns**

Due Aug 24

---

Buttons:

**Send Message**

**Schedule**

**Add Note**

**Create Task**

These buttons can trigger mock dialogs.

---

# 19. Client overview

Dashboard card:

## Clients

Show visual client cards.

Each should contain:

- photo/avatar
- name
- sport/category
- current focus
- open opportunities
- upcoming event
- relationship health indicator

Example:

### Larry Ogunjobi

**Professional Football**

3 active initiatives

Next:
**Community event planning**

---

### Alaina Coates

**Professional Basketball**

2 active initiatives

Next:
**Brand check-in**

---

### Dakereon Joyner

**Football**

2 active initiatives

Next:
**Community activation**

---

Include additional clearly fictional profiles to make the platform look populated.

### Cameron Brooks

Professional Basketball

### Alexis Morgan

Track & Field

### Jordan Ellis

Entrepreneur / Creator

---

# 20. Client detail concept

Clicking a client opens a full-screen-style modal or client panel.

Example:

# Larry Ogunjobi

Tabs:

**Overview**

**Relationships**

**Opportunities**

**Documents**

**Activity**

---

## Overview

### Current priorities

Community initiatives

Brand partnerships

Off-field opportunities

Events

---

### Key relationships

Nike contact

Local nonprofit

Team contact

Media relationship

---

### Upcoming

**Aug 28**

Brand call

**Sep 4**

Community planning session

**Sep 12**

Partner follow-up

---

### Documents

Community Initiative Brief

Brand Partnership Deck

Event Planning Notes

All document names/data are demo content.

---

# 21. Today's schedule

Dashboard card:

## Today

### 10:00 AM

**Client check-in**

Larry Ogunjobi

Video call

---

### 1:30 PM

**Brand partnership conversation**

Maya Thompson

Nike

---

### 4:00 PM

**Community event planning**

Dakereon Joyner

---

Include:

**View Calendar**

---

# 22. Calendar screen

The Calendar navigation item should reveal a static but interactive calendar.

Provide:

**Day**

**Week**

**Month**

Default:

**Week**

Calendar event categories:

Client

Brand

Media

Internal

Community

Personal networking

Clicking event opens detail popover.

Example:

### Nike Partnership Call

Tuesday · 1:30–2:00 PM

Participants:

Maya Thompson

Sydney Anderson

Related client:

Larry Ogunjobi

Preparation:

> Review previous Q4 campaign discussion.

Button:

**Open Relationship**

This is important:

### Calendar events should connect back to people.

The product isn't just a calendar.

It contextualizes the meeting using relationship information.

---

# 23. Upcoming Follow-Ups

Dashboard card:

## Follow-ups

Show:

**Maya Thompson**

Nike

`Due today`

**Reach out about Q4 campaigns**

---

**Marcus Reed**

Carolina Panthers

`Tomorrow`

**Check in after preseason event**

---

**Tasha Green**

Media

`Aug 26`

**Send athlete story idea**

---

**Jordan Lee**

Gatorade

`Sep 2`

**Request intro through Marcus**

Provide:

**View all**

---

# 24. Outreach screen

This is NOT a giant sales email product.

Keep it relationship-oriented.

Header:

# Outreach

Subtitle:

> Keep important relationships active without losing the personal touch.

Sections:

### Needs Follow-Up

### Drafts

### Scheduled

### Recently Contacted

---

Example rows:

| Person | Organization | Relationship | Last Contact | Next Step |
| --- | --- | --- | --- | --- |
| Maya Thompson | Nike | Strong | 74 days | Reconnect |
| Jordan Lee | Gatorade | New | Never | Request introduction |
| Tasha Green | Media | Active | 21 days | Send update |
| Marcus Reed | Panthers | Strong | 15 days | Check in |

---

# 25. Mock AI outreach feature

Clicking **Draft Outreach** opens:

## Relationship Assistant

Prompt:

> Reconnect with Maya about potential fall brand opportunities.

Generated demo message:

> Hi Maya, hope you've been doing well. I wanted to circle back as fall planning starts picking up. I have a couple of things happening with clients that made me think of our previous conversation. Would love to catch up when you have some time.

Buttons:

**Edit**

**Copy**

**Schedule**

Do not actually send anything.

---

# 26. Network page

This page should showcase how much better this concept is than a traditional contact database.

Header:

# Network

**486 relationships**

Search:

**Search your network**

Filters:

- All
- Clients
- Brands
- Teams
- Media
- Agencies
- Community
- Personal
- Needs Follow-up

View toggle:

**List | Graph**

---

# 27. Network list view

Columns:

**Person**

**Organization**

**Role**

**Relationship**

**Connected Through**

**Last Interaction**

**Next Step**

Example:

**Maya Thompson**  
Nike  
Director, Athlete Partnerships  
Strong  
Marcus Reed  
74 days ago  
Reconnect

**Marcus Reed**  
Carolina Panthers  
Partnerships  
Strong  
Direct  
15 days ago  
Check in

**Tasha Green**  
The State  
Sports Partnerships  
Active  
Dakereon event  
21 days ago  
Send update

**Jordan Lee**  
Gatorade  
Sports Marketing  
New  
Marcus Reed  
Never  
Request intro

---

# 28. Add Contact experience

The **+ Add Contact** button should open an attractive modal.

Title:

## Add someone to your network

Options represented as cards:

### LinkedIn

**Paste a LinkedIn profile**

Input:
`linkedin.com/in/...`

Button:
**Import**

---

### Business Card

**Scan or upload a card**

Button:
**Upload**

---

### Phone Contact

**Import from contacts**

Button:
**Connect**

---

### Add Manually

**Create a contact**

Button:
**Add details**

All are demo interactions.

Clicking them should show a mock success state.

Example:

> **Maya Thompson added**
>
> Company, role, location, and LinkedIn profile were added automatically.

---

# 29. Universal search

The top search should support a small static dataset.

Typing:

**Nike**

shows:

### People

Maya Thompson  
Director, Athlete Partnerships

### Organizations

Nike

### Documents

Nike Partnership Overview

### Opportunities

Fall Athlete Campaign

This demonstrates an important product principle:

> Sydney should not need to remember where something was stored.

---

# 30. Documents screen

Header:

# Documents

Subtitle:

> Every important file connected to the people and clients it belongs to.

Do not imitate Google Drive exactly.

Columns:

**Document**

**Related To**

**Type**

**Updated**

**Owner**

Example:

**Community Initiative Brief.pdf**

Larry Ogunjobi

Community

Aug 18

Sydney

---

**Nike Partnership Overview.pdf**

Larry Ogunjobi + Maya Thompson

Partnership

Aug 15

Sydney

---

**Brand Strategy Notes.docx**

Alaina Coates

Brand

Aug 10

Sydney

---

**Gamecock Event Plan.pdf**

Dakereon Joyner

Event

Aug 6

Sydney

---

# 31. Document relationship visualization

When a document is selected, display:

## Connected To

```text
Nike Partnership Overview
        ↓
Larry Ogunjobi
        ↓
Maya Thompson
        ↓
Nike
```

This reinforces the graph concept.

Documents should not simply exist in folders.

They belong to **relationships and work**.

---

# 32. Opportunities

Include a dashboard card rather than necessarily adding another navigation section.

Header:

## Opportunities

Example cards:

### Fall Athlete Campaign

Nike

Related client:
**Larry Ogunjobi**

Stage:
**Conversation**

Potential:
**Brand partnership**

Next action:
**Reconnect with Maya**

---

### Community Partnership

Local nonprofit

Related client:
**Dakereon Joyner**

Stage:
**Planning**

Next action:
**Finalize event partner**

---

### Media Feature

Sports publication

Related client:
**Alaina Coates**

Stage:
**Introduction**

Next action:
**Send background**

---

# 33. Relationship health visualization

Dashboard component:

## Network Health

Use a donut or horizontal segmented bar.

Demo numbers:

**Strong — 92**

**Active — 174**

**Cooling — 83**

**Dormant — 137**

Below:

> **18 high-value relationships haven't been contacted in 90+ days.**

Button:

**Review relationships**

This is much more important than vanity statistics about number of contacts.

---

# 34. Relationship categories visualization

Small donut chart:

**Athletes**

**Brands**

**Teams**

**Media**

**Agencies**

**Community**

**Other**

This communicates how Sydney's professional ecosystem is distributed.

---

# 35. Relationship opportunities visualization

Create a component:

## Suggested Connections

Example:

```text
Dakereon Joyner
      ↓
Sydney
      ↓
Tasha Green
      ↓
Media Opportunity
```

Reason:

> Tasha has previously worked around community-oriented sports stories.

Button:

**Explore**

Another:

```text
Larry Ogunjobi
      ↓
Sydney
      ↓
Maya Thompson
      ↓
Nike
```

Reason:

> Strong relationship path with a relevant brand contact.

---

# 36. Recent activity

Dashboard section:

## Recent Activity

Timeline.

**10:32 AM**

Added note to Maya Thompson

---

**Yesterday**

Meeting completed with Dakereon Joyner

---

**Yesterday**

Community Initiative Brief uploaded

---

**Monday**

New relationship added: Jordan Lee

---

**Monday**

Follow-up completed with Marcus Reed

---

# 37. Daily intelligence summary

Near the top of the dashboard include a small prominent section.

### Your day at a glance

**3 meetings**

**4 follow-ups**

**2 relationships cooling**

**1 potential introduction**

Then:

> **Priority:** Reconnect with Maya before your Nike-related opportunity moves forward.

This makes the prototype feel intelligent without requiring actual AI.

---

# 38. Mock data model

Store all data locally.

Recommended:

```text
/src/data/
    people.ts
    clients.ts
    organizations.ts
    relationships.ts
    interactions.ts
    opportunities.ts
    documents.ts
    calendar.ts
    tasks.ts
```

---

# 39. Person model

```ts
type Person = {
  id: string;
  name: string;
  avatar?: string;
  title: string;
  organization?: string;
  category:
    | "client"
    | "brand"
    | "team"
    | "media"
    | "agency"
    | "community"
    | "professional";
  location?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  relationshipStrength:
    | "strong"
    | "active"
    | "cooling"
    | "dormant";
  lastInteraction?: string;
  firstInteraction?: string;
  connectedThrough?: string;
  notes?: string[];
  tags?: string[];
};
```

---

# 40. Relationship model

```ts
type Relationship = {
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
    | "professional";
  strength?: "strong" | "active" | "cooling" | "dormant";
  lastInteraction?: string;
};
```

---

# 41. Interaction model

```ts
type Interaction = {
  id: string;
  personId: string;
  type:
    | "meeting"
    | "email"
    | "phone"
    | "linkedin"
    | "event"
    | "note";
  date: string;
  title: string;
  summary?: string;
};
```

---

# 42. Opportunity model

```ts
type Opportunity = {
  id: string;
  title: string;
  organization: string;
  clientIds: string[];
  contactIds: string[];
  stage:
    | "identified"
    | "introduction"
    | "conversation"
    | "planning"
    | "active"
    | "complete";
  nextAction: string;
  potentialValue?: number;
};
```

---

# 43. Document model

```ts
type Document = {
  id: string;
  title: string;
  type: string;
  relatedPersonIds: string[];
  relatedClientIds: string[];
  relatedOrganizationIds: string[];
  updatedAt: string;
  owner: string;
};
```

---

# 44. Recommended seeded people

### Real publicly associated individuals

Use only basic publicly established associations.

**Sydney Anderson**

Founder  
Anderson Sports and Brand Management

**Larry Ogunjobi**

Professional Football  
Client

**Alaina Coates**

Professional Basketball  
Client

**Dakereon Joyner**

Football  
Client

---

### Fictional demo contacts

Make these visibly fabricated.

**Maya Thompson**

Director, Athlete Partnerships  
Nike

**Marcus Reed**

Partnerships  
Carolina Panthers

**Jordan Lee**

Sports Marketing  
Gatorade

**Tasha Green**

Sports Partnerships  
Media

**Rachel Brooks**

Community Partnerships  
Charlotte nonprofit

**Andre Williams**

Brand Strategy  
Adidas

**Nicole Carter**

Sports Marketing  
Agency

---

# 45. Mock relationship network

Seed:

```text
Sydney → Larry
type: client
strength: strong

Sydney → Alaina
type: client
strength: strong

Sydney → Dakereon
type: client
strength: strong

Sydney → Maya
type: professional
strength: strong

Sydney → Marcus
type: professional
strength: strong

Marcus → Jordan
type: professional
strength: strong

Maya → Nike
type: works-at

Jordan → Gatorade
type: works-at

Dakereon → Tasha
type: event/media

Larry → Rachel
type: community-partner
```

This creates enough connections for the graph to visually demonstrate:

- direct relationships
- second-degree connections
- clients
- organizations
- potential introductions

---

# 46. Critical prototype interactions

Even though there is no backend, implement these interactions.

### Required

- Sidebar navigation
- Search mock people
- Click graph nodes
- Relationship drawer
- Drag graph nodes
- Graph category filters
- Open client profiles
- Open document details
- Open calendar event
- Add Contact modal
- Draft Outreach modal
- Mark follow-up as completed
- Toggle List / Graph
- Tooltip interactions
- Basic hover states

### Not required

- Authentication
- Database
- Email integration
- LinkedIn API
- Google Calendar API
- Google Drive API
- real message sending
- file uploading
- contact enrichment
- backend AI
- payments
- permissions

Simulate everything locally.

---

# 47. Recommended technology

Preferred implementation:

**React**
**TypeScript**
**Vite**

Styling:

**Tailwind CSS**

Components:

**shadcn/ui**

Icons:

**Lucide**

Graph:

**React Flow**

Charts:

**Recharts**

Dates:

**date-fns**

No backend.

No authentication.

No database.

No API keys.

No external services required for the prototype.

---

# 48. Component architecture

```text
App
│
├── Sidebar
│
├── TopNavigation
│
├── Dashboard
│   ├── DailyBrief
│   ├── MetricCards
│   ├── RelationshipIntelligence
│   ├── NetworkGraph
│   ├── ClientCards
│   ├── CalendarPreview
│   ├── FollowUps
│   ├── NetworkHealth
│   ├── Opportunities
│   └── RecentActivity
│
├── NetworkPage
│   ├── NetworkFilters
│   ├── NetworkList
│   └── NetworkGraph
│
├── ClientsPage
│   ├── ClientGrid
│   └── ClientDetail
│
├── CalendarPage
│
├── OutreachPage
│
├── DocumentsPage
│
├── RelationshipDrawer
│
├── AddContactModal
│
├── OutreachModal
│
└── GlobalSearch
```

---

# 49. Dashboard hierarchy

The first visible viewport should roughly contain:

```text
Good morning, Sydney

[Relationships] [Clients] [Follow-ups] [Opportunities]

┌───────────────────────────┬─────────────────────────┐
│ Relationship Intelligence │ Today's Schedule        │
│                            │                         │
└───────────────────────────┴─────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                  RELATIONSHIP GRAPH                 │
│                                                     │
│       Nike       Larry       Sydney      Alaina     │
│         \          \           |          /         │
│          Maya ------ Sydney ---- Dakereon           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

The graph should appear without scrolling on a normal laptop if possible.

This is important for the demo.

---

# 50. Design principles

## Relationships over records

Never make people look like rows in a database unless in list view.

Use faces/avatars, context, relationship history, and connections.

---

## Context everywhere

Do not show:

**Meeting at 1:30**

Show:

**Meeting with Maya Thompson**

Nike · Athlete Partnerships

Related client: Larry Ogunjobi

Last conversation: Q4 campaigns

---

## Actionable rather than archival

Do not just tell Sydney:

> You know 486 people.

Tell her:

> 4 important relationships need attention.

---

## Network-aware

The application should constantly reveal connections.

Examples:

**Introduced by Marcus**

**Also knows Larry**

**Connected to 3 clients**

**2nd-degree relationship**

---

## Personal, not sales-driven

Avoid language such as:

- leads
- prospects
- conversion
- funnel
- MQL
- SQL
- close rate

Use:

- people
- relationships
- introductions
- clients
- opportunities
- conversations
- follow-ups
- partners

---

# 51. Demo narrative

The prototype should support this exact walkthrough.

### Step 1

Open dashboard.

Say:

> "Imagine every person you work with or know being in one place."

Show metrics and today's priorities.

---

### Step 2

Scroll/point to network graph.

Say:

> "Instead of just having a contact list, you can actually see how your network fits together."

Click Maya.

---

### Step 3

Open Maya's relationship card.

Say:

> "Everything about your relationship is here: how you know her, your history, related athletes, notes, files, meetings, and next steps."

---

### Step 4

Show suggested introduction.

Say:

> "The system can also recognize when someone you know could help one of your athletes or create a new opportunity."

---

### Step 5

Open client.

Say:

> "And your athletes don't live in another system. Their relationships, documents, opportunities, and schedule are tied into the same network."

---

### Step 6

Open Documents.

Say:

> "Instead of remembering what folder something lives in, documents are connected directly to the people and work they belong to."

---

### Step 7

Open Outreach.

Say:

> "And it keeps track of who you need to stay in touch with without turning relationships into a sales pipeline."

---

### Step 8

Show Add Contact.

Say:

> "Eventually, adding someone could be as simple as sharing their LinkedIn profile, scanning a card, or importing them from your phone."

---

### Step 9

Return to dashboard.

Say:

> "The goal is basically for this to become one place that remembers and manages the relationship side of your business."

That is the emotional payoff of the demo.

---

# 52. What should look especially polished

Spend extra design effort on:

1. Dashboard first viewport
2. Relationship graph
3. Relationship drawer/contact card
4. Client card
5. Daily intelligence
6. Add Contact experience

These are the features Sydney is most likely to remember.

The Documents page can be simpler.

---

# 53. Avoid overbuilding

This is a validation prototype.

Do not waste time building:

- full settings
- permission systems
- onboarding
- authentication
- real integrations
- responsive mobile navigation beyond basic responsiveness
- complex forms
- backend state
- real messaging
- financial accounting
- commissions
- contract signing

The purpose is to answer:

> **Would Sydney actually want a system like this?**

not:

> **Can we build an enterprise CRM today?**

---

# 54. Static prototype quality bar

The final prototype should feel like a product that could plausibly be launched, even though the data is static.

Requirements:

- no lorem ipsum
- no generic "John Doe" everywhere
- no empty sections
- no broken buttons
- no placeholder charts
- no ugly default React Flow nodes
- no excessive gradients
- no giant hero marketing page
- no unnecessary animations

Use realistic populated states throughout.

---

# 55. Animations

Keep animation subtle.

Use:

- 150–250ms card transitions
- drawer slide-in
- graph node hover
- subtle button feedback
- modal fades
- number/card entrance animation if easy

Do not use:

- bouncing elements
- dramatic page transitions
- spinning gradients
- glowing AI effects

---

# 56. Responsive behavior

Desktop is priority.

At tablet widths:

- sidebar may collapse
- graph remains usable
- dashboard cards wrap

At mobile widths:

- sidebar becomes drawer
- graph can horizontally occupy full width
- cards stack

Do not spend excessive development time optimizing mobile for the initial demo.

---

# 57. Accessibility

Minimum:

- reasonable contrast
- keyboard-focus states
- buttons have labels
- icon-only actions have aria-labels
- modal/dialog focus behavior
- chart information available in text where possible

---

# 58. Demo-data disclaimer

Footer:

**ASBM Relationship Hub · Concept by Trybl**

Second line:

**Sample information shown for demonstration purposes only.**

Keep this subtle but visible.

---

# 59. Future integration placeholders

The UI may show small labels such as:

**LinkedIn**

**Gmail**

**Google Calendar**

**Google Drive**

**Contacts**

but do not pretend they are connected.

For example:

### Connected Sources

LinkedIn  
`Demo`

Gmail  
`Demo`

Calendar  
`Demo`

Drive  
`Demo`

This communicates the vision without implementing APIs.

---

# 60. Long-term concept the prototype should hint at

The future product should eventually be capable of understanding:

```text
WHO do I know?

HOW do I know them?

WHO ELSE do they know?

WHAT have we done together?

WHAT files belong to this relationship?

WHEN did we last communicate?

WHAT do I need to do next?

WHICH clients are connected to them?

WHAT opportunities could exist?

WHO should I introduce?

WHO should I reconnect with?

WHAT meetings are coming up?

WHAT context do I need before those meetings?
```

The static prototype does not need to solve these technically.

It needs to make Sydney believe that this is what the product could become.

---

# 61. Final instruction to coding agent

Build this as a polished, high-fidelity **front-end concept application**, not a marketing landing page.

The first screen should look like Sydney has already logged into an operating system containing her professional network.

Use mock data extensively.

Prioritize the feeling:

> **"My entire relationship-based business is organized here."**

The relationship graph and contact intelligence should make this visually distinct from a traditional CRM.

Use the public ASBM context to personalize terminology and sample workflows, while clearly treating private operational details as fictional demonstration data.

Keep all data in local TypeScript/JSON objects so every component can later be connected to a real backend without redesigning the UI.

### Build order

1. Application shell and ASBM theme
2. Dashboard
3. Relationship graph
4. Relationship/contact drawer
5. Seed mock data
6. Client cards/details
7. Network list/graph toggle
8. Calendar
9. Outreach
10. Documents
11. Add Contact modal
12. Global search
13. Polish and animations

The completed prototype should be deployable as a static site to Vercel or Netlify with no environment variables or backend dependencies.