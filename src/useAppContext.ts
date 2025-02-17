import { AppDataContext } from "./App";
import { useContext } from "react";

export function useAppContext() {
  const context = useContext(AppDataContext);
  if (!context) {
    return undefined;
  } else {
    return context;
  }
}
