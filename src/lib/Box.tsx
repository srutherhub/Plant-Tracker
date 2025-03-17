import React, { ReactNode } from "react";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  display?: React.CSSProperties["display"];
  alignItems?: React.CSSProperties["alignItems"];
  flexDirection?: React.CSSProperties["flexDirection"];
  flexWrap?: React.CSSProperties["flexWrap"];
  borderBottom?: React.CSSProperties["borderBottom"];
  padding?: React.CSSProperties["padding"];
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  backgroundColor?: React.CSSProperties["backgroundColor"];
  justifyContent?: React.CSSProperties["justifyContent"];
  alignContent?: React.CSSProperties["alignContent"];
  gap?: React.CSSProperties["gap"];
}

export function Box({ children, ...props }: BoxProps) {
  return (
    <div
      {...props}
      style={{
        display: props.display || "flex",
        alignItems: props.alignItems || "",
        flexDirection: props.flexDirection || "column",
        flexWrap: props.flexWrap || undefined,
        borderBottom: props.borderBottom || "2px solid var(--border)",
        padding: props.padding || "0.5rem",
        width: props.width || "",
        height: props.height || "",
        backgroundColor: props.backgroundColor || "var(--base-bg)",
        justifyContent: props.justifyContent || "",
        alignContent: props.alignContent || "",
        borderRadius: "var(--primary-border-rad)",
        boxShadow: "var(--primary-shadow)",
        gap: props.gap || 0,
        ...props.style, // Allows overriding inline styles
      }}
    >
      {children}
    </div>
  );
}
