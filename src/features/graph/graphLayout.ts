import { CATEGORY_SECTOR } from "./graphModel";
import { getPerson, isOrganizationId, relationshipsOf } from "../../data/selectors";
import { SYDNEY_ID } from "../../data/people";
import type { Category } from "../../data/types";

export type Point = { x: number; y: number };

const RING_NEAR = 285;
const RING_FAR = 455;
const ORG_RING = 600;
/** The canvas is far wider than it is tall, so flatten the circle into it. */
const Y_SQUASH = 0.4;

/** Half-extents used for overlap resolution, in layout units. */
const HALF: Record<string, Point> = {
  hub: { x: 112, y: 36 },
  person: { x: 108, y: 30 },
  org: { x: 78, y: 26 },
};

const kindOf = (id: string) =>
  id === SYDNEY_ID ? "hub" : isOrganizationId(id) ? "org" : "person";

const toPoint = (degrees: number, radius: number): Point => {
  const rad = (degrees * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius * Y_SQUASH,
  };
};

/**
 * Seeds a radial arrangement — Sydney at the centre, each category fanned
 * across its own sector, organizations pushed out past the person who anchors
 * them — then separates any overlapping nodes.
 *
 * Equal angular spacing alone crowds badly wherever a sector points straight
 * up or down, so the seed is followed by a fixed number of separation passes.
 * Everything here is deterministic: no force simulation, no randomness, and
 * the same picture every time the demo loads.
 */
export function layoutGraph(personIds: string[], orgIds: string[]): Record<string, Point> {
  const positions: Record<string, Point> = { [SYDNEY_ID]: { x: 0, y: 0 } };

  const byCategory = new Map<Category, string[]>();
  for (const id of personIds) {
    if (id === SYDNEY_ID) continue;
    const person = getPerson(id);
    if (!person) continue;
    const bucket = byCategory.get(person.category) ?? [];
    bucket.push(id);
    byCategory.set(person.category, bucket);
  }

  const angleOf: Record<string, number> = {};

  // Iterate categories in a fixed order so the seed never depends on Map order.
  const categories = [...byCategory.keys()].sort();
  for (const category of categories) {
    const ids = byCategory.get(category)!;
    const [start, end] = CATEGORY_SECTOR[category];
    const span = end - start;
    ids.forEach((id, index) => {
      const t = (index + 0.5) / ids.length;
      const angle = start + span * t;
      angleOf[id] = angle;
      // Alternate rings so a busy sector reads as two arcs rather than one.
      const radius = ids.length > 2 && index % 2 === 1 ? RING_FAR : RING_NEAR;
      positions[id] = toPoint(angle, radius);
    });
  }

  const placedOrgs: string[] = [];
  for (const orgId of orgIds) {
    if (!isOrganizationId(orgId)) continue;
    const anchor = relationshipsOf(orgId)
      .map((r) => (r.sourceId === orgId ? r.targetId : r.sourceId))
      .find((id) => angleOf[id] !== undefined);
    const angle = anchor ? angleOf[anchor] : 300;
    positions[orgId] = toPoint(angle, ORG_RING);
    placedOrgs.push(orgId);
  }

  separate([...personIds, ...placedOrgs], positions);

  // Snap to whole pixels for a stable, crisp render.
  for (const id of Object.keys(positions)) {
    positions[id] = { x: Math.round(positions[id].x), y: Math.round(positions[id].y) };
  }
  return positions;
}

/**
 * Push overlapping nodes apart. Vertical separation is treated as more
 * expensive than horizontal so the network spreads sideways into the wide
 * canvas rather than growing tall.
 */
function separate(ids: string[], positions: Record<string, Point>) {
  const GAP_X = 26;
  const GAP_Y = 14;
  const VERTICAL_COST = 2.8;
  const PASSES = 160;

  const ordered = ids.filter((id) => positions[id]).sort();

  for (let pass = 0; pass < PASSES; pass++) {
    let moved = false;

    for (let i = 0; i < ordered.length; i++) {
      for (let j = i + 1; j < ordered.length; j++) {
        const a = ordered[i];
        const b = ordered[j];
        const ha = HALF[kindOf(a)];
        const hb = HALF[kindOf(b)];

        const minX = ha.x + hb.x + GAP_X;
        const minY = ha.y + hb.y + GAP_Y;

        const dx = positions[b].x - positions[a].x;
        const dy = positions[b].y - positions[a].y;
        const overlapX = minX - Math.abs(dx);
        const overlapY = minY - Math.abs(dy);
        if (overlapX <= 0 || overlapY <= 0) continue;

        moved = true;
        // Resolve along whichever axis is cheaper, biased towards horizontal.
        if (overlapX / VERTICAL_COST <= overlapY) {
          const push = (overlapX / 2) * (dx >= 0 ? 1 : -1) || overlapX / 2;
          nudge(a, positions, -push, 0);
          nudge(b, positions, push, 0);
        } else {
          const push = (overlapY / 2) * (dy >= 0 ? 1 : -1) || overlapY / 2;
          nudge(a, positions, 0, -push);
          nudge(b, positions, 0, push);
        }
      }
    }

    if (!moved) break;
  }
}

function nudge(id: string, positions: Record<string, Point>, dx: number, dy: number) {
  // Sydney stays put — the whole picture is oriented around her.
  if (id === SYDNEY_ID) return;
  positions[id] = { x: positions[id].x + dx, y: positions[id].y + dy };
}
