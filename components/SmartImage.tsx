"use client";

import { useState, type ReactNode } from "react";

interface Props {
  src?: string;
  alt: string;
  fallback: ReactNode;
  className?: string;
}

/**
 * Shows a photo when `src` is set and loads; otherwise renders the fallback
 * (the illustrated garment). Lets you add real photography product by product.
 */
export default function SmartImage({ src, alt, fallback, className = "" }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <>{fallback}</>;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
