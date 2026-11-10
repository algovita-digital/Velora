"use client";

import { useState } from "react";
import { useStore, type View } from "@/lib/store";

const SHOP_LINKS: { label: string; view: Partial<View> }[] = [
  { label: "Pants & Denims", view: { department: "pants" } },
  { label: "Shirts", view: { department: "shirts" } },
  { label: "T-Shirts", view: { department: "tees" } },
  { label: "New arrivals", view: { highlight: "new" } },
  { label: "Sale", view: { highlight: "sale" } },
];

const COLUMNS = [
  {
    title: "Support",
    links: ["Track your order", "Size guide", "Shipping", "Returns and exchanges", "Contact us"],
  },
  {
    title: "Policies",
    links: ["Privacy policy", "Terms of service", "Refund policy", "Shipping policy"],
  },
];

const PAYMENTS = ["UPI", "Visa", "Mastercard", "RuPay", "Net banking", "Cash on delivery"];

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Send `email` to your mailing list provider here.
        setDone(true);
      }}
      className="mt-6 max-w-sm"
    >
      <label htmlFor="newsletter" className="text-sm font-semibold">
        Get first access to new drops
      </label>
      <div className="mt-2 flex">
        <input
          id="newsletter"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setDone(false);
          }}
          placeholder="you@email.com"
          className="h-12 min-w-0 flex-1 border border-chalk/30 bg-transparent px-4 text-sm outline-none placeholder:text-chalk/50 focus:border-chalk"
        />
        <button
          type="submit"
          className="h-12 shrink-0 bg-stitch px-5 text-sm font-extrabold text-ink transition-colors hover:bg-chalk"
        >
          Subscribe
        </button>
      </div>
      <p className="mt-2 min-h-5 text-[13px] text-chalk/75" role="status" aria-live="polite">
        {done ? "You are subscribed. Watch your inbox for the next drop." : ""}
      </p>
    </form>
  );
}

export default function Footer() {
  const { goTo } = useStore();

  return (
    <footer className="twill bg-denim-deep text-chalk">
      <div className="mx-auto max-w-[1440px] px-4 pb-8 pt-16 sm:px-6 lg:px-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-4xl font-black tracking-[0.06em]">VELORA</p>
            <span aria-hidden className="stitch-mark mt-1 block h-[2px] w-24" />
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-chalk/75">
              Velora started with one question: why does good denim have to feel
              stiff? We cut relaxed silhouettes from heavyweight, pre-washed
              fabrics, so every pair feels broken in from day one.
            </p>
            <Newsletter />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:pl-12">
            <nav aria-label="Shop">
              <h2 className="text-sm font-bold text-chalk">Shop</h2>
              <ul className="mt-4 space-y-3">
                {SHOP_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href="#shop"
                      onClick={() => goTo(l.view)}
                      className="text-sm text-chalk/70 transition-colors hover:text-chalk"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-sm font-bold text-chalk">{col.title}</h2>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-chalk/70 transition-colors hover:text-chalk">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-chalk/15 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-2" aria-label="Accepted payment methods">
            {PAYMENTS.map((p) => (
              <li
                key={p}
                className="rounded border border-chalk/25 px-3 py-1.5 text-xs font-semibold text-chalk/85"
              >
                {p}
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-chalk/60">© 2026 Velora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
