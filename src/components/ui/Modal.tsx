import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "./cn";

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  width = "560px",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-[color:var(--asbm-black)]/35 backdrop-blur-[1px]"
          style={{ animation: "asbm-overlay-in 200ms ease" }}
        />
        <Dialog.Content
          aria-describedby={description ? undefined : undefined}
          className={cn(
            "scroll-slim fixed top-1/2 left-1/2 z-50 max-h-[86vh] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto",
            "rounded-[16px] border border-line bg-paper shadow-[var(--shadow-overlay)] focus:outline-none",
          )}
          style={{ maxWidth: width, animation: "asbm-pop-in 220ms cubic-bezier(0.2, 0.8, 0.3, 1)" }}
        >
          <header className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
            <div>
              <Dialog.Title className="text-[18px] font-semibold tracking-[-0.01em] text-ink">
                {title}
              </Dialog.Title>
              {description && (
                <Dialog.Description className="mt-1 text-[13px] text-muted">
                  {description}
                </Dialog.Description>
              )}
            </div>
            <Dialog.Close
              aria-label="Close"
              className="rounded-lg p-1.5 text-muted transition-colors duration-200 hover:bg-cream hover:text-ink"
            >
              <X size={16} />
            </Dialog.Close>
          </header>

          <div className="px-6 py-5">{children}</div>

          {footer && <footer className="border-t border-line px-6 py-4">{footer}</footer>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
