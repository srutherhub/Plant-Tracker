export type TToast = {
  message: string;
};

export default function ToastContainer() {
  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        bottom: "1rem",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    ></div>
  );
}
