import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Copy, ExternalLink, Share2, UserPlus } from "lucide-react";
import { Card, PageHeader, SectionHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";
import { Toggle } from "../components/ui/Toggle";
import { Avatar } from "../components/ui/Avatar";
import { CardCode } from "../components/ui/CardCode";
import { CardPreview } from "../features/card/CardPreview";
import { visibleFields } from "../features/card/vcard";
import { useDemoState } from "../state/DemoState";
import {
  cardFields,
  cardShares,
  cardStats,
  cardVariants,
  myCard,
  shareMethodLabel,
} from "../data/card";
import { formatDate } from "../data/selectors";
import { cn } from "../components/ui/cn";

export function CardPage() {
  const {
    cardVariantId,
    cardFieldOverrides,
    setCardVariant,
    toggleCardField,
    openModal,
    openDrawer,
    sessionShares,
  } = useDemoState();
  const [copied, setCopied] = useState(false);

  const variant = cardVariants.find((v) => v.id === cardVariantId) ?? cardVariants[0];
  const fields = visibleFields(cardVariantId, cardFieldOverrides);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Your card"
        subtitle="Relationship management runs both ways. This is what you hand out, who has it, and what they did with it."
        action={
          <Button variant="primary" onClick={() => openModal({ kind: "share-card" })}>
            <Share2 size={15} aria-hidden />
            Share it
          </Button>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* The card */}
        <div className="min-w-0 space-y-5">
          <Card>
            <SectionHeader
              title="How it looks"
              subtitle={`${variant.name} · ${variant.audience}`}
            />
            <div className="mt-4">
              <CardPreview fields={fields} />
            </div>
            <p className="mt-3 text-[12.5px] text-muted">{variant.note}</p>
          </Card>

          <Card>
            <SectionHeader
              title="Who you're handing it to"
              subtitle="A brand contact and a reporter don't need the same six lines."
            />
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {cardVariants.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setCardVariant(option.id)}
                  aria-pressed={option.id === cardVariantId}
                  className={cn(
                    "rounded-[11px] border px-3.5 py-3 text-left transition-colors duration-200",
                    option.id === cardVariantId
                      ? "border-[color:var(--asbm-gold)] bg-gold-light"
                      : "border-line bg-paper hover:bg-cream",
                  )}
                >
                  <span className="block text-[13px] font-semibold text-ink">{option.name}</span>
                  <span className="block text-[11.5px] text-muted">{option.audience}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeader
              title="What's on it"
              subtitle="Turn anything off for this card without deleting it."
            />
            <ul className="mt-3.5 space-y-1">
              {cardFields.map((field) => {
                const inVariant = variant.fields.includes(field.id);
                const on = inVariant && cardFieldOverrides[field.id] !== false;
                return (
                  <li
                    key={field.id}
                    className="flex items-center justify-between gap-3 border-b border-line py-2 last:border-b-0"
                    style={{ opacity: inVariant ? 1 : 0.45 }}
                  >
                    <div className="min-w-0">
                      <p className="text-[12.5px] font-medium text-ink">{field.label}</p>
                      <p className="truncate text-[11.5px] text-muted">{field.value}</p>
                    </div>
                    {inVariant ? (
                      <Toggle
                        checked={on}
                        onChange={() => toggleCardField(field.id)}
                        label={field.label}
                      />
                    ) : (
                      <span className="shrink-0 text-[11px] text-muted">
                        Not on this card
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>

        {/* Sharing it */}
        <div className="min-w-0 space-y-5">
          <Card>
            <SectionHeader
              title="Your link"
              subtitle="One address that always shows your current details."
            />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-[10px] border border-line bg-cream/50 px-3 py-2.5">
                <span className="min-w-0 flex-1 truncate text-[13px] text-charcoal">
                  {myCard.publicLink}
                </span>
                <button
                  type="button"
                  aria-label="Copy your card link"
                  onClick={() => {
                    void navigator.clipboard?.writeText(myCard.publicLink);
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 1800);
                  }}
                  className="shrink-0 rounded-md p-1 text-muted transition-colors duration-200 hover:text-ink"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
              <Link
                to="/c/sydney"
                className="inline-flex h-9.5 items-center gap-2 rounded-[9px] border border-line bg-paper px-4 text-[13px] font-medium whitespace-nowrap text-ink transition-colors duration-200 hover:bg-cream"
              >
                <ExternalLink size={14} aria-hidden />
                See what they see
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-line pt-4">
              <CardCode seed={myCard.publicLink} size={104} />
              <div className="min-w-[180px] flex-1">
                <p className="text-[12.5px] leading-relaxed text-charcoal">
                  Print it on a badge, drop it in a slide, or hold up your phone. The code and the
                  link point at the same card, so changing your details never leaves an old version
                  circulating.
                </p>
                <Button
                  size="sm"
                  variant="gold"
                  className="mt-3"
                  onClick={() => openModal({ kind: "share-card" })}
                >
                  <Share2 size={14} aria-hidden />
                  Share it now
                </Button>
              </div>
            </div>
          </Card>

          <Card>
            <SectionHeader
              title="Who has your card"
              subtitle={`Opened ${cardStats.opened} times, saved ${cardStats.saved}, ${cardStats.returned} sent theirs back ${cardStats.period}.`}
            />

            {sessionShares.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {sessionShares.map((share) => (
                  <li
                    key={share.id}
                    className="flex items-center justify-between gap-3 rounded-[10px] border border-[color:var(--asbm-gold)]/45 bg-gold-light/40 px-3 py-2"
                  >
                    <span className="text-[12.5px] font-medium text-ink">Shared with {share.to}</span>
                    <Chip tone="warm">Just now</Chip>
                  </li>
                ))}
              </ul>
            )}

            <ul className="mt-4 divide-y divide-[color:var(--asbm-border)]">
              {cardShares.map((share) => (
                <li key={share.id} className="flex flex-wrap items-center gap-3 py-2.5">
                  <Avatar name={share.name} category={share.category} size="sm" />
                  <span className="min-w-0 flex-1">
                    {share.personId ? (
                      <button
                        type="button"
                        onClick={() => openDrawer(share.personId!)}
                        className="block max-w-full truncate text-left text-[13px] font-medium text-ink transition-colors duration-200 hover:text-charcoal"
                      >
                        {share.name}
                      </button>
                    ) : (
                      <span className="block truncate text-[13px] font-medium text-ink">
                        {share.name}
                      </span>
                    )}
                    <span className="block truncate text-[11.5px] text-muted">
                      {share.organization} · {shareMethodLabel[share.method]} ·{" "}
                      {formatDate(share.date)}
                    </span>
                  </span>
                  <span className="flex shrink-0 gap-1.5">
                    {share.saved && <Chip tone="warm">Saved</Chip>}
                    {share.returned ? (
                      <Chip tone="forest">
                        <UserPlus size={11} aria-hidden />
                        Sent theirs
                      </Chip>
                    ) : (
                      <Chip tone="neutral">Opened</Chip>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-4 border-t border-line pt-3 text-[12px] leading-relaxed text-muted">
              Three of these sent their details back, which is how Yara Osman, Tobias Grant, and
              Priya Raman entered the network without anyone typing them in.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
