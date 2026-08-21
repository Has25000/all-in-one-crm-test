import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Quote, X } from "lucide-react";
import { Spotlight } from "./Spotlight";
import { Button } from "../../components/ui/Button";
import { useDemoState } from "../../state/DemoState";
import { tourSteps, type TourAction } from "../../data/tour";
import { cn } from "../../components/ui/cn";

/**
 * The walkthrough runs over the live application rather than in a lightbox, so
 * everything stays clickable while it explains itself.
 */
export function GuidedTour() {
  const { tourStep, setTourStep, openDrawer, closeDrawer, openModal, closeModal } =
    useDemoState();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const step = tourStep === null ? undefined : tourSteps[tourStep];

  // Put the app into the state this step is describing.
  useEffect(() => {
    if (!step) return;

    if (pathname !== step.route) navigate(step.route);

    const run = (action?: TourAction) => {
      if (!action) return;
      switch (action.kind) {
        case "open-person":
          closeModal();
          openDrawer(action.personId);
          break;
        case "open-client":
          closeDrawer();
          openModal({ kind: "client", clientId: action.clientId });
          break;
        case "open-opportunity":
          closeDrawer();
          openModal({ kind: "opportunity", opportunityId: action.opportunityId });
          break;
        case "open-capture":
          closeDrawer();
          openModal({ kind: "capture", eventId: action.eventId });
          break;
        case "open-add-contact":
          closeDrawer();
          openModal({ kind: "add-contact" });
          break;
        case "open-share-card":
          closeDrawer();
          openModal({ kind: "share-card" });
          break;
        case "clear":
          closeDrawer();
          closeModal();
          break;
      }
    };

    const timer = window.setTimeout(() => run(step.action), 160);
    return () => window.clearTimeout(timer);
    // Re-running only when the step changes is deliberate: the effect drives
    // navigation, so depending on pathname would fight itself.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourStep]);

  // Keyboard control. This also covers the case where a dialog is open and has
  // trapped focus — the arrow keys still move the walkthrough along.
  useEffect(() => {
    if (tourStep === null) return;
    const onKey = (e: KeyboardEvent) => {
      const typing =
        e.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName);
      if (typing) return;

      if (e.key === "Escape") {
        setTourStep(null);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (tourStep < tourSteps.length - 1) setTourStep(tourStep + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (tourStep > 0) setTourStep(tourStep - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tourStep, setTourStep]);

  if (tourStep === null || !step) return null;

  const isLast = tourStep === tourSteps.length - 1;

  const finish = () => {
    setTourStep(null);
    closeDrawer();
    closeModal();
  };

  return (
    <>
      <Spotlight target={step.target} />

      <aside
        role="dialog"
        aria-label={`Walkthrough step ${tourStep + 1} of ${tourSteps.length}`}
        className="fixed inset-x-0 bottom-0 z-[60] flex justify-center px-4 pb-4"
        // Dialogs put `pointer-events: none` on the body while they are open,
        // which would otherwise leave the walkthrough controls dead on any step
        // that opens a drawer or a modal.
        style={{ animation: "asbm-fade-in 220ms ease", pointerEvents: "auto" }}
      >
        <div className="w-full max-w-[720px] rounded-[16px] border border-line bg-paper shadow-[var(--shadow-overlay)]">
          {/* Progress */}
          <div className="flex items-center gap-1 px-5 pt-3.5">
            {tourSteps.map((s, index) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to step ${index + 1}: ${s.title}`}
                onClick={() => setTourStep(index)}
                className={cn(
                  "h-[3px] flex-1 rounded-full transition-colors duration-200",
                  index <= tourStep ? "bg-gold" : "bg-cream-deep hover:bg-line",
                )}
              />
            ))}
          </div>

          <div className="flex items-start justify-between gap-4 px-5 pt-3">
            <div className="min-w-0">
              <p className="eyebrow">
                Step {tourStep + 1} of {tourSteps.length}
              </p>
              <h2 className="mt-0.5 text-[16px] font-semibold tracking-[-0.01em] text-ink">
                {step.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={finish}
              aria-label="Leave the walkthrough"
              className="shrink-0 rounded-lg p-1.5 text-muted transition-colors duration-200 hover:bg-cream hover:text-ink"
            >
              <X size={15} />
            </button>
          </div>

          <p className="px-5 pt-1.5 text-[13.5px] leading-relaxed text-charcoal">{step.body}</p>

          {step.say && (
            <p className="mx-5 mt-3 flex gap-2 rounded-[10px] border-l-2 border-[color:var(--asbm-gold)] bg-cream/70 px-3 py-2 text-[12.5px] leading-relaxed text-charcoal italic">
              <Quote size={13} className="mt-0.5 shrink-0 text-muted" aria-hidden />
              {step.say}
            </p>
          )}

          <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-line px-5 py-3">
            <button
              type="button"
              onClick={finish}
              className="text-[12.5px] text-muted transition-colors duration-200 hover:text-ink"
            >
              Skip the tour
            </button>
            <span className="hidden text-[11.5px] text-muted sm:inline">
              Arrow keys work too
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                disabled={tourStep === 0}
                onClick={() => setTourStep(tourStep - 1)}
              >
                <ArrowLeft size={14} aria-hidden />
                Back
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() => (isLast ? finish() : setTourStep(tourStep + 1))}
              >
                {isLast ? "Finish" : "Next"}
                {!isLast && <ArrowRight size={14} aria-hidden />}
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
