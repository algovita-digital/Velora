"use client";

import { ArrowUpRight } from "lucide-react";
import {
  categoriesFor,
  departments,
  products,
  departmentOf,
  type DepartmentInfo,
} from "@/lib/products";
import { useStore } from "@/lib/store";
import Silhouette from "./Silhouette";
import SmartImage from "./SmartImage";

function DepartmentGroup({
  dept,
  wide = false,
}: {
  dept: DepartmentInfo;
  /** Pants get five columns on desktop; shirts and tees sit side by side with three. */
  wide?: boolean;
}) {
  const { goTo } = useStore();
  const cats = categoriesFor(dept.id);
  const total = products.filter((p) => departmentOf(p) === dept.id).length;

  return (
    <div className="min-w-0">
      <div className="flex items-end justify-between gap-4 border-b border-denim/10 pb-3">
        <div>
          <h3 className="font-display text-3xl font-extrabold uppercase leading-none text-denim sm:text-4xl">
            {dept.name}
          </h3>
          <p className="mt-1.5 text-sm text-ink/65">{dept.blurb}</p>
        </div>
        <a
          href="#shop"
          onClick={() => goTo({ department: dept.id })}
          className="shrink-0 pb-0.5 text-sm font-semibold underline decoration-stitch decoration-2 underline-offset-[6px] hover:text-denim"
        >
          Shop all {total}
        </a>
      </div>

      {/* Swipeable row on phones, grid from sm up */}
      <ul
        className={`scrollbar-none -mx-4 mt-5 flex snap-x gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 ${
          wide ? "lg:grid-cols-5 lg:gap-5" : ""
        }`}
      >
        {cats.map((c) => {
          const count = products.filter((p) => p.category === c.id).length;
          return (
            <li key={c.id} className="w-[44%] min-w-[150px] shrink-0 snap-start sm:w-auto">
              <a
                href="#shop"
                onClick={() => goTo({ department: c.department, category: c.id })}
                className="group relative block aspect-[3/4] overflow-hidden rounded-[4px]"
                style={{ backgroundColor: c.bg }}
              >
                <div className="absolute inset-0 grid place-items-center transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                  <SmartImage
                    src={c.image}
                    alt={c.name}
                    fallback={
                      <Silhouette
                        kind={c.id}
                        fill={c.fill}
                        className="h-[76%] w-auto drop-shadow-[0_14px_16px_rgba(0,0,0,0.25)]"
                      />
                    }
                  />
                </div>

                <span
                  aria-hidden
                  className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full transition-colors ${
                    c.dark
                      ? "bg-chalk/15 text-chalk group-hover:bg-chalk group-hover:text-ink"
                      : "bg-ink/10 text-ink group-hover:bg-ink group-hover:text-chalk"
                  }`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>

                <div className={`absolute inset-x-0 bottom-0 p-4 ${c.dark ? "text-chalk" : "text-ink"}`}>
                  <p className="font-display text-[1.7rem] font-extrabold uppercase leading-[0.95] sm:text-3xl">
                    {c.name}
                  </p>
                  <p className="mt-1 text-[13px] font-medium opacity-75">
                    {count} {count === 1 ? "style" : "styles"}
                  </p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Categories() {
  const { goTo } = useStore();
  const [pants, shirts, tees] = departments;

  return (
    <section
      aria-labelledby="collections-heading"
      className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
    >
      <div className="flex items-end justify-between gap-4">
        <h2
          id="collections-heading"
          className="font-display text-5xl font-black uppercase leading-none tracking-tight text-denim sm:text-6xl"
        >
          Shop by category
        </h2>
        <a
          href="#shop"
          onClick={() => goTo()}
          className="shrink-0 pb-1 text-sm font-semibold underline decoration-stitch decoration-2 underline-offset-[6px] hover:text-denim"
        >
          View all styles
        </a>
      </div>

      <div className="mt-10 space-y-14 lg:mt-12 lg:space-y-16">
        <DepartmentGroup dept={pants} wide />
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-12">
          <DepartmentGroup dept={shirts} />
          <DepartmentGroup dept={tees} />
        </div>
      </div>
    </section>
  );
}
