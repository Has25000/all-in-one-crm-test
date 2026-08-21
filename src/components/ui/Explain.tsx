import * as Popover from "@radix-ui/react-popover";
import { Info } from "lucide-react";

/**
 * A quiet "what is this?" affordance next to a section header.
 *
 * The demo is shown to people who have never seen it, so every major part can
 * explain what it is without the explanation cluttering the interface.
 */
export function Explain({ title, children }: { title: string; children: string }) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-label={`What is ${title}?`}
          className="inline-flex size-[18px] shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-cream hover:text-ink"
        >
          <Info size={13} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="top"
          align="start"
          sideOffset={6}
          collisionPadding={12}
          className="z-[70] w-[300px] rounded-[12px] border border-line bg-paper p-3.5 shadow-[var(--shadow-overlay)] focus:outline-none"
          style={{ animation: "asbm-fade-in 160ms ease" }}
        >
          <p className="text-[12.5px] font-semibold text-ink">{title}</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-charcoal">{children}</p>
          <Popover.Arrow className="fill-[color:var(--asbm-border)]" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
