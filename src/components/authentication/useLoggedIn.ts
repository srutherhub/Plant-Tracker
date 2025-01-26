import { useNavigate } from "react-router";

export function useLoggedIn() {
  const redirect = useNavigate();
  const token = sessionStorage.getItem("accessToken");
  if (token === null || undefined) {
    redirect("/auth");
  }
}
