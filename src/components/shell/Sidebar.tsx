import { NavLink } from "react-router-dom";
import {
  CalendarDays,
  Columns3,
  FolderOpen,
  Home,
  MapPin,
  Send,
  Share2,
  Users,
} from "lucide-react";
import { cn } from "../ui/cn";

const navigation = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/network", label: "Network", icon: Share2 },
  { to: "/clients", label: "Clients", icon: Users },
  { to: "/opportunities", label: "Opportunities", icon: Columns3 },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/events", label: "Events", icon: MapPin },
  { to: "/outreach", label: "Outreach", icon: Send },
  { to: "/documents", label: "Documents", icon: FolderOpen },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav
      aria-label="Primary"
      className="flex h-full w-[232px] shrink-0 flex-col border-r border-line bg-paper"
    >
      <div className="px-6 pt-6 pb-7">
        {/* Textual mark only — no official ASBM logo asset has been supplied. */}
        <div className="text-[19px] font-semibold tracking-[0.16em] text-ink">ASBM</div>
        <div className="mt-1 text-[11.5px] tracking-[0.02em] text-muted">Relationship Hub</div>
      </div>

      <ul className="flex flex-1 flex-col gap-0.5 px-3">
        {navigation.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "relative flex items-center gap-3 rounded-[10px] px-3 py-2 text-[13.5px] font-medium transition-colors duration-200",
                  isActive
                    ? "bg-cream text-ink"
                    : "text-muted hover:bg-cream/70 hover:text-charcoal",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute top-1.5 bottom-1.5 left-0 w-[3px] rounded-full bg-gold"
                    />
                  )}
                  <Icon size={17} strokeWidth={1.8} aria-hidden />
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="px-3 pb-2">
        <NavLink
          to="/card"
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2.5 rounded-[10px] border px-2.5 py-2 transition-colors duration-200",
              isActive
                ? "border-[color:var(--asbm-gold)] bg-gold-light"
                : "border-line bg-cream/60 hover:bg-cream",
            )
          }
        >
          <span
            aria-hidden
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-forest text-[11px] font-semibold text-white"
          >
            SA
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[12.5px] font-medium text-ink">
              Sydney Anderson
            </span>
            <span className="block truncate text-[11px] text-muted">Your card</span>
          </span>
        </NavLink>
      </div>

      <div className="px-6 pb-5">
        <div className="eyebrow">Powered by</div>
        <div className="mt-1 text-[13px] font-medium text-charcoal">Trybl</div>
      </div>
    </nav>
  );
}
