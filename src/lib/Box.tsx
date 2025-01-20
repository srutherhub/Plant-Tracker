

export function Box({ children, ...props }) {
  return (
    <div
      {...props}
      style={{
        display: props.display || "flex",
        alignItems: props.alignItems || "",
        flexDirection: props.flexDirection || "column",
        border: props.border || "1px solid gray",
        borderBottom: props.borderBottom || "4px solid var(--primary)",
        padding: props.padding || "0.5rem",
        width: props.width || "",
        height: props.height || "",
        backgroundColor: props.backgroundColor || "var(--primary-bg)",
        borderRadius: "var(--primary-border-rad)"
      }}
    >
      {children}
    </div>
  );
}
