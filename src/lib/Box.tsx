export function Box({ children, ...props }) {
  return (
    <div
      {...props}
      style={{
        display: "flex",
        alignItems: props.alignItems || "",
        flexDirection: "column",
        border: "1px solid gray",
        borderBottom: "4px solid green",
        padding: "0.5rem",
        width: props.width,
      }}
    >
      {children}
    </div>
  );
}
