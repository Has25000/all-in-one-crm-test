import { useEffect, useState } from "react";

type Rect = { top: number; left: number; width: number; height: number };

/**
 * Dims everything except the element being talked about.
 *
 * The hole is cut with a very large spread shadow rather than four separate
 * panels, so it stays a single element that can animate as the target changes.
 */
export function Spotlight({ target }: { target?: string }) {
  const [rect, setRect] = useState<Rect | null>(null);

  useEffect(() => {
    if (!target) {
      setRect(null);
      return;
    }

    let frame = 0;
    const measure = () => {
      const el = document.querySelector<HTMLElement>(`[data-tour="${target}"]`);
      if (!el) {
        setRect(null);
        return;
      }
      const box = el.getBoundingClientRect();
      setRect({
        top: box.top - 8,
        left: box.left - 8,
        width: box.width + 16,
        height: box.height + 16,
      });
    };

    // Give the route a beat to paint, then scroll the target into view.
    const settle = window.setTimeout(() => {
      document
        .querySelector<HTMLElement>(`[data-tour="${target}"]`)
        ?.scrollIntoView({ block: "center", behavior: "smooth" });
      window.setTimeout(measure, 380);
    }, 120);

    const track = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", track, true);
    window.addEventListener("resize", track);
    return () => {
      window.clearTimeout(settle);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", track, true);
      window.removeEventListener("resize", track);
    };
  }, [target]);

  if (!rect) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[45] rounded-[14px] transition-all duration-300"
      style={{
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        boxShadow:
          "0 0 0 9999px color-mix(in srgb, var(--asbm-black) 46%, transparent), 0 0 0 2px var(--asbm-gold)",
      }}
    />
  );
}
