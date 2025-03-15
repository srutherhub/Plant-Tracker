interface IToastProps {
  message: string;
}

export default function Toast(props: IToastProps) {
  const { message } = props;

  return (
    <div
      style={{
        backgroundColor: "var(--base-bg)",
        borderRadius: "0.5rem",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        width: "320px",
        height: "32px",
        padding: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p>{message}</p>
      <i
        className="bi bi-arrow-clockwise"
        style={{
          animation: "spin 2s linear infinite",
        }}
      ></i>
    </div>
  );
}
