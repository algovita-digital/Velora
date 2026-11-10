export type Department = "pants" | "shirts" | "tees";

export type CategoryId =
  // Pants & Denims
  | "baggy"
  | "bootcut"
  | "jorts"
  | "wide"
  | "trousers"
  // Shirts
  | "linen"
  | "boxy"
  | "oversized"
  // T-Shirts
  | "heavyweight"
  | "longsleeve"
  | "graphic";

export interface DepartmentInfo {
  id: Department;
  name: string;
  blurb: string;
}

export const departments: DepartmentInfo[] = [
  { id: "pants", name: "Pants & Denims", blurb: "Baggy, bootcut, wide leg and more" },
  { id: "shirts", name: "Shirts", blurb: "Linen, boxy printed and oversized" },
  { id: "tees", name: "T-Shirts", blurb: "Heavyweight, long sleeve and graphic" },
];

export interface Category {
  id: CategoryId;
  department: Department;
  /** Plural name for filters and collection cards. */
  name: string;
  /** Singular label shown under a product title. */
  label: string;
  /** Card background and garment colour for the illustrated card. */
  bg: string;
  fill: string;
  /** True when `bg` is dark, so card text switches to light. */
  dark: boolean;
  /** Optional photo, e.g. "/images/categories/baggy.jpg". */
  image?: string;
}

export const categories: Category[] = [
  // Pants & Denims
  { id: "baggy", department: "pants", name: "Baggy fit", label: "Baggy fit", bg: "#CBD6E3", fill: "#3D5A86", dark: false, image: "/images/products/raw-indigo-baggy.png" },
  { id: "bootcut", department: "pants", name: "Bootcut jeans", label: "Bootcut", bg: "#1B2A4A", fill: "#6C8DB6", dark: false, image: "/images/products/mid-blue-bootcut.png" },
  { id: "jorts", department: "pants", name: "Jorts", label: "Jorts", bg: "#E3D9C6", fill: "#7C93B3", dark: true, image: "/images/products/washed-denim-jorts.png" },
  { id: "wide", department: "pants", name: "Wide leg", label: "Wide leg", bg: "#9DB2CB", fill: "#1F3357", dark: false, image: "/images/products/ice-blue-wide.png" },
  { id: "trousers", department: "pants", name: "Trousers", label: "Trousers", bg: "#2B2F36", fill: "#CFC6B8", dark: false, image: "/images/products/stone-pleated-trouser.png" },
  // Shirts
  { id: "linen", department: "shirts", name: "Linen shirts", label: "Linen shirt", bg: "#DCD6C6", fill: "#C2B08A", dark: false, image: "/images/products/sand-linen-camp-shirt.png" },
  { id: "boxy", department: "shirts", name: "Boxy printed shirts", label: "Boxy printed shirt", bg: "#1B2A4A", fill: "#7A97BE", dark: true, image: "/images/products/navy-palm-boxy-shirt.png" },
  { id: "oversized", department: "shirts", name: "Oversized shirts", label: "Oversized shirt", bg: "#CBD6E3", fill: "#2A2D33", dark: true, image: "/images/products/washed-black-oversized-shirt.png" },
  // T-Shirts
  { id: "heavyweight", department: "tees", name: "Heavyweight tees", label: "Heavyweight tee", bg: "#2B2F36", fill: "#E4DCCB", dark: true, image: "/images/products/black-heavyweight-tee.png" },
  { id: "longsleeve", department: "tees", name: "Long sleeve tees", label: "Long sleeve tee", bg: "#9DB2CB", fill: "#EDEBE4", dark: false, image: "/images/products/white-long-sleeve-tee.png" },
  { id: "graphic", department: "tees", name: "Graphic tees", label: "Graphic tee", bg: "#E3D9C6", fill: "#1E2025", dark: false, image: "/images/products/sky-sun-graphic-tee.png" },
];

export interface Product {
  id: string;
  title: string;
  category: CategoryId;
  collection: "men" | "young";
  /** MRP in INR. */
  price: number;
  /** Discounted price in INR, if on sale. */
  salePrice?: number;
  isNew?: boolean;
  colorName: string;
  /** Hex used for the illustrated garment. */
  color: string;
  sizes: string[];
  /** Optional photo, e.g. "/images/products/raw-indigo-baggy.jpg". */
  image?: string;
  /** Lower ranks appear first within their department under "Featured". */
  rank: number;
}

/** Waist sizes for pants and denims. */
const WAIST = ["28", "30", "32", "34", "36"];
/** Letter sizes for shirts and tees. Keep to five so the picker stays on one row. */
const LETTER = ["S", "M", "L", "XL", "XXL"];

export const products: Product[] = [
  // ---------- Pants & Denims ----------
  { id: "raw-indigo-baggy", title: "Raw Indigo Baggy Jeans", category: "baggy", collection: "men", price: 1899, isNew: true, colorName: "Raw indigo", color: "#25365C", sizes: WAIST, rank: 1, image: "/images/products/raw-indigo-baggy.png"},
  { id: "washed-black-baggy", title: "Washed Black Baggy Fit", category: "baggy", collection: "young", price: 1799, colorName: "Washed black", color: "#2A2D33", sizes: WAIST, rank: 2, image: "/images/products/washed-black-baggy.png" },
  { id: "sky-carpenter-baggy", title: "Sky Wash Baggy Carpenter", category: "baggy", collection: "men", price: 2099, isNew: true, colorName: "Sky wash", color: "#8FAACB", sizes: WAIST, rank: 3, image: "/images/products/sky-carpenter-baggy.png" },
  { id: "mid-blue-bootcut", title: "Mid Blue Bootcut Jeans", category: "bootcut", collection: "men", price: 1799, colorName: "Mid blue", color: "#4C6D9C", sizes: WAIST, rank: 4, image: "/images/products/mid-blue-bootcut.png" },
  { id: "stone-bootcut-flare", title: "Stone Bootcut Flare", category: "bootcut", collection: "young", price: 1699, salePrice: 1299, colorName: "Stone", color: "#BDB2A0", sizes: WAIST, rank: 5, image: "/images/products/stone-bootcut-flare.png" },
  { id: "indigo-selvedge-bootcut", title: "Indigo Selvedge Bootcut", category: "bootcut", collection: "men", price: 2399, colorName: "Dark indigo", color: "#1E2D4F", sizes: WAIST, rank: 6, image: "/images/products/indigo-selvedge-bootcut.png" },
  { id: "washed-denim-jorts", title: "Washed Denim Jorts", category: "jorts", collection: "young", price: 1299, isNew: true, colorName: "Light wash", color: "#8BA5C7", sizes: WAIST, rank: 7, image: "/images/products/washed-denim-jorts.png" },
  { id: "black-longline-jorts", title: "Black Longline Jorts", category: "jorts", collection: "men", price: 1399, colorName: "Black", color: "#24262B", sizes: WAIST, rank: 8, image: "/images/products/black-longline-jorts.png" },
  { id: "light-cargo-jorts", title: "Light Wash Cargo Jorts", category: "jorts", collection: "young", price: 1499, salePrice: 1099, colorName: "Ice wash", color: "#B6C7DB", sizes: WAIST, rank: 9, image: "/images/products/light-cargo-jorts.png" },
  { id: "ice-blue-wide", title: "Ice Blue Wide Leg", category: "wide", collection: "young", price: 1899, isNew: true, colorName: "Ice blue", color: "#A9BEDA", sizes: WAIST, rank: 10, image: "/images/products/ice-blue-wide.png" },
  { id: "charcoal-wide", title: "Charcoal Wide Leg", category: "wide", collection: "men", price: 1999, colorName: "Charcoal", color: "#3A3D44", sizes: WAIST, rank:11, image: "/images/products/charcoal-wide.png" },
  { id: "olive-utility-wide", title: "Olive Utility Wide Leg", category: "wide", collection: "men", price: 1799, salePrice: 1399, colorName: "Olive", color: "#5C6148", sizes: WAIST, rank: 12, image: "/images/products/olive-utility-wide.png" },
  { id: "stone-pleated-trouser", title: "Stone Pleated Trousers", category: "trousers", collection: "men", price: 1999, isNew: true, colorName: "Stone", color: "#CFC6B8", sizes: WAIST, rank: 13, image: "/images/products/stone-pleated-trouser.png" },
  { id: "black-tailored-trouser", title: "Black Tailored Trousers", category: "trousers", collection: "men", price: 2199, colorName: "Black", color: "#1A1C21", sizes: WAIST, rank: 14, image: "/images/products/black-tailored-trouser.png" },
  { id: "olive-relaxed-trouser", title: "Olive Relaxed Trousers", category: "trousers", collection: "young", price: 1799, salePrice: 1299, colorName: "Olive", color: "#5C6148", sizes: WAIST, rank: 15, image: "/images/products/olive-relaxed-trouser.png" },
  { id: "ecru-wide-trouser", title: "Ecru Wide Trousers", category: "trousers", collection: "young", price: 1599, colorName: "Ecru", color: "#E4DCCB", sizes: WAIST, rank: 16, image: "/images/products/ecru-wide-trouser.png" },

  // ---------- Shirts ----------
  { id: "sand-linen-camp-shirt", title: "Sand Linen Camp Shirt", category: "linen", collection: "men", price: 1199, isNew: true, colorName: "Sand", color: "#D9C9A8", sizes: LETTER, rank: 17, image: "/images/products/sand-linen-camp-shirt.png" },
  { id: "white-linen-casual-shirt", title: "White Linen Casual Shirt", category: "linen", collection: "men", price: 1099, colorName: "Off white", color: "#EDEBE4", sizes: LETTER, rank: 18, image: "/images/products/white-linen-casual-shirt.png" },
  { id: "sage-linen-resort-shirt", title: "Sage Linen Resort Shirt", category: "linen", collection: "young", price: 1099, salePrice: 899, colorName: "Sage", color: "#9FB09A", sizes: LETTER, rank: 19, image: "/images/products/sage-linen-resort-shirt.png" },
  { id: "navy-palm-boxy-shirt", title: "Navy Palm Print Boxy Shirt", category: "boxy", collection: "young", price: 1099, isNew: true, colorName: "Navy", color: "#1F3357", sizes: LETTER, rank: 20, image: "/images/products/navy-palm-boxy-shirt.png" },
  { id: "rust-diamond-boxy-shirt", title: "Rust Retro Print Boxy Shirt", category: "boxy", collection: "young", price: 999, colorName: "Rust", color: "#A8532F", sizes: LETTER, rank: 21, image: "/images/products/rust-diamond-boxy-shirt.png" },
  { id: "black-diamond-boxy-shirt", title: "Black Diamond Print Boxy Shirt", category: "boxy", collection:"men", price:1199, colorName:"Black", color:"#1E2025", sizes:LETTER, rank:22, image:" /images/products/black-diamond-boxy-shirt.png" },
  { id: "washed-black-oversized-shirt", title: "Washed Black Oversized Shirt", category: "oversized", collection: "men", price: 1299, isNew: true, colorName: "Washed black", color: "#2A2D33", sizes: LETTER, rank: 23, image: "/images/products/washed-black-oversized-shirt.png" },
  { id: "stone-oversized-shirt", title: "Stone Oversized Shirt", category: "oversized", collection: "young", price: 1299, salePrice: 999, colorName: "Stone", color: "#BDB2A0", sizes: LETTER, rank: 24, image: "/images/products/stone-oversized-shirt.png" },

  // ---------- T-Shirts ----------
  { id: "black-heavyweight-tee", title: "Heavyweight Drop-shoulder Tee", category: "heavyweight", collection: "men", price: 899, isNew: true, colorName: "Black", color: "#1E2025", sizes: LETTER, rank: 25, image: "/images/products/black-heavyweight-tee.png" },
  { id: "bone-heavyweight-tee", title: "Bone Heavyweight Boxy Tee", category: "heavyweight", collection: "young", price: 849, colorName: "Bone", color: "#E4DCCB", sizes: LETTER, rank: 26, image: "/images/products/bone-heavyweight-tee.png" },
  { id: "indigo-heavyweight-tee", title: "Indigo Heavyweight Tee", category: "heavyweight", collection: "men", price: 899, colorName: "Indigo", color: "#25365C", sizes: LETTER, rank: 27, image: "/images/products/indigo-heavyweight-tee.png" },
  { id: "olive-heavyweight-tee", title: "Olive Heavyweight Tee", category: "heavyweight", collection: "young", price: 899, salePrice: 749, colorName: "Olive", color: "#5C6148", sizes: LETTER, rank: 28, image: "/images/products/olive-heavyweight-tee.png" },
  { id: "white-long-sleeve-tee", title: "White Long Sleeve Tee", category: "longsleeve", collection: "men", price: 799, colorName: "White", color:"#EDEBE4", sizes:LETTER, rank:29, image:"/images/products/white-long-sleeve-tee.png" },
  { id: "charcoal-long-sleeve-tee", title: "Charcoal Long Sleeve Tee", category: "longsleeve", collection: "young", price: 849, isNew: true, colorName: "Charcoal", color:"#3A3D44", sizes: LETTER, rank: 30, image: "/images/products/charcoal-long-sleeve-tee.png" },
  { id: "sky-sun-graphic-tee", title: "Sun Graphic Tee", category: "graphic", collection: "young", price: 799, colorName: "Sky", color: "#8FAACB", sizes: LETTER, rank: 31, image: "/images/products/sky-sun-graphic-tee.png" },
  { id: "black-studio-graphic-tee", title: "Studio Graphic Tee", category: "graphic", collection: "men", price: 749, colorName: "Black", color: "#1A1C21", sizes: LETTER, rank: 32, image: "/images/products/black-studio-graphic-tee.png" },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCategory(id: CategoryId): Category {
  return categories.find((c) => c.id === id)!;
}

export function getDepartment(id: Department): DepartmentInfo {
  return departments.find((d) => d.id === id)!;
}

export function categoriesFor(department: Department): Category[] {
  return categories.filter((c) => c.department === department);
}

export function departmentOf(p: Product): Department {
  return getCategory(p.category).department;
}

export function effectivePrice(p: Product): number {
  return p.salePrice ?? p.price;
}

export function discountPercent(p: Product): number {
  return p.salePrice ? Math.round((1 - p.salePrice / p.price) * 100) : 0;
}
