import type { Placement } from "./types";

export const calculateTooltipPosition = (
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  offset: number,
  placement: Placement
): { top: number; left: number } => {
  let top = triggerRect.top + window.scrollY;
  let left = triggerRect.left + window.scrollX;

  switch (placement) {
    case "top":
      top -= offset;
      left += (triggerRect.width - tooltipRect.width) / 2;
      break;
    case "bottom":
      top += triggerRect.height + offset;
      left += (triggerRect.width - tooltipRect.width) / 2;
      break;
    case "left":
      left -= offset;
      top += (triggerRect.height - tooltipRect.height) / 2;
      break;
    case "right":
      left += triggerRect.width + offset;
      top += (triggerRect.height - tooltipRect.height) / 2;
      break;
  }

  return { top, left };
};
