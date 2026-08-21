import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FileSpreadsheet, FileText, Presentation } from "lucide-react";
import { Card, PageHeader, SectionHeader } from "../components/ui/Card";
import { Chip } from "../components/ui/Chip";
import { Avatar } from "../components/ui/Avatar";
import { Table, Td, Th, Tr } from "../components/ui/Table";
import { ConnectedSources } from "../components/shell/ConnectedSources";
import { useDemoState } from "../state/DemoState";
import { cn } from "../components/ui/cn";
import {
  documents,
  formatDate,
  getClient,
  getOrganization,
  getPerson,
} from "../data/selectors";
import type { DemoDocument } from "../data/types";

const fileIcon = (kind: DemoDocument["fileKind"]) =>
  kind === "xlsx" ? FileSpreadsheet : kind === "deck" ? Presentation : FileText;

/**
 * Files don't live in folders here — they hang off the people and work they
 * belong to, which is what the chain below is showing.
 */
function ConnectionChain({ document: doc }: { document: DemoDocument }) {
  const { openDrawer, openModal } = useDemoState();

  const clients = doc.relatedClientIds.map(getClient).filter(Boolean);
  const people = doc.relatedPersonIds.map(getPerson).filter(Boolean);
  const orgs = doc.relatedOrganizationIds.map(getOrganization).filter(Boolean);

  const hops: { key: string; label: string; sub: string; onClick?: () => void }[] = [
    { key: "doc", label: doc.title, sub: doc.type },
    ...clients.map((client) => ({
      key: client!.id,
      label: client!.name,
      sub: "Client",
      onClick: () => openModal({ kind: "client", clientId: client!.id }),
    })),
    ...people
      .filter((person) => !clients.some((c) => c!.personId === person!.id))
      .map((person) => ({
        key: person!.id,
        label: person!.name,
        sub: person!.title,
        onClick: () => openDrawer(person!.id),
      })),
    ...orgs.map((org) => ({ key: org!.id, label: org!.name, sub: "Organization" })),
  ];

  return (
    <ol className="space-y-0">
      {hops.map((hop, index) => (
        <li key={hop.key}>
          {index > 0 && (
            <div aria-hidden className="ml-[13px] h-4 w-px bg-[color:var(--asbm-gold)]/45" />
          )}
          <div
            className={cn(
              "flex items-center gap-2.5 rounded-[10px] border px-3 py-2",
              index === 0
                ? "border-[color:var(--asbm-gold)]/45 bg-gold-light"
                : "border-line bg-paper",
            )}
          >
            <span
              aria-hidden
              className="size-[7px] shrink-0 rounded-full"
              style={{
                background: index === 0 ? "var(--asbm-gold)" : "var(--asbm-charcoal)",
              }}
            />
            <span className="min-w-0 flex-1">
              {hop.onClick ? (
                <button
                  type="button"
                  onClick={hop.onClick}
                  className="block max-w-full truncate text-left text-[13px] font-medium text-ink underline decoration-[color:var(--asbm-gold)] decoration-2 underline-offset-4"
                >
                  {hop.label}
                </button>
              ) : (
                <span className="block truncate text-[13px] font-medium text-ink">{hop.label}</span>
              )}
              <span className="block truncate text-[11.5px] text-muted">{hop.sub}</span>
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function DocumentsPage() {
  const [params, setParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState<string>(documents[0].id);

  // The global search can deep-link straight to a document.
  useEffect(() => {
    const fromQuery = params.get("doc");
    if (fromQuery && documents.some((d) => d.id === fromQuery)) {
      setSelectedId(fromQuery);
      params.delete("doc");
      setParams(params, { replace: true });
    }
  }, [params, setParams]);

  const selected = documents.find((d) => d.id === selectedId) ?? documents[0];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Documents"
        meta={<span className="text-[14px] text-muted">{documents.length} files</span>}
        subtitle="Every important file connected to the people and clients it belongs to."
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,2.35fr)_minmax(0,1fr)]">
        <Card>
          <Table minWidth={690}>
            <thead>
              <tr>
                <Th>Document</Th>
                <Th>Related To</Th>
                <Th>Type</Th>
                <Th>Updated</Th>
                <Th>Owner</Th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => {
                const Icon = fileIcon(doc.fileKind);
                const relatedNames = [
                  ...doc.relatedClientIds.map((id) => getClient(id)?.name),
                  ...doc.relatedPersonIds
                    .filter((id) => !doc.relatedClientIds.some((c) => getClient(c)?.personId === id))
                    .map((id) => getPerson(id)?.name),
                ].filter(Boolean);

                return (
                  <Tr
                    key={doc.id}
                    onClick={() => setSelectedId(doc.id)}
                    ariaLabel={`Show connections for ${doc.title}`}
                    className={cn(doc.id === selected.id && "bg-cream")}
                  >
                    <Td>
                      <span className="flex items-center gap-2.5">
                        <Icon size={16} className="shrink-0 text-muted" aria-hidden />
                        <span className="font-medium text-ink">{doc.title}</span>
                      </span>
                    </Td>
                    <Td className="text-charcoal">{relatedNames.join(" + ")}</Td>
                    <Td>
                      <Chip tone="warm">{doc.type}</Chip>
                    </Td>
                    <Td className="whitespace-nowrap text-muted tabular-nums">{formatDate(doc.updatedAt)}</Td>
                    <Td className="text-muted">{doc.owner}</Td>
                  </Tr>
                );
              })}
            </tbody>
          </Table>
        </Card>

        <div className="space-y-5">
          <Card>
            <SectionHeader
              title="Connected to"
              subtitle="Where this file sits in your network."
            />
            <div className="mt-4">
              <ConnectionChain document={selected} />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4">
              <span className="text-[11.5px] text-muted">People on this file</span>
              {selected.relatedPersonIds.map((id) => {
                const person = getPerson(id);
                return person ? (
                  <Avatar key={id} name={person.name} category={person.category} size="xs" />
                ) : null;
              })}
            </div>
          </Card>

          <ConnectedSources />
        </div>
      </div>
    </div>
  );
}
