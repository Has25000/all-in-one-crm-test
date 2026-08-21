import { Menu, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/Button";
import { GlobalSearch } from "./GlobalSearch";
import { useDemoState } from "../../state/DemoState";

const greetings: Record<string, { title: string; subtitle: string }> = {
  "/": {
    title: "Good morning, Sydney",
    subtitle: "Here's what needs your attention across your network today.",
  },
};

export function TopBar({ onOpenNav }: { onOpenNav: () => void }) {
  const { pathname } = useLocation();
  const { openModal } = useDemoState();
  const greeting = greetings[pathname];

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-cream/85 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onOpenNav}
            aria-label="Open navigation"
            className="rounded-lg border border-line bg-paper p-2 text-charcoal lg:hidden"
          >
            <Menu size={16} />
          </button>
          {greeting ? (
            <div className="min-w-0">
              <h1 className="truncate text-[22px] font-semibold tracking-[-0.02em] text-ink">
                {greeting.title}
              </h1>
              <p className="truncate text-[13px] text-muted">{greeting.subtitle}</p>
            </div>
          ) : (
            <div className="h-9" />
          )}
        </div>

        <div className="flex items-center gap-3">
          <GlobalSearch />
          <Button
            variant="primary"
            aria-label="Add Contact"
            onClick={() => openModal({ kind: "add-contact" })}
            className="px-3 sm:px-4"
          >
            <Plus size={15} aria-hidden />
            <span className="hidden sm:inline">Add Contact</span>
          </Button>
          <Link
            to="/card"
            aria-label="Your contact card"
            title="Your card — Sydney Anderson"
            className="flex size-9.5 shrink-0 items-center justify-center rounded-full bg-forest text-[12.5px] font-semibold text-white transition-shadow duration-200 hover:shadow-[0_0_0_3px_var(--asbm-gold-light)]"
          >
            SA
          </Link>
        </div>
      </div>
    </header>
  );
}
