"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  effectivePrice,
  getCategory,
  getProduct,
  type CategoryId,
  type Department,
} from "@/lib/products";

export type DepartmentFilter = "all" | Department;
export type CategoryFilter = "all" | CategoryId;
export type Audience = "all" | "men" | "young";
export type Highlight = "all" | "new" | "sale";
export type SortKey = "featured" | "price-asc" | "price-desc";

/** The part of the shop state that navigation links and cards jump to. */
export interface View {
  department: DepartmentFilter;
  category: CategoryFilter;
  audience: Audience;
  highlight: Highlight;
}

export interface CartLine {
  productId: string;
  size: string;
  qty: number;
}

interface StoreValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addItem: (productId: string, size: string) => void;
  setQty: (productId: string, size: string, qty: number) => void;
  removeItem: (productId: string, size: string) => void;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  department: DepartmentFilter;
  setDepartment: (d: DepartmentFilter) => void;
  category: CategoryFilter;
  setCategory: (c: CategoryFilter) => void;
  audience: Audience;
  setAudience: (a: Audience) => void;
  highlight: Highlight;
  setHighlight: (h: Highlight) => void;
  query: string;
  setQuery: (q: string) => void;
  sort: SortKey;
  setSort: (s: SortKey) => void;
  /** Jump to a view: anything you leave out resets to "all", and search clears. */
  goTo: (view?: Partial<View>) => void;
  resetFilters: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const STORAGE_KEY = "velora-cart-v1";
const MAX_QTY = 10;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const [department, setDepartmentState] = useState<DepartmentFilter>("all");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [audience, setAudience] = useState<Audience>("all");
  const [highlight, setHighlight] = useState<Highlight>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");

  // Load the saved cart after mount so server and client markup match.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLines(
            parsed.filter(
              (l): l is CartLine =>
                l &&
                typeof l.productId === "string" &&
                typeof l.size === "string" &&
                typeof l.qty === "number" &&
                !!getProduct(l.productId),
            ),
          );
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage may be unavailable */
    }
  }, [lines, hydrated]);

  const addItem = useCallback((productId: string, size: string) => {
    setLines((prev) => {
      const existing = prev.find(
        (l) => l.productId === productId && l.size === size,
      );
      if (existing) {
        return prev.map((l) =>
          l === existing ? { ...l, qty: Math.min(MAX_QTY, l.qty + 1) } : l,
        );
      }
      return [...prev, { productId, size, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const setQty = useCallback(
    (productId: string, size: string, qty: number) => {
      setLines((prev) =>
        prev
          .map((l) =>
            l.productId === productId && l.size === size
              ? { ...l, qty: Math.min(MAX_QTY, qty) }
              : l,
          )
          .filter((l) => l.qty > 0),
      );
    },
    [],
  );

  const removeItem = useCallback((productId: string, size: string) => {
    setLines((prev) =>
      prev.filter((l) => !(l.productId === productId && l.size === size)),
    );
  }, []);

  // Changing department drops a style filter that belongs to another department.
  const setDepartment = useCallback((d: DepartmentFilter) => {
    setDepartmentState(d);
    setCategory((prev) =>
      prev === "all" || d === "all" || getCategory(prev).department === d
        ? prev
        : "all",
    );
  }, []);

  const goTo = useCallback((view: Partial<View> = {}) => {
    setDepartmentState(view.department ?? "all");
    setCategory(view.category ?? "all");
    setAudience(view.audience ?? "all");
    setHighlight(view.highlight ?? "all");
    setQuery("");
  }, []);

  const resetFilters = useCallback(() => {
    goTo();
    setSort("featured");
  }, [goTo]);

  const value = useMemo<StoreValue>(() => {
    const count = lines.reduce((sum, l) => sum + l.qty, 0);
    const subtotal = lines.reduce((sum, l) => {
      const p = getProduct(l.productId);
      return p ? sum + effectivePrice(p) * l.qty : sum;
    }, 0);
    return {
      lines,
      count,
      subtotal,
      addItem,
      setQty,
      removeItem,
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      department,
      setDepartment,
      category,
      setCategory,
      audience,
      setAudience,
      highlight,
      setHighlight,
      query,
      setQuery,
      sort,
      setSort,
      goTo,
      resetFilters,
    };
  }, [
    lines,
    cartOpen,
    department,
    category,
    audience,
    highlight,
    query,
    sort,
    addItem,
    setQty,
    removeItem,
    setDepartment,
    goTo,
    resetFilters,
  ]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
