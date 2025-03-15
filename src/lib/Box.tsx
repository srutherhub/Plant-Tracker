export function Box({ children, ...props }) {
  return (
    <div
      {...props}
      style={{
        display: props.display || "flex",
        alignItems: props.alignItems || "",
        flexDirection: props.flexDirection || "column",
        flexWrap: props.flexWrap || "",
        borderBottom: props.borderBottom || "2px solid var(--border)",
        padding: props.padding || "0.5rem",
        width: props.width || "",
        height: props.height || "",
        backgroundColor: props.backgroundColor || "var(--base-bg)",
        justifyContent: props.justifyContent || "",
        alignContent: props.alignContent || "",
        borderRadius: "var(--primary-border-rad)",
        boxShadow: "var(--primary-shadow)",
      }}
    >
      {children}
    </div>
  );
}
