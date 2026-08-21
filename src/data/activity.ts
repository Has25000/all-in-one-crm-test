import type { ActivityEntry, SuggestedPath } from "./types";

/** The dashboard's recent-activity timeline, newest first. */
export const recentActivity: ActivityEntry[] = [
  { id: "a-1", timestamp: "2026-08-21T10:32:00", label: "10:32 AM", detail: "Added note to Maya Thompson", personId: "p-maya", kind: "note" },
  { id: "a-2", timestamp: "2026-08-20T09:30:00", label: "Yesterday", detail: "Meeting completed with Dakereon Joyner", personId: "p-dakereon", kind: "meeting" },
  { id: "a-3", timestamp: "2026-08-20T08:05:00", label: "Yesterday", detail: "Community Initiative Brief uploaded", kind: "document" },
  { id: "a-4", timestamp: "2026-08-17T16:20:00", label: "Monday", detail: "New relationship added: Jordan Lee", personId: "p-jordan-lee", kind: "relationship" },
  { id: "a-5", timestamp: "2026-08-17T11:10:00", label: "Monday", detail: "Follow-up completed with Marcus Reed", personId: "p-marcus", kind: "follow-up" },
];

/** Second-degree paths worth acting on, shown as Suggested Connections. */
export const suggestedPaths: SuggestedPath[] = [
  {
    id: "sp-tasha",
    chain: ["Dakereon Joyner", "Sydney", "Tasha Green", "Media Opportunity"],
    reason: "Tasha has previously worked around community-oriented sports stories.",
    outcome: "Media Opportunity",
  },
  {
    id: "sp-maya",
    chain: ["Larry Ogunjobi", "Sydney", "Maya Thompson", "Nike"],
    reason: "Strong relationship path with a relevant brand contact.",
    outcome: "Nike",
  },
  {
    id: "sp-jordan",
    chain: ["Cameron Brooks", "Sydney", "Marcus Reed", "Jordan Lee"],
    reason: "Marcus has offered to make the introduction at Gatorade.",
    outcome: "Gatorade",
  },
];

/**
 * Headline counts shown on the dashboard.
 *
 * These describe a network larger than the sample roster loaded into the
 * prototype — they stand in for the full contact history a real account would
 * carry.
 */
export const networkStats = {
  totalRelationships: 486,
  addedThisMonth: 14,
  clients: 8,
  clientBreakdown: "6 athletes · 2 brands",
  followUps: 12,
  dueToday: 4,
  activeOpportunities: 7,
  potentialLabel: "$185K potential",
  health: [
    { key: "strong", label: "Strong", value: 92 },
    { key: "active", label: "Active", value: 174 },
    { key: "cooling", label: "Cooling", value: 83 },
    { key: "dormant", label: "Dormant", value: 137 },
  ],
  neglected: 18,
  categories: [
    { label: "Athletes", value: 96 },
    { label: "Brands", value: 88 },
    { label: "Teams", value: 71 },
    { label: "Media", value: 63 },
    { label: "Agencies", value: 42 },
    { label: "Community", value: 79 },
    { label: "Other", value: 47 },
  ],
};

/** The four-line summary at the top of the dashboard. */
export const dailyBrief = {
  meetings: 3,
  followUps: 4,
  cooling: 2,
  introductions: 1,
  priority:
    "Reconnect with Maya before your Nike-related opportunity moves forward.",
};

export const connectedSources = ["LinkedIn", "Gmail", "Google Calendar", "Google Drive", "Contacts"];
