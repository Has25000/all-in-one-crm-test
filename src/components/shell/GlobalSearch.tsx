import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { searchEverything } from "../../data/selectors";
import { useDemoState } from "../../state/DemoState";
import { Avatar } from "../ui/Avatar";

/**
 * One search field over people, organizations, documents and opportunities —
 * so nothing depends on remembering where it was filed.
 */
export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openDrawer } = useDemoState();
  const navigate = useNavigate();

  const results = searchEverything(query);
  const showPanel = open && query.trim().length > 0;

  useEffect(() => {
    if (!showPanel) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [showPanel]);

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  const Group = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="border-b border-line py-2 last:border-b-0">
      <div className="eyebrow px-3.5 pb-1">{label}</div>
      {children}
    </div>
  );

  return (
    <div ref={containerRef} className="relative w-full max-w-[300px] xl:max-w-[340px]">
      <Search
        size={15}
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
      />
      <input
        type="search"
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onKeyDown={(e) => e.key === "Escape" && close()}
        placeholder="Search people, clients, brands..."
        aria-label="Search people, clients, brands"
        className="h-9.5 w-full rounded-[10px] border border-line bg-paper pr-3 pl-9 text-[13px] text-ink transition-colors duration-200 placeholder:text-muted focus:border-[color:var(--asbm-gold)] focus:outline-none"
      />

      {showPanel && (
        <div
          className="scroll-slim absolute top-[calc(100%+6px)] right-0 z-50 max-h-[420px] w-[380px] overflow-y-auto rounded-[12px] border border-line bg-paper shadow-[var(--shadow-overlay)]"
          style={{ animation: "asbm-fade-in 160ms ease" }}
        >
          {results.isEmpty ? (
            <p className="px-3.5 py-4 text-[13px] text-muted">
              Nothing matches “{query}”. Try a person, brand, or document name.
            </p>
          ) : (
            <>
              {results.people.length > 0 && (
                <Group label="People">
                  {results.people.map((person) => (
                    <button
                      key={person.id}
                      type="button"
                      onClick={() => {
                        openDrawer(person.id);
                        close();
                      }}
                      className="flex w-full items-center gap-3 px-3.5 py-2 text-left transition-colors duration-200 hover:bg-cream"
                    >
                      <Avatar name={person.name} category={person.category} size="sm" />
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-medium text-ink">
                          {person.name}
                        </span>
                        <span className="block truncate text-[12px] text-muted">
                          {person.title}
                          {person.organization ? ` · ${person.organization}` : ""}
                        </span>
                      </span>
                    </button>
                  ))}
                </Group>
              )}

              {results.organizations.length > 0 && (
                <Group label="Organizations">
                  {results.organizations.map((org) => (
                    <button
                      key={org.id}
                      type="button"
                      onClick={() => {
                        navigate("/network");
                        close();
                      }}
                      className="block w-full px-3.5 py-2 text-left transition-colors duration-200 hover:bg-cream"
                    >
                      <span className="block text-[13px] font-medium text-ink">{org.name}</span>
                      {org.context && (
                        <span className="block truncate text-[12px] text-muted">{org.context}</span>
                      )}
                    </button>
                  ))}
                </Group>
              )}

              {results.documents.length > 0 && (
                <Group label="Documents">
                  {results.documents.map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => {
                        navigate(`/documents?doc=${doc.id}`);
                        close();
                      }}
                      className="block w-full px-3.5 py-2 text-left transition-colors duration-200 hover:bg-cream"
                    >
                      <span className="block text-[13px] font-medium text-ink">{doc.title}</span>
                      <span className="block text-[12px] text-muted">{doc.type}</span>
                    </button>
                  ))}
                </Group>
              )}

              {results.opportunities.length > 0 && (
                <Group label="Opportunities">
                  {results.opportunities.map((opp) => (
                    <button
                      key={opp.id}
                      type="button"
                      onClick={() => {
                        navigate("/");
                        close();
                      }}
                      className="block w-full px-3.5 py-2 text-left transition-colors duration-200 hover:bg-cream"
                    >
                      <span className="block text-[13px] font-medium text-ink">{opp.title}</span>
                      <span className="block text-[12px] text-muted">{opp.organization}</span>
                    </button>
                  ))}
                </Group>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
