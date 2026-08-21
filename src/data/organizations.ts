import type { Organization } from "./types";

export const organizations: Organization[] = [
  { id: "org-asbm", name: "Anderson Sports and Brand Management", kind: "agency", location: "Charlotte, NC", context: "Sydney's practice — athlete marketing, PR, brand and business development." },
  { id: "org-nike", name: "Nike", kind: "brand", location: "Beaverton, OR", context: "Athlete partnership conversations tied to fall campaign planning." },
  { id: "org-gatorade", name: "Gatorade", kind: "brand", location: "Chicago, IL", context: "Introduction pending through Marcus Reed." },
  { id: "org-adidas", name: "Adidas", kind: "brand", location: "Portland, OR", context: "Early brand strategy conversations." },
  { id: "org-ua", name: "Under Armour", kind: "brand", location: "Baltimore, MD", context: "Talent marketing contact from the Charlotte combine circuit." },
  { id: "org-lululemon", name: "Lululemon", kind: "brand", location: "Vancouver, BC", context: "Athlete relations contact interested in track and field." },
  { id: "org-bojangles", name: "Bojangles", kind: "brand", location: "Charlotte, NC", context: "Regional brand marketing — strong local activation fit." },
  { id: "org-panthers", name: "Carolina Panthers", kind: "team", location: "Charlotte, NC", context: "Team partnerships and community relations contacts." },
  { id: "org-hornets", name: "Charlotte Hornets", kind: "team", location: "Charlotte, NC", context: "Player engagement relationship." },
  { id: "org-charlottefc", name: "Charlotte FC", kind: "team", location: "Charlotte, NC", context: "Community relations collaboration." },
  { id: "org-gamecocks", name: "South Carolina Athletics", kind: "team", location: "Columbia, SC", context: "Player development relationship supporting Dakereon." },
  { id: "org-thestate", name: "The State", kind: "media", location: "Columbia, SC", context: "Sports partnerships desk — community-oriented athlete stories." },
  { id: "org-qcsw", name: "Queen City Sports Weekly", kind: "media", location: "Charlotte, NC", context: "Features coverage of Charlotte-area athletes." },
  { id: "org-sideline", name: "The Sideline Report", kind: "media", location: "Charlotte, NC", context: "Regional sports podcast." },
  { id: "org-carolinadesk", name: "Carolina Sports Desk", kind: "media", location: "Raleigh, NC", context: "Statewide sports coverage." },
  { id: "org-whitfield", name: "Whitfield Sports Agency", kind: "agency", location: "Atlanta, GA", context: "Representation partner on shared athlete work." },
  { id: "org-meridian", name: "Meridian Sports Marketing", kind: "agency", location: "Charlotte, NC", context: "Agency partner on brand-side activations." },
  { id: "org-rise", name: "Rise Charlotte Youth Foundation", kind: "community", location: "Charlotte, NC", context: "Youth programming partner for community initiatives." },
  { id: "org-coatesinit", name: "Coates Family Initiative", kind: "community", location: "Columbia, SC", context: "Alaina's community foundation work." },
  { id: "org-uptown", name: "Uptown Event Collective", kind: "professional", location: "Charlotte, NC", context: "Event production partner." },
  { id: "org-novant", name: "Novant Health Sports Medicine", kind: "professional", location: "Charlotte, NC", context: "Athlete health and community wellness partner." },
  { id: "org-salinas", name: "Salinas & Pike", kind: "professional", location: "Charlotte, NC", context: "Outside counsel for endorsement agreements." },
  { id: "org-qca", name: "Queen City Athletic", kind: "brand", location: "Charlotte, NC", context: "Brand client — regional apparel label." },
  { id: "org-kinetics", name: "Carolina Kinetics", kind: "brand", location: "Charlotte, NC", context: "Brand client — performance training studio." },
];

export const organizationById = new Map(organizations.map((o) => [o.id, o]));
