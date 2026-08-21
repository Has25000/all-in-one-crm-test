import { layoutGraph } from "../src/features/graph/graphLayout";
import {
  CORE_PERSON_IDS,
  CORE_ORG_IDS,
  FULL_PERSON_IDS,
  FULL_ORG_IDS,
} from "../src/features/graph/graphModel";

const report = (name: string, people: string[], orgs: string[]) => {
  const pos = layoutGraph(people, orgs);
  const xs = Object.values(pos).map((p) => p.x);
  const ys = Object.values(pos).map((p) => p.y);
  const w = Math.max(...xs) - Math.min(...xs) + 190;
  const h = Math.max(...ys) - Math.min(...ys) + 62;
  console.log(
    name,
    "count", Object.keys(pos).length,
    "extent", Math.round(w), "x", Math.round(h),
    "| scale in 1200x460 =", Math.min(1200 / w, 460 / h).toFixed(2),
  );
};

report("core", CORE_PERSON_IDS, CORE_ORG_IDS);
report("full", FULL_PERSON_IDS, FULL_ORG_IDS);
