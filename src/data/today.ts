/**
 * The demo runs on a pinned clock.
 *
 * Every relative phrase in the interface ("74 days ago", "due today",
 * "tomorrow") is derived from this date, so the walkthrough reads identically
 * whenever it is opened. Friday 21 August 2026 is chosen deliberately: it sits
 * exactly 74 days after Maya Thompson's last interaction on 8 June.
 */
export const DEMO_TODAY = new Date(2026, 7, 21, 8, 30, 0);

export const DEMO_TODAY_ISO = "2026-08-21";
