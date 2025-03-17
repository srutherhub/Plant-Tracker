import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

interface IRequestOptions {
  endpoint:
    | "authentication/signup"
    | "authentication/signin"
    | "authentication/signout";
}

export function useAuth(props: IRequestOptions) {
  const base_url = import.meta.env.VITE_SERVER_URL;
  const { endpoint } = props;
  const fetch_url = base_url + endpoint;

  const redirect = useNavigate();
  const [session, setSession] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const auth = useCallback(
    async (email?: string, password?: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(fetch_url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.message);
        }
        const result = await response.json();

        setSession(result);
        if (endpoint == "authentication/signout") {
          sessionStorage.clear();
          redirect("/auth");
        } else {
          sessionStorage.setItem("accessToken", result.session.access_token);
          sessionStorage.setItem("userId", result.session.user.id);
          redirect("/app");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (
          err.message == "result.session is null" &&
          endpoint == "authentication/signup"
        )
          setError("Already signed up, sign in instead");
        else setError(err.message || "An error occured");
      } finally {
        setLoading(false);
      }
    },
    [endpoint, fetch_url]
  );
  return { loading, error, session, auth };
}
