"use client";

import { useEffect, useRef } from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { effectivePrice, getProduct } from "@/lib/products";
import { inr } from "@/lib/format";
import { site } from "@/lib/site";
import Silhouette from "./Silhouette";
import SmartImage from "./SmartImage";

export default function CartDrawer() {
  const {
    cartOpen,
    closeCart,
    lines,
    count,
    subtotal,
    setQty,
    removeItem,
    goTo,
  } = useStore();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!cartOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cartOpen, closeCart]);

  const remaining = Math.max(0, site.freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / site.freeShippingThreshold) * 100);

  return (
    <div
      className={`fixed inset-0 z-50 ${cartOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!cartOpen}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 motion-reduce:transition-none ${
          cartOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-chalk shadow-2xl transition-[transform,visibility] duration-300 motion-reduce:transition-none ${
          cartOpen ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-denim/10 px-5">
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-wide">
            Your cart{count > 0 ? ` (${count})` : ""}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-11 w-11 place-items-center rounded-full hover:bg-denim/5"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="font-display text-3xl font-extrabold uppercase">Your cart is empty</p>
            <p className="max-w-xs text-sm text-ink/70">
              Add a pair and it will show up here. Free shipping starts at {inr(site.freeShippingThreshold)}.
            </p>
            <a
              href="#shop"
              onClick={() => {
                goTo({ highlight: "new" });
                closeCart();
              }}
              className="mt-2 inline-flex h-12 items-center bg-ink px-7 text-sm font-bold text-chalk transition-colors hover:bg-denim"
            >
              Shop new arrivals
            </a>
          </div>
        ) : (
          <>
            <div className="border-b border-denim/10 px-5 py-4">
              <p className="text-sm font-medium" aria-live="polite">
                {remaining > 0
                  ? `Add ${inr(remaining)} more for free shipping`
                  : "You have free shipping on this order"}
              </p>
              <div
                className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-denim/10"
                role="progressbar"
                aria-label="Progress to free shipping"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
              >
                <div
                  className="h-full rounded-full bg-stitch transition-[width] duration-500 motion-reduce:transition-none"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-denim/10 overflow-y-auto px-5">
              {lines.map((line) => {
                const p = getProduct(line.productId);
                if (!p) return null;
                return (
                  <li key={`${line.productId}-${line.size}`} className="flex gap-4 py-5">
                    <div className="grid h-[104px] w-[84px] shrink-0 place-items-center overflow-hidden rounded bg-mist">
                      <SmartImage
                        src={p.image}
                        alt={p.title}
                        fallback={<Silhouette kind={p.category} fill={p.color} className="h-[88%] w-auto" />}
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-snug">{p.title}</p>
                          <p className="mt-0.5 text-[13px] text-ink/65">
                            {p.colorName}, size {line.size}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(line.productId, line.size)}
                          aria-label={`Remove ${p.title}, size ${line.size}`}
                          className="-mr-2 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink/60 hover:bg-denim/5 hover:text-ink"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="inline-flex items-center rounded-full border border-denim/20">
                          <button
                            type="button"
                            onClick={() => setQty(line.productId, line.size, line.qty - 1)}
                            aria-label="Decrease quantity"
                            className="grid h-9 w-9 place-items-center rounded-full hover:bg-denim/5"
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden />
                          </button>
                          <span className="w-7 text-center text-sm font-semibold" aria-live="polite">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(line.productId, line.size, line.qty + 1)}
                            aria-label="Increase quantity"
                            className="grid h-9 w-9 place-items-center rounded-full hover:bg-denim/5"
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden />
                          </button>
                        </div>
                        <p className="text-sm font-bold">{inr(effectivePrice(p) * line.qty)}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-denim/10 bg-white/60 px-5 py-5">
              <div className="flex items-center justify-between text-base font-bold">
                <span>Subtotal</span>
                <span>{inr(subtotal)}</span>
              </div>
              <p className="mt-1 text-[13px] text-ink/65">Taxes included. Shipping is calculated at checkout.</p>
              <button
                type="button"
                // Connect this to your checkout (Razorpay, Shopify, Stripe, etc.).
                onClick={() => {}}
                className="mt-4 h-14 w-full bg-ink text-base font-bold text-chalk transition-colors hover:bg-denim"
              >
                Checkout
              </button>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 h-11 w-full text-sm font-semibold text-ink/70 hover:text-ink"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
