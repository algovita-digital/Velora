"use client";

import Image from "next/image";
import { useStore, type View } from "@/lib/store";
import { site } from "@/lib/site";

export default function Hero() {
  const { goTo } = useStore();
  const show = (view: Partial<View>) => () => goTo(view);

  return (
    <section className="twill relative isolate overflow-hidden bg-denim-deep text-chalk">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 pb-16 pt-12 sm:px-6 md:pt-16 lg:min-h-[680px] lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-10 lg:pb-20 lg:pt-16">
        <div className="lg:col-span-7">
          <h1 className="animate-rise font-display text-[clamp(3.5rem,10.5vw,9rem)] font-black uppercase leading-[0.86] tracking-[-0.005em] motion-reduce:animate-none">
            Crafted for comfort, styled for the culture.
          </h1>

          <div
            aria-hidden
            className="stitch-line mt-8 h-[3px] w-full max-w-xl animate-stitch motion-reduce:animate-none"
          />

          <p className="mt-7 max-w-md text-base leading-relaxed text-chalk/75 sm:text-lg">
            Denim, shirts and tees in heavyweight, pre-washed fabrics. Relaxed
            fits that feel worn in from the first day.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#shop"
              onClick={show({})}
              className="inline-flex h-14 items-center bg-stitch px-9 text-base font-extrabold text-ink transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
            >
              Shop now
            </a>
            <a
              href="#shop"
              onClick={show({ highlight: "new" })}
              className="inline-flex h-14 items-center border border-chalk/40 px-9 text-base font-semibold transition-colors hover:bg-chalk hover:text-ink"
            >
              New arrivals
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[4px] border border-chalk/10 bg-denim lg:max-w-none">
            <Image
              src={site.heroImage}
              alt="Two models wearing layered winter outfits against a mountain backdrop"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 70vw, 100vw"
              className="object-cover object-center"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-denim-deep/35 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
