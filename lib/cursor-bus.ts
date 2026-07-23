"use client";

/**
 * Tiny event bus so any interactive element (nav links, project cards,
 * CTAs) can tell <CursorFollower /> to expand into its "hover" state,
 * without threading context/props through the whole tree.
 *
 * Usage:
 *   import { useCursorHover } from "@/lib/cursor-bus";
 *   const hoverProps = useCursorHover("View");
 *   <div {...hoverProps}>...</div>
 */

export type CursorVariant = "default" | "hover";

export const CURSOR_EVENT = "cursor:variant";

export interface CursorEventDetail {
  variant: CursorVariant;
  label?: string;
}

export function emitCursorVariant(detail: CursorEventDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<CursorEventDetail>(CURSOR_EVENT, { detail }));
}

/**
 * Returns onMouseEnter / onMouseLeave / onFocus / onBlur handlers to spread
 * onto any interactive element. `label` is optional text the cursor bubble
 * displays (e.g. "View", "Explore", "Send").
 */
export function useCursorHover(label?: string) {
  return {
    onMouseEnter: () => emitCursorVariant({ variant: "hover", label }),
    onMouseLeave: () => emitCursorVariant({ variant: "default" }),
    onFocus: () => emitCursorVariant({ variant: "hover", label }),
    onBlur: () => emitCursorVariant({ variant: "default" }),
  };
}
