import { createContext, useState } from "react";
import { TToast } from "./ToastContainer";

export const ToastProvider = createContext([] as TToast[]);

export default function useToast() {
  const [toast, setToast] = useState<TToast[]>([] as TToast[]);

  return function pushToast({ message }: TToast): void {
    setToast([{ message }, ...(toast || [])]);
    console.log(toast);
  };
}
