import { useContext } from "react";
import { TToast } from "./ToastContainer";
import { AppDataContext } from "../App";

export default function useToast() {
  const context = useContext(AppDataContext);
  const { toast, setToast } = context || {};

  return function pushToast({ message }: TToast): void {
    if (setToast) {
      setToast([{ message }, ...(toast || [])]);
      console.log(toast, message);
    } else {
      throw new Error("useToast must be used within a ToastDataProvider");
    }
  };
}
