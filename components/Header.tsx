"use client";

import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useStore, type View } from "@/lib/store";

interface NavItem {
  label: string;
  view: Partial<View>;
}

const NAV: NavItem[] = [
  { label: "Pants & Denims", view: { department: "pants" } },
  { label: "Shirts", view: { department: "shirts" } },
  { label: "T-Shirts", view: { department: "tees" } },
  { label: "New Arrivals", view: { highlight: "new" } },
  { label: "Sale", view: { highlight: "sale" } },
];

function goToShop() {
  document.getElementById("shop")?.scrollIntoView();
}

function SearchField({
  id,
  className = "",
  autoFocus = false,
  onDone,
}: {
  id: string;
  className?: string;
  autoFocus?: boolean;
  onDone?: () => void;
}) {
  const { query, setQuery } = useStore();
  return (
    <form
      role="search"
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        goToShop();
        onDone?.();
      }}
    >
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" aria-hidden />
      <input
        id={id}
        type="search"
        value={query}
        autoFocus={autoFocus}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search jeans, shirts, tees"
        className="h-11 w-full rounded-full border border-denim/15 bg-white/70 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-ink/45 focus:border-denim"
      />
    </form>
  );
}

export default function Header() {
  const { count, openCart, department, highlight, goTo } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (item: NavItem) =>
    item.view.department
      ? department === item.view.department && highlight === "all"
      : highlight === item.view.highlight;

  const pick = (item: NavItem) => {
    goTo(item.view);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="bg-ink px-4 py-2 text-center text-xs font-medium text-chalk sm:text-[13px]">
        Free shipping on orders above ₹1,999
      </div>

      <header className="sticky top-0 z-40 border-b border-denim/10 bg-chalk/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 sm:px-6 lg:h-[72px] lg:gap-6 lg:px-10 xl:gap-8">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="-ml-2 grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-denim/5 lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>

          <a
            href="#top"
            onClick={() => goTo()}
            aria-label="Velora home"
            className="block shrink-0 leading-none"
          >
            <span className="block font-display text-[1.9rem] font-black tracking-[0.06em] text-denim">
              VELORA
            </span>
            <span aria-hidden className="stitch-mark mt-1 block h-[2px] w-full" />
          </a>

          <nav aria-label="Main" className="hidden items-center lg:flex">
            {NAV.map((item) => {
              const active = isActive(item);
              const isSale = item.label === "Sale";
              return (
                <a
                  key={item.label}
                  href="#shop"
                  onClick={() => pick(item)}
                  aria-current={active ? "true" : undefined}
                  className={`relative whitespace-nowrap px-3 py-2 text-[15px] font-semibold transition-colors hover:text-denim ${
                    isSale ? "text-[#A6381F]" : active ? "text-denim" : "text-ink/70"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-[2px] bg-stitch" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex-1" />

          <SearchField
            id="search-desktop"
            className="relative hidden w-72 xl:block"
          />

          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
              className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-denim/5 xl:hidden"
            >
              {searchOpen ? <X className="h-5 w-5" aria-hidden /> : <Search className="h-5 w-5" aria-hidden />}
            </button>

            <button
              type="button"
              aria-label="Account"
              className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-denim/5"
            >
              <User className="h-5 w-5" aria-hidden />
            </button>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
              className="relative grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-denim/5"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden />
              {count > 0 && (
                <span
                  key={count}
                  className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] animate-pop place-items-center rounded-full bg-stitch px-1 text-[10px] font-extrabold text-ink motion-reduce:animate-none"
                >
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-denim/10 px-4 py-3 sm:px-6 xl:hidden">
            <SearchField
              id="search-mobile"
              className="relative"
              autoFocus
              onDone={() => setSearchOpen(false)}
            />
          </div>
        )}
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 motion-reduce:transition-none ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-denim-deep text-chalk transition-[transform,visibility] duration-300 motion-reduce:transition-none ${
            menuOpen ? "visible translate-x-0" : "invisible -translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between px-5">
            <span className="font-display text-2xl font-black tracking-[0.06em]">VELORA</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center rounded-full hover:bg-chalk/10"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-col px-5 pt-6">
            {NAV.map((item) => (
              <a
                key={item.label}
                href="#shop"
                onClick={() => pick(item)}
                className={`border-b border-chalk/10 py-3 font-display text-2xl font-extrabold uppercase tracking-wide transition-colors hover:text-stitch sm:py-4 sm:text-3xl ${
                  isActive(item) ? "text-stitch" : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto px-5 pb-8 text-sm text-chalk/70">
            Free shipping on orders above ₹1,999
          </div>
        </div>
      </div>
    </>
  );
}
