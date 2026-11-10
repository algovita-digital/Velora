import type { CategoryId } from "@/lib/products";

/* ------------------------------------------------------------------ */
/* Pants and denims                                                    */
/* ------------------------------------------------------------------ */

type PantsKind = "baggy" | "bootcut" | "jorts" | "wide" | "trousers";

interface PantsSpec {
  /** Garment outline. */
  d: string;
  /** Waistband left / right x. */
  wl: number;
  wr: number;
  /** Hem y and left/right hem stitch spans. */
  hy: number;
  left: [number, number];
  right: [number, number];
  crease?: boolean;
}

const PANTS: Record<PantsKind, PantsSpec> = {
  baggy: {
    d: "M62 24 H138 L152 70 L158 235 H106 L100 100 L94 235 H42 L48 70 Z",
    wl: 62, wr: 138, hy: 235, left: [46, 91], right: [109, 154],
  },
  bootcut: {
    d: "M66 24 H134 L144 70 L140 150 L152 235 H108 L100 105 L92 235 H48 L60 150 L56 70 Z",
    wl: 66, wr: 134, hy: 235, left: [52, 90], right: [110, 148],
  },
  wide: {
    d: "M66 24 H134 L146 70 L162 235 H108 L100 108 L92 235 H38 L54 70 Z",
    wl: 66, wr: 134, hy: 235, left: [42, 90], right: [110, 158],
  },
  trousers: {
    d: "M64 24 H136 L146 70 L134 235 H106 L100 110 L94 235 H66 L54 70 Z",
    wl: 64, wr: 136, hy: 235, left: [68, 92], right: [108, 132], crease: true,
  },
  jorts: {
    d: "M62 24 H138 L152 70 L156 160 H106 L100 96 L94 160 H44 L48 70 Z",
    wl: 62, wr: 138, hy: 160, left: [48, 92], right: [108, 152],
  },
};

/* ------------------------------------------------------------------ */
/* Shirts and tees                                                     */
/* ------------------------------------------------------------------ */

type TopKind =
  | "linen"
  | "boxy"
  | "oversized"
  | "heavyweight"
  | "longsleeve"
  | "graphic";

interface TopSpec {
  /** Garment outline. */
  d: string;
  /** Hem y and the x span of the hem stitch. */
  hy: number;
  hemX: [number, number];
  /** Camp collar, placket and buttons (shirts). */
  collar?: boolean;
  /** Chest pocket (shirts). */
  pocket?: boolean;
  /** Crew neck rib: left x, right x, curve depth (tees). */
  neck?: [number, number, number];
  /** Extra seam lines, such as drop-shoulder seams. */
  seams?: string[];
  /** Sleeve hem and cuff stitch segments: x1, y1, x2, y2. */
  stitches: [number, number, number, number][];
  print?: "diamonds" | "emblem";
}

const TOPS: Record<TopKind, TopSpec> = {
  // Short sleeve camp-collar shirt
  linen: {
    d: "M82 24 L44 38 L14 88 L40 104 L54 96 L54 234 H146 L146 96 L160 104 L186 88 L156 38 L118 24 L100 54 Z",
    hy: 234, hemX: [60, 140], collar: true, pocket: true,
    stitches: [[19, 84, 37, 95], [181, 84, 163, 95]],
  },
  // Cropped, wide, drop-shoulder shirt with an all-over print
  boxy: {
    d: "M82 24 L38 40 L10 80 L36 98 L40 92 L40 216 H160 L160 92 L164 98 L190 80 L162 40 L118 24 L100 54 Z",
    hy: 216, hemX: [46, 154], collar: true, print: "diamonds",
    seams: ["M38 40 L40 92", "M162 40 L160 92"],
    stitches: [[15, 77, 32, 88], [185, 77, 168, 88]],
  },
  // Long sleeve, long body, drop shoulder
  oversized: {
    d: "M82 24 L38 42 L14 198 L42 206 L46 116 L44 240 H156 L154 116 L158 206 L186 198 L162 42 L118 24 L100 54 Z",
    hy: 240, hemX: [50, 150], collar: true, pocket: true,
    seams: ["M38 42 L46 116", "M162 42 L154 116"],
    stitches: [[17, 189, 40, 197], [183, 189, 160, 197]],
  },
  // Short sleeve, boxy body, visible drop-shoulder seam
  heavyweight: {
    d: "M84 26 L36 44 L12 82 L36 98 L40 94 L40 222 H160 L160 94 L164 98 L188 82 L164 44 L116 26 Q100 44 84 26 Z",
    hy: 222, hemX: [46, 154], neck: [84, 116, 44],
    seams: ["M36 44 L40 94", "M164 44 L160 94"],
    stitches: [[16, 78, 32, 89], [184, 78, 168, 89]],
  },
  longsleeve: {
    d: "M84 26 L46 40 L22 196 L46 202 L56 108 L56 228 H144 L144 108 L154 202 L178 196 L154 40 L116 26 Q100 44 84 26 Z",
    hy: 228, hemX: [62, 138], neck: [84, 116, 44],
    stitches: [[27, 187, 44, 191], [173, 187, 156, 191]],
  },
  // Regular tee with a chest print
  graphic: {
    d: "M82 26 L44 40 L16 92 L42 106 L54 98 L54 232 H146 L146 98 L158 106 L184 92 L156 40 L118 26 Q100 46 82 26 Z",
    hy: 232, hemX: [60, 140], neck: [82, 118, 46], print: "emblem",
    stitches: [[21, 86, 38, 96], [179, 86, 162, 96]],
  },
};

/* ------------------------------------------------------------------ */

function isLight(hex: string): boolean {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
}

interface Palette {
  seam: string;
  thread: string;
  panel: string;
}

function paletteFor(fill: string): Palette {
  const light = isLight(fill);
  return {
    seam: light ? "rgba(15,21,34,0.45)" : "rgba(255,255,255,0.4)",
    thread: light ? "#8A5A12" : "#E3A646",
    panel: light ? "rgba(15,21,34,0.08)" : "rgba(255,255,255,0.1)",
  };
}

const SVG_PROPS = {
  viewBox: "0 0 200 260",
  "aria-hidden": true as const,
  focusable: "false" as const,
};

function PantsArt({
  spec: s,
  fill,
  pal,
  className,
}: {
  spec: PantsSpec;
  fill: string;
  pal: Palette;
  className?: string;
}) {
  const hemY = s.hy - 8;
  return (
    <svg {...SVG_PROPS} className={className}>
      <path d={s.d} fill={fill} stroke={pal.seam} strokeWidth="1" strokeLinejoin="round" />

      {/* Waistband and topstitch */}
      <line x1={s.wl} x2={s.wr} y1="36" y2="36" stroke={pal.seam} strokeWidth="1" />
      <line x1={s.wl + 3} x2={s.wr - 3} y1="40" y2="40" stroke={pal.thread} strokeWidth="1" strokeDasharray="3 3" />

      {/* Fly */}
      <path d="M100 36 V86" stroke={pal.seam} strokeWidth="1" fill="none" />
      <path d="M103.5 40 V84" stroke={pal.thread} strokeWidth="1" strokeDasharray="3 3" fill="none" />

      {/* Front pockets */}
      <path
        d={`M${s.wl + 4} 38 C ${s.wl + 6} 58, ${s.wl + 20} 66, ${s.wl + 36} 64`}
        stroke={pal.thread} strokeWidth="1" strokeDasharray="3 3" fill="none"
      />
      <path
        d={`M${s.wr - 4} 38 C ${s.wr - 6} 58, ${s.wr - 20} 66, ${s.wr - 36} 64`}
        stroke={pal.thread} strokeWidth="1" strokeDasharray="3 3" fill="none"
      />

      {/* Hem stitching */}
      <line x1={s.left[0]} x2={s.left[1]} y1={hemY} y2={hemY} stroke={pal.thread} strokeWidth="1" strokeDasharray="3 3" />
      <line x1={s.right[0]} x2={s.right[1]} y1={hemY} y2={hemY} stroke={pal.thread} strokeWidth="1" strokeDasharray="3 3" />

      {/* Pressed crease on tailored trousers */}
      {s.crease && (
        <>
          <path d="M80 92 L80 228" stroke={pal.seam} strokeWidth="1" fill="none" />
          <path d="M120 92 L120 228" stroke={pal.seam} strokeWidth="1" fill="none" />
        </>
      )}
    </svg>
  );
}

/** Small diamonds scattered over the body, skipping the placket. */
function diamondPositions(hy: number): [number, number][] {
  const out: [number, number][] = [];
  for (let row = 0; row < 6; row++) {
    const y = 82 + row * 22;
    if (y > hy - 22) break;
    const offset = row % 2 ? 11 : 0;
    for (let col = 0; col < 5; col++) {
      const x = 48 + col * 22 + offset;
      if (Math.abs(x - 100) < 10) continue;
      out.push([x, y]);
    }
  }
  return out;
}

function TopArt({
  spec: s,
  fill,
  pal,
  className,
}: {
  spec: TopSpec;
  fill: string;
  pal: Palette;
  className?: string;
}) {
  const hemY = s.hy - 8;
  const buttonStep = (s.hy - 24 - 76) / 5;

  return (
    <svg {...SVG_PROPS} className={className}>
      <path d={s.d} fill={fill} stroke={pal.seam} strokeWidth="1" strokeLinejoin="round" />

      {/* All-over diamond print */}
      {s.print === "diamonds" &&
        diamondPositions(s.hy).map(([x, y]) => (
          <path
            key={`${x}-${y}`}
            d={`M${x} ${y - 4} L${x + 4} ${y} L${x} ${y + 4} L${x - 4} ${y} Z`}
            fill={pal.thread}
            opacity="0.85"
          />
        ))}

      {/* Chest print */}
      {s.print === "emblem" && (
        <>
          <circle cx="100" cy="112" r="22" fill="none" stroke={pal.thread} strokeWidth="1.6" />
          <circle cx="100" cy="112" r="7" fill={pal.thread} />
          <path d="M80 152 H120" stroke={pal.thread} strokeWidth="1.6" strokeDasharray="4 3" fill="none" />
          <path d="M88 160 H112" stroke={pal.thread} strokeWidth="1.6" strokeDasharray="4 3" fill="none" />
        </>
      )}

      {/* Drop-shoulder and other seams */}
      {s.seams?.map((d) => (
        <path key={d} d={d} stroke={pal.seam} strokeWidth="1" fill="none" />
      ))}

      {/* Crew neck rib */}
      {s.neck && (
        <>
          <path
            d={`M${s.neck[0]} 26 Q100 ${s.neck[2]} ${s.neck[1]} 26`}
            stroke={pal.seam} strokeWidth="1.4" fill="none"
          />
          <path
            d={`M${s.neck[0] + 3} 29 Q100 ${s.neck[2] + 3} ${s.neck[1] - 3} 29`}
            stroke={pal.thread} strokeWidth="1" strokeDasharray="3 3" fill="none"
          />
        </>
      )}

      {/* Camp collar, placket, buttons */}
      {s.collar && (
        <>
          <path d="M82 24 L100 54 L86 62 L64 38 Z" fill={pal.panel} stroke={pal.seam} strokeWidth="1" strokeLinejoin="round" />
          <path d="M118 24 L100 54 L114 62 L136 38 Z" fill={pal.panel} stroke={pal.seam} strokeWidth="1" strokeLinejoin="round" />
          <line x1="95" x2="95" y1="58" y2={s.hy} stroke={pal.seam} strokeWidth="1" />
          <line x1="105" x2="105" y1="58" y2={s.hy} stroke={pal.seam} strokeWidth="1" />
          {Array.from({ length: 6 }, (_, i) => (
            <circle key={i} cx="100" cy={76 + i * buttonStep} r="2.2" fill={pal.thread} />
          ))}
        </>
      )}

      {/* Chest pocket */}
      {s.pocket && (
        <>
          <path d="M114 84 H138 V110 H114 Z" fill="none" stroke={pal.thread} strokeWidth="1" strokeDasharray="3 3" />
          <line x1="114" x2="138" y1="88" y2="88" stroke={pal.seam} strokeWidth="1" />
        </>
      )}

      {/* Sleeve hem and cuff stitching */}
      {s.stitches.map(([x1, y1, x2, y2]) => (
        <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={pal.thread} strokeWidth="1" strokeDasharray="3 3" />
      ))}

      {/* Hem stitching */}
      <line x1={s.hemX[0]} x2={s.hemX[1]} y1={hemY} y2={hemY} stroke={pal.thread} strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  );
}

interface Props {
  kind: CategoryId;
  fill: string;
  className?: string;
}

/** Illustrated garment used wherever a photo is not (yet) available. */
export default function Silhouette({ kind, fill, className }: Props) {
  const pal = paletteFor(fill);

  const top = (TOPS as Partial<Record<CategoryId, TopSpec>>)[kind];
  if (top) {
    return <TopArt spec={top} fill={fill} pal={pal} className={className} />;
  }

  return (
    <PantsArt
      spec={PANTS[kind as PantsKind]}
      fill={fill}
      pal={pal}
      className={className}
    />
  );
}
