import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarCheck, Check, Download, Send } from "lucide-react";
import { Button } from "../components/ui/Button";
import { CardCode } from "../components/ui/CardCode";
import { buildVCard, visibleFields } from "../features/card/vcard";
import { useDemoState } from "../state/DemoState";
import { myCard } from "../data/card";

/**
 * What the other person sees.
 *
 * Rendered outside the application shell on purpose — this is the page that
 * opens on a stranger's phone, so it has to stand entirely on its own and it
 * has to ask for their details back.
 */
export function PublicCardPage() {
  const { cardVariantId, cardFieldOverrides } = useDemoState();
  const [saved, setSaved] = useState(false);
  const [sentBack, setSentBack] = useState(false);
  const [name, setName] = useState("");

  const fields = visibleFields(cardVariantId, cardFieldOverrides);

  const detail = (id: (typeof fields)[number], label: string, value: string) =>
    fields.includes(id) ? (
      <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-b-0">
        <dt className="shrink-0 text-[12px] text-muted">{label}</dt>
        <dd className="truncate text-[13px] font-medium text-ink">{value}</dd>
      </div>
    ) : null;

  return (
    <div className="min-h-dvh bg-cream px-4 py-8">
      <div className="mx-auto w-full max-w-[420px]">
        <Link
          to="/card"
          className="mb-4 inline-flex items-center gap-1.5 text-[12.5px] text-muted transition-colors duration-200 hover:text-ink"
        >
          <ArrowLeft size={13} aria-hidden />
          Back to your card
        </Link>

        <div className="overflow-hidden rounded-[18px] border border-line bg-paper shadow-[var(--shadow-lift)]">
          <header className="bg-ink px-6 pt-7 pb-6 text-white">
            <div className="text-[10.5px] font-semibold tracking-[0.18em] text-[color:var(--asbm-gold-light)]">
              ASBM
            </div>
            <div className="mt-4 flex items-center gap-3.5">
              <span
                aria-hidden
                className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[color:var(--asbm-gold)] text-[18px] font-semibold text-[color:var(--asbm-black)]"
              >
                SA
              </span>
              <div className="min-w-0">
                <h1 className="text-[22px] leading-tight font-semibold tracking-[-0.01em]">
                  {myCard.name}
                </h1>
                <p className="text-[13.5px] text-white/80">{myCard.title}</p>
                {fields.includes("organization") && (
                  <p className="truncate text-[12.5px] text-white/55">{myCard.organization}</p>
                )}
              </div>
            </div>

            <p className="mt-4 text-[13px] leading-relaxed text-white/70">{myCard.bio}</p>

            {fields.includes("focus") && (
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {myCard.focus.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 px-2.5 py-[3px] text-[11px] text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="px-6 py-4">
            <dl>
              {detail("location", "Location", myCard.location)}
              {detail("email", "Email", myCard.email)}
              {detail("phone", "Phone", myCard.phone)}
              {detail("linkedin", "LinkedIn", myCard.linkedin)}
              {detail("website", "Website", myCard.website)}
              {detail("booking", "Book time", myCard.bookingLink)}
            </dl>
          </div>

          <div className="grid grid-cols-2 gap-2 px-6 pb-5">
            <Button
              variant="primary"
              onClick={() => {
                void navigator.clipboard?.writeText(buildVCard(fields));
                setSaved(true);
                window.setTimeout(() => setSaved(false), 2000);
              }}
            >
              {saved ? <Check size={15} aria-hidden /> : <Download size={15} aria-hidden />}
              {saved ? "Copied" : "Save contact"}
            </Button>
            <Button variant="secondary">
              <CalendarCheck size={15} aria-hidden />
              Book time
            </Button>
          </div>

          {/* The half that makes it an exchange rather than a handout. */}
          <div className="border-t border-line bg-cream/60 px-6 py-5">
            {sentBack ? (
              <div className="rounded-[11px] border border-[color:var(--asbm-success)]/25 bg-forest-light px-4 py-3.5">
                <p className="text-[13.5px] font-semibold text-ink">Thanks — sent</p>
                <p className="mt-0.5 text-[12.5px] text-charcoal">
                  Your details would land in Sydney's network as a complete contact, tagged with
                  where you met.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-[14px] font-semibold text-ink">Send yours back</h2>
                <p className="mt-0.5 text-[12.5px] text-muted">
                  So neither of you has to type the other up later.
                </p>
                <div className="mt-3 flex gap-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name and company"
                    aria-label="Your name and company"
                    className="h-9.5 min-w-0 flex-1 rounded-[9px] border border-line bg-paper px-3 text-[13px] text-ink placeholder:text-muted focus:border-[color:var(--asbm-gold)] focus:outline-none"
                  />
                  <Button
                    variant="gold"
                    disabled={!name.trim()}
                    onClick={() => setSentBack(true)}
                  >
                    <Send size={14} aria-hidden />
                    Send
                  </Button>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-4 border-t border-line px-6 py-4">
            <CardCode seed={myCard.publicLink} size={72} />
            <p className="text-[11.5px] leading-relaxed text-muted">
              {myCard.publicLink}
              <br />
              Illustrative code. Sample details shown for demonstration only.
            </p>
          </div>
        </div>

        <p className="mt-5 text-center text-[11.5px] text-muted">
          ASBM Relationship Hub · Concept by Trybl
        </p>
      </div>
    </div>
  );
}
