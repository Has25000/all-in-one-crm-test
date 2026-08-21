import type { Task } from "./types";

/**
 * Twelve open follow-ups; four fall due on the demo date.
 */
export const tasks: Task[] = [
  { id: "t-maya", personId: "p-maya", title: "Reach out about Q4 campaigns", dueDate: "2026-08-21", nextStep: "Reconnect" },
  { id: "t-dakereon", personId: "p-dakereon", title: "Confirm lead partner for the Columbia activation", dueDate: "2026-08-21", nextStep: "Confirm partner" },
  { id: "t-rachel", personId: "p-rachel", title: "Send youth programming slots for the fall event", dueDate: "2026-08-21", nextStep: "Send details" },
  { id: "t-victor", personId: "p-victor", title: "Return endorsement terms comments", dueDate: "2026-08-21", nextStep: "Return notes" },
  { id: "t-marcus", personId: "p-marcus", title: "Check in after preseason event", dueDate: "2026-08-22", nextStep: "Check in" },
  { id: "t-tasha", personId: "p-tasha", title: "Send athlete story idea", dueDate: "2026-08-26", nextStep: "Send update" },
  { id: "t-harper", personId: "p-harper", title: "Share Alexis's indoor season calendar", dueDate: "2026-08-27", nextStep: "Share calendar" },
  { id: "t-jordan-lee", personId: "p-jordan-lee", title: "Request intro through Marcus", dueDate: "2026-09-02", nextStep: "Request introduction" },
  { id: "t-andre", personId: "p-andre", title: "Restart the Adidas conversation", dueDate: "2026-09-03", nextStep: "Restart conversation" },
  { id: "t-simone", personId: "p-simone", title: "Send Alaina's media backgrounder", dueDate: "2026-09-04", nextStep: "Send background" },
  { id: "t-chris", personId: "p-chris", title: "Follow up on community wellness partnership", dueDate: "2026-09-08", nextStep: "Follow up" },
  { id: "t-maya-q4", personId: "p-maya", title: "Follow up about Q4 campaigns", dueDate: "2026-08-24", nextStep: "Follow up" },
];

export const tasksFor = (personId: string): Task[] =>
  tasks.filter((t) => t.personId === personId);
