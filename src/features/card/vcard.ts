import { cardVariants, myCard, type CardFieldId } from "../../data/card";

/** Fields visible on a given variant, with any per-field overrides applied. */
export const visibleFields = (
  variantId: string,
  overrides: Record<string, boolean>,
): CardFieldId[] => {
  const variant = cardVariants.find((v) => v.id === variantId) ?? cardVariants[0];
  return variant.fields.filter((field) => overrides[field] !== false);
};

/**
 * A real vCard, built from whatever the chosen card actually shows.
 *
 * This is the one thing on these screens that genuinely works — paste it into
 * a .vcf file and any phone will import it.
 */
export function buildVCard(fields: CardFieldId[]) {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${myCard.name}`,
    "N:Anderson;Sydney;;;",
    `TITLE:${myCard.title}`,
  ];

  if (fields.includes("organization")) lines.push(`ORG:${myCard.organization}`);
  if (fields.includes("email")) lines.push(`EMAIL;TYPE=WORK:${myCard.email}`);
  if (fields.includes("website")) lines.push(`URL:${myCard.website}`);
  if (fields.includes("booking")) lines.push(`URL;TYPE=booking:${myCard.bookingLink}`);
  if (fields.includes("location")) lines.push(`ADR;TYPE=WORK:;;;${myCard.location};;;`);
  if (fields.includes("focus")) lines.push(`CATEGORIES:${myCard.focus.join(",")}`);

  lines.push("NOTE:Concept demo contact card — sample details only.");
  lines.push("END:VCARD");
  return lines.join("\n");
}

/** A signature block that can be pasted straight into a mail client. */
export function buildSignature(fields: CardFieldId[]) {
  const rows = [`${myCard.name} — ${myCard.title}`];
  if (fields.includes("organization")) rows.push(myCard.organization);
  if (fields.includes("email")) rows.push(myCard.email);
  if (fields.includes("phone")) rows.push(myCard.phone);
  if (fields.includes("booking")) rows.push(`Book time: ${myCard.bookingLink}`);
  if (fields.includes("website")) rows.push(myCard.website);
  return rows.join("\n");
}
