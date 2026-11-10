"use client";

import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import {
  discountPercent,
  effectivePrice,
  getCategory,
  type Product,
} from "@/lib/products";
import { inr } from "@/lib/format";
import { useStore } from "@/lib/store";
import Silhouette from "./Silhouette";
import SmartImage from "./SmartImage";

export default function ProductCard({ product: p }: { product: Product }) {
  const { addItem } = useStore();
  const [picking, setPicking] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const addToCart = () => {
    if (!selectedSize) return;
    addItem(p.id, selectedSize);
    setPicking(false);
    setSelectedSize(null);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1800);
  };

  const off = discountPercent(p);

  return (
    <article className="flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-mist">
        <div className="absolute inset-0 grid place-items-center">
          <SmartImage
            src={p.image}
            alt={`${p.title} in ${p.colorName}`}
            fallback={
              <Silhouette
                kind={p.category}
                fill={p.color}
                className="h-[82%] w-auto drop-shadow-[0_14px_14px_rgba(15,21,34,0.2)]"
              />
            }
          />
        </div>

        {(p.isNew || off > 0) && (
          <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5">
            {p.isNew && (
              <span className="bg-ink px-2.5 py-1 text-[11px] font-bold text-chalk">New</span>
            )}
            {off > 0 && (
              <span className="bg-[#A6381F] px-2.5 py-1 text-[11px] font-bold text-white">
                {off}% off
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 flex-1">
        <h3 className="text-[15px] font-semibold leading-snug">{p.title}</h3>
        <p className="mt-0.5 text-[13px] text-ink/60">
          {getCategory(p.category).label}, {p.colorName}
        </p>
        <p className="mt-1.5 flex items-baseline gap-2 text-[15px]">
          <span className="font-bold">{inr(effectivePrice(p))}</span>
          {p.salePrice && (
            <s className="text-[13px] text-ink/50" aria-label={`Original price ${inr(p.price)}`}>
              {inr(p.price)}
            </s>
          )}
        </p>
      </div>

      <div className="mt-3">
        {picking ? (
          <div role="group" aria-label={`Choose a size for ${p.title}`}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[13px] font-semibold">Select a size</span>
              <button
                type="button"
                onClick={() => {
                  setPicking(false);
                  setSelectedSize(null);
                }}
                aria-label="Cancel size selection"
                className="-mr-1.5 grid h-8 w-8 place-items-center rounded-full hover:bg-denim/5"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {p.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  aria-label={`Size ${s}`}
                  aria-pressed={selectedSize === s}
                  className={`h-11 min-w-0 rounded border px-0 text-[13px] font-semibold tracking-tight transition-colors ${
                    selectedSize === s
                      ? "border-denim bg-denim text-chalk"
                      : "border-denim/25 hover:border-denim hover:bg-denim hover:text-chalk"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={addToCart}
              disabled={!selectedSize}
              className="mt-3 flex h-12 w-full items-center justify-center border border-ink bg-ink text-sm font-bold text-chalk transition-colors hover:bg-denim disabled:cursor-not-allowed disabled:border-ink/20 disabled:bg-ink/10 disabled:text-ink/45"
            >
              Add to cart
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setSelectedSize(null);
              setPicking(true);
            }}
            className={`flex h-12 w-full items-center justify-center gap-2 border text-sm font-bold transition-colors ${
              added
                ? "border-denim bg-denim text-chalk"
                : "border-ink bg-transparent text-ink hover:bg-ink hover:text-chalk"
            }`}
            aria-live="polite"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" aria-hidden /> Added to cart
              </>
            ) : (
              "Choose options"
            )}
          </button>
        )}
      </div>
    </article>
  );
}
