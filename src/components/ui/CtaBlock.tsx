import { offer, peso } from "@/content/offer";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

/**
 * The repeating conversion unit: button, price reminder, and the reason to
 * act now. Every CTA on the page is this component, so the promise never
 * drifts between one button and the next.
 */
export function CtaBlock({
  label = "Access the Ads2Sawa System",
  showPrice = false,
  className = "",
}: {
  label?: string;
  showPrice?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={`flex flex-col items-center text-center ${className}`}>
      <CtaButton href={offer.checkoutUrl} className="max-w-md">
        {label}
        {showPrice && (
          <>
            {" — "}
            <span className="whitespace-nowrap font-medium text-paper/60 line-through decoration-[1.5px]">
              {peso(offer.price.regular)}
            </span>{" "}
            <span className="whitespace-nowrap">{peso(offer.price.founding)}</span>
          </>
        )}
      </CtaButton>

      <p className="label-caps mt-4 text-fog-dim">
        {offer.price.discountLabel} · Instant access · {offer.guarantee.label}
      </p>
    </Reveal>
  );
}
