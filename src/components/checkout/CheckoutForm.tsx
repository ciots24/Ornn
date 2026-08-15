"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { bumps, checkout, orderTotal } from "@/content/checkout";
import { offer, peso } from "@/content/offer";
import { OrderBump } from "./OrderBump";
import { OrderSummary } from "./OrderSummary";
import { StickyTotal } from "./StickyTotal";

type Status = { state: "idle" | "submitting" } | { state: "error"; message: string };

/**
 * The single interactive island on this page.
 *
 * Everything that reacts to the buyer — ticked bumps, the running total, the
 * submit state — lives here so the rest of the checkout ships as static HTML.
 * One island keeps the JavaScript small, which is the whole reason this page
 * paints as fast as it does.
 */
export function CheckoutForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [method, setMethod] = useState<string>(checkout.payment.methods[0].id);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const submitRef = useRef<HTMLButtonElement>(null);

  const total = useMemo(() => orderTotal(selected), [selected]);

  const toggleBump = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.state === "submitting") return;

    const data = new FormData(event.currentTarget);
    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          mobile: data.get("mobile"),
          method,
          bumps: selected,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.redirectUrl) {
        throw new Error(result.error ?? "Couldn't start the order. Please try again.");
      }

      // The processor's hosted page takes it from here — card details never
      // touch this site.
      window.location.href = result.redirectUrl;
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Couldn't start the order. Please try again.",
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate={false}>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:items-start lg:gap-6">
          {/* Details and add-ons */}
          <div className="space-y-5 lg:col-start-1 lg:row-start-1">
            <Card title={checkout.customer.title} note={checkout.customer.note}>
              <div className="space-y-4">
                <Field
                  name="name"
                  label={checkout.customer.fields.name.label}
                  placeholder={checkout.customer.fields.name.placeholder}
                  autoComplete="name"
                  required
                />
                <Field
                  name="email"
                  type="email"
                  label={checkout.customer.fields.email.label}
                  placeholder={checkout.customer.fields.email.placeholder}
                  autoComplete="email"
                  inputMode="email"
                  required
                />
                <Field
                  name="mobile"
                  type="tel"
                  label={checkout.customer.fields.mobile.label}
                  placeholder={checkout.customer.fields.mobile.placeholder}
                  autoComplete="tel"
                  inputMode="tel"
                  required
                />
              </div>
            </Card>

            {bumps.length > 0 && (
              <section aria-labelledby="bumps-heading" className="space-y-3">
                <div>
                  <h2 id="bumps-heading" className="label-caps text-accent-text">
                    {checkout.bumps.title}
                  </h2>
                  <p className="mt-1.5 text-[0.8125rem] text-text-dim">
                    {checkout.bumps.note}
                  </p>
                </div>
                {bumps.map((bump) => (
                  <OrderBump
                    key={bump.id}
                    bump={bump}
                    checked={selected.includes(bump.id)}
                    onToggle={toggleBump}
                  />
                ))}
              </section>
            )}

            <Card title={checkout.payment.title} note={checkout.payment.note}>
              <fieldset className="space-y-2.5">
                <legend className="sr-only">{checkout.payment.title}</legend>
                {checkout.payment.methods.map((option) => (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center gap-3.5 rounded-xl border p-4 transition-colors duration-200 ${
                      method === option.id
                        ? "border-brand bg-brand/[0.08]"
                        : "border-line bg-surface-sunken/60 hover:border-line-strong"
                    }`}
                  >
                    <input
                      type="radio"
                      name="method"
                      value={option.id}
                      checked={method === option.id}
                      onChange={() => setMethod(option.id)}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-line-strong transition-colors duration-200 peer-checked:border-brand peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-hi"
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${
                          method === option.id ? "bg-brand" : "bg-transparent"
                        }`}
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold leading-tight text-text">
                        {option.label}
                      </span>
                      <span className="label-caps block text-[0.6rem] text-text-dim">
                        {option.hint}
                      </span>
                    </span>
                    <PaymentMark logo={option.logo} label={option.label} />
                  </label>
                ))}
              </fieldset>

              {/* Naming the processor is the reassurance — it's the reason we
                  never handle a card number. */}
              <p className="mt-4 flex items-center gap-3 rounded-xl border border-line bg-surface-sunken/60 px-3.5 py-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={checkout.payment.gateway.logo}
                  alt={checkout.payment.gateway.name}
                  width={88}
                  height={28}
                  className="h-6 w-auto shrink-0 rounded"
                />
                <span className="text-[0.75rem] leading-snug text-text-muted">
                  {checkout.payment.gateway.note}
                </span>
              </p>
            </Card>
          </div>

          {/* Summary — sticky beside the form on desktop, inline on mobile */}
          <div className="lg:sticky lg:top-6 lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <OrderSummary selected={selected} total={total} />
          </div>

          {/* Submit and reassurance */}
          <div className="space-y-4 lg:col-start-1 lg:row-start-2">
            {status.state === "error" && (
              <p
                role="alert"
                className="rounded-xl border border-brand/50 bg-brand/10 px-4 py-3 text-center text-[0.875rem] text-text"
              >
                {status.message}
              </p>
            )}

            <button
              ref={submitRef}
              type="submit"
              data-checkout-submit=""
              disabled={status.state === "submitting"}
              className="btn-primary btn-shine group min-h-[3.75rem] w-full rounded-full px-5 py-3 text-base font-black text-on-brand hover:btn-primary-hover disabled:cursor-wait disabled:opacity-80 sm:min-h-[4rem] sm:px-6 sm:text-xl"
            >
              {status.state === "submitting" ? (
                "Taking you to payment…"
              ) : (
                <span className="text-balance">
                  {checkout.submit.label}{" "}
                  {/* Price and arrow stay together so a wrap can't strand the
                      arrow alone on its own line. */}
                  <span className="whitespace-nowrap">
                    — {peso(total)}
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      fill="none"
                      className="ml-2 inline-block h-[0.95em] w-[0.95em] align-[-0.08em] transition-transform duration-200 group-hover:translate-x-1"
                    >
                      <path
                        d="M5 12h13m0 0-5.5-5.5M18 12l-5.5 5.5"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              )}
            </button>

            {/* One line of reassurance under the button, not four stacked
                blocks. Terms and the statement descriptor are legal fine
                print — they belong small and together, not competing. */}
            <p className="label-caps text-center text-text-dim">
              {checkout.submit.sublabel}
            </p>

            <p className="text-center text-[0.75rem] leading-relaxed text-text-dim">
              {checkout.submit.terms} Shows on your statement as{" "}
              <span className="font-bold text-text-muted">
                {offer.support.billingDescriptor}
              </span>
              .
            </p>
          </div>
        </div>
      </form>

      <StickyTotal total={total} />
    </>
  );
}

/**
 * The small payment badge beside each method — a fixed box so the row height
 * never shifts between methods.
 *
 * Wallet marks are files in /public/pay so the official brand assets can be
 * dropped straight over them. Cards get a drawn glyph instead: a generic card
 * shape says "card" without imitating anyone's trademark.
 */
function PaymentMark({ logo, label }: { logo: string | null; label: string }) {
  if (!logo) {
    return (
      <span
        aria-hidden
        className="flex h-7 w-[3.25rem] shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface-alt text-text-muted"
      >
        <svg viewBox="0 0 24 16" fill="none" className="h-4 w-4">
          <rect
            x="1"
            y="1.5"
            width="22"
            height="14"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M1 6h22" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M4.5 11h4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo}
      alt={label}
      width={88}
      height={28}
      className="h-7 w-[3.25rem] shrink-0 rounded-md object-contain"
    />
  );
}

function Card({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-surface-raised p-5 sm:p-6">
      <h2 className="text-lg font-black tracking-[-0.02em] text-text">
        {title}
      </h2>
      <p className="mt-1.5 text-[0.875rem] leading-relaxed text-text-muted">{note}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  ...rest
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="label-caps block text-text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 block min-h-[3.25rem] w-full rounded-xl border border-line-strong bg-surface-sunken px-4 text-[1rem] text-text transition-colors duration-200 placeholder:text-text-dim/70 hover:border-line-strong focus:border-brand focus:outline-none"
        {...rest}
      />
    </div>
  );
}
