import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { Marker } from "@/components/ui/Marker";
import { hero } from "@/content/copy";
import { offer } from "@/content/offer";

export function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-line bg-surface pb-12 pt-9 sm:pb-20 sm:pt-16">
      <div aria-hidden className="absolute inset-0 grid-veil" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full brand-glow"
      />

      <Container width="wide" className="relative">
        <div className="mx-auto max-w-[52rem] text-center">
          <p className="label-caps mx-auto max-w-md text-balance text-text-muted">
            {hero.eyebrow}
          </p>

          <h1 className="display-xl mt-5 text-balance">
            {hero.headline.lead}{" "}
            <Marker>
              <span className="text-accent-text">{hero.headline.marked}</span>
            </Marker>{" "}
            {hero.headline.rest}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-[1.55] text-text-muted sm:text-xl">
            {hero.subhead}
          </p>
        </div>

        <div className="mt-7 flex flex-col items-center">
          <CtaButton href={offer.checkoutUrl} className="max-w-md">
            {hero.cta}
          </CtaButton>

          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
            {hero.trust.map((item) => (
              <li
                key={item}
                className="label-caps rounded-full border border-line bg-surface-sunken px-3 py-1.5 text-text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* The thesis, drawn to scale: the input is a sliver of the outcome. */}
        <div className="mx-auto mt-11 max-w-2xl">
          <div className="flex items-center justify-between">
            <span className="label-caps text-accent-text">What you spend</span>
            <span className="label-caps text-text-dim">What it built</span>
          </div>

          <div aria-hidden className="relative my-3.5 h-px w-full bg-line-strong">
            <span className="absolute left-0 top-0 h-px w-[4%] bg-brand" />
            <span className="absolute -top-[3px] left-0 h-[7px] w-[2px] bg-brand" />
            <span className="absolute -top-[3px] right-0 h-[7px] w-[2px] bg-text-dim" />
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-xl font-black text-text sm:text-2xl">
              ₱300
              <span className="text-base font-medium text-text-dim">/day</span>
            </span>
            <span className="text-xl font-black text-text sm:text-2xl">
              ₱10M
              <span className="text-base font-medium text-text-dim">/month</span>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
}
