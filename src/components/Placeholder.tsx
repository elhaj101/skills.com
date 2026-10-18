import type { ReactNode } from "react";

// Clearly marked stand-in for content the owner still has to supply.
// Search the code for <Placeholder to find every open item.
export function Placeholder({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`placeholder ${className}`}>{children}</div>;
}
