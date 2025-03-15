import { useContext, useEffect } from "react";
import Toast from "./Toast";
import { AppDataContext } from "../App";

export type TToast = {
  message: string;
};

export default function ToastContainer() {
  const context = useContext(AppDataContext);
  const { toast, setToast } = context || {};

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastDataProvider");
  }
  const toastMap = toast?.map((item, index) => (
    <Toast key={index} message={item.message} />
  ));

  useEffect(() => {
    const timer = setTimeout(() => {
      if (setToast)
        if (toast && toast.length > 0) {
          const copy = [...toast];
          copy.pop();
          setToast(copy);
        }
    }, 2000);

    return clearTimeout(timer);
  }, [setToast, toast]);

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
    >
      {toastMap}
    </div>
  );
}
