import { Compass, X } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useDemoState } from "../../state/DemoState";
import { tourSteps } from "../../data/tour";

/**
 * First thing a new viewer sees. It disappears once they either take the tour
 * or wave it away.
 */
export function TourInvite() {
  const { tourDismissed, setTourStep, dismissTourInvite } = useDemoState();
  if (tourDismissed) return null;

  return (
    <aside
      className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-card)] border border-[color:var(--asbm-gold)]/45 bg-gold-light/50 px-5 py-3.5"
      style={{ animation: "asbm-fade-in 260ms ease" }}
    >
      <div className="flex min-w-0 items-start gap-3">
        <Compass size={18} className="mt-0.5 shrink-0 text-charcoal" aria-hidden />
        <div className="min-w-0">
          <p className="text-[13.5px] font-semibold text-ink">
            First time here? Take the walkthrough.
          </p>
          <p className="text-[12.5px] text-charcoal">
            {tourSteps.length} short steps through what this concept could do — about two minutes.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button size="sm" variant="primary" onClick={() => setTourStep(0)}>
          Start the walkthrough
        </Button>
        <button
          type="button"
          onClick={dismissTourInvite}
          aria-label="Dismiss the walkthrough invitation"
          className="rounded-lg p-1.5 text-muted transition-colors duration-200 hover:bg-paper/70 hover:text-ink"
        >
          <X size={15} />
        </button>
      </div>
    </aside>
  );
}
