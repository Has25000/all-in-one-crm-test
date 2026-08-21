import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

/**
 * The right-hand relationship drawer. Radix handles focus trapping and escape
 * so keyboard users get the same behaviour as the mouse path.
 */
export function Drawer({
  open,
  onOpenChange,
  title,
  children,
  footer,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-40 bg-[color:var(--asbm-black)]/25"
          style={{ animation: "asbm-overlay-in 200ms ease" }}
        />
        <Dialog.Content
          className="fixed top-0 right-0 z-50 flex h-dvh w-[min(420px,100vw)] flex-col border-l border-line bg-paper shadow-[var(--shadow-overlay)] focus:outline-none"
          style={{ animation: "asbm-slide-in 240ms cubic-bezier(0.2, 0.8, 0.3, 1)" }}
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <Dialog.Close
            aria-label="Close relationship"
            className="absolute top-4 right-4 z-10 rounded-lg bg-paper/80 p-1.5 text-muted backdrop-blur transition-colors duration-200 hover:bg-cream hover:text-ink"
          >
            <X size={16} />
          </Dialog.Close>
          <div className="scroll-slim flex-1 overflow-y-auto">{children}</div>
          {footer && <div className="border-t border-line bg-cream/60 px-5 py-3.5">{footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
