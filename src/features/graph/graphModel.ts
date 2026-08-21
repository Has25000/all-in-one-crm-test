import type { Category } from "../../data/types";
import { SYDNEY_ID } from "../../data/people";

/**
 * Which people and organizations appear in each view of the graph.
 *
 * The dashboard shows a curated core so the picture reads at a glance; the
 * Network page shows the whole seeded network.
 */

export const CORE_PERSON_IDS = [
  SYDNEY_ID,
  "p-larry",
  "p-alaina",
  "p-dakereon",
  "p-cameron",
  "p-alexis",
  "p-jordan-ellis",
  "p-maya",
  "p-marcus",
  "p-jordan-lee",
  "p-tasha",
  "p-rachel",
  "p-tobias",
  "p-harper",
  "p-devon",
  "p-simone",
  "p-renee",
];

export const CORE_ORG_IDS = [
  "org-nike",
  "org-gatorade",
  "org-panthers",
  "org-thestate",
  "org-rise",
];

export const FULL_PERSON_IDS = [
  SYDNEY_ID,
  "p-larry",
  "p-alaina",
  "p-dakereon",
  "p-cameron",
  "p-alexis",
  "p-jordan-ellis",
  "p-maya",
  "p-jordan-lee",
  "p-harper",
  "p-priya",
  "p-andre",
  "p-tobias",
  "p-kayla",
  "p-marcus",
  "p-terrance",
  "p-devon",
  "p-isaiah",
  "p-dana",
  "p-tasha",
  "p-simone",
  "p-malik",
  "p-omar",
  "p-rachel",
  "p-elena",
  "p-renee",
  "p-nicole",
  "p-grant",
  "p-bianca",
  "p-chris",
  "p-victor",
  "p-naomi",
  "p-yara",
  "p-trevor",
  "p-colin",
];

export const FULL_ORG_IDS = [
  "org-nike",
  "org-gatorade",
  "org-panthers",
  "org-thestate",
  "org-rise",
  "org-lululemon",
  "org-bojangles",
];

/** Sector each category occupies, in screen degrees (0 = east, 90 = south). */
export const CATEGORY_SECTOR: Record<Category, [number, number]> = {
  client: [138, 222],
  community: [92, 132],
  media: [52, 88],
  team: [8, 48],
  brand: [280, 352],
  professional: [226, 258],
  agency: [262, 276],
};
