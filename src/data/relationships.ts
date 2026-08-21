import type { Relationship } from "./types";
import { SYDNEY_ID } from "./people";

let seq = 0;
const rel = (
  sourceId: string,
  targetId: string,
  type: Relationship["type"],
  strength?: Relationship["strength"],
  lastInteraction?: string,
): Relationship => ({
  id: `r-${++seq}`,
  sourceId,
  targetId,
  type,
  strength,
  lastInteraction,
});

/**
 * The edges of Sydney's network: direct ties, the organizations people belong
 * to, and the second-degree paths that make introductions possible.
 */
export const relationships: Relationship[] = [
  /* Sydney's clients */
  rel(SYDNEY_ID, "p-larry", "client", "strong", "2026-08-19"),
  rel(SYDNEY_ID, "p-alaina", "client", "strong", "2026-08-17"),
  rel(SYDNEY_ID, "p-dakereon", "client", "strong", "2026-08-20"),
  rel(SYDNEY_ID, "p-cameron", "client", "active", "2026-08-11"),
  rel(SYDNEY_ID, "p-alexis", "client", "strong", "2026-08-14"),
  rel(SYDNEY_ID, "p-jordan-ellis", "client", "active", "2026-08-05"),

  /* Sydney's direct professional relationships */
  rel(SYDNEY_ID, "p-maya", "professional", "strong", "2026-06-08"),
  rel(SYDNEY_ID, "p-marcus", "professional", "strong", "2026-08-06"),
  rel(SYDNEY_ID, "p-tasha", "media", "active", "2026-07-31"),
  rel(SYDNEY_ID, "p-rachel", "community-partner", "strong", "2026-08-13"),
  rel(SYDNEY_ID, "p-tobias", "brand-partner", "strong", "2026-08-12"),
  rel(SYDNEY_ID, "p-devon", "team", "strong", "2026-08-10"),
  rel(SYDNEY_ID, "p-nicole", "professional", "active", "2026-07-21"),
  rel(SYDNEY_ID, "p-victor", "professional", "strong", "2026-08-18"),
  rel(SYDNEY_ID, "p-simone", "media", "active", "2026-08-03"),
  rel(SYDNEY_ID, "p-harper", "brand-partner", "active", "2026-08-04"),
  rel(SYDNEY_ID, "p-priya", "brand-partner", "active", "2026-07-24"),
  rel(SYDNEY_ID, "p-bianca", "professional", "active", "2026-08-09"),
  rel(SYDNEY_ID, "p-renee", "community-partner", "strong", "2026-08-16"),
  rel(SYDNEY_ID, "p-elena", "community-partner", "active", "2026-08-07"),
  rel(SYDNEY_ID, "p-terrance", "team", "active", "2026-07-28"),
  rel(SYDNEY_ID, "p-isaiah", "team", "active", "2026-07-15"),
  rel(SYDNEY_ID, "p-andre", "brand-partner", "cooling", "2026-05-02"),
  rel(SYDNEY_ID, "p-grant", "professional", "cooling", "2026-05-27"),
  rel(SYDNEY_ID, "p-chris", "professional", "cooling", "2026-05-08"),
  rel(SYDNEY_ID, "p-dana", "team", "cooling", "2026-05-19"),
  rel(SYDNEY_ID, "p-malik", "media", "cooling", "2026-04-29"),
  rel(SYDNEY_ID, "p-kayla", "brand-partner", "cooling", "2026-04-18"),
  rel(SYDNEY_ID, "p-omar", "media", "dormant", "2025-11-11"),
  rel(SYDNEY_ID, "p-naomi", "professional", "dormant", "2025-12-02"),

  /* Second-degree connections — the paths worth knowing about */
  rel("p-marcus", "p-maya", "professional", "strong", "2026-07-02"),
  rel("p-marcus", "p-jordan-lee", "professional", "strong", "2026-08-01"),
  rel("p-marcus", "p-terrance", "team", "strong"),
  rel("p-marcus", "p-chris", "professional", "active"),
  rel("p-marcus", "p-kayla", "professional", "active"),
  rel("p-maya", "p-larry", "brand-partner", "active", "2026-04-21"),
  rel("p-larry", "p-rachel", "community-partner", "strong", "2026-08-13"),
  rel("p-rachel", "p-elena", "community-partner", "strong"),
  rel("p-rachel", "p-dana", "community-partner", "active"),
  rel("p-dakereon", "p-tasha", "media", "active", "2026-07-31"),
  rel("p-dakereon", "p-isaiah", "team", "active", "2026-07-15"),
  rel("p-tasha", "p-omar", "media", "active"),
  rel("p-alaina", "p-renee", "community-partner", "strong", "2026-08-16"),
  rel("p-alaina", "p-harper", "brand-partner", "active", "2026-08-04"),
  rel("p-alexis", "p-harper", "brand-partner", "active", "2026-08-04"),
  rel("p-alexis", "p-priya", "brand-partner", "active", "2026-07-24"),
  rel("p-cameron", "p-devon", "team", "strong", "2026-08-10"),
  rel("p-cameron", "p-victor", "professional", "active"),
  rel("p-jordan-ellis", "p-bianca", "professional", "active", "2026-08-09"),
  rel("p-jordan-ellis", "p-naomi", "professional", "cooling"),
  rel("p-nicole", "p-andre", "professional", "active"),
  rel("p-nicole", "p-bianca", "professional", "active"),
  rel("p-grant", "p-priya", "professional", "active"),
  rel("p-simone", "p-malik", "media", "active"),
  rel("p-tobias", "p-larry", "brand-partner", "active", "2026-08-12"),
  rel("p-victor", "p-alexis", "professional", "active"),

  /* Where people work */
  rel("p-maya", "org-nike", "works-at"),
  rel("p-jordan-lee", "org-gatorade", "works-at"),
  rel("p-kayla", "org-gatorade", "works-at"),
  rel("p-marcus", "org-panthers", "works-at"),
  rel("p-terrance", "org-panthers", "works-at"),
  rel("p-devon", "org-hornets", "works-at"),
  rel("p-dana", "org-charlottefc", "works-at"),
  rel("p-isaiah", "org-gamecocks", "works-at"),
  rel("p-tasha", "org-thestate", "works-at"),
  rel("p-simone", "org-qcsw", "works-at"),
  rel("p-malik", "org-sideline", "works-at"),
  rel("p-omar", "org-carolinadesk", "works-at"),
  rel("p-rachel", "org-rise", "works-at"),
  rel("p-elena", "org-rise", "works-at"),
  rel("p-renee", "org-coatesinit", "works-at"),
  rel("p-nicole", "org-meridian", "works-at"),
  rel("p-grant", "org-whitfield", "works-at"),
  rel("p-andre", "org-adidas", "works-at"),
  rel("p-priya", "org-ua", "works-at"),
  rel("p-harper", "org-lululemon", "works-at"),
  rel("p-tobias", "org-bojangles", "works-at"),
  rel("p-bianca", "org-uptown", "works-at"),
  rel("p-chris", "org-novant", "works-at"),
  rel("p-victor", "org-salinas", "works-at"),
  rel(SYDNEY_ID, "org-asbm", "works-at"),

  /* Relationships that started in a room, not an inbox */
  rel(SYDNEY_ID, "p-yara", "brand-partner", "active", "2026-07-09"),
  rel(SYDNEY_ID, "p-trevor", "brand-partner", "cooling", "2026-06-18"),
  rel(SYDNEY_ID, "p-colin", "team", "dormant", "2026-06-11"),
  rel("p-nicole", "p-trevor", "professional", "active"),
  rel("p-yara", "org-vuori", "works-at"),
  rel("p-trevor", "org-truist", "works-at"),
  rel("p-colin", "org-knights", "works-at"),

  /* The introduction the dashboard surfaces */
  rel(SYDNEY_ID, "p-jordan-lee", "potential-introduction", "dormant"),
];

/** Human-readable label for an edge, used on graph hover and in the drawer. */
export const relationshipLabel: Record<Relationship["type"], string> = {
  client: "Client",
  "brand-partner": "Brand partner",
  "introduced-by": "Introduced by",
  "works-at": "Works at",
  "community-partner": "Community partner",
  media: "Media contact",
  team: "Team connection",
  professional: "Professional relationship",
  "potential-introduction": "Potential introduction",
};
