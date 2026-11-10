"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  categories,
  categoriesFor,
  departmentOf,
  departments,
  effectivePrice,
  getCategory,
  getDepartment,
  products,
  type Product,
} from "@/lib/products";
import {
  useStore,
  type Audience,
  type DepartmentFilter,
  type Highlight,
  type SortKey,
} from "@/lib/store";
import ProductCard from "./ProductCard";

const PAGE_SIZE = 12;

const TABS: { label: string; value: DepartmentFilter }[] = [
  { label: "All", value: "all" },
  ...departments.map((d) => ({ label: d.name, value: d.id as DepartmentFilter })),
];

/** Round-robin across departments so "Featured" shows pants, shirts and tees together. */
function interleave(list: Product[]): Product[] {
  const groups = departments.map((d) =>
    list.filter((p) => departmentOf(p) === d.id).sort((a, b) => a.rank - b.rank),
  );
  const longest = Math.max(0, ...groups.map((g) => g.length));
  const out: Product[] = [];
  for (let i = 0; i < longest; i++) {
    for (const g of groups) if (g[i]) out.push(g[i]);
  }
  return out;
}

function FilterSelect<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="relative">
      <label className="sr-only" htmlFor={`select-${label}`}>
        {label}
      </label>
      <select
        id={`select-${label}`}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-10 appearance-none rounded-full border border-denim/20 bg-chalk pl-4 pr-9 text-sm font-semibold outline-none hover:border-denim focus:border-denim"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" aria-hidden />
    </div>
  );
}

function headingFor(department: DepartmentFilter, highlight: Highlight): string {
  const dept = department === "all" ? null : getDepartment(department).name;
  if (highlight === "new") return dept ? `New in ${dept}` : "New arrivals";
  if (highlight === "sale") return dept ? `${dept} on sale` : "Sale";
  return dept ?? "All styles";
}

export default function ProductGrid() {
  const {
    department,
    setDepartment,
    category,
    setCategory,
    audience,
    setAudience,
    highlight,
    setHighlight,
    query,
    sort,
    setSort,
    resetFilters,
  } = useStore();

  const [limit, setLimit] = useState(PAGE_SIZE);

  // Start from the first page whenever the filters change.
  useEffect(() => {
    setLimit(PAGE_SIZE);
  }, [department, category, audience, highlight, query, sort]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      if (department !== "all" && departmentOf(p) !== department) return false;
      if (category !== "all" && p.category !== category) return false;
      if (audience !== "all" && p.collection !== audience) return false;
      if (highlight === "new" && !p.isNew) return false;
      if (highlight === "sale" && p.salePrice == null) return false;
      if (q) {
        const cat = getCategory(p.category);
        const haystack = `${p.title} ${p.colorName} ${cat.label} ${getDepartment(cat.department).name}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    if (sort === "price-asc") return [...list].sort((a, b) => effectivePrice(a) - effectivePrice(b));
    if (sort === "price-desc") return [...list].sort((a, b) => effectivePrice(b) - effectivePrice(a));
    return interleave(list);
  }, [department, category, audience, highlight, query, sort]);

  const shown = results.slice(0, limit);
  const remaining = results.length - shown.length;

  const stylePills = department === "all" ? categories : categoriesFor(department);
  const filtered =
    department !== "all" ||
    category !== "all" ||
    audience !== "all" ||
    highlight !== "all" ||
    query.trim() !== "" ||
    sort !== "featured";

  return (
    <section
      id="shop"
      aria-labelledby="shop-heading"
      className="scroll-mt-header border-t border-denim/10 bg-white/50"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="shop-heading"
            className="font-display text-5xl font-black uppercase leading-none tracking-tight text-denim sm:text-6xl"
          >
            {headingFor(department, highlight)}
          </h2>
          <p className="text-sm text-ink/65" role="status" aria-live="polite">
            {results.length} {results.length === 1 ? "style" : "styles"}
            {query.trim() ? ` for “${query.trim()}”` : ""}
          </p>
        </div>

        {/* Department tabs */}
        <div
          role="group"
          aria-label="Department"
          className="scrollbar-none -mx-4 mt-8 flex gap-6 overflow-x-auto border-b border-denim/10 px-4 sm:mx-0 sm:px-0"
        >
          {TABS.map((t) => {
            const active = department === t.value;
            return (
              <button
                key={t.value}
                type="button"
                aria-pressed={active}
                onClick={() => setDepartment(t.value)}
                className={`relative shrink-0 py-3 text-[15px] font-semibold transition-colors ${
                  active ? "text-denim" : "text-ink/60 hover:text-ink"
                }`}
              >
                {t.label}
                {active && (
                  <span aria-hidden className="absolute inset-x-0 -bottom-px h-[3px] bg-stitch" />
                )}
              </button>
            );
          })}
        </div>

        {/* Style pills follow the selected department */}
        <div
          role="group"
          aria-label="Style"
          className="scrollbar-none -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0"
        >
          {[{ id: "all" as const, name: "All styles" }, ...stylePills].map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(c.id)}
                className={`h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors ${
                  active
                    ? "border-denim bg-denim text-chalk"
                    : "border-denim/20 hover:border-denim"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Show, audience and sort */}
        <div className="mt-4 flex flex-wrap gap-2">
          <FilterSelect<Highlight>
            label="Show"
            value={highlight}
            onChange={setHighlight}
            options={[
              { value: "all", label: "Show everything" },
              { value: "new", label: "New arrivals" },
              { value: "sale", label: "On sale" },
            ]}
          />
          <FilterSelect<Audience>
            label="For"
            value={audience}
            onChange={setAudience}
            options={[
              { value: "all", label: "For everyone" },
              { value: "men", label: "For men" },
              { value: "young", label: "For young" },
            ]}
          />
          <FilterSelect<SortKey>
            label="Sort"
            value={sort}
            onChange={setSort}
            options={[
              { value: "featured", label: "Featured" },
              { value: "price-asc", label: "Price: low to high" },
              { value: "price-desc", label: "Price: high to low" },
            ]}
          />
        </div>

        {shown.length > 0 ? (
          <>
            <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 lg:mt-10 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
              {shown.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            <div className="mt-12 flex flex-col items-center gap-4 text-center">
              {remaining > 0 && (
                <>
                  <p className="text-sm text-ink/65">
                    Showing {shown.length} of {results.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => setLimit((n) => n + PAGE_SIZE)}
                    className="h-12 border border-ink px-8 text-sm font-bold transition-colors hover:bg-ink hover:text-chalk"
                  >
                    Show {Math.min(PAGE_SIZE, remaining)} more
                  </button>
                </>
              )}
              {filtered && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm font-semibold underline decoration-stitch decoration-2 underline-offset-[6px] hover:text-denim"
                >
                  Clear filters
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="mt-12 flex flex-col items-center gap-4 rounded border border-dashed border-denim/25 px-6 py-16 text-center">
            <p className="font-display text-3xl font-extrabold uppercase">No styles match</p>
            <p className="max-w-sm text-sm text-ink/70">
              Try a different style or search term, or clear your filters to see everything.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="h-12 bg-ink px-7 text-sm font-bold text-chalk transition-colors hover:bg-denim"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
