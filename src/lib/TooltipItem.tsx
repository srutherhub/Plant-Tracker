import { ReactNode } from "react";

export function TooltipItem({children}:{children:ReactNode}) {
  return <div className="tooltip-item">
    {children}
  </div>
}