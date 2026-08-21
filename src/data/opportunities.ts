import type { Opportunity } from "./types";

/**
 * Seven active opportunities. Values are indicative demo figures — the product
 * is about the relationship, not the number.
 */
export const opportunities: Opportunity[] = [
  {
    id: "o-fall-campaign",
    title: "Fall Athlete Campaign",
    organization: "Nike",
    clientIds: ["c-larry"],
    contactIds: ["p-maya"],
    stage: "conversation",
    kind: "Brand partnership",
    nextAction: "Reconnect with Maya",
    potentialValue: 60000,
  },
  {
    id: "o-community-partnership",
    title: "Community Partnership",
    organization: "Rise Charlotte Youth Foundation",
    clientIds: ["c-dakereon"],
    contactIds: ["p-rachel", "p-elena"],
    stage: "planning",
    kind: "Community initiative",
    nextAction: "Finalize event partner",
    potentialValue: 15000,
  },
  {
    id: "o-media-feature",
    title: "Media Feature",
    organization: "Queen City Sports Weekly",
    clientIds: ["c-alaina"],
    contactIds: ["p-simone"],
    stage: "introduction",
    kind: "Earned media",
    nextAction: "Send background",
  },
  {
    id: "o-indoor-apparel",
    title: "Indoor Season Apparel",
    organization: "Lululemon",
    clientIds: ["c-alexis"],
    contactIds: ["p-harper"],
    stage: "conversation",
    kind: "Endorsement",
    nextAction: "Share season calendar",
    potentialValue: 45000,
  },
  {
    id: "o-regional-activation",
    title: "Regional Activation",
    organization: "Bojangles",
    clientIds: ["c-larry", "c-dakereon"],
    contactIds: ["p-tobias"],
    stage: "active",
    kind: "Brand activation",
    nextAction: "Confirm appearance dates",
    potentialValue: 35000,
  },
  {
    id: "o-hydration-intro",
    title: "Hydration Partner Introduction",
    organization: "Gatorade",
    clientIds: ["c-cameron"],
    contactIds: ["p-jordan-lee", "p-marcus"],
    stage: "identified",
    kind: "Brand partnership",
    nextAction: "Request intro through Marcus",
    potentialValue: 30000,
  },
  {
    id: "o-ambassador-program",
    title: "Ambassador Program",
    organization: "Carolina Kinetics",
    clientIds: ["c-kinetics"],
    contactIds: ["p-chris", "p-elena"],
    stage: "planning",
    kind: "Client programme",
    nextAction: "Draft ambassador criteria",
  },
];

export const stageLabel: Record<Opportunity["stage"], string> = {
  identified: "Identified",
  introduction: "Introduction",
  conversation: "Conversation",
  planning: "Planning",
  active: "Active",
  complete: "Complete",
};
